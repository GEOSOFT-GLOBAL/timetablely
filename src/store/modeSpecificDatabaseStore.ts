import { create } from "zustand";
import type { ITimetableDatabase } from "@/interface/database";
import { defaultBlockedTexts } from "@/lib/timetable";
import { useDatabaseStore } from "./databaseStore";

type AppMode = "education" | "individual" | "company";

interface ModeDatabase {
  education: ITimetableDatabase;
  individual: ITimetableDatabase;
  company: ITimetableDatabase;
}

interface ModeSpecificDatabaseState {
  modeDatabase: ModeDatabase;
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  getDatabaseForMode: (mode: AppMode) => ITimetableDatabase;
  getCurrentModeDatabase: () => ITimetableDatabase;
  setDatabaseForMode: (mode: AppMode, database: ITimetableDatabase) => void;
  saveDatabaseToMode: () => void;
  loadDatabaseFromMode: (mode: AppMode) => void;
}

const createEmptyDatabase = (): ITimetableDatabase => ({
  tutors: [],
  courses: [],
  sessions: [],
  blockedSlots: [],
  blockedTexts: defaultBlockedTexts,
  templates: [],
});

export const useModeSpecificDatabaseStore = create<ModeSpecificDatabaseState>(
  (set, get) => ({
    modeDatabase: {
      education: createEmptyDatabase(),
      individual: createEmptyDatabase(),
      company: createEmptyDatabase(),
    },
    currentMode: "education",

    setMode: (mode: AppMode) => {
      set({ currentMode: mode });
    },

    getDatabaseForMode: (mode: AppMode) => {
      return get().modeDatabase[mode];
    },

    getCurrentModeDatabase: () => {
      const { modeDatabase, currentMode } = get();
      return modeDatabase[currentMode];
    },

    setDatabaseForMode: (mode: AppMode, database: ITimetableDatabase) => {
      set((state) => ({
        modeDatabase: {
          ...state.modeDatabase,
          [mode]: database,
        },
      }));
    },

    // Save current main database to the current mode's database
    saveDatabaseToMode: () => {
      const mainDatabase = useDatabaseStore.getState().database;
      const { currentMode } = get();

      set((state) => ({
        modeDatabase: {
          ...state.modeDatabase,
          [currentMode]: mainDatabase,
        },
      }));
    },

    // Load a mode's database into the main database store
    loadDatabaseFromMode: (mode: AppMode) => {
      const modeDb = get().modeDatabase[mode];
      useDatabaseStore.getState().setDatabase(modeDb);
      set({ currentMode: mode });
    },
  })
);
