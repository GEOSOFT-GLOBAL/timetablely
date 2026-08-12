import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthAlert } from "@/components/auth/auth-alert";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const APP_SOURCE = "timetablely";

export function ForgotPasswordForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);

  const requestReset = async () => {
    setError("");
    setIsLoading(true);

    try {
      const { data: res } = await axios.post(
        `${API_BASE}/auth/forgot-password`,
        { email, appSource: APP_SOURCE },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000, // 10 second timeout
        }
      );

      if (!res.success) {
        throw new Error(res.message || "Failed to send reset email");
      }

      setIsSubmitted(true);
      return true;
    } catch (err: unknown) {
      let message = "Failed to send reset email. Please try again.";

      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED" || err.code === "ERR_NETWORK") {
          message =
            "Network error. Please check your connection and try again.";
        } else if (err.response?.data?.message) {
          message = err.response.data.message;
        } else if (err.message) {
          message = err.message;
        }
      }

      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await requestReset();
  };

  const handleResend = async () => {
    setResent(false);
    const ok = await requestReset();
    if (ok) setResent(true);
  };

  const loginFooter = (
    <>
      Remembered it?{" "}
      <Link
        to="/auth/login"
        className="text-foreground font-medium underline underline-offset-4"
      >
        Back to log in
      </Link>
    </>
  );

  if (isSubmitted) {
    return (
      <AuthShell
        className={className}
        title="Check your email"
        description={
          <>
            If an account exists for <strong>{email}</strong>, we have sent it a
            link to reset the password. The link expires in one hour.
          </>
        }
        footer={loginFooter}
      >
        <div className="flex flex-col gap-5">
          <div className="bg-muted/50 flex items-start gap-3 border p-4">
            <MailCheck className="text-primary mt-0.5 size-5 shrink-0" />
            <p className="text-muted-foreground text-sm">
              Nothing after a minute or two? Check your spam folder before
              trying again — repeated requests invalidate the earlier link.
            </p>
          </div>

          {error ? (
            <AuthAlert onDismiss={() => setError("")}>{error}</AuthAlert>
          ) : null}

          {resent ? (
            <AuthAlert variant="success">
              Sent again. Use the most recent email.
            </AuthAlert>
          ) : null}

          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleResend}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? <Spinner /> : null}
              Resend the email
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsSubmitted(false);
                setResent(false);
                setError("");
              }}
              className="w-full"
            >
              Use a different email
            </Button>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      className={className}
      title="Reset your password"
      description="Enter the email you signed up with and we will send you a reset link."
      footer={loginFooter}
    >
      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          {error ? (
            <AuthAlert onDismiss={() => setError("")}>{error}</AuthAlert>
          ) : null}

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <FieldDescription>
              We will only send a link if this address has an account.
            </FieldDescription>
          </Field>

          <Field>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Spinner /> : null}
              {isLoading ? "Sending…" : "Send reset link"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </AuthShell>
  );
}
