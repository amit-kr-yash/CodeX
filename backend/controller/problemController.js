import Problem from "../models/Problem.js";

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
    const { topic } = req.query;

    let filter = {};

    if (topic) {
      filter.topics = topic; // matches if topic exists in array
    }

    const problems = await Problem.find(filter).select(
      "_id title difficulty topics"
    );

    res.json(problems);
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
      starterCode: problem.boilerplate[lang]
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

export const getAllTopics = async (req, res) => {
  try {
    const topics = await Problem.distinct("topics");
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};