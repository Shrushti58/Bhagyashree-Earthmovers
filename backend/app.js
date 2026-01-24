import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,               
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World! Backend is running');
});

const PORT = process.env.PORT || 5000;

import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js"
import contactMethodRoutes from "./routes/contactMethodRoutes.js";
import officeInfoRoutes from "./routes/officeInfoRoutes.js";

app.use("/api/admin", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/contact-info", contactMethodRoutes);
app.use("/api/office-info", officeInfoRoutes);





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
