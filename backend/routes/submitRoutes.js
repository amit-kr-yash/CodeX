import express from "express";
import { submitCode } from "../controller/submitController.js";
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/submit", authMiddleware, submitCode);

export default router;