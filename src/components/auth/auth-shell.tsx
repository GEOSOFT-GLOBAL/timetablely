import * as React from "react";

import { cn } from "@/lib/utils";

interface AuthShellProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  /** Rendered under the card, e.g. the link to the opposite flow. */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Shared frame for every auth screen.
 *
 * Each form used to repeat its own centering wrapper, width cap and Card
 * header, which is how they drifted apart. The layout owns centering; this
 * owns the heading, width and card surface.
 */
export function AuthShell({
  title,
  description,
  children,
  footer,
  className,
}: AuthShellProps) {
  return (
    <div className={cn("flex w-full max-w-md flex-col gap-6", className)}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="text-muted-foreground text-pretty text-sm">
            {description}
          </p>
        ) : null}
      </div>

      <div className="bg-card border p-6 sm:p-8">{children}</div>

      {footer ? (
        <div className="text-muted-foreground text-center text-sm">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
