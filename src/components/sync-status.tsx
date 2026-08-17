import { useEffect, useRef, useCallback } from "react";
import { useNetworkStore } from "@/lib/offline-storage";
import { useDatabaseStore } from "@/store/databaseStore";
import { useAuthStore } from "@/store/authStore";
import {
  offlineSyncService,
  runSync,
  SYNC_INTERVAL,
  type SyncOutcome,
} from "@/lib/offline-sync";
import { Cloud, CloudOff, RefreshCw, CheckCircle } from "lucide-react";
import { toast } from "sonner";

/** How often the pending badge re-reads the queue. */
const QUEUE_POLL_INTERVAL = 2000;

const changeCount = (count: number) =>
  `${count} ${count === 1 ? "change" : "changes"}`;

/**
 * Sync Status Indicator Component
 * Shows current sync status and provides manual sync button
 *
 * Toasts are deliberately asymmetric. A background run announces itself only
 * when it moved the user's own offline edits to the server or failed to —
 * pulling fresh data is visible in the UI already, and a periodic timer saying
 * "synced" when nothing was pending is just noise. A run the user asked for
 * always answers, including when the answer is "nothing to do".
 */
export function SyncStatus() {
  const { isOnline, isSyncing, pendingChanges, lastSyncTime } =
    useNetworkStore();
  const { isLoading: isDbLoading } = useDatabaseStore();
  const token = useAuthStore((state) => state.token);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Poll for pending changes count
  const refreshPendingCount = useCallback(async () => {
    try {
      const queue = await offlineSyncService.getSyncQueue();
      useNetworkStore.getState().setPendingChanges(queue.length);
    } catch (error) {
      console.error("[SyncStatus] Failed to get pending count:", error);
    }
  }, []);

  useEffect(() => {
    void refreshPendingCount();
    const pollInterval = setInterval(
      () => void refreshPendingCount(),
      QUEUE_POLL_INTERVAL
    );
    return () => clearInterval(pollInterval);
  }, [refreshPendingCount]);

  /** Runs a sync and reports it according to who asked for it. */
  const performSync = useCallback(
    async (trigger: "auto" | "manual") => {
      if (!token) return;

      let outcome: SyncOutcome | null = null;
      try {
        outcome = await runSync(token, (database) => {
          void useDatabaseStore.getState().setDatabaseFromServer(database);
        });
      } catch (error) {
        console.error("[SyncStatus] Sync failed:", error);
        if (trigger === "manual") {
          toast.error("Sync failed. Your changes are still saved locally.");
        }
        return;
      }

      // Another run was already in flight; it will report for both of us.
      if (!outcome) return;

      if (outcome.failed > 0) {
        toast.error(
          `Could not sync ${changeCount(outcome.failed)}. Will retry shortly.`
        );
        return;
      }

      if (outcome.pushed > 0) {
        toast.success(`Synced ${changeCount(outcome.pushed)}.`);
        return;
      }

      if (trigger === "manual") {
        if (!outcome.reachedServer) {
          toast.error("Could not reach the server. Working from your device.");
        } else if (outcome.pulled) {
          toast.success("Brought in the latest changes.");
        } else {
          toast.success("Everything is already up to date.");
        }
      }
    },
    [token]
  );

  // Setup auto-sync interval when component mounts
  useEffect(() => {
    if (!token) return;

    intervalRef.current = setInterval(
      () => void performSync("auto"),
      SYNC_INTERVAL
    );
    void performSync("auto");

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [token, performSync]);

  // Show offline indicator when offline
  useEffect(() => {
    if (!isOnline) {
      toast.warning(
        "You're offline. Changes will be synced when you're back online."
      );
    }
  }, [isOnline]);

  const handleManualSync = async () => {
    if (!token || isSyncing || isDbLoading) return;
    await performSync("manual");
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
      <span className="text-muted-foreground text-xs">{formatLastSync()}</span>

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
