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
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Check } from "lucide-react";

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
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setValidationError("");
    
    // Validate current step
    if (currentStep === 1) {
      if (!firstname.trim() || !lastname.trim() || !username.trim()) {
        setValidationError("Please fill in all fields");
        return;
      }
    } else if (currentStep === 2) {
      if (!email.trim()) {
        setValidationError("Please enter your email");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setValidationError("Please enter a valid email");
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setValidationError("");
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl">
          Create an account
        </CardTitle>
        <CardDescription className="text-sm">
          Complete the steps below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <Stepper value={currentStep} onValueChange={setCurrentStep}>
          <StepperNav className="mb-6">
            <StepperItem step={1} completed={currentStep > 1}>
              <StepperTrigger>
                <StepperIndicator>
                  {currentStep > 1 ? <Check className="size-4" /> : "1"}
                </StepperIndicator>
                <div className="hidden sm:block">
                  <StepperTitle>Personal Info</StepperTitle>
                </div>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>

            <StepperItem step={2} completed={currentStep > 2}>
              <StepperTrigger>
                <StepperIndicator>
                  {currentStep > 2 ? <Check className="size-4" /> : "2"}
                </StepperIndicator>
                <div className="hidden sm:block">
                  <StepperTitle>Account</StepperTitle>
                </div>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>

            <StepperItem step={3}>
              <StepperTrigger>
                <StepperIndicator>3</StepperIndicator>
                <div className="hidden sm:block">
                  <StepperTitle>Password</StepperTitle>
                </div>
              </StepperTrigger>
            </StepperItem>
          </StepperNav>

          <StepperPanel>
            <form onSubmit={handleSubmit}>
              {displayError && (
                <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
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

              <StepperContent value={1}>
                <FieldGroup>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                      <Input
                        id="firstname"
                        type="text"
                        placeholder="John"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        disabled={isLoading}
                        autoFocus
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
                      disabled={isLoading}
                    />
                  </Field>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={isLoading}
                      className="w-full"
                    >
                      Next
                    </Button>
                  </div>
                </FieldGroup>
              </StepperContent>

              <StepperContent value={2}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      autoFocus
                    />
                    <FieldDescription>
                      We&apos;ll use this to contact you.
                    </FieldDescription>
                  </Field>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={isLoading}
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={isLoading}
                      className="w-full"
                    >
                      Next
                    </Button>
                  </div>
                </FieldGroup>
              </StepperContent>

              <StepperContent value={3}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      autoFocus
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
                      disabled={isLoading}
                    />
                  </Field>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={isLoading}
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                    className="w-full"
                  >
                    Sign up with Google
                  </Button>
                  <FieldDescription className="px-2 sm:px-6 text-center text-xs sm:text-sm">
                    Already have an account?{" "}
                    <a href="#/auth/login" className="underline">
                      Sign in
                    </a>
                  </FieldDescription>
                </FieldGroup>
              </StepperContent>
            </form>
          </StepperPanel>
        </Stepper>
      </CardContent>
    </Card>
  );
}
