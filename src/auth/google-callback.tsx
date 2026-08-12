import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthAlert } from "@/components/auth/auth-alert";
import { useAuthStore } from "@/store/authStore";

const SUCCESS_REDIRECT_MS = 2000;
const ERROR_REDIRECT_MS = 5000;

type Status = "loading" | "success" | "error";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleGoogleCallback, clearError } = useAuthStore();
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const processedRef = useRef(false);

  useEffect(() => {
    const processGoogleCallback = async () => {
      // Guard first, so React Strict Mode's double effect cannot spend the
      // single-use authorization code twice.
      if (processedRef.current) return;
      processedRef.current = true;

      try {
        const code = searchParams.get("code");
        const oauthError = searchParams.get("error");
        const state = searchParams.get("state");

        if (oauthError) {
          throw new Error(`Google returned an error: ${oauthError}`);
        }
        if (!code) {
          throw new Error("No authorization code was received from Google.");
        }

        await handleGoogleCallback(code, state || undefined);
        setStatus("success");
      } catch (err: unknown) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during authentication."
        );
      }
    };

    processGoogleCallback();
  }, [searchParams, handleGoogleCallback]);

  // Clear any previous errors when the screen mounts.
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Redirect once settled, with the timer cleaned up on unmount so a manual
  // click cannot race the automatic navigation.
  useEffect(() => {
    if (status === "loading") return;

    const timer = setTimeout(
      () => navigate(status === "success" ? "/app/dashboard" : "/auth/login"),
      status === "success" ? SUCCESS_REDIRECT_MS : ERROR_REDIRECT_MS
    );
    return () => clearTimeout(timer);
  }, [status, navigate]);

  if (status === "loading") {
    return (
      <AuthShell
        title="Signing you in"
        description="Finishing your Google authentication — this only takes a moment."
      >
        <div className="flex flex-col items-center gap-4 py-6">
          <Loader2 className="text-primary size-10 animate-spin" />
          <p className="text-muted-foreground text-sm">
            Verifying with Google…
          </p>
        </div>
      </AuthShell>
    );
  }

  if (status === "success") {
    return (
      <AuthShell
        title="You are signed in"
        description="Taking you to your dashboard."
      >
        <div className="flex flex-col items-center gap-5 py-2">
          <CheckCircle2 className="size-10 text-emerald-500" />
          <Button onClick={() => navigate("/app/dashboard")} className="w-full">
            Go to dashboard
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="We could not sign you in"
      description="Google authentication did not complete."
      footer={
        <>
          Need a hand?{" "}
          <Link
            to="/contact"
            className="text-foreground font-medium underline underline-offset-4"
          >
            Contact support
          </Link>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <div className="flex justify-center">
          <XCircle className="text-destructive size-10" />
        </div>

        <AuthAlert>{errorMessage}</AuthAlert>

        <p className="text-muted-foreground text-center text-sm">
          Returning you to the login page shortly.
        </p>

        <Button
          variant="outline"
          onClick={() => navigate("/auth/login")}
          className="w-full"
        >
          Back to log in
        </Button>
      </div>
    </AuthShell>
  );
};

export default GoogleCallback;
