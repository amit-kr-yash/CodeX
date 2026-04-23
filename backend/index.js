import express from 'express';
import connectDB from './utils/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import problemRoutes from "./routes/problemRoutes.js"
import submitRoutes from "./routes/submitRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", problemRoutes);
app.use("/api", submitRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});