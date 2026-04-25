import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import CodeEditor from "../components/CodeEditor";
import ResultPanel from "../components/ResultPanel";
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
        language,
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
    <div className="flex h-[90vh] bg-slate-900 text-gray-200">

      {/* LEFT */}
      <div className="w-1/2 p-6 bg-slate-800 border-r border-slate-700 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 text-white">
          {problem.title}
        </h1>

        <span className="inline-block mb-4 px-3 py-1 text-sm rounded bg-green-500 text-white">
          {problem.difficulty}
        </span>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{problem.description}</ReactMarkdown>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex flex-col">
        <CodeEditor
          language={language}
          setLanguage={setLanguage}
          code={code}
          setCode={setCode}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <ResultPanel result={result} />
      </div>
    </div>
  );
}