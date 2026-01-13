import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const {
    signup,
    initiateGoogleAuth,
    isLoading,
    error,
    clearError,
    accountLinkPrompt,
    clearAccountLinkPrompt,
  } = useAuthStore();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    linkAccount?: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setValidationError("");

    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    try {
      await signup({
        email,
        password,
        username,
        firstname,
        lastname,
        linkAccount,
      });
      navigate("/app/dashboard");
    } catch {
      // Error is handled by the store
    }
  };

  const handleLinkAccount = async () => {
    try {
      await signup({
        email,
        password,
        username,
        firstname,
        lastname,
        linkAccount: true,
      });
      navigate("/app/dashboard");
    } catch {
      // Error is handled by the store
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await initiateGoogleAuth();
    } catch {
      // Error is handled by the store
    }
  };

  const displayError = validationError || error;

  // Account linking dialog
  if (accountLinkPrompt) {
    return (
      <Card {...props}>
        <CardHeader>
          <CardTitle>Account Found</CardTitle>
          <CardDescription>
            An account with this email already exists
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {accountLinkPrompt.prompt}
            </p>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm font-medium mb-1">Existing apps:</p>
              <div className="flex gap-2 flex-wrap">
                {accountLinkPrompt.existingApps.map((app) => (
                  <span
                    key={app}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded capitalize"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
            {displayError && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {displayError}
              </div>
            )}
            <div className="space-y-2">
              <Button
                onClick={handleLinkAccount}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Linking..." : "Link Accounts (Use Same Password)"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  clearAccountLinkPrompt();
                  clearError();
                }}
                disabled={isLoading}
                className="w-full"
              >
                Use Different Email
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Linking accounts means you&apos;ll use the same password across
              all apps.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FieldGroup>
            {displayError && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {displayError}
                <button
                  type="button"
                  onClick={() => {
                    setValidationError("");
                    clearError();
                  }}
                  className="ml-2 underline"
                >
                  Dismiss
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="John"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  disabled={isLoading}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Doe"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  disabled={isLoading}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </Field>
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
              <FieldDescription>
                We&apos;ll use this to contact you.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </Field>
            <Field>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={handleGoogleSignup}
                disabled={isLoading}
              >
                Sign up with Google
              </Button>
              <FieldDescription className="px-6 text-center">
                Already have an account? <a href="#/auth/login">Sign in</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
