import { LoginForm } from "@/components/login-form";

const Login = () => {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen px-4 sm:px-6">
      <LoginForm className="w-full max-w-[550px]" />
    </div>
  );
};

export default Login;
