/**
 * Offline Storage - Main entry point
 * Re-exports all offline storage functionality
 */

// Re-export IndexedDB helper
export { offlineDB, STORES } from "./offline-db";

// Re-export sync service and types
export { offlineSyncService, setupAutoSync } from "./offline-sync";
export type { SyncQueueItem } from "./offline-sync";

// Re-export network store
export { useNetworkStore } from "@/store/networkStore";
export type { NetworkState } from "@/store/networkStore";
