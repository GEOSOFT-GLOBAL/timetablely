import { CalendarDays } from "lucide-react";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modeCopy, slotDurationOptions } from "@/config/onboarding";
import type { AppMode } from "@/context/app-mode-context";
import type { SchedulePreferences } from "@/store/onboardingStore";
import { minutesToTimeString } from "@/lib/temputils";

interface StepScheduleProps {
  mode: AppMode;
  value: SchedulePreferences;
  onChange: (value: SchedulePreferences) => void;
}

/** `HH:MM` for the time input, which does not take minutes-past-midnight. */
const toTimeInput = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(
    minutes % 60
  ).padStart(2, "0")}`;

const fromTimeInput = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
};

export function StepSchedule({ mode, value, onChange }: StepScheduleProps) {
  const copy = modeCopy[mode];
  const endMinutes =
    value.startMinutes + value.columnCount * value.slotDuration;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-3">
        <Field>
          <FieldLabel htmlFor="start-time">Day starts at</FieldLabel>
          <Input
            id="start-time"
            type="time"
            value={toTimeInput(value.startMinutes)}
            onChange={(e) => {
              const minutes = fromTimeInput(e.target.value);
              if (minutes !== null) {
                onChange({ ...value, startMinutes: minutes });
              }
            }}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="slot-duration">Slot length</FieldLabel>
          <Select
            value={String(value.slotDuration)}
            onValueChange={(next) =>
              onChange({ ...value, slotDuration: Number(next) })
            }
          >
            <SelectTrigger id="slot-duration" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {slotDurationOptions.map((minutes) => (
                <SelectItem key={minutes} value={String(minutes)}>
                  {minutes} minutes
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="column-count">Slots per day</FieldLabel>
          <Input
            id="column-count"
            type="number"
            min={1}
            max={16}
            value={value.columnCount}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (Number.isNaN(next)) return;
              onChange({
                ...value,
                columnCount: Math.min(Math.max(next, 1), 16),
              });
            }}
          />
          <FieldDescription>{copy.scheduleHint}</FieldDescription>
        </Field>
      </div>

      <div className="bg-muted/40 flex flex-col gap-3 border p-5">
        <p className="text-muted-foreground michroma text-xs uppercase tracking-[0.18em]">
          Your day
        </p>
        <p className="text-lg font-medium">
          {minutesToTimeString(value.startMinutes)} –{" "}
          {minutesToTimeString(endMinutes)}
        </p>
        <p className="text-muted-foreground text-sm">
          {value.columnCount} slot{value.columnCount === 1 ? "" : "s"} of{" "}
          {value.slotDuration} minutes.
        </p>

        <div className="text-muted-foreground flex items-start gap-2 border-t pt-3 text-sm">
          <CalendarDays className="mt-0.5 size-4 shrink-0" />
          <span>
            Schedules currently run Monday to Friday. Weekend days are not yet
            supported by the scheduler.
          </span>
        </div>
      </div>
    </div>
  );
}
