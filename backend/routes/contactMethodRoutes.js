import express from "express";
import {
  createContactMethod,
  getContactMethods,
  getContactMethodById,
  updateContactMethod,
  deleteContactMethod,
} from "../controllers/contactMethodController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getContactMethods);
router.get("/:id", getContactMethodById);
router.post("/", protect, createContactMethod);
router.put("/:id", protect, updateContactMethod);
router.delete("/:id", protect, deleteContactMethod);

export default router;
