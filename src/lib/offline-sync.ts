import { AxiosError } from "axios";
import type { ITimetableDatabase, ITimetableTemplate, ITutor, ICourse, ISession } from "@/interface/database";
import { createApiClient } from "@/config/axios";
import { offlineDB, STORES } from "./offline-db";
import { useNetworkStore } from "@/store/networkStore";

/**
 * Sync queue item type
 */
export interface SyncQueueItem {
  id?: number;
  type: "timetable" | "template" | "tutor" | "course" | "session" | "specialBlock";
  action: "create" | "update" | "delete";
  data: unknown;
  timestamp: number;
  retryCount: number;
  lastError?: string;
}

/**
 * Extended timetable data with metadata for storage
 */
interface TimetableDataWithMeta {
  id: string;
  lastUpdated: number;
  tutors: ITutor[];
  courses: ICourse[];
  sessions: ISession[];
  blockedSlots: string[];
  blockedTexts: string[];
  templates: ITimetableTemplate[];
}

/**
 * Offline sync service
 * Handles syncing data between local storage and server
 */
export const offlineSyncService = {
  // Timetable Data Operations
  async saveTimetableData(data: ITimetableDatabase): Promise<void> {
    await offlineDB.put(STORES.TIMETABLE_DATA, {
      id: "current",
      lastUpdated: Date.now(),
      tutors: data.tutors || [],
      courses: data.courses || [],
      sessions: data.sessions || [],
      blockedSlots: data.blockedSlots || [],
      blockedTexts: data.blockedTexts || [],
      templates: data.templates || [],
    });
  },

  async getTimetableData(): Promise<ITimetableDatabase | null> {
    const result = await offlineDB.get<TimetableDataWithMeta>(
      STORES.TIMETABLE_DATA,
      "current"
    );
    
    if (result) {
      return {
        tutors: result.tutors || [],
        courses: result.courses || [],
        sessions: result.sessions || [],
        blockedSlots: result.blockedSlots || [],
        blockedTexts: result.blockedTexts || [],
        templates: result.templates || [],
      };
    }
    
    return null;
  },

  async clearTimetableData(): Promise<void> {
    await offlineDB.clear(STORES.TIMETABLE_DATA);
  },

  // Sync Queue Operations
  async addToSyncQueue(item: Omit<SyncQueueItem, "id" | "timestamp" | "retryCount">): Promise<void> {
    const queueItem: SyncQueueItem = {
      ...item,
      timestamp: Date.now(),
      retryCount: 0,
    };

    await offlineDB.put(STORES.SYNC_QUEUE, queueItem);
    
    // Update pending changes count
    const items = await offlineDB.getAll<SyncQueueItem>(STORES.SYNC_QUEUE);
    useNetworkStore.getState().setPendingChanges(items.length);
  },

  async getSyncQueue(): Promise<SyncQueueItem[]> {
    return offlineDB.getAll<SyncQueueItem>(STORES.SYNC_QUEUE);
  },

  async removeFromSyncQueue(id: number): Promise<void> {
    await offlineDB.delete(STORES.SYNC_QUEUE, id);
    
    // Update pending changes count
    const items = await offlineDB.getAll<SyncQueueItem>(STORES.SYNC_QUEUE);
    useNetworkStore.getState().setPendingChanges(items.length);
  },

  async updateSyncQueueItem(item: SyncQueueItem): Promise<void> {
    await offlineDB.put(STORES.SYNC_QUEUE, item);
  },

  async clearSyncQueue(): Promise<void> {
    await offlineDB.clear(STORES.SYNC_QUEUE);
    useNetworkStore.getState().setPendingChanges(0);
  },

  // Process sync queue
  async processSyncQueue(token: string): Promise<{
    success: number;
    failed: number;
    errors: string[];
  }> {
    const api = createApiClient(token);
    const queue = await this.getSyncQueue();
    
    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const item of queue) {
      try {
        const dataKey = item.type === "specialBlock" ? "specialBlocks" : `${item.type}s`;
        
        await api.post("/sync", {
          [dataKey]:
            item.action === "delete"
              ? [{ _id: (item.data as { _id: string })._id }]
              : [item.data],
        });

        if (item.id) {
          await this.removeFromSyncQueue(item.id);
        }
        success++;
      } catch (error) {
        failed++;
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        errors.push(`Failed to sync ${item.type}: ${errorMessage}`);

        // Update retry count
        if (item.id) {
          await this.updateSyncQueueItem({
            ...item,
            retryCount: item.retryCount + 1,
            lastError: errorMessage,
          });
        }
      }
    }

    return { success, failed, errors };
  },

  // Sync all data with server
  async syncWithServer(
    data: ITimetableDatabase,
    token: string
  ): Promise<{ success: boolean; error?: string }> {
    const api = createApiClient(token);

    try {
      // Prepare sync payload
      const syncPayload = {
        templates: data.templates,
        tutors: data.tutors,
        courses: data.courses,
        sessions: data.sessions,
      };

      const response = await api.post("/sync", syncPayload);

      if (response.data.success) {
        // Clear local data after successful sync
        await this.saveTimetableData({
          tutors: [],
          courses: [],
          sessions: [],
          blockedSlots: [],
          blockedTexts: [],
          templates: [],
        });

        // If server returned data, merge it
        if (response.data.data) {
          const serverData = response.data.data;
          await this.saveTimetableData({
            tutors: (serverData.tutors || []) as ITutor[],
            courses: (serverData.courses || []) as ICourse[],
            sessions: (serverData.sessions || []) as ISession[],
            blockedSlots: [],
            blockedTexts: [],
            templates: (serverData.templates || []) as ITimetableTemplate[],
          });
        }

        return { success: true };
      }

      return { success: false, error: response.data.message };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.code === "ERR_NETWORK" || axiosError.code === "ECONNABORTED") {
        // Network error - queue for later sync
        await this.queueForSync(data);
        return { success: false, error: "Offline - queued for sync" };
      }
      return {
        success: false,
        error:
          (axiosError.response?.data as { message?: string })?.message || axiosError.message || "Sync failed",
      };
    }
  },

  // Queue current data for sync
  async queueForSync(data: ITimetableDatabase): Promise<void> {
    // Clear existing queue to avoid duplicates
    await this.clearSyncQueue();
    
    // Save current data locally first
    await this.saveTimetableData(data);

    // Add items to sync queue
    if (data.tutors?.length) {
      for (const tutor of data.tutors) {
        await this.addToSyncQueue({
          type: "tutor",
          action: "update",
          data: tutor,
        });
      }
    }

    if (data.courses?.length) {
      for (const course of data.courses) {
        await this.addToSyncQueue({
          type: "course",
          action: "update",
          data: course,
        });
      }
    }

    if (data.sessions?.length) {
      for (const session of data.sessions) {
        await this.addToSyncQueue({
          type: "session",
          action: "update",
          data: session,
        });
      }
    }

    if (data.templates?.length) {
      for (const template of data.templates) {
        await this.addToSyncQueue({
          type: "template",
          action: "update",
          data: template,
        });
      }
    }
  },

  // Get data from server or local cache
  async getTimetable(
    token: string,
    sessionId?: string
  ): Promise<ITimetableDatabase | null> {
    const api = createApiClient(token);

    try {
      const response = await api.get("/data", {
        params: sessionId ? { sessionId } : {},
      });

      if (response.data.success) {
        const data = response.data.data;
        
        // Convert unknown arrays to typed arrays
        const database: ITimetableDatabase = {
          tutors: (data.tutors || []) as ITutor[],
          courses: (data.courses || []) as ICourse[],
          sessions: (data.sessions || []) as ISession[],
          blockedSlots: [],
          blockedTexts: [],
          templates: (data.templates || []) as ITimetableTemplate[],
        };

        // Cache locally
        await this.saveTimetableData(database);

        return database;
      }

      // Fall back to local cache
      return this.getTimetableData();
    } catch (error) {
      console.error("Failed to fetch timetable:", error);
      // Fall back to local cache on network error
      return this.getTimetableData();
    }
  },
};

/**
 * Auto-sync when back online + periodic sync every 5 minutes
 */
export const setupAutoSync = (
  getAuthToken: () => string | null,
  onSyncComplete?: () => void,
  onSyncError?: (error: Error) => void
) => {
  const SYNC_INTERVAL = 0.5 * 60 * 1000; // 5 minutes in milliseconds
  let syncIntervalId: ReturnType<typeof setInterval> | null = null;

  // Function to perform sync
  const performSync = async () => {
    const token = getAuthToken();
    if (!token) return;

    const { isSyncing, pendingChanges } = useNetworkStore.getState();
    
    if (isSyncing) return;

    console.log("[AutoSync] Starting periodic sync...");
    useNetworkStore.getState().setSyncing(true);

    try {
      // First, process any pending changes in the queue
      const queueResult = await offlineSyncService.processSyncQueue(token);
      console.log("[AutoSync] Queue processing result:", queueResult);
      
      // Then, fetch latest data from server to keep local cache updated
      const api = createApiClient(token);
      try {
        const response = await api.get("/data");
        if (response.data.success && response.data.data) {
          const serverData = response.data.data;
          await offlineSyncService.saveTimetableData({
            tutors: (serverData.tutors || []) as ITutor[],
            courses: (serverData.courses || []) as ICourse[],
            sessions: (serverData.sessions || []) as ISession[],
            blockedSlots: [],
            blockedTexts: [],
            templates: (serverData.templates || []) as ITimetableTemplate[],
          });
          console.log("[AutoSync] Local cache updated from server");
        }
      } catch {
        // Continue even if fetch fails - we still processed the queue
        console.log("[AutoSync] Could not fetch latest data, using cached data");
      }

      if (queueResult.success > 0 || pendingChanges > 0) {
        useNetworkStore.getState().setLastSyncTime(Date.now());
      }

      onSyncComplete?.();
    } catch (error) {
      console.error("[AutoSync] Sync failed:", error);
      const errorObj = error instanceof Error ? error : new Error("Sync failed");
      onSyncError?.(errorObj);
    } finally {
      useNetworkStore.getState().setSyncing(false);
    }
  };

  // Handle network coming back online
  const handleOnline = async () => {
    const token = getAuthToken();
    if (!token) return;

    const { isSyncing, pendingChanges } = useNetworkStore.getState();
    
    if (isSyncing || pendingChanges === 0) return;

    console.log("[AutoSync] Network restored, processing sync queue...");
    await performSync();
  };

  // Setup online listener
  window.addEventListener("online", handleOnline);

  // Start periodic sync interval (every 5 minutes)
  syncIntervalId = setInterval(performSync, SYNC_INTERVAL);
  console.log(`[AutoSync] Periodic sync started - checking every ${SYNC_INTERVAL / 1000} seconds`);

  // Return cleanup function
  return () => {
    window.removeEventListener("online", handleOnline);
    if (syncIntervalId) {
      clearInterval(syncIntervalId);
      syncIntervalId = null;
      console.log("[AutoSync] Periodic sync stopped");
    }
  };
};

export default offlineSyncService;
