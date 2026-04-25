import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    API.get("/user/profile")
      .then((res) => {
        setLoggedIn(true);
        setUserRole(res.data.role);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setLoggedIn(false);
        } else {
          console.error(err);
        }
      });
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      setLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-400 cursor-pointer"
        >
          CodeX
        </h1>

        {/* NAV LINKS */}
        <div className="space-x-6 flex items-center">

          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-400"
          >
            Problems
          </button>

          {/* ADMIN DASHBOARD */}
          {loggedIn && userRole === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="hover:text-yellow-400 font-semibold"
            >
              🛠️ Admin Dashboard
            </button>
          )}

          {/* <button
            onClick={() => navigate("/about")}
            className="hover:text-blue-400"
          >
            About
          </button> */}

          {/* AUTH SECTION */}
          {!loggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hover:text-blue-400"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="hover:text-blue-400"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}