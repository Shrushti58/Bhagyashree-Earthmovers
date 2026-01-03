import mongoose from 'mongoose';

const officeInfoSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['address', 'working_hours'],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        details: {
            type: [String],
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('OfficeInfo', officeInfoSchema);
