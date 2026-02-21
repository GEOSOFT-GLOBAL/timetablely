import { useEffect } from "react";
import { useNetworkStore } from "@/lib/offline-storage";
import { useDatabaseStore } from "@/store/databaseStore";
import { useAuthStore } from "@/store/authStore";
import { setupAutoSync } from "@/lib/offline-sync";
import { Cloud, CloudOff, RefreshCw, CheckCircle } from "lucide-react";
import { toast } from "sonner";

/**
 * Sync Status Indicator Component
 * Shows current sync status and provides manual sync button
 */
export function SyncStatus() {
  const { isOnline, isSyncing, pendingChanges, lastSyncTime } = useNetworkStore();
  const { isLoading: isDbLoading } = useDatabaseStore();
  const token = useAuthStore((state) => state.token);

  // Setup auto-sync when component mounts
  useEffect(() => {
    if (!token) return;

    const cleanup = setupAutoSync(
      () => token,
      () => {
        toast.success("Data synced successfully!");
      }
    );

    return cleanup;
  }, [token]);

  // Show offline indicator when offline
  useEffect(() => {
    if (!isOnline) {
      toast.warning("You're offline. Changes will be synced when you're back online.");
    }
  }, [isOnline]);

  const handleManualSync = async () => {
    if (!token || isSyncing || isDbLoading) return;

    const { syncWithServer } = useDatabaseStore.getState();
    const result = await syncWithServer();

    if (result.success) {
      toast.success("Data synced successfully!");
    } else {
      toast.error(result.error || "Sync failed");
    }
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
