import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);

router.post("/", protect, upload.single("image"), createService);
router.put("/:id", protect, upload.single("image"), updateService);
router.delete("/:id", protect, deleteService);

export default router;
