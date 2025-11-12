import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GridControlsProps } from "@/interface/props";
import {
  MergeIcon,
  DownloadIcon,
  RefreshCwIcon,
  ClockIcon,
} from "lucide-react";

const GridControlls: React.FC<GridControlsProps> = ({
  canMerge,
  columnCount,
  onResetGrid,
  onExportData,
  onMergeCells,
  selectedCellsCount,
  tempDefaultDuration,
  defaultSlotDuration,
  editingDefaultDuration,
  onSaveDefaultDurationEdit,
  onCancelDefaultDurationEdit,
  onStartEditingDefaultDuration,
  onTempDefaultDurationChange,
  onDefaultDurationKeyDown,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClockIcon className="size-5" />
          Grid Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Default Duration */}
        <div className="space-y-2">
          <Label>Default Slot Duration (minutes)</Label>
          {editingDefaultDuration ? (
            <div className="flex gap-2">
              <Input
                type="number"
                value={tempDefaultDuration}
                onChange={(e) => onTempDefaultDurationChange(e.target.value)}
                onKeyDown={onDefaultDurationKeyDown}
                className="flex-1"
                autoFocus
              />
              <Button size="sm" onClick={onSaveDefaultDurationEdit}>
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onCancelDefaultDurationEdit}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{defaultSlotDuration} min</p>
              <Button
                size="sm"
                variant="outline"
                onClick={onStartEditingDefaultDuration}
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        {/* Grid Info */}
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-medium">Columns:</span> {columnCount}
          </p>
          <p>
            <span className="font-medium">Selected Cells:</span>{" "}
            {selectedCellsCount}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={onMergeCells}
            disabled={!canMerge}
          >
            <MergeIcon className="size-4" />
            Merge Selected Cells
          </Button>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={onExportData}
          >
            <DownloadIcon className="size-4" />
            Export Data
          </Button>

          <Button
            variant="destructive"
            className="w-full gap-2"
            onClick={onResetGrid}
          >
            <RefreshCwIcon className="size-4" />
            Reset Grid
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GridControlls;
