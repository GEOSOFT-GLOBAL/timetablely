import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

interface ResetPasswordFormProps extends React.ComponentProps<"div"> {
  token: string;
  className?: string;
}

interface PasswordStrength {
  score: number; // 0-4
  label: string;
  color: string;
}

function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  
  if (password.length === 0) {
    return { score: 0, label: "", color: "" };
  }
  
  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  
  // Character variety checks
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  // Map score to strength
  if (score <= 1) {
    return { score: 1, label: "Weak", color: "bg-red-500" };
  } else if (score === 2) {
    return { score: 2, label: "Fair", color: "bg-orange-500" };
  } else if (score === 3) {
    return { score: 3, label: "Good", color: "bg-yellow-500" };
  } else {
    return { score: 4, label: "Strong", color: "bg-green-500" };
  }
}

export function ResetPasswordForm({
  token,
  className,
  ...props
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: "",
    color: "",
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Calculate password strength on password change
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  // Client-side validation
  const validatePassword = (): boolean => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setError("");
    setValidationErrors([]);

    // Client-side validation
    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);

    try {
      const { data: res } = await axios.post(
        `${API_BASE}/auth/reset-password`,
        {
          token,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        },
      );

      if (!res.success) {
        throw new Error(res.message || "Failed to reset password");
      }

      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        window.location.href = "/#/auth/login";
      }, 3000);
    } catch (err: unknown) {
      let message = "Failed to reset password. Please try again.";

      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED" || err.code === "ERR_NETWORK") {
          message = "Network error. Please check your connection and try again.";
        } else if (err.response?.status === 400) {
          // Handle invalid/expired token
          const errorMsg = err.response.data?.message || "";
          if (errorMsg.toLowerCase().includes("expired")) {
            message = "This reset link has expired. Please request a new one.";
          } else if (errorMsg.toLowerCase().includes("invalid")) {
            message = "This reset link is invalid or has expired.";
          } else {
            message = errorMsg || message;
          }
        } else if (err.response?.data?.message) {
          message = err.response.data.message;
        } else if (err.message) {
          message = err.message;
        }
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className={cn("flex flex-col w-full max-w-[550px] gap-6", className)} {...props}>
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl">Password reset successful</CardTitle>
            <CardDescription className="text-sm">
              Your password has been successfully reset
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <FieldGroup>
              <div className="p-3 text-sm text-green-700 bg-green-50 rounded-md">
                Redirecting to login page...
              </div>
              <Field>
                <Button
                  type="button"
                  onClick={() => window.location.href = "/#/auth/login"}
                  className="w-full"
                >
                  Go to login
                </Button>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col w-full max-w-[550px] gap-6", className)} {...props}>
      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl">Set new password</CardTitle>
          <CardDescription className="text-sm">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  {error}
                  <button
                    type="button"
                    onClick={() => setError("")}
                    className="ml-2 underline"
                  >
                    Dismiss
                  </button>
                </div>
              )}
              
              {validationErrors.length > 0 && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                  <ul className="list-disc list-inside">
                    {validationErrors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="password">New Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                />
                
                {/* Password strength indicator */}
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full transition-all duration-300",
                            passwordStrength.color
                          )}
                          style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {passwordStrength.label}
                      </span>
                    </div>
                    <FieldDescription className="text-xs">
                      Use at least 8 characters with a mix of letters, numbers, and symbols
                    </FieldDescription>
                  </div>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                />
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Resetting password..." : "Reset password"}
                </Button>
                <FieldDescription className="text-center text-xs sm:text-sm">
                  Remember your password?{" "}
                  <a href="/#/auth/login" className="underline">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
