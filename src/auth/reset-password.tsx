import { ResetPasswordForm } from "@/components/reset-password-form";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extract token from URL query parameters
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const tokenParam = urlParams.get('token');
    
    setToken(tokenParam);
    setIsLoading(false);
  }, []);

  // Show loading state while extracting token
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen min-h-screen px-4 sm:px-6 py-8">
        <div className="w-full max-w-[550px]">
          <Card>
            <CardContent className="px-4 sm:px-6 py-8">
              <div className="text-center text-gray-600">Loading...</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Handle missing token scenario
  if (!token) {
    return (
      <div className="flex items-center justify-center w-screen min-h-screen px-4 sm:px-6 py-8">
        <div className="w-full max-w-[550px]">
          <Card>
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl">Invalid reset link</CardTitle>
              <CardDescription className="text-sm">
                This password reset link is invalid or incomplete
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  The password reset link you followed is missing required information.
                  Please check your email and click the reset link again, or request a new password reset.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    onClick={() => window.location.href = "/#/auth/forgot-password"}
                    className="flex-1"
                  >
                    Request new reset link
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.location.href = "/#/auth/login"}
                    className="flex-1"
                  >
                    Back to login
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Render ResetPasswordForm with token
  return (
    <div className="flex items-center justify-center w-screen min-h-screen px-4 sm:px-6 py-8">
      <ResetPasswordForm token={token} className="w-full max-w-[550px]" />
    </div>
  );
};

export default ResetPassword;
