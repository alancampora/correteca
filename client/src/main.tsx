import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/index.tsx";
import Login from "./pages/login/index.tsx";
import Singup from "./pages/singup/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Singup />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
