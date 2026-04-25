import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

export default function AdminRoute({ children }) {
  const [auth, setAuth] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    API.get("/user/profile")
      .then((res) => {
        if (res.data.role === "admin") {
          setAuth(true);
          setIsAdmin(true);
        } else {
          setAuth(true);
          setIsAdmin(false);
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setAuth(false);
        } else {
          console.error(err);
        }
      });
  }, []);

  if (auth === null) return <div>Loading...</div>;

  if (!auth) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
}
