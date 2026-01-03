import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String },
        provider: {
            type: String,
            enum: ["local", "google", "github"],
            default: "local",
        },
        providerId: { type: String },
    },
    { timestamps: true }
);



export default mongoose.model("Admin", adminSchema);
