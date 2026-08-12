import * as React from "react";
import {
  isRouteErrorResponse,
  Link,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import NotFound from "@/views/not-found";

/**
 * Router error boundary.
 *
 * A missing route is not a crash, so 404s are handed to the dedicated
 * NotFound page and only genuine failures render the error state.
 */
const ErrorView: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  const status = isRouteErrorResponse(error) ? error.status : undefined;
  const detail =
    error instanceof Error
      ? error.message
      : isRouteErrorResponse(error)
        ? error.statusText
        : undefined;

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-lg flex-col items-center gap-8 text-center">
        <span className="border-destructive/30 bg-destructive/10 flex size-14 items-center justify-center border">
          <AlertTriangle className="text-destructive size-6" />
        </span>

        <div className="flex flex-col gap-3">
          {status ? (
            <p className="michroma text-destructive text-sm uppercase tracking-[0.2em]">
              Error {status}
            </p>
          ) : null}
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Something went wrong
          </h1>
          <p className="text-muted-foreground text-pretty">
            The page failed to load. Reloading usually fixes it — if it keeps
            happening, let us know what you were doing.
          </p>
        </div>

        {detail ? (
          <details className="w-full border text-left">
            <summary className="text-muted-foreground cursor-pointer px-4 py-3 text-sm">
              Technical details
            </summary>
            <pre className="text-muted-foreground border-t px-4 py-3 text-xs whitespace-pre-wrap break-words">
              {detail}
            </pre>
          </details>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => window.location.reload()} className="gap-2">
            <RotateCcw className="size-4" />
            Reload the page
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Go back
          </Button>
        </div>

        <p className="text-muted-foreground text-sm">
          Still stuck?{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorView;
