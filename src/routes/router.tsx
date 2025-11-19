import ErrorView from "@/views/error-view";
import Layout from "@/views/layout";
import { createHashRouter } from "react-router-dom";
import { appRoutes } from "./app.routes";
import { publicRoutes } from "./public.routes";
import AuthLayout from "@/layouts/auth-layout";
import { authRoutes } from "./auth.routes";
import Protected from "@/layouts/protected";

export const routes = createHashRouter([
  {
    path: "/",
    errorElement: <ErrorView />,
    children: [...publicRoutes],
  },
  {
    path: "/app",
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
