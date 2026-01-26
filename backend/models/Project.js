import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true,
        maxLength: [100, 'Project name cannot exceed 100 characters']
    },
    location: {
        type: String,
        required: [true, 'Project location is required'],
        trim: true
    },
    type: {
        type: String,
        enum: {
            values: ['Industrial', 'Residential', 'Infrastructure', 'Commercial'],
            message: '{VALUE} is not a valid project type'
        },
        required: [true, 'Project type is required']
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true,
        maxLength: [500, 'Description cannot exceed 500 characters']
    },
    year: {
        type: String,
        required: [true, 'Project year is required'],
        match: [/^\d{4}$/, 'Year must be a 4-digit number']
    },
    // Single image field (for backward compatibility)
    image: {
        type: String,
        trim: true
    },
    // Multiple images array (new feature for carousel)
    images: {
        type: [String],
        default: [],
        validate: {
            validator: function(v) {
                // Ensure at least one image (either in 'image' or 'images')
                return v.length > 0 || this.image;
            },
            message: 'At least one image is required'
        }
    },
    // Additional useful fields
    status: {
        type: String,
        enum: ['Completed', 'In Progress', 'Upcoming'],
        default: 'Completed'
    },
    featured: {
        type: Boolean,
        default: false
    },
    clientName: {
        type: String,
        trim: true
    },
    projectValue: {
        type: Number,
        min: 0
    },
    duration: {
        type: String,
        trim: true
    },
    tags: {
        type: [String],
        default: []
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better query performance
projectSchema.index({ type: 1, year: -1 });
projectSchema.index({ featured: 1, createdAt: -1 });
projectSchema.index({ status: 1 });

// Virtual field to get primary image
projectSchema.virtual('primaryImage').get(function() {
    if (this.images && this.images.length > 0) {
        return this.images[0];
    }
    return this.image;
});

// Pre-save middleware to sync images array with image field
projectSchema.pre('save', function () {
    // If image field is set but images array is empty, add it to images
    if (this.image && (!this.images || this.images.length === 0)) {
        this.images = [this.image];
    }

    // If images array has items but image field is empty, set first image as primary
    if (this.images && this.images.length > 0 && !this.image) {
        this.image = this.images[0];
    }
});

projectSchema.statics.getFeatured = function() {
    return this.find({ featured: true }).sort({ createdAt: -1 });
};

projectSchema.statics.getByType = function(type) {
    return this.find({ type }).sort({ year: -1, createdAt: -1 });
};

projectSchema.statics.getRecent = function(limit = 6) {
    return this.find().sort({ createdAt: -1 }).limit(limit);
};

projectSchema.methods.addImage = function(imageUrl) {
    if (!this.images) {
        this.images = [];
    }
    this.images.push(imageUrl);
    return this.save();
};

projectSchema.methods.removeImage = function(imageUrl) {
    if (this.images) {
        this.images = this.images.filter(img => img !== imageUrl);
    }
    return this.save();
};

export default mongoose.model('Project', projectSchema);