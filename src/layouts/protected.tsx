import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useDatabaseStore } from "@/store/databaseStore";
import { useOnboardingStore } from "@/store/onboardingStore";

interface ProtectedProps {
  children: React.ReactNode;
  /**
   * Set on the onboarding route itself, so it can be protected without
   * redirecting to itself.
   */
  skipOnboardingGate?: boolean;
}

const Protected: React.FC<ProtectedProps> = ({
  children,
  skipOnboardingGate = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const isAuthenticated = Boolean(token);

  const onboardingCompleted = useOnboardingStore((state) => state.completed);
  const dismissOnboarding = useOnboardingStore((state) => state.dismiss);
  const database = useDatabaseStore((state) => state.database);

  // Someone who already has records predates this flow — mark them done
  // rather than interrupting them with a setup wizard.
  const hasExistingData =
    database.tutors.length > 0 ||
    database.courses.length > 0 ||
    database.sessions.length > 0;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login", {
        replace: true,
        state: { from: location.pathname },
      });
      return;
    }

    if (skipOnboardingGate || onboardingCompleted) return;

    if (hasExistingData) {
      dismissOnboarding();
      return;
    }

    navigate("/onboarding", { replace: true });
  }, [
    isAuthenticated,
    navigate,
    location.pathname,
    skipOnboardingGate,
    onboardingCompleted,
    hasExistingData,
    dismissOnboarding,
  ]);

  if (!isAuthenticated) {
    return null;
  }

  // Hold the app shell back while the onboarding redirect resolves, so the
  // dashboard does not flash behind it.
  if (!skipOnboardingGate && !onboardingCompleted && !hasExistingData) {
    return null;
  }

  return <>{children}</>;
};

export default Protected;
