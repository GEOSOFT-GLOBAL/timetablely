import { SignupForm } from "@/components/signup-form";

const Signup = () => {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen px-4 sm:px-6 py-8">
      <SignupForm className="w-full max-w-[550px]" />
    </div>
  );
};

export default Signup;
