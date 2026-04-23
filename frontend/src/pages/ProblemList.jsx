import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/problems").then(res => setProblems(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🚀 Problems
      </h2>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Difficulty</th>
            </tr>
          </thead>

          <tbody>
            {problems.map((p) => (
              <tr
                key={p._id}
                onClick={() => navigate(`/problem/${p._id}`)}
                className="cursor-pointer border-t hover:bg-gray-100 transition"
              >
                <td className="p-4 font-medium text-blue-600">
                  {p.title}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      p.difficulty === "easy"
                        ? "bg-green-500"
                        : p.difficulty === "medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {p.difficulty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}