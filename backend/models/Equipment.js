import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    available: { type: Boolean, default: true },
    hourlyRate: { type: String, required: true },
    bestFor: { type: String },
}, { timestamps: true });

export default mongoose.model('Equipment', equipmentSchema);