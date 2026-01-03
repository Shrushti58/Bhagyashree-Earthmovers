import mongoose from 'mongoose';

const specSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
});

const equipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    specs: [specSchema],
    bestFor: { type: String },
}, { timestamps: true });

export default mongoose.model('Equipment', equipmentSchema);
