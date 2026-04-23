import express from "express";
import {
  createProblem,
  getAllProblems,
  getProblemById,
  deleteProblem
} from "../controller/problemController.js";

const router = express.Router();

router.post("/problems", createProblem);
router.get("/problems", getAllProblems);
router.get("/problems/:id", getProblemById);
router.delete("/problems/:id", deleteProblem);

export default router;