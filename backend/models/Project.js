import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Industrial', 'Residential', 'Infrastructure', 'Commercial'], 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: String
    },
    image: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
