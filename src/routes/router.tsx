import ErrorView from "@/views/error-view";
import Layout from "@/views/layout";
import Onboarding from "@/views/onboarding";
import { createBrowserRouter } from "react-router-dom";
import { appRoutes } from "./app.routes";
import { publicRoutes } from "./public.routes";
import AuthLayout from "@/layouts/auth-layout";
import PublicLayout from "@/layouts/public-layout";
import { authRoutes } from "./auth.routes";
import Protected from "@/layouts/protected";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
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
    // Sits outside /app so the sidebar shell never wraps the setup flow.
    path: "/onboarding",
    element: (
      <Protected skipOnboardingGate>
        <Onboarding />
      </Protected>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: authRoutes,
  },
]);
