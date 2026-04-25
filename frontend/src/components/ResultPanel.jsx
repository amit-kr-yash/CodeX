export default function ResultPanel({ result }) {
  return (
    <div className="bg-black text-gray-200 p-4 h-44 overflow-auto border-t border-slate-700">

      {!result ? (
        <p className="text-gray-400">No result yet</p>
      ) : (
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

                {(r.status === "Failed" || result.status === "Accepted") && (
                  <>
                    <p>Input: {r.input}</p>
                    <p>Expected: {r.expected}</p>
                    <p>Actual: {r.actual || "No Output"}</p>
                  </>
                )}

                {r.status === "Error" && (
                  <p className="text-yellow-400">
                    Error: {r.error}
                  </p>
                )}

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}