import { create } from "zustand";
import type { ITimetableDatabase } from "@/interface/database";
import { defaultBlockedTexts } from "@/lib/timetable";

interface DatabaseState {
  database: ITimetableDatabase;
  setDatabase: (database: ITimetableDatabase) => void;
  // You might want to add more specific actions for updating parts of the database
  // e.g., addTutor, updateCourse, deleteSession, etc.
}

export const useDatabaseStore = create<DatabaseState>((set) => ({
  database: {
    tutors: [],
    courses: [],
    sessions: [],
    blockedSlots: [],
    blockedTexts: defaultBlockedTexts,
    templates: [],
  },
  setDatabase: (database) => set({ database }),
}));
