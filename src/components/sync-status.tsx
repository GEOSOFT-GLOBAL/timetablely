import { useEffect, useRef, useCallback } from "react";
import { useNetworkStore } from "@/lib/offline-storage";
import { useDatabaseStore } from "@/store/databaseStore";
import { useAuthStore } from "@/store/authStore";
import { offlineSyncService } from "@/lib/offline-sync";
import { createApiClient } from "@/config/axios";
import { Cloud, CloudOff, RefreshCw, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Sync Status Indicator Component
 * Shows current sync status and provides manual sync button
 * Auto-syncs every 5 minutes
 */
export function SyncStatus() {
  const { isOnline, isSyncing, pendingChanges, lastSyncTime } = useNetworkStore();
  const { isLoading: isDbLoading } = useDatabaseStore();
  const token = useAuthStore((state) => state.token);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Poll for pending changes count
  const refreshPendingCount = useCallback(async () => {
    try {
      const queue = await offlineSyncService.getSyncQueue();
      const count = queue.length;
      useNetworkStore.getState().setPendingChanges(count);
      console.log("[SyncStatus] Pending changes:", count);
      return count;
    } catch (error) {
      console.error("[SyncStatus] Failed to get pending count:", error);
      return 0;
    }
  }, []);

  // Load initial pending changes count on mount and set up polling
  useEffect(() => {
    refreshPendingCount();
    
    // Poll every 2 seconds to check for new pending changes
    const pollInterval = setInterval(refreshPendingCount, 2000);
    
    return () => clearInterval(pollInterval);
  }, [refreshPendingCount]);

  // Function to perform sync
  const performSync = async () => {
    if (!token) return;
    
    const { isSyncing: currentlySyncing } = useNetworkStore.getState();
    if (currentlySyncing) return;

    console.log("[SyncStatus] Starting periodic sync...");
    useNetworkStore.getState().setSyncing(true);

    try {
      // First, process any pending changes in the queue
      const queueResult = await offlineSyncService.processSyncQueue(token);
      console.log("[SyncStatus] Queue processing result:", queueResult);
      
      // Then, fetch latest data from server to keep local cache updated
      const api = createApiClient(token);
      try {
        const response = await api.get("/data");
        if (response.data.success && response.data.data) {
          const serverData = response.data.data;
          await offlineSyncService.saveTimetableData({
            tutors: serverData.tutors || [],
            courses: serverData.courses || [],
            sessions: serverData.sessions || [],
            blockedSlots: [],
            blockedTexts: [],
            templates: serverData.templates || [],
          });
          console.log("[SyncStatus] Local cache updated from server");
        }
      } catch {
        // Continue even if fetch fails - we still processed the queue
        console.log("[SyncStatus] Could not fetch latest data, using cached data");
      }

      if (queueResult.success > 0 || pendingChanges > 0) {
        useNetworkStore.getState().setLastSyncTime(Date.now());
      }

      toast.success("Data synced successfully!");
    } catch (error) {
      console.error("[SyncStatus] Sync failed:", error);
    } finally {
      useNetworkStore.getState().setSyncing(false);
    }
  };

  // Setup auto-sync interval when component mounts
  useEffect(() => {
    if (!token) return;

    // Start periodic sync
    intervalRef.current = setInterval(performSync, SYNC_INTERVAL);
    console.log(`[SyncStatus] Periodic sync started - every ${SYNC_INTERVAL / 1000 / 60} minutes`);

    // Also run sync immediately
    performSync();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("[SyncStatus] Periodic sync stopped");
      }
    };
  }, [token]);

  // Show offline indicator when offline
  useEffect(() => {
    if (!isOnline) {
      toast.warning("You're offline. Changes will be synced when you're back online.");
    }
  }, [isOnline]);

  const handleManualSync = async () => {
    if (!token || isSyncing || isDbLoading) return;
    await performSync();
  };

  const formatLastSync = () => {
    if (!lastSyncTime) return "Never";
    const diff = Date.now() - lastSyncTime;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return "Yesterday";
  };

  const isLoading = isSyncing || isDbLoading;

  return (
    <div className="flex items-center gap-2 text-sm">
      {/* Online/Offline Status */}
      {isOnline ? (
        <Cloud className="w-4 h-4 text-green-500" />
      ) : (
        <CloudOff className="w-4 h-4 text-yellow-500" />
      )}

      {/* Pending Changes Badge */}
      {pendingChanges > 0 && (
        <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-500 rounded-full">
          {pendingChanges} pending
        </span>
      )}

      {/* Last Sync Time */}
      <span className="text-muted-foreground text-xs">
        {formatLastSync()}
      </span>

      {/* Sync Button */}
      <button
        onClick={handleManualSync}
        disabled={!isOnline || isLoading || !token}
        className="p-1 hover:bg-accent rounded disabled:opacity-50"
        title="Sync now"
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
      </button>

      {/* Synced Indicator */}
      {isOnline && pendingChanges === 0 && lastSyncTime && (
        <CheckCircle className="w-4 h-4 text-green-500" />
      )}
    </div>
  );
}

export default SyncStatus;
