import Editor from "@monaco-editor/react";

export default function CodeEditor({
  language,
  setLanguage,
  code,
  setCode,
  onSubmit,
  loading,
}) {
  return (
    <>
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
          onClick={onSubmit}
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
          onChange={(value) => setCode(value || "")}
        />
      </div>
    </>
  );
}