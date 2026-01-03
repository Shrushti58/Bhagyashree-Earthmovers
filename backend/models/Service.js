import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
        default: [],
    },
    image: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
