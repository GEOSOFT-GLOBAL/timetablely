export interface Tutor {
  id: string;
  name: string;
  subjects: string[];
  maxPeriodsPerDay?: number;
  unavailableSlots?: string[]; // cellKeys like "1-3" (row-col)
}

export interface Course {
  id: string;
  name: string;
  teacherId: string;
  periodsPerWeek: number;
  priority: "high" | "medium" | "low";
  duration?: number; // in minutes, if different from default
  preferredSlots?: string[]; // preferred time slots
  avoidConsecutive?: boolean; // avoid back-to-back periods
}

export interface Session {
  id: string;
  name: string; // e.g., "Class 1A", "Grade 10B"
  subjects: string[]; // IDs of subjects assigned to this class
}

export interface TimetableEntry {
  row: number;
  col: number;
  day: string;
  cellKey: string;
  teacher?: Tutor;
  subject?: Course;
  timeSlot: string;
  session?: Session;
  customText?: string;
  isVertical?: boolean;
  alignment?: "left" | "center" | "right";
}

export interface TimetableTemplate {
  id: string;
  name: string;
  createdAt?: string;
  columnCount: number;
  description?: string;
  entries: TimetableEntry[];
  defaultSlotDuration: number;
  hiddenCellsArray?: string[];
  mergedCellsData?: { [key: string]: any };
  columnDurations: { [key: number]: number };
}

export interface TimetableDatabase {
  tutors: Tutor[];
  courses: Course[];
  sessions: Session[];
  blockedSlots: string[]; // for breaks, devotion, etc.
  blockedTexts: string[]; // texts to avoid when auto-generating
  templates?: TimetableTemplate[]; // saved timetable templates
}
