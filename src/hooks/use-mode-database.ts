import { useEffect } from "react";
import { useAppMode } from "./use-app-mode";
import { useDatabaseStore } from "@/store/databaseStore";
import { useModeSpecificDatabaseStore } from "@/store/modeSpecificDatabaseStore";

/**
 * Hook that synchronizes the current app mode with mode-specific databases.
 * Automatically saves current database when switching modes and loads the database for the new mode.
 * Call this at the app level (e.g., in main layout or provider).
 */
export const useModeDatabase = () => {
  const { mode } = useAppMode();
  const { saveDatabaseToMode, loadDatabaseFromMode } =
    useModeSpecificDatabaseStore();
  const database = useDatabaseStore((state) => state.database);

  // When mode changes, save current database and load new mode's database
  useEffect(() => {
    // Save current database to the previous mode
    saveDatabaseToMode();

    // Load database for the new mode
    loadDatabaseFromMode(mode);
  }, [mode, saveDatabaseToMode, loadDatabaseFromMode]);

  return database;
};
