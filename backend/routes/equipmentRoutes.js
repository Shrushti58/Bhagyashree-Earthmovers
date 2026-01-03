import express from "express";
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipmentController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllEquipment);
router.get("/:id", getEquipmentById);

router.post("/", protect, upload.single("image"), createEquipment);
router.put("/:id", protect, upload.single("image"), updateEquipment);
router.delete("/:id", protect, deleteEquipment);

export default router;
