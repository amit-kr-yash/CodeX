import Problem from "../models/Problem.js";
import bp_code from "../utils/bp_code.js";
const {Java, Python} = bp_code;

// Create Problem
export const createProblem = async (req, res) => {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Problems (for list page)
export const getAllProblems = async (req, res) => {
  try {
    const { topic, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const filter = {};
    if (topic) filter.topics = topic;

    const problems = await Problem.find(filter)
      .select("_id title difficulty topics")
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const total = await Problem.countDocuments(filter);

    res.json({
      problems,
      total,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Problem (IMPORTANT)
export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang = "java" } = req.query;

    const problem = await Problem.findById(id).select("-testCases");

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    res.json({
      _id: problem._id,
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      starterCode: (lang === "java") ? Java:Python
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findByIdAndDelete(id);

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    res.json({
      message: "Problem deleted successfully",
      deletedId: id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTopics = async (req, res) => {  //finding distinct topics for filter in UI
  try {
    const topics = await Problem.distinct("topics");
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};