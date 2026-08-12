import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Layout primitives for the public site.
 *
 * Every marketing page composes from these so page width, vertical rhythm and
 * heading scale stay identical across the site instead of being re-invented
 * per view.
 */

/** Constrains content to the site's reading width. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-6 lg:px-8", className)}
      {...props}
    />
  );
}

interface SectionProps extends React.ComponentProps<"section"> {
  /** Tightens the vertical padding for sections that sit directly on another. */
  size?: "default" | "sm" | "lg";
  /** Applies a subtle muted background to separate adjacent sections. */
  muted?: boolean;
  /** Adds a top hairline. Use when two same-background sections meet. */
  bordered?: boolean;
}

const sectionSizes = {
  sm: "py-12 sm:py-16",
  default: "py-20 sm:py-28",
  lg: "py-24 sm:py-32",
} as const;

export function Section({
  className,
  size = "default",
  muted = false,
  bordered = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        sectionSizes[size],
        muted && "bg-muted/40",
        bordered && "border-t",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

/** Small uppercase label that sits above a section title. */
export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "michroma text-primary text-xs uppercase tracking-[0.2em]",
        className
      )}
      {...props}
    />
  );
}

interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Renders the title as an h1. Use once per page. */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const Title = as;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Title
        className={cn(
          "text-balance font-semibold tracking-tight",
          as === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl"
        )}
      >
        {title}
      </Title>
      {description ? (
        <p
          className={cn(
            "text-muted-foreground text-pretty text-base sm:text-lg",
            align === "center" ? "max-w-2xl" : "max-w-3xl"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
