import ErrorView from "@/views/error-view";
import Layout from "@/views/layout";
import { createHashRouter } from "react-router-dom";
import { appRoutes } from "./app.routes";
import AuthLayout from "@/layouts/auth-layout";
import { authRoutes } from "./auth.routes";
import Protected from "@/layouts/protected";

export const routes = createHashRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Layout />
      </Protected>
    ),
    errorElement: <ErrorView />,
    children: [...appRoutes],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: authRoutes,
  },
]);
