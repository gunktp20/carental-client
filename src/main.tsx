import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import "./index.css";
import "./App.css";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HandlerNotFound from "./pages/HandlerNotFound";
import ProtectedRoute from "./pages/ProtectedRoute/index.tsx";
import User from "./pages/User/index.tsx";
import SharedLayout from "./pages/SharedLayout/index.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//         <SharedLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <Landing /> },
//       { path: "product", element: <ProductList /> },
//       { path: "product/:product_id", element: <ProductDetail /> },
//       { path: "cart", element: <Cart /> },
//     ],
//   },
//   {
//     path: "/admin",
//     element: (
//       <RequireAdmin>
//         <SharedLayout />
//       </RequireAdmin>
//     ),
//     children: [
//       { index: true, element: <ManageProduct /> },
//       { path: "add-product", element: <AddProduct /> },
//       { path: "product/:productID", element: <EditProduct /> },
//     ],
//   },
//   {
//     path: "/register",
//     element: (
//       <HandlerDirect>
//         <Register />
//       </HandlerDirect>
//     ),
//   },
//   {
//     path: "/login",
//     element: (
//       <HandlerDirect>
//         <Login />
//       </HandlerDirect>
//     ),
//   },
//   { path: "/home", element: <Landing /> },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <SharedLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Landing /> },
      { path: "user", element: <User /> },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/home", element: <Landing /> },
  {
    path: "*",
    element: <HandlerNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
