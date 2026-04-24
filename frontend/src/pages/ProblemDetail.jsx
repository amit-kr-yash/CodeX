import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";

export default function ProblemDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  const fetchProblem = async (lang = "java") => {
    const res = await API.get(`/problems/${id}?lang=${lang}`);
    setProblem(res.data);
    setCode(res.data.starterCode);
  };

  useEffect(() => {
    fetchProblem(language);
  }, [id, language]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await API.post("/submit", {
        problemId: id,
        source_code: code,
        language
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="flex h-[90vh]  bg-slate-900 text-gray-200">

      {/* LEFT: DESCRIPTION */}
      <div className="w-1/2 p-6 bg-slate-800 border-r border-slate-700 overflow-y-auto">

        <h1 className="text-2xl font-bold mb-4 text-white">
          {problem.title}
        </h1>

        {/* Difficulty Badge */}
        <span className="inline-block mb-4 px-3 py-1 text-sm rounded bg-green-500 text-white">
          {problem.difficulty}
        </span>

        {/* Description */}
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{problem.description}</ReactMarkdown>
        </div>

      </div>

      {/* RIGHT: EDITOR */}
      <div className="w-1/2 flex flex-col">

        {/* TOP BAR */}
        <div className="flex items-center justify-between bg-slate-950 border-b border-slate-700 text-white px-4 py-2">

          <select
            className="bg-slate-800 text-white px-3 py-1 rounded border border-slate-600"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 px-4 py-1 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Running..." : "Submit"}
          </button>
        </div>

        {/* EDITOR */}
        <div className="flex-1">
          <Editor
            height="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value) => setCode(value)}
          />
        </div>

        {/* RESULT PANEL */}
        <div className="bg-black text-gray-200 p-4 h-44 overflow-auto border-t border-slate-700">
          {result ? (
            <>
              {/* STATUS */}
              <div className="mb-2">
                <span className="font-bold">Status: </span>
                <span
                  className={
                    result.status === "Accepted"
                      ? "text-green-400"
                      : result.status === "Error"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }
                >
                  {result.status}
                </span>
              </div>

              {/* SUMMARY */}
              <div className="mb-2 text-blue-300">
                Passed {result.passed ?? 0} / {result.total ?? 0} test cases
              </div>

              {/* TEST CASES */}
              <div className="text-sm space-y-1">
                {result.results?.map((r, i) => (
                  <div key={i} className="border-t border-gray-700 py-1">
                    
                    <p>
                      Test Case {i + 1}:
                      <span
                        className={
                          r.status === "Passed"
                            ? "text-green-400 ml-2"
                            : r.status === "Error"
                            ? "text-yellow-400 ml-2"
                            : "text-red-400 ml-2"
                        }
                      >
                        {r.status}
                      </span>
                    </p>

                    {/* BALANCED LOGIC */}
                    {(r.status === "Failed" || result.status === "Accepted") && (
                      <>
                        <p>Input: {r.input}</p>
                        <p>Expected: {r.expected}</p>
                        <p>Actual: {r.actual || "No Output"}</p>
                      </>
                    )}

                    {/* ERROR DISPLAY */}
                    {r.status === "Error" && (
                      <p className="text-yellow-400">
                        Error: {r.error}
                      </p>
                    )}

                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-400">No result yet</p>
          )}
        </div>

      </div>
    </div>
  );
}