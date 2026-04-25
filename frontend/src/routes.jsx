import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export const appRoutes = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <ProblemList /> },
      { path: "/problem/:id", element: <ProblemDetail /> },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];