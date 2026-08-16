import { Check, FileStack, Sparkles } from "lucide-react";

import { modeCopy } from "@/config/onboarding";
import { getSolutionByMode } from "@/config/solutions";
import type { AppMode } from "@/context/app-mode-context";
import { cn } from "@/lib/utils";

interface StepDataProps {
  mode: AppMode;
  value: boolean;
  onChange: (seedSample: boolean) => void;
}

/**
 * Start empty or from example data.
 *
 * An empty scheduler cannot demonstrate anything, so sample data is offered
 * as an equal option rather than buried — it can be cleared in one action
 * from the database view.
 */
export function StepData({ mode, value, onChange }: StepDataProps) {
  const copy = modeCopy[mode];
  const solution = getSolutionByMode(mode);

  const options = [
    {
      seed: true,
      icon: Sparkles,
      title: "Start with example data",
      description: copy.sampleSummary,
      detail: `You get ${copy.people.toLowerCase()}, ${copy.workItems.toLowerCase()} and a ${copy.groups
        .toLowerCase()
        .replace(/e?s$/, "")} already wired together, so you can generate a schedule on your first visit.`,
    },
    {
      seed: false,
      icon: FileStack,
      title: "Start empty",
      description: "A clean workspace",
      detail: `Add your own ${copy.people.toLowerCase()} and ${copy.workItems.toLowerCase()} from scratch. Best if you already know what you are importing.`,
    },
  ];

  return (
    <fieldset className="grid gap-4 sm:grid-cols-2">
      <legend className="sr-only">Choose your starting point</legend>

      {options.map((option) => {
        const selected = value === option.seed;
        return (
          <label
            key={option.title}
            className={cn(
              "flex cursor-pointer flex-col gap-3 border p-5 transition-colors",
              selected
                ? "border-primary ring-primary/20 bg-card ring-1"
                : "bg-background hover:border-primary/40"
            )}
          >
            <input
              type="radio"
              name="starting-point"
              checked={selected}
              onChange={() => onChange(option.seed)}
              className="sr-only"
            />

            <div className="flex items-start justify-between gap-3">
              <option.icon
                className={cn(
                  "size-5",
                  selected ? solution?.accent.text : "text-muted-foreground"
                )}
              />
              {selected ? (
                <span className="bg-primary text-primary-foreground flex size-5 items-center justify-center">
                  <Check className="size-3.5" />
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-semibold">{option.title}</span>
              <span className="text-muted-foreground text-sm">
                {option.description}
              </span>
            </div>

            <p className="text-muted-foreground text-sm text-pretty">
              {option.detail}
            </p>
          </label>
        );
      })}
    </fieldset>
  );
}
