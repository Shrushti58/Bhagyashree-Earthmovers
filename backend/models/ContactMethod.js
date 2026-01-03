import mongoose from 'mongoose';

const contactMethodSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['phone', 'whatsapp', 'email'],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        primary: {
            type: String,
            required: true
        },
        secondary: {
            type: String
        },
        action: {
            type: String,
            required: true
        },
        buttonText: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('ContactMethod', contactMethodSchema);
