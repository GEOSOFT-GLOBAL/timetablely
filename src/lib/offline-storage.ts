import axios, { AxiosError } from "axios";
import { create } from "zustand";
import type { ITimetableDatabase, ITimetableTemplate, ITutor, ICourse, ISession } from "@/interface/database";

// Database name and version
const DB_NAME = "timetablely-offline";
const DB_VERSION = 1;

// Store names
const STORES = {
  TIMETABLE_DATA: "timetable-data",
  SYNC_QUEUE: "sync-queue",
  SETTINGS: "settings",
} as const;

// IndexedDB helper
class OfflineStorage {
  private db: IDBDatabase | null = null;
  private dbReady: Promise<IDBDatabase>;

  constructor() {
    this.dbReady = this.initDB();
  }

  private async initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error("Failed to open IndexedDB:", request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains(STORES.TIMETABLE_DATA)) {
          db.createObjectStore(STORES.TIMETABLE_DATA, { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
          const syncStore = db.createObjectStore(STORES.SYNC_QUEUE, {
            keyPath: "id",
            autoIncrement: true,
          });
          syncStore.createIndex("type", "type", { unique: false });
          syncStore.createIndex("timestamp", "timestamp", { unique: false });
        }

        if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
          db.createObjectStore(STORES.SETTINGS, { keyPath: "key" });
        }
      };
    });
  }

  async getDB(): Promise<IDBDatabase> {
    return this.dbReady;
  }

  // Generic CRUD operations
  async get<T>(storeName: string, key: string): Promise<T | undefined> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async put<T>(storeName: string, value: T): Promise<number> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(value);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result as number);
    });
  }

  async delete(storeName: string, key: string | number): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(storeName: string): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAllByIndex<T>(
    storeName: string,
    indexName: string,
    value: IDBValidKey
  ): Promise<T[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }
}

// Create singleton instance
const offlineStorage = new OfflineStorage();

// Sync Queue Types
export interface SyncQueueItem {
  id?: number;
  type: "timetable" | "template" | "tutor" | "course" | "session" | "specialBlock";
  action: "create" | "update" | "delete";
  data: unknown;
  timestamp: number;
  retryCount: number;
  lastError?: string;
}

// Extended timetable data with metadata for storage
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

// API Configuration
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// Create axios instance
const createApiClient = (token?: string) => {
  return axios.create({
    baseURL: `${API_BASE}/timetablely/sync`,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    timeout: 30000,
  });
};

// Network status store
interface NetworkState {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncTime: number | null;
  pendingChanges: number;
  setOnline: (online: boolean) => void;
  setSyncing: (syncing: boolean) => void;
  setLastSyncTime: (time: number) => void;
  setPendingChanges: (count: number) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
  isSyncing: false,
  lastSyncTime: null,
  pendingChanges: 0,
  setOnline: (online) => set({ isOnline: online }),
  setSyncing: (syncing) => set({ isSyncing: syncing }),
  setLastSyncTime: (time) => set({ lastSyncTime: time }),
  setPendingChanges: (count) => set({ pendingChanges: count }),
}));

// Offline Storage Service
export const offlineStorageService = {
  // Timetable Data Operations
  async saveTimetableData(data: ITimetableDatabase): Promise<void> {
    await offlineStorage.put(STORES.TIMETABLE_DATA, {
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
    const result = await offlineStorage.get<TimetableDataWithMeta>(
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
    await offlineStorage.clear(STORES.TIMETABLE_DATA);
  },

  // Sync Queue Operations
  async addToSyncQueue(item: Omit<SyncQueueItem, "id" | "timestamp" | "retryCount">): Promise<void> {
    const queueItem: SyncQueueItem = {
      ...item,
      timestamp: Date.now(),
      retryCount: 0,
    };

    await offlineStorage.put(STORES.SYNC_QUEUE, queueItem);
    
    // Update pending changes count
    const items = await offlineStorage.getAll<SyncQueueItem>(STORES.SYNC_QUEUE);
    useNetworkStore.getState().setPendingChanges(items.length);
  },

  async getSyncQueue(): Promise<SyncQueueItem[]> {
    return offlineStorage.getAll<SyncQueueItem>(STORES.SYNC_QUEUE);
  },

  async removeFromSyncQueue(id: number): Promise<void> {
    await offlineStorage.delete(STORES.SYNC_QUEUE, id);
    
    // Update pending changes count
    const items = await offlineStorage.getAll<SyncQueueItem>(STORES.SYNC_QUEUE);
    useNetworkStore.getState().setPendingChanges(items.length);
  },

  async updateSyncQueueItem(item: SyncQueueItem): Promise<void> {
    await offlineStorage.put(STORES.SYNC_QUEUE, item);
  },

  async clearSyncQueue(): Promise<void> {
    await offlineStorage.clear(STORES.SYNC_QUEUE);
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

// Network status listeners
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    useNetworkStore.getState().setOnline(true);
    console.log("Network: Online");
  });

  window.addEventListener("offline", () => {
    useNetworkStore.getState().setOnline(false);
    console.log("Network: Offline");
  });
}

// Auto-sync when back online
export const setupAutoSync = (
  getAuthToken: () => string | null,
  onSyncComplete?: () => void
) => {
  const handleOnline = async () => {
    const token = getAuthToken();
    if (!token) return;

    const { isSyncing, pendingChanges } = useNetworkStore.getState();
    
    if (isSyncing || pendingChanges === 0) return;

    console.log("Network restored, processing sync queue...");
    useNetworkStore.getState().setSyncing(true);

    try {
      const result = await offlineStorageService.processSyncQueue(token);
      console.log("Sync result:", result);
      
      if (result.success > 0) {
        useNetworkStore.getState().setLastSyncTime(Date.now());
      }

      onSyncComplete?.();
    } catch (error) {
      console.error("Auto-sync failed:", error);
    } finally {
      useNetworkStore.getState().setSyncing(false);
    }
  };

  window.addEventListener("online", handleOnline);

  // Return cleanup function
  return () => {
    window.removeEventListener("online", handleOnline);
  };
};

export default offlineStorageService;
