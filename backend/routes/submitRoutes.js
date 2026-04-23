import express from "express";
import { submitCode } from "../controller/submitController.js";

const router = express.Router();

router.post("/submit", submitCode);

export default router;