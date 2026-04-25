import { useEffect, useState } from "react";
import API from "../services/api";
import ProblemTable from "../components/ProblemTable";

export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch topics
  useEffect(() => {
    API.get("/topics")
      .then((res) => setTopics(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch problems
  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const url = topic
          ? `/problems?topic=${topic}&page=${page}&limit=15`
          : `/problems?page=${page}&limit=15`;

        const res = await API.get(url);

        setProblems(res.data.problems);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [topic, page]);

  return (
    <div className="max-w-5xl mx-auto min-h-screen p-6 bg-gray-50 text-gray-800">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">🚀 Problems</h2>

      {/* FILTER */}
      <div className="mb-6 flex gap-3 flex-wrap">
        <button
          onClick={() => setTopic("")}
          className={`px-3 py-1 rounded border ${
            topic === ""
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          All
        </button>

        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={`px-3 py-1 rounded border ${
              topic === t
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <ProblemTable problems={problems} loading={loading} />

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}