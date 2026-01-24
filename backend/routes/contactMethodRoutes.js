// routes/contactInfoRoutes.js
import express from "express";
import {
  getContactInfo,
  updateContactInfo,
  addPhone,
  addAddress,
  addWorkingHours,
  addSocialMedia,
  updateArrayItem,
  deleteArrayItem
} from "../controllers/contactMethodController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getContactInfo);

router.put("/", protect, updateContactInfo);
router.post("/phones", protect, addPhone);
router.post("/addresses", protect, addAddress);
router.post("/working-hours", protect, addWorkingHours);
router.post("/social-media", protect, addSocialMedia);
router.put("/:arrayName/:itemId", protect, updateArrayItem);
router.delete("/:arrayName/:itemId", protect, deleteArrayItem);

export default router;