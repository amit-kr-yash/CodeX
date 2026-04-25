import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

export default function PrivateRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    API.get("/user/profile")
        .then(() => setAuth(true))
        .catch((err) => {
        if (err.response?.status === 401) {
            setAuth(false); // expected
        } else {
            console.error(err);
        }
        });
    }, []);

  if (auth === null) return <div>Loading...</div>;

  return auth ? children : <Navigate to="/login" />;
}