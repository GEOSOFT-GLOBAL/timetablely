import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { passwordRequirements, scorePassword } from "@/lib/password";

const levels = [
  { label: "Weak", bar: "bg-destructive", text: "text-destructive" },
  {
    label: "Fair",
    bar: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
  {
    label: "Good",
    bar: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Strong",
    bar: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
] as const;

interface PasswordStrengthProps {
  password: string;
  /** Shows the pass/fail checklist under the bar. */
  showChecklist?: boolean;
  className?: string;
}

/** Strength bar and requirement checklist, shared by signup and reset. */
export function PasswordStrength({
  password,
  showChecklist = true,
  className,
}: PasswordStrengthProps) {
  if (password.length === 0) return null;

  const score = scorePassword(password);
  const level = levels[Math.max(0, score - 1)];

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-3">
        <div
          className="flex flex-1 gap-1"
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={passwordRequirements.length}
          aria-label="Password strength"
        >
          {passwordRequirements.map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-1 flex-1 transition-colors",
                index < score ? level.bar : "bg-muted"
              )}
            />
          ))}
        </div>
        <span className={cn("text-xs font-medium", level.text)}>
          {level.label}
        </span>
      </div>

      {showChecklist ? (
        <ul className="flex flex-col gap-1">
          {passwordRequirements.map((requirement) => {
            const met = requirement.test(password);
            return (
              <li
                key={requirement.label}
                className={cn(
                  "flex items-center gap-2 text-xs",
                  met
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                )}
              >
                {met ? (
                  <Check className="size-3.5 shrink-0" />
                ) : (
                  <X className="size-3.5 shrink-0 opacity-50" />
                )}
                {requirement.label}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
