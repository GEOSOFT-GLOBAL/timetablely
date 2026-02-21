import { create } from "zustand";
import type { ITimetableDatabase } from "@/interface/database";
import { defaultBlockedTexts } from "@/lib/timetable";
import { offlineSyncService } from "@/lib/offline-storage";
import { useAuthStore } from "./authStore";
import { useNetworkStore } from "@/lib/offline-storage";

interface DatabaseState {
  database: ITimetableDatabase;
  isLoading: boolean;
  isInitialized: boolean;
  setDatabase: (database: ITimetableDatabase) => Promise<void>;
  initializeDatabase: () => Promise<void>;
  saveToOffline: () => Promise<void>;
  syncWithServer: () => Promise<{ success: boolean; error?: string }>;
  loadFromServer: () => Promise<void>;
}

export const useDatabaseStore = create<DatabaseState>((set, get) => ({
  database: {
    tutors: [],
    courses: [],
    sessions: [],
    blockedSlots: [],
    blockedTexts: defaultBlockedTexts,
    templates: [],
  },
  isLoading: false,
  isInitialized: false,

  // Set database and auto-save to offline storage
  setDatabase: async (database) => {
    set({ database });
    
    // Auto-save to offline storage and queue for sync
    const token = useAuthStore.getState().token;
    if (token) {
      try {
        await offlineSyncService.saveTimetableData(database);
        await offlineSyncService.queueForSync(database);
        
        // Update pending changes count
        const queue = await offlineSyncService.getSyncQueue();
        useNetworkStore.getState().setPendingChanges(queue.length);
        
        console.log("[DatabaseStore] Data saved and queued for sync");
      } catch (error) {
        console.error("[DatabaseStore] Failed to save data:", error);
      }
    }
  },

  // Initialize database - load from cache or server
  initializeDatabase: async () => {
    const token = useAuthStore.getState().token;
    
    if (!token) {
      console.log("No auth token, skipping database initialization");
      return;
    }

    set({ isLoading: true });

    try {
      // First, try to load from server
      const serverData = await offlineSyncService.getTimetable(token);
      
      if (serverData) {
        set({ 
          database: serverData,
          isInitialized: true,
          isLoading: false 
        });
      } else {
        // Fall back to local cache
        const cachedData = await offlineSyncService.getTimetableData();
        
        if (cachedData) {
          set({ 
            database: cachedData,
            isInitialized: true,
            isLoading: false 
          });
        } else {
          // No data available, use defaults
          set({ 
            database: {
              tutors: [],
              courses: [],
              sessions: [],
              blockedSlots: [],
              blockedTexts: defaultBlockedTexts,
              templates: [],
            },
            isInitialized: true,
            isLoading: false 
          });
        }
      }
    } catch (error) {
      console.error("Failed to initialize database:", error);
      
      // Try to load from cache on error
      const cachedData = await offlineSyncService.getTimetableData();
      if (cachedData) {
        set({ 
          database: cachedData,
          isInitialized: true,
          isLoading: false 
        });
      } else {
        set({ isLoading: false });
      }
    }
  },

  // Save current database to offline storage and queue for sync
  saveToOffline: async () => {
    const { database } = get();
    const token = useAuthStore.getState().token;
    
    try {
      // Save locally
      await offlineSyncService.saveTimetableData(database);
      console.log("Database saved to offline storage");
      
      // If we have a token, also queue for sync
      if (token) {
        await offlineSyncService.queueForSync(database);
        console.log("Changes queued for sync");
      }
    } catch (error) {
      console.error("Failed to save to offline storage:", error);
    }
  },

  // Sync with server
  syncWithServer: async () => {
    const token = useAuthStore.getState().token;
    
    if (!token) {
      return { success: false, error: "Not authenticated" };
    }

    const { database } = get();
    set({ isLoading: true });

    try {
      const result = await offlineSyncService.syncWithServer(database, token);
      set({ isLoading: false });
      return result;
    } catch (error) {
      console.error("Sync failed:", error);
      set({ isLoading: false });
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Sync failed" 
      };
    }
  },

  // Force load from server (bypass cache)
  loadFromServer: async () => {
    const token = useAuthStore.getState().token;
    
    if (!token) {
      return;
    }

    set({ isLoading: true });

    try {
      const serverData = await offlineSyncService.getTimetable(token);
      
      if (serverData) {
        set({ 
          database: serverData,
          isLoading: false 
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Failed to load from server:", error);
      set({ isLoading: false });
    }
  },
}));

// Helper function to initialize database when user logs in
export const initializeOnAuthChange = () => {
  const token = useAuthStore.getState().token;
  if (token) {
    useDatabaseStore.getState().initializeDatabase();
  }
};
