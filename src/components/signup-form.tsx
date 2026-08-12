import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Spinner } from "@/components/ui/spinner";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthAlert } from "@/components/auth/auth-alert";
import { GoogleButton } from "@/components/auth/google-button";
import { PasswordStrength } from "@/components/auth/password-strength";
import { MIN_PASSWORD_LENGTH, isPasswordAcceptable } from "@/lib/password";
import { useAuthStore } from "@/store/authStore";

const STEPS = [
  { step: 1, title: "Details" },
  { step: 2, title: "Email" },
  { step: 3, title: "Password" },
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupForm({ className }: { className?: string }) {
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
  const [currentStep, setCurrentStep] = useState(1);
  const [pending, setPending] = useState<"credentials" | "google" | null>(null);

  const displayError = validationError || error;

  const dismissError = () => {
    setValidationError("");
    clearError();
  };

  /** Returns true when the current step's fields are usable. */
  const validateStep = (step: number) => {
    if (step === 1) {
      if (!firstname.trim() || !lastname.trim() || !username.trim()) {
        setValidationError("Please fill in your name and a username.");
        return false;
      }
    }
    if (step === 2) {
      if (!email.trim()) {
        setValidationError("Please enter your email address.");
        return false;
      }
      if (!EMAIL_PATTERN.test(email)) {
        setValidationError("That email address does not look right.");
        return false;
      }
    }
    return true;
  };

  const goNext = () => {
    setValidationError("");
    if (!validateStep(currentStep)) return;
    setCurrentStep((step) => Math.min(step + 1, STEPS.length));
  };

  const goBack = () => {
    setValidationError("");
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  const createAccount = async (linkAccount?: boolean) => {
    setPending("credentials");
    try {
      await signup({
        email,
        password,
        username,
        firstname,
        lastname,
        ...(linkAccount ? { linkAccount: true } : {}),
      });
      navigate("/app/dashboard");
    } catch {
      // Error is handled by the store
    } finally {
      setPending(null);
    }
  };

  /**
   * One submit handler for all three steps: pressing Enter on an early step
   * advances instead of submitting a half-filled account.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    if (currentStep < STEPS.length) {
      goNext();
      return;
    }

    if (!isPasswordAcceptable(password)) {
      setValidationError(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
      return;
    }
    if (password !== confirmPassword) {
      setValidationError("The two passwords do not match.");
      return;
    }

    await createAccount();
  };

  const handleGoogleSignup = async () => {
    setPending("google");
    try {
      await initiateGoogleAuth();
    } catch {
      // Error is handled by the store
    } finally {
      setPending(null);
    }
  };

  const signInFooter = (
    <>
      Already have an account?{" "}
      <Link
        to="/auth/login"
        className="text-foreground font-medium underline underline-offset-4"
      >
        Log in
      </Link>
    </>
  );

  // The API reports that this email already has an account on another app in
  // the suite, and offers to link them.
  if (accountLinkPrompt) {
    return (
      <AuthShell
        className={className}
        title="You already have an account"
        description={accountLinkPrompt.prompt}
        footer={signInFooter}
      >
        <div className="flex flex-col gap-5">
          <div className="bg-muted/50 flex flex-col gap-2 border p-4">
            <p className="text-sm font-medium">Already used on</p>
            <div className="flex flex-wrap gap-2">
              {accountLinkPrompt.existingApps.map((app) => (
                <span
                  key={app}
                  className="bg-primary/10 text-primary px-2 py-1 text-xs capitalize"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          {displayError ? (
            <AuthAlert onDismiss={dismissError}>{displayError}</AuthAlert>
          ) : null}

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => createAccount(true)}
              disabled={isLoading}
              className="w-full"
            >
              {pending === "credentials" ? <Spinner /> : null}
              Link my accounts
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
              Use a different email
            </Button>
          </div>

          <p className="text-muted-foreground text-xs">
            Linking means the same password signs you in to every app in the
            suite.
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      className={className}
      title="Create your account"
      description="Free to start. No credit card required."
      footer={signInFooter}
    >
      <div className="flex flex-col gap-6">
        {/* Offered before the form, so someone using Google never fills in
            three steps of details first. */}
        <GoogleButton
          onClick={handleGoogleSignup}
          disabled={isLoading}
          loading={pending === "google"}
          label="Sign up with Google"
        />

        <div className="flex items-center gap-3">
          <span className="bg-border h-px flex-1" />
          <span className="text-muted-foreground text-xs uppercase tracking-wider">
            or sign up with email
          </span>
          <span className="bg-border h-px flex-1" />
        </div>

        <Stepper value={currentStep} onValueChange={setCurrentStep}>
          <StepperNav className="mb-6">
            {STEPS.map((item, index) => (
              <StepperItem
                key={item.step}
                step={item.step}
                completed={currentStep > item.step}
                // Steps ahead are unreachable by click — otherwise the
                // indicator would skip each step's validation.
                disabled={item.step > currentStep}
              >
                <StepperTrigger>
                  <StepperIndicator>
                    {currentStep > item.step ? (
                      <Check className="size-4" />
                    ) : (
                      item.step
                    )}
                  </StepperIndicator>
                  <div className="hidden sm:block">
                    <StepperTitle>{item.title}</StepperTitle>
                  </div>
                </StepperTrigger>
                {index < STEPS.length - 1 ? <StepperSeparator /> : null}
              </StepperItem>
            ))}
          </StepperNav>
        </Stepper>

        <form onSubmit={handleSubmit} noValidate>
          <FieldGroup>
            {displayError ? (
              <AuthAlert onDismiss={dismissError}>{displayError}</AuthAlert>
            ) : null}

            {currentStep === 1 ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="firstname">First name</FieldLabel>
                    <Input
                      id="firstname"
                      name="firstname"
                      autoComplete="given-name"
                      placeholder="John"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      disabled={isLoading}
                      autoFocus
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lastname">Last name</FieldLabel>
                    <Input
                      id="lastname"
                      name="lastname"
                      autoComplete="family-name"
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
                    name="username"
                    autoComplete="username"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                  <FieldDescription>
                    This is how you will appear to others in a shared workspace.
                  </FieldDescription>
                </Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  Continue
                </Button>
              </>
            ) : null}

            {currentStep === 2 ? (
              <>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    autoFocus
                  />
                  <FieldDescription>
                    Used to sign in and to recover your account.
                  </FieldDescription>
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    Continue
                  </Button>
                </div>
              </>
            ) : null}

            {currentStep === 3 ? (
              <>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <PasswordInput
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    autoFocus
                  />
                  <PasswordStrength password={password} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm password
                  </FieldLabel>
                  <PasswordInput
                    id="confirm-password"
                    name="confirm-password"
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  {confirmPassword.length > 0 &&
                  password !== confirmPassword ? (
                    <FieldDescription className="text-destructive">
                      Passwords do not match.
                    </FieldDescription>
                  ) : null}
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {pending === "credentials" ? <Spinner /> : null}
                    {pending === "credentials" ? "Creating…" : "Create account"}
                  </Button>
                </div>
                <FieldDescription className="text-center">
                  By creating an account you agree to our{" "}
                  <Link to="/terms" className="underline underline-offset-4">
                    terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline underline-offset-4">
                    privacy policy
                  </Link>
                  .
                </FieldDescription>
              </>
            ) : null}
          </FieldGroup>
        </form>
      </div>
    </AuthShell>
  );
}
