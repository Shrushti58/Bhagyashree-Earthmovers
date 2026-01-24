// models/ContactInfo.js
import mongoose from 'mongoose';

const PhoneSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['primary', 'secondary', 'whatsapp', 'emergency', 'sales', 'support'],
    required: true
  },
  number: {
    type: String,
    required: true,
    trim: true
  },
  countryCode: {
    type: String,
    default: '+91'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
});

const AddressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['main', 'branch', 'warehouse'],
    default: 'main'
  },
  name: {
    type: String,
    required: true
  },
  line1: {
    type: String,
    required: true
  },
  line2: String,
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'India'
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  googleMapsUrl: String,
  isActive: {
    type: Boolean,
    default: true
  }
});

const WorkingHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    required: true
  },
  openTime: {
    type: String, // Format: "08:00"
    required: true
  },
  closeTime: {
    type: String,
    required: true
  },
  isClosed: {
    type: Boolean,
    default: false
  },
  note: String // "Emergency only", "By appointment", etc.
});

const SocialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'whatsapp', 'telegram'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  icon: String, // Icon class or URL
  displayName: String,
  isActive: {
    type: Boolean,
    default: true
  }
});

const ContactInfoSchema = new mongoose.Schema({
  // Basic Info
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  businessEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  website: String,
  
  // Contact Methods
  phones: [PhoneSchema],
  addresses: [AddressSchema],
  
  // Working Hours
  workingHours: [WorkingHoursSchema],
  
  // Social Media
  socialMedia: [SocialMediaSchema],
  
  // Additional Info
  emergencyContact: String,
  supportEmail: String,
  salesEmail: String,
  gstNumber: String,
  cinNumber: String,
  
  // Metadata
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Indexes for faster queries
ContactInfoSchema.index({ businessName: 1 });
ContactInfoSchema.index({ isActive: 1 });
ContactInfoSchema.index({ 'phones.type': 1 });

// Static method to get active contact info
ContactInfoSchema.statics.getActiveContactInfo = async function() {
  return this.findOne({ isActive: true })
    .select('-__v -createdAt -updatedAt')
    .lean();
};

// Instance method to format for frontend
ContactInfoSchema.methods.formatForFrontend = function() {
  const contactInfo = this.toObject();
  
  return {
    primaryPhone: contactInfo.phones.find(p => p.type === 'primary')?.number || '',
    secondaryPhone: contactInfo.phones.find(p => p.type === 'secondary')?.number || '',
    whatsappPhone: contactInfo.phones.find(p => p.type === 'whatsapp')?.number || '',
    emergencyContact: contactInfo.emergencyContact || '',
    businessEmail: contactInfo.businessEmail,
    supportEmail: contactInfo.supportEmail || contactInfo.businessEmail,
    salesEmail: contactInfo.salesEmail || contactInfo.businessEmail,
    
    address: contactInfo.addresses.find(a => a.type === 'main') ? {
      line1: contactInfo.addresses.find(a => a.type === 'main').line1,
      line2: contactInfo.addresses.find(a => a.type === 'main').line2,
      city: contactInfo.addresses.find(a => a.type === 'main').city,
      state: contactInfo.addresses.find(a => a.type === 'main').state,
      postalCode: contactInfo.addresses.find(a => a.type === 'main').postalCode,
      mapsUrl: contactInfo.addresses.find(a => a.type === 'main').googleMapsUrl
    } : null,
    
    workingHours: contactInfo.workingHours.reduce((acc, wh) => {
      acc[wh.day] = {
        openTime: wh.openTime,
        closeTime: wh.closeTime,
        isClosed: wh.isClosed,
        note: wh.note
      };
      return acc;
    }, {}),
    
    socialLinks: contactInfo.socialMedia.reduce((acc, sm) => {
      acc[sm.platform] = sm.url;
      return acc;
    }, {})
  };
};

export default mongoose.models.ContactInfo || mongoose.model('ContactInfo', ContactInfoSchema);