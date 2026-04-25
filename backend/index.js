import express from 'express';
import connectDB from './utils/db.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import problemRoutes from "./routes/problemRoutes.js"
import submitRoutes from "./routes/submitRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import personRoutes from "./routes/personRoutes.js"

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials : true
}));
app.use(cookieParser());

// Routes
app.use("/api", problemRoutes);
app.use("/api", submitRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", personRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});