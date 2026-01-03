import express from "express";
import {
  createOfficeInfo,
  getOfficeInfos,
  getOfficeInfoById,
  updateOfficeInfo,
  deleteOfficeInfo,
} from "../controllers/officeInfoController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getOfficeInfos);
router.get("/:id", getOfficeInfoById);

router.post("/", protect, createOfficeInfo);
router.put("/:id", protect, updateOfficeInfo);
router.delete("/:id", protect, deleteOfficeInfo);

export default router;
