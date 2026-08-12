import { Link, useSearchParams } from "react-router-dom";
import { LinkIcon } from "lucide-react";

import { ResetPasswordForm } from "@/components/reset-password-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  // The app runs on a browser router, so the token arrives as a normal query
  // parameter. Reading it from `location.hash` (as this page used to) always
  // produced null and sent every visitor to the invalid-link state.
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <AuthShell
        title="This link is not valid"
        description="The reset link is missing its token, which usually means it was truncated by an email client."
        footer={
          <>
            Need help?{" "}
            <Link
              to="/contact"
              className="text-foreground font-medium underline underline-offset-4"
            >
              Contact support
            </Link>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <div className="bg-muted/50 flex items-start gap-3 border p-4">
            <LinkIcon className="text-muted-foreground mt-0.5 size-5 shrink-0" />
            <p className="text-muted-foreground text-sm">
              Try opening the link from your email again, and copy the whole URL
              if you are pasting it. Reset links also expire after one hour.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link to="/auth/forgot-password">Request a new link</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/auth/login">Back to log in</Link>
            </Button>
          </div>
        </div>
      </AuthShell>
    );
  }

  return <ResetPasswordForm token={token} />;
};

export default ResetPassword;
