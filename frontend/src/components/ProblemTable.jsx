import { useNavigate } from "react-router-dom";

export default function ProblemTable({ problems, loading }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Difficulty</th>
            <th className="p-4">Topics</th>
          </tr>
        </thead>

        <tbody>
          {/* LOADING */}
          {loading && (
            <tr>
              <td colSpan="3" className="text-center p-6 text-gray-500">
                Loading problems...
              </td>
            </tr>
          )}

          {/* EMPTY STATE */}
          {!loading && problems.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-6 text-gray-500">
                🚫 No problems found for this topic
              </td>
            </tr>
          )}

          {/* DATA */}
          {!loading &&
            problems.map((p) => (
              <tr
                key={p._id}
                onClick={() => navigate(`/problem/${p._id}`)}
                className="cursor-pointer border-t hover:bg-gray-50 transition"
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

                <td className="p-4 text-sm text-gray-500">
                  {p.topics?.join(", ")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}