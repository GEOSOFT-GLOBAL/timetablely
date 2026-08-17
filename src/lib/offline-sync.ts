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
 * What a sync run actually did.
 *
 * The distinction matters: a run that pushed nothing and pulled nothing is a
 * no-op the user should never hear about, and the UI decides what to announce
 * from these numbers rather than announcing that the run happened at all.
 */
export interface SyncOutcome {
  /** Queued offline changes the server accepted. */
  pushed: number;
  /** Queued changes the server rejected; they stay in the queue for a retry. */
  failed: number;
  /** The server held data we did not already have, now applied locally. */
  pulled: boolean;
  /** False when the fetch failed, i.e. we are working from cache alone. */
  reachedServer: boolean;
  errors: string[];
}

/** Nothing moved in either direction. */
export const isNoOpSync = (outcome: SyncOutcome) =>
  outcome.pushed === 0 && outcome.failed === 0 && !outcome.pulled;

/**
 * Key order must not decide whether data counts as "changed" — Mongo and the
 * local store serialise the same record with fields in different orders.
 */
const stableStringify = (value: unknown): string => {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value) ?? "null";
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, entry]) => entry !== undefined)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  return `{${entries
    .map(([key, entry]) => `${JSON.stringify(key)}:${stableStringify(entry)}`)
    .join(",")}}`;
};

const fingerprintDatabase = (data: ITimetableDatabase): string =>
  stableStringify({
    tutors: data.tutors ?? [],
    courses: data.courses ?? [],
    sessions: data.sessions ?? [],
    templates: data.templates ?? [],
    blockedSlots: data.blockedSlots ?? [],
    blockedTexts: data.blockedTexts ?? [],
  });

/**
 * The fingerprint of the last payload the server gave us.
 *
 * Compared against the server's *previous* response rather than the local
 * cache on purpose: local edits change the cache constantly, so comparing
 * against it would report a change on every poll and defeat the whole point.
 */
const SERVER_FINGERPRINT_KEY = "server-data-fingerprint";

const readServerFingerprint = async (): Promise<string | null> => {
  try {
    const row = await offlineDB.get<{ key: string; value: string }>(
      STORES.SETTINGS,
      SERVER_FINGERPRINT_KEY
    );
    return row?.value ?? null;
  } catch {
    return null;
  }
};

const writeServerFingerprint = async (value: string): Promise<void> => {
  try {
    await offlineDB.put(STORES.SETTINGS, {
      key: SERVER_FINGERPRINT_KEY,
      value,
    });
  } catch {
    // Losing the fingerprint costs one redundant apply, not correctness.
  }
};

/** Server payloads carry no blocked-slot data yet; the shape still needs it. */
const asDatabase = (serverData: Record<string, unknown>): ITimetableDatabase => ({
  tutors: (serverData.tutors || []) as ITutor[],
  courses: (serverData.courses || []) as ICourse[],
  sessions: (serverData.sessions || []) as ISession[],
  blockedSlots: [],
  blockedTexts: [],
  templates: (serverData.templates || []) as ITimetableTemplate[],
});

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

/** How often a signed-in tab reconciles with the server. */
export const SYNC_INTERVAL = 5 * 60 * 1000;

/**
 * Push the queue, then pull anything new.
 *
 * Returns null when a sync is already in flight, so overlapping timers and an
 * impatient button press cannot double-send the same queue.
 *
 * `applyToServerData` is a callback rather than a direct store import because
 * the database store imports this module; calling into it from here would
 * close the cycle.
 */
export const runSync = async (
  token: string,
  applyToServerData?: (data: ITimetableDatabase) => void
): Promise<SyncOutcome | null> => {
  const network = useNetworkStore.getState();
  if (network.isSyncing) return null;

  network.setSyncing(true);

  try {
    const queueResult = await offlineSyncService.processSyncQueue(token);

    let pulled = false;
    let reachedServer = false;

    try {
      const api = createApiClient(token);
      const response = await api.get("/data");

      if (response.data?.success && response.data?.data) {
        reachedServer = true;
        const database = asDatabase(response.data.data);
        const fingerprint = fingerprintDatabase(database);

        // Identical to the last payload means there is nothing to apply and
        // nothing to announce.
        if (fingerprint !== (await readServerFingerprint())) {
          await offlineSyncService.saveTimetableData(database);
          applyToServerData?.(database);
          await writeServerFingerprint(fingerprint);
          pulled = true;
        }
      }
    } catch {
      // The queue still got processed; carry on with the cached copy.
    }

    // "Last synced" means the last time we successfully reached the server,
    // not the last time something happened to change.
    if (reachedServer || queueResult.success > 0) {
      useNetworkStore.getState().setLastSyncTime(Date.now());
    }

    return {
      pushed: queueResult.success,
      failed: queueResult.failed,
      pulled,
      reachedServer,
      errors: queueResult.errors,
    };
  } finally {
    useNetworkStore.getState().setSyncing(false);
  }
};

/**
 * Auto-sync when back online + periodic sync.
 *
 * `onSyncComplete` only fires for runs that moved data, so callers can treat
 * it as "something changed" rather than "the timer ticked".
 */
export const setupAutoSync = (
  getAuthToken: () => string | null,
  onSyncComplete?: (outcome: SyncOutcome) => void,
  onSyncError?: (error: Error) => void
) => {
  let syncIntervalId: ReturnType<typeof setInterval> | null = null;

  const performSync = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const outcome = await runSync(token);
      if (outcome && !isNoOpSync(outcome)) {
        onSyncComplete?.(outcome);
      }
    } catch (error) {
      console.error("[AutoSync] Sync failed:", error);
      onSyncError?.(
        error instanceof Error ? error : new Error("Sync failed")
      );
    }
  };

  // Coming back online only matters when there is something waiting to go out.
  const handleOnline = async () => {
    if (useNetworkStore.getState().pendingChanges === 0) return;
    await performSync();
  };

  window.addEventListener("online", handleOnline);
  syncIntervalId = setInterval(performSync, SYNC_INTERVAL);

  return () => {
    window.removeEventListener("online", handleOnline);
    if (syncIntervalId) {
      clearInterval(syncIntervalId);
      syncIntervalId = null;
    }
  };
};

export default offlineSyncService;
