import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleGoogleCallback, isLoading, error, clearError } = useAuthStore();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const processedRef = useRef(false);

  useEffect(() => {
    const processGoogleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const error = searchParams.get("error");
        const state = searchParams.get("state");

        if (error) {
          throw new Error(`Google OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error("No authorization code received from Google");
        }

        // Prevent double execution in React Strict Mode
        if (processedRef.current) return;
        processedRef.current = true;

        // Use the auth store to handle the callback with state validation
        await handleGoogleCallback(code, state || undefined);

        setStatus("success");

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate("/app/dashboard");
        }, 2000);
      } catch (error: any) {
        console.error("Google callback error:", error);
        setStatus("error");
        setErrorMessage(error.message || "An unexpected error occurred during authentication");

        // Redirect to login after 5 seconds on error
        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
      }
    };

    processGoogleCallback();
  }, [searchParams, navigate, handleGoogleCallback]);

  // Clear any previous errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <div className="flex items-center justify-center w-screen min-h-screen px-4 sm:px-6 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Google Authentication</CardTitle>
          <CardDescription className="text-center">
            Processing your Google authentication...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Authenticating with Google...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <p className="text-lg font-medium">Authentication Successful!</p>
              <p className="text-muted-foreground text-center">
                You have been successfully authenticated with Google. Redirecting to dashboard...
              </p>
              <Button onClick={() => navigate("/app/dashboard")} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <XCircle className="h-12 w-12 text-red-500" />
              <p className="text-lg font-medium text-red-600">Authentication Failed</p>
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
              <p className="text-muted-foreground text-center">
                You will be redirected to the login page shortly.
              </p>
              <Button onClick={() => navigate("/auth/login")} variant="outline" className="w-full">
                Go to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleCallback;