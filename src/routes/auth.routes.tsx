import Login from "@/auth/login";
import Signup from "@/auth/signup";
import ForgotPassword from "@/auth/forgot-password";
import ResetPassword from "@/auth/reset-password";
import GoogleCallback from "@/auth/google-callback";

export const authRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "google/callback",
    element: <GoogleCallback />,
  },
];
