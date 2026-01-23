import { Outlet } from "react-router-dom";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
      <BackgroundRippleEffect />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
