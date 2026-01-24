import express from "express";
import {
    loginAdmin,
    adminLogout,
    registerAdmin
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", adminLogout);

router.get("/me", protect, (req, res) => {
  res.status(200).json({ authenticated: true });
});


export default router;
