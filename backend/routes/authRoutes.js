import express from "express";
import {
    loginAdmin,
    logoutAdmin,
    registerAdmin
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

router.get("/me", protect, (req, res) => {
    res.json(req.admin);
});

export default router;
