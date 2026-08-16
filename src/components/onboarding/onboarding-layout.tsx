import * as React from "react";
import { CalendarClock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  stepIndex: number;
  stepCount: number;
  stepLabels: string[];
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  /** Rendered at the bottom, typically Back / Continue. */
  actions: React.ReactNode;
  onSkip?: () => void;
}

/**
 * Chrome for the onboarding flow: brand bar, progress rail, and a fixed
 * footer for navigation so the buttons sit in the same place on every step.
 */
export function OnboardingLayout({
  stepIndex,
  stepCount,
  stepLabels,
  title,
  description,
  children,
  actions,
  onSkip,
}: OnboardingLayoutProps) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <header className="flex items-center justify-between gap-4 border-b px-6 py-4">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <CalendarClock className="text-primary size-5" />
          <span>Timetablely</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {onSkip ? (
            <Button variant="ghost" size="sm" onClick={onSkip}>
              Skip setup
            </Button>
          ) : null}
        </div>
      </header>

      <main className="flex flex-1 justify-center px-6 py-10">
        <div className="flex w-full max-w-3xl flex-col gap-8">
          {/* Progress rail */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {Array.from({ length: stepCount }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    "h-1 flex-1 transition-colors",
                    index <= stepIndex ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>
            <p className="text-muted-foreground michroma text-xs uppercase tracking-[0.18em]">
              Step {stepIndex + 1} of {stepCount} · {stepLabels[stepIndex]}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="text-muted-foreground text-pretty">{description}</p>
            ) : null}
          </div>

          <div className="flex-1">{children}</div>

          <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-between">
            {actions}
          </div>
        </div>
      </main>
    </div>
  );
}
