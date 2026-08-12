import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthAlert } from "@/components/auth/auth-alert";
import { PasswordStrength } from "@/components/auth/password-strength";
import { MIN_PASSWORD_LENGTH, isPasswordAcceptable } from "@/lib/password";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const REDIRECT_DELAY_MS = 3000;

interface ResetPasswordFormProps {
  token: string;
  className?: string;
}

export function ResetPasswordForm({ token, className }: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /**
   * On success, hand off to the login page with a flag so it can confirm the
   * reset. Uses the router rather than a full page load, and the timer is
   * cleaned up so an unmount cannot navigate afterwards.
   */
  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(
      () => navigate("/auth/login?reset=success"),
      REDIRECT_DELAY_MS
    );
    return () => clearTimeout(timer);
  }, [success, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!isPasswordAcceptable(password)) {
      setError(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("The two passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const { data: res } = await axios.post(
        `${API_BASE}/auth/reset-password`,
        { token, password },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000, // 10 second timeout
        }
      );

      if (!res.success) {
        throw new Error(res.message || "Failed to reset password");
      }

      setSuccess(true);
    } catch (err: unknown) {
      let message = "Failed to reset password. Please try again.";

      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED" || err.code === "ERR_NETWORK") {
          message =
            "Network error. Please check your connection and try again.";
        } else if (err.response?.status === 400) {
          // Invalid or expired token
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
      <AuthShell
        className={className}
        title="Password updated"
        description="You can now log in with your new password."
      >
        <div className="flex flex-col gap-5">
          <AuthAlert variant="success">
            Taking you to the login page…
          </AuthAlert>
          <Button asChild className="w-full">
            <Link to="/auth/login?reset=success">Go to login</Link>
          </Button>
        </div>
      </AuthShell>
    );
  }

  const mismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <AuthShell
      className={className}
      title="Set a new password"
      description="Choose something you have not used on this account before."
      footer={
        <>
          Remembered it?{" "}
          <Link
            to="/auth/login"
            className="text-foreground font-medium underline underline-offset-4"
          >
            Back to log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          {error ? (
            <AuthAlert onDismiss={() => setError("")}>{error}</AuthAlert>
          ) : null}

          <Field>
            <FieldLabel htmlFor="password">New password</FieldLabel>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Enter a new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              autoFocus
            />
            <PasswordStrength password={password} />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Repeat the new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            {mismatch ? (
              <FieldDescription className="text-destructive">
                Passwords do not match.
              </FieldDescription>
            ) : null}
          </Field>

          <Field>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Spinner /> : null}
              {isLoading ? "Updating…" : "Update password"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </AuthShell>
  );
}
