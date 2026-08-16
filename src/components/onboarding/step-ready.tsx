import { Check } from "lucide-react";

import { modeCopy } from "@/config/onboarding";
import { getSolutionByMode } from "@/config/solutions";
import type { AppMode } from "@/context/app-mode-context";
import type { SchedulePreferences } from "@/store/onboardingStore";
import { minutesToTimeString } from "@/lib/temputils";
import { cn } from "@/lib/utils";

interface StepReadyProps {
  mode: AppMode;
  workspaceName: string;
  schedule: SchedulePreferences;
  seedSample: boolean;
}

/** Recap of every answer, so nothing is applied that the user did not see. */
export function StepReady({
  mode,
  workspaceName,
  schedule,
  seedSample,
}: StepReadyProps) {
  const copy = modeCopy[mode];
  const solution = getSolutionByMode(mode);

  const rows = [
    { label: "Solution", value: solution?.name ?? "—" },
    { label: "Workspace", value: workspaceName || "Untitled workspace" },
    {
      label: "Working days",
      value: schedule.days.map((day) => day.slice(0, 3)).join(", "),
    },
    {
      label: "Day",
      value: `${minutesToTimeString(schedule.startMinutes)} – ${minutesToTimeString(
        schedule.startMinutes + schedule.columnCount * schedule.slotDuration
      )}`,
    },
    {
      label: "Slots",
      value: `${schedule.columnCount} × ${schedule.slotDuration} min`,
    },
    {
      label: "Starting data",
      value: seedSample ? copy.sampleSummary : "Empty workspace",
    },
  ];

  const nextUp = [
    `Add or review your ${copy.people.toLowerCase()}`,
    `Set up your ${copy.workItems.toLowerCase()}`,
    `Generate your first schedule`,
  ];

  return (
    <div className="flex flex-col gap-6">
      <dl className="bg-card border">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={cn(
              "flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between",
              index < rows.length - 1 && "border-b"
            )}
          >
            <dt className="text-muted-foreground text-sm">{row.label}</dt>
            <dd className="font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="bg-muted/40 flex flex-col gap-3 border p-5">
        <p className="text-muted-foreground michroma text-xs uppercase tracking-[0.18em]">
          What happens next
        </p>
        <ul className="flex flex-col gap-2">
          {nextUp.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <Check
                className={cn(
                  "size-4 shrink-0",
                  solution?.accent.text ?? "text-primary"
                )}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
