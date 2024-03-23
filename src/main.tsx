import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./pages";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
