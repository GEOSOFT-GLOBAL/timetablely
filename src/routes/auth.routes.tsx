import Login from "@/auth/login";
import Signup from "@/auth/signup";
import ForgotPassword from "@/auth/forgot-password";

export const authRoutes = [
    {
        path: "login",
        element: <Login/>
    },
    {
        path: "signup",
        element: <Signup/>
    },
    {
        path: "forgot-password",
        element: <ForgotPassword/>
    },
]