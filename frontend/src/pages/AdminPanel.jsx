import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CreateProblem from "../components/CreateProblem";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await API.get("/user/profile");
        if (res.data.role !== "admin") {
          navigate("/");
        }
        setUserRole(res.data.role);
      } catch (err) {
        navigate("/login");
      }
    };

    checkAdmin();
  }, [navigate]);

  // Fetch problems
  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/problems?page=${page}&limit=20`);
        setProblems(res.data.problems);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userRole === "admin") {
      fetchProblems();
    }
  }, [page, userRole]);

  const handleDeleteProblem = async (problemId) => {
    if (window.confirm("Are you sure you want to delete this problem?")) {
      try {
        await API.delete(`/problems/${problemId}`);
        setProblems(problems.filter((p) => p._id !== problemId));
        alert("Problem deleted successfully!");
      } catch (err) {
        alert("Failed to delete problem");
        console.error(err);
      }
    }
  };

  const handleProblemCreated = (newProblem) => {
    setProblems([newProblem, ...problems]);
    setShowCreateForm(false);
  };

  if (userRole === null) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen p-6 bg-gray-50">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">🛠️ Admin Dashboard</h2>
        <p className="text-gray-600">Manage problems and test cases</p>
      </div>

      {/* ACTION BUTTON */}
      <div className="mb-6">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {showCreateForm ? "❌ Cancel" : "➕ Add New Problem"}
        </button>
      </div>

      {/* CREATE PROBLEM FORM */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200">
          <CreateProblem onSuccess={handleProblemCreated} />
        </div>
      )}

      {/* PROBLEMS TABLE */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Difficulty</th>
              <th className="px-6 py-4 text-left">Topics</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  Loading problems...
                </td>
              </tr>
            ) : problems.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No problems found. Create your first one!
                </td>
              </tr>
            ) : (
              problems.map((problem) => (
                <tr key={problem._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{problem.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        problem.difficulty === "easy"
                          ? "bg-green-100 text-green-700"
                          : problem.difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {Array.isArray(problem.topics) ? problem.topics.join(", ") : problem.topics}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteProblem(problem._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition text-sm"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
