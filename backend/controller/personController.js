import Person from "../models/Person.js";

export const getProfile = async (req, res) => {
  try {
    const user = await Person.findById(req.user.id)
      .populate("solvedProblems", "title")
      .populate("submissions.problemId", "title")
      .select("-password");

    res.json({
      username: user.username,
      email: user.email,
      role: user.role,
      solvedCount: user.solvedProblems.length,
      solvedProblems: user.solvedProblems,
      submissions: user.submissions
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};