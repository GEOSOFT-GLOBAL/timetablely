import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AppMode } from "@/context/app-mode-context";

export interface SchedulePreferences {
  /**
   * Working day names, in the order they appear as grid rows.
   *
   * Fixed to Monday–Friday for now: `generateAutomatedTimetable` hardcodes a
   * five-row week, so a different set here would desync generation from the
   * grid. Kept in the shape so a variable week is a one-line change once the
   * scheduler is parameterised.
   */
  days: string[];
  /** Minutes past midnight that the first slot starts at. */
  startMinutes: number;
  /** Default length of a single slot, in minutes. */
  slotDuration: number;
  /** How many slots make up a day. */
  columnCount: number;
}

export const defaultSchedulePreferences: SchedulePreferences = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  startMinutes: 8 * 60,
  slotDuration: 45,
  columnCount: 8,
};

interface OnboardingState {
  /** False until the user finishes or explicitly skips the flow. */
  completed: boolean;
  /** Which solution they chose. Mirrored into AppModeContext on completion. */
  mode: AppMode | null;
  /** What they call their workspace — school, organisation or their own name. */
  workspaceName: string;
  schedule: SchedulePreferences;
  /** Set when they asked to start from example data rather than empty. */
  seededSample: boolean;

  complete: (data: {
    mode: AppMode;
    workspaceName: string;
    schedule: SchedulePreferences;
    seededSample: boolean;
  }) => void;
  /** Marks onboarding done without recording answers (skip, or existing user). */
  dismiss: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      completed: false,
      mode: null,
      workspaceName: "",
      schedule: defaultSchedulePreferences,
      seededSample: false,

      complete: ({ mode, workspaceName, schedule, seededSample }) =>
        set({ completed: true, mode, workspaceName, schedule, seededSample }),

      dismiss: () => set({ completed: true }),

      reset: () =>
        set({
          completed: false,
          mode: null,
          workspaceName: "",
          schedule: defaultSchedulePreferences,
          seededSample: false,
        }),
    }),
    { name: "timetablely-onboarding" }
  )
);
