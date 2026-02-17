import { ForgotPasswordForm } from "@/components/forgot-password-form";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen px-4 sm:px-6 py-8">
      <ForgotPasswordForm className="w-full max-w-[550px]" />
    </div>
  );
};

export default ForgotPassword;
