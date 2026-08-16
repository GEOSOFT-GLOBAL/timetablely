import { Check } from "lucide-react";

import { solutions } from "@/config/solutions";
import type { AppMode } from "@/context/app-mode-context";
import { cn } from "@/lib/utils";

interface StepSolutionProps {
  value: AppMode | null;
  onChange: (mode: AppMode) => void;
}

/**
 * The core question: which solution is this workspace for.
 *
 * Each card shows the vocabulary that mode will use, so the choice is made on
 * what the app will actually call things rather than on a label alone.
 */
export function StepSolution({ value, onChange }: StepSolutionProps) {
  return (
    <fieldset className="grid gap-4 lg:grid-cols-3">
      <legend className="sr-only">Choose the solution that fits you</legend>

      {solutions.map((solution) => {
        const selected = value === solution.mode;

        return (
          <label
            key={solution.slug}
            className={cn(
              "relative flex cursor-pointer flex-col gap-4 border p-5 transition-colors",
              selected
                ? "border-primary ring-primary/20 bg-card ring-1"
                : "bg-background hover:border-primary/40"
            )}
          >
            <input
              type="radio"
              name="solution"
              value={solution.mode}
              checked={selected}
              onChange={() => onChange(solution.mode)}
              className="sr-only"
            />

            <div className="flex items-start justify-between gap-3">
              <span
                className={cn(
                  "flex size-10 items-center justify-center border",
                  solution.accent.bg,
                  solution.accent.border
                )}
              >
                <solution.icon className={cn("size-4", solution.accent.text)} />
              </span>
              {selected ? (
                <span className="bg-primary text-primary-foreground flex size-5 items-center justify-center">
                  <Check className="size-3.5" />
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-semibold">{solution.name}</span>
              <span className="text-muted-foreground text-sm">
                {solution.audience}
              </span>
            </div>

            <p className="text-sm text-pretty">{solution.tagline}</p>

            <dl className="mt-auto flex flex-col gap-1.5 border-t pt-4">
              {solution.terminology.map((term) => (
                <div
                  key={term.concept}
                  className="flex items-center justify-between text-sm"
                >
                  <dt className="text-muted-foreground">{term.concept}</dt>
                  <dd className="font-medium">{term.label}</dd>
                </div>
              ))}
            </dl>
          </label>
        );
      })}
    </fieldset>
  );
}
