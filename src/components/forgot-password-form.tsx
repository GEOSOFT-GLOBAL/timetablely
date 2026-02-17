import { cn } from "@/lib/utils";
import { useState } from "react";
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
const APP_SOURCE = "timetablely";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setError("");
    setIsLoading(true);

    try {
      const { data: res } = await axios.post(
        `${API_BASE}/auth/forgot-password`,
        {
          email,
          appSource: APP_SOURCE,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        },
      );

      if (!res.success) {
        throw new Error(res.message || "Failed to send reset email");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      let message = "Failed to send reset email. Please try again.";

      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED" || err.code === "ERR_NETWORK") {
          message = "Network error. Please check your connection and try again.";
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

  if (isSubmitted) {
    return (
      <div className={cn("flex flex-col w-full max-w-[550px] gap-6", className)} {...props}>
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl">Check your email</CardTitle>
            <CardDescription className="text-sm">
              We've sent a password reset link to {email}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <FieldGroup>
              <Field>
                <Button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Try another email
                </Button>
                <FieldDescription className="text-center text-xs sm:text-sm">
                  Remember your password?{" "}
                  <a href="/#/auth/login" className="underline">Login</a>
                </FieldDescription>
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
          <CardTitle className="text-xl sm:text-2xl">Reset your password</CardTitle>
          <CardDescription className="text-sm">
            Enter your email address and we'll send you a link to reset your password
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
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Sending..." : "Send reset link"}
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
