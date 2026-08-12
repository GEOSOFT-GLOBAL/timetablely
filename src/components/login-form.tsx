import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthAlert } from "@/components/auth/auth-alert";
import { GoogleButton } from "@/components/auth/google-button";
import { useAuthStore } from "@/store/authStore";

export function LoginForm({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signin, initiateGoogleAuth, isLoading, error, clearError } =
    useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Tracks which button triggered the load, so only that one shows a spinner.
  const [pending, setPending] = useState<"credentials" | "google" | null>(null);

  /** Set when a guarded route bounced the visitor here. */
  const redirectTo = searchParams.get("next") ?? "/app/dashboard";
  const justReset = searchParams.get("reset") === "success";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending("credentials");
    try {
      await signin(email, password);
      navigate(redirectTo);
    } catch {
      // The store holds the message; the banner below renders it.
    } finally {
      setPending(null);
    }
  };

  const handleGoogleLogin = async () => {
    setPending("google");
    try {
      await initiateGoogleAuth();
    } catch {
      // Error is handled by the store
    } finally {
      setPending(null);
    }
  };

  return (
    <AuthShell
      className={className}
      title="Welcome back"
      description="Log in to pick up where your schedule left off."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to="/auth/signup"
            className="text-foreground font-medium underline underline-offset-4"
          >
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          {justReset ? (
            <AuthAlert variant="success">
              Your password has been reset. Log in with your new password.
            </AuthAlert>
          ) : null}

          {error ? (
            <AuthAlert onDismiss={clearError}>{error}</AuthAlert>
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
          </Field>

          <Field>
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                to="/auth/forgot-password"
                className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </Field>

          <Field>
            <Button type="submit" disabled={isLoading} className="w-full">
              {pending === "credentials" ? <Spinner /> : null}
              {pending === "credentials" ? "Logging in…" : "Log in"}
            </Button>
          </Field>

          <div className="flex items-center gap-3">
            <span className="bg-border h-px flex-1" />
            <span className="text-muted-foreground text-xs uppercase tracking-wider">
              or
            </span>
            <span className="bg-border h-px flex-1" />
          </div>

          <GoogleButton
            onClick={handleGoogleLogin}
            disabled={isLoading}
            loading={pending === "google"}
            label="Log in with Google"
          />
        </FieldGroup>
      </form>
    </AuthShell>
  );
}
