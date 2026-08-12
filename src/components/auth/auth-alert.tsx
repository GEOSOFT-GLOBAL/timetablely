import { AlertCircle, CheckCircle2, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface AuthAlertProps {
  variant?: "error" | "success";
  children: React.ReactNode;
  /** When provided, renders a dismiss control. */
  onDismiss?: () => void;
  className?: string;
}

/**
 * Feedback banner for auth forms.
 *
 * Replaces the hardcoded `text-red-500 bg-red-50` blocks the forms each had
 * their own copy of — those rendered light-on-light in dark mode.
 */
export function AuthAlert({
  variant = "error",
  children,
  onDismiss,
  className,
}: AuthAlertProps) {
  const isError = variant === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;

  return (
    <div
      role={isError ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 border p-3 text-sm",
        isError
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        className
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="flex-1 text-pretty">{children}</div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
