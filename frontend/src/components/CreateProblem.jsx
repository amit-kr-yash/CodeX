import { useState } from "react";
import API from "../services/api";

export default function CreateProblem({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    topics: "",
    testCases: [
      { input: "", expected: "" },
      { input: "", expected: "" },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...formData.testCases];
    newTestCases[index][field] = value;
    setFormData({ ...formData, testCases: newTestCases });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: "", expected: "" }],
    });
  };

  const removeTestCase = (index) => {
    setFormData({
      ...formData,
      testCases: formData.testCases.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate form
      if (!formData.title.trim()) {
        setError("Title is required");
        setLoading(false);
        return;
      }
      if (!formData.description.trim()) {
        setError("Description is required");
        setLoading(false);
        return;
      }
      if (!formData.topics.trim()) {
        setError("Topics are required");
        setLoading(false);
        return;
      }
      if (formData.testCases.some((tc) => !tc.input.trim() || !tc.expected.trim())) {
        setError("All test cases must have input and expected output");
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        topics: formData.topics.split(",").map((t) => t.trim()),
      };

      const res = await API.post("/problems", payload);

      // Reset form
      setFormData({
        title: "",
        description: "",
        difficulty: "easy",
        topics: "",
        testCases: [
          { input: "", expected: "" },
          { input: "", expected: "" },
        ],
      });

      setSuccess("✅ Problem created successfully!");
      setTimeout(() => {
        setSuccess("");
        onSuccess(res.data);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create problem");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg animate-pulse">
          ❌ {error}
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg animate-pulse">
          {success}
        </div>
      )}

      {/* TITLE */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">
          📝 Problem Title <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="e.g., Two Sum Problem"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">
          📄 Description <span className="text-red-600">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Detailed problem description... Explain what the problem is asking for, constraints, and examples."
          rows="6"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
        />
      </div>

      {/* DIFFICULTY & TOPICS ROW */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            ⚡ Difficulty Level <span className="text-red-600">*</span>
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-bold"
          >
            <option value="easy">🟢 Easy</option>
            <option value="medium">🟡 Medium</option>
            <option value="hard">🔴 Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            🏷️ Topics <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="topics"
            value={formData.topics}
            onChange={handleInputChange}
            placeholder="e.g., array, hashmap, sorting"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
          />
          <p className="text-xs text-gray-700 font-semibold mt-2">Separate topics with commas</p>
        </div>
      </div>

      {/* TEST CASES HEADER */}
      <div className="border-t-2 border-gray-300 pt-6">
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-bold text-gray-900">
            🧪 Test Cases <span className="text-red-600">*</span>
          </label>
          <button
            type="button"
            onClick={addTestCase}
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition"
          >
            + Add Test Case
          </button>
        </div>

        <div className="space-y-4">
          {formData.testCases.map((testCase, index) => (
            <div
              key={index}
              className="p-5 border-2 border-blue-300 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 space-y-3 shadow-md"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-gray-900 text-base">Test Case #{index + 1}</h4>
                {formData.testCases.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTestCase(index)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1 rounded transition"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-900 block mb-2">Input:</label>
                  <textarea
                    value={testCase.input}
                    onChange={(e) =>
                      handleTestCaseChange(index, "input", e.target.value)
                    }
                    placeholder="e.g., 2 3"
                    rows="4"
                    className="w-full px-3 py-2 border-2 border-gray-400 rounded bg-white text-gray-900 font-mono focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-900 block mb-2">Expected Output:</label>
                  <textarea
                    value={testCase.expected}
                    onChange={(e) =>
                      handleTestCaseChange(index, "expected", e.target.value)
                    }
                    placeholder="e.g., 5"
                    rows="4"
                    className="w-full px-3 py-2 border-2 border-gray-400 rounded bg-white text-gray-900 font-mono focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg transition shadow-lg text-lg"
      >
        {loading ? "⏳ Creating Problem..." : "✅ Create Problem"}
      </button>
    </form>
  );
}
