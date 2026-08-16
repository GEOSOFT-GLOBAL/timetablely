import * as React from "react";

import { cn } from "@/lib/utils";

export type MeterTone = "neutral" | "positive" | "caution" | "critical";

const toneFill: Record<MeterTone, string> = {
  neutral: "bg-muted-foreground/40",
  positive: "bg-emerald-500",
  caution: "bg-amber-500",
  critical: "bg-destructive",
};

interface MeterProps {
  value: number;
  max: number;
  tone?: MeterTone;
  className?: string;
  /** Renders the part that does not fit as a hatched overflow segment. */
  showOverflow?: boolean;
}

/**
 * A single horizontal bar. Anything past `max` is drawn as a distinct
 * overflow segment rather than a clipped full bar, so "slightly over" and
 * "wildly over" do not look the same.
 */
export const Meter: React.FC<MeterProps> = ({
  value,
  max,
  tone = "neutral",
  className,
  showOverflow = true,
}) => {
  const isOver = max > 0 && value > max;
  // Within capacity the bar reads against `max`. Over capacity the whole bar
  // becomes the request, split into the part that fits and the part that does
  // not — so the excess is proportional however far past the limit it goes.
  const filled = isOver
    ? max / value
    : max > 0
      ? Math.max(0, value / max)
      : value > 0
        ? 1
        : 0;
  const overflow = isOver && showOverflow ? 1 - filled : 0;

  return (
    <div
      className={cn("bg-muted flex h-2 w-full overflow-hidden", className)}
      role="presentation"
    >
      <div
        className={cn(
          "h-full shrink-0 transition-[width] duration-500",
          toneFill[tone]
        )}
        style={{ width: `${filled * 100}%` }}
      />
      {overflow > 0 && (
        <div
          className="bg-destructive/40 h-full shrink-0 transition-[width] duration-500"
          style={{ width: `${overflow * 100}%` }}
        />
      )}
    </div>
  );
};

export default Meter;
