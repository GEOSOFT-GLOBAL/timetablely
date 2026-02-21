import { create } from "zustand";

/**
 * Network status state interface
 */
export interface NetworkState {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncTime: number | null;
  pendingChanges: number;
  setOnline: (online: boolean) => void;
  setSyncing: (syncing: boolean) => void;
  setLastSyncTime: (time: number) => void;
  setPendingChanges: (count: number) => void;
}

/**
 * Network status store using Zustand
 * Tracks online/offline status, sync state, and pending changes count
 */
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

// Initialize network listeners
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

export default useNetworkStore;
