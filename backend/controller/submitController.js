import axios from "axios";
import Problem from "../models/Problem.js";
import dotenv from 'dotenv';
dotenv.config();

const JUDGE0_URL = process.env.JUDGE0_URL;

// helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const normalize = (str) => {
  if (!str) return "";
  return str.trim().replace(/\s+/g, " ");
};

export const submitCode = async (req, res) => {
  try {
    const { problemId, source_code, language } = req.body;

    // Map language to Judge0 IDs
    const languageMap = {
      java: 62,
      python: 71
    };

    const language_id = languageMap[language];

    if (!language_id) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    // Fetch problem
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const testCases = problem.testCases;

    let passed = 0;
    let results = [];

    // Loop test cases
    for (let i = 0; i < testCases.length; i++) {
      const { input, expected } = testCases[i];

      // 🔹 Submit to Judge0
      const submission = await axios.post(
        `${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`,
        {
          source_code,
          language_id,
          stdin: input
        }
      );

      const token = submission.data.token;

      //Poll result
      let result;
      while (true) {
        const res2 = await axios.get(
          `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`
        );

        result = res2.data;

        if (result.status.id > 2) break;

        await sleep(500);
      }

      //Handle runtime / compile error
      if (result.stderr || result.compile_output) {
        results.push({
        status: "Error",
        error: result.stderr || result.compile_output
        });
        continue;
      }

      const actual = normalize(result.stdout);
      const exp = normalize(expected);

      const isPassed = actual === exp;

      if (isPassed) passed++;

      results.push({
        input,
        expected: exp,
        actual,
        status: isPassed ? "Passed" : "Failed"
      });
    }

    // Final result
    res.json({
      total: testCases.length,
      passed,
      status:
        passed === testCases.length ? "Accepted" : "Wrong Answer",
      results
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};