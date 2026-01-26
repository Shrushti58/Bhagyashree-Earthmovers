import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "bhagyashree",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit per file
    }
});

export const uploadMultiple = upload.array('images', 10); // Max 10 images for projects
export const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]);

export default upload;