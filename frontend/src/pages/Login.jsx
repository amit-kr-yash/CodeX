import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/login", form);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>

        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 text-gray-900"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold shadow-md"
        >
          Login
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure login powered by your backend
        </p>
      </form>
    </div>
  );
}