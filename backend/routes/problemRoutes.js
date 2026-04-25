import express from "express";
import {
  createProblem,
  getAllProblems,
  getProblemById,
  deleteProblem,
  getAllTopics,
} from "../controller/problemController.js";

import {adminOnly} from "../middleware/adminMiddleware.js"
import {authMiddleware} from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/topics", getAllTopics);

router.get("/problems", getAllProblems);
router.get("/problems/:id", getProblemById);

router.post("/problems", authMiddleware, adminOnly, createProblem);
router.delete("/problems/:id", authMiddleware, adminOnly, deleteProblem);

export default router;