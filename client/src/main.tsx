import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/index.tsx";
import Login from "./pages/login/index.tsx";
import Singup from "./pages/singup/index.tsx";
import { AuthProvider } from "./context/auth.tsx";
import Landing from "./pages/landing/index.tsx";
import Profile from "./pages/profile/index.tsx";
import ProtectedRoute from "./components/protected-route.tsx";
import TrainingsPage from "./pages/trainings/index.tsx";
import NewTrainingPage from "./pages/trainings/new/index.tsx";
import EditTrainingPage from "./pages/trainings/edit/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Singup />,
  },
  {
    path: "/trainings",
    element: (
      <ProtectedRoute>
        <TrainingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/trainings/new",
    element: (
      <ProtectedRoute>
        <NewTrainingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/trainings/edit/:id",
    element: (
      <ProtectedRoute>
        <EditTrainingPage />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </GoogleOAuthProvider>,
);
