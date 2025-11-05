/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PRIORITY } from "./enums";

export interface ITutor {
  id: string;
  name: string;
  subjects: string[];
  maxPeriodsPerDay?: number;
  unavailableSlots?: string[]; // cellKeys like "1-3" (row-col)
}

export interface ICourse {
  id: string;
  name: string;
  teacherId: string;
  periodsPerWeek: number;
  priority: PRIORITY;
  duration?: number; // in minutes, if different from default
  preferredSlots?: string[]; // preferred time slots
  avoidConsecutive?: boolean; // avoid back-to-back periods
}

export interface ISession {
  id: string;
  name: string; // e.g., "Class 1A", "Grade 10B"
  subjects: string[]; // IDs of subjects assigned to this class
}

export interface ITimetableEntry {
  row: number;
  col: number;
  day: string;
  cellKey: string;
  teacher?: ITutor;
  subject?: ICourse;
  timeSlot: string;
  session?: ISession;
  customText?: string;
  isVertical?: boolean;
  alignment?: "left" | "center" | "right";
}

export interface ITimetableTemplate {
  id: string;
  name: string;
  createdAt?: string;
  columnCount: number;
  description?: string;
  entries: ITimetableEntry[];
  defaultSlotDuration: number;
  hiddenCellsArray?: string[];
  mergedCellsData?: { [key: string]: any };
  columnDurations: { [key: number]: number };
}

export interface ITimetableDatabase {
  tutors: ITutor[];
  courses: ICourse[];
  sessions: ISession[];
  blockedSlots: string[]; // for breaks, devotion, etc.
  blockedTexts: string[]; // texts to avoid when auto-generating
  templates?: ITimetableTemplate[]; // saved timetable templates
}
