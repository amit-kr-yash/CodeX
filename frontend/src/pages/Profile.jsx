import { useEffect, useState } from "react";
import API from "../services/api";

export default function Profile() {
const [data, setData] = useState(null);

useEffect(() => {
API.get("/user/profile")
.then(res => setData(res.data))
.catch(err => console.error(err));
}, []);

if (!data) {
return ( <div className="flex justify-center items-center h-[70vh] text-gray-500 text-lg">
Loading your profile... </div>
);
}

return ( <div className="max-w-5xl mx-auto p-6">

  {/* HEADER CARD */}
  <div className="bg-white shadow-md rounded-xl p-6 mb-6 border">
    <h2 className="text-3xl font-bold text-gray-800">
      {data.username}
    </h2>

    <div className="mt-4">
      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
        Solved {data.solvedCount} problems
      </span>
    </div>
  </div>

  {/* GRID SECTION */}
  <div className="grid md:grid-cols-2 gap-6">

    {/* SOLVED PROBLEMS */}
    <div className="bg-white shadow-md rounded-xl p-5 border">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        ✅ Solved Problems
      </h3>

      {data.solvedProblems.length === 0 ? (
        <p className="text-gray-500 text-sm">No problems solved yet.</p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {data.solvedProblems.map((p) => (
            <li
              key={p._id}
              className="p-2 rounded hover:bg-gray-50 text-blue-600 cursor-pointer"
            >
              {p.title}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* SUBMISSIONS */}
    <div className="bg-white shadow-md rounded-xl p-5 border">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        🧾 Recent Submissions
      </h3>

      {data.submissions.length === 0 ? (
        <p className="text-gray-500 text-sm">No submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {data.submissions
            .slice(-5)
            .reverse()
            .map((s, i) => (
              <div
                key={i}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p
                    className={`font-medium ${
                      s.status === "Accepted"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {s.status}
                  </p>
                  <p className="text-sm text-gray-500">
                    {s.problemId?.title}
                  </p>
                </div>

                <p className="text-xs text-gray-400">
                  {new Date(s.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>

  </div>
</div>
);
}
