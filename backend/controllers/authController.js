import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin || admin.provider !== "local") {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    generateToken(res, admin._id);
    res.json({ message: "Login successful" });
};

export const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
        return res.status(403).json({ message: "Registration disabled" });
    }


    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
        return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
        email,
        password: hashedPassword,
        provider: "local",
    });

    generateToken(res, admin._id);

    res.status(201).json({
        message: "Admin registered",
        email: admin.email,
    });
};

export const logoutAdmin = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};
