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
  Palette,
} from "lucide-react";
import { IconFileTypePdf } from "@tabler/icons-react";

const GridControlls: React.FC<GridControlsProps> = ({
  canMerge,
  columnCount,
  onResetGrid,
  onExportData,
  onExportPDF,
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
  onSetSelectedCellsBackgroundColor,
}) => {
  const [showColorPalette, setShowColorPalette] = React.useState(false);

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

          {onSetSelectedCellsBackgroundColor && (
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => setShowColorPalette(!showColorPalette)}
                disabled={selectedCellsCount === 0}
              >
                <Palette className="size-4" />
                Color Selected Cells
              </Button>

              {showColorPalette && selectedCellsCount > 0 && (
                <div className="p-3 border rounded-lg space-y-2 bg-gray-50">
                  <Label className="text-xs">Custom Color:</Label>
                  <input
                    type="color"
                    onChange={(e) => {
                      onSetSelectedCellsBackgroundColor(e.target.value);
                    }}
                    className="w-full h-10 cursor-pointer rounded border border-gray-300"
                  />
                  <Label className="text-xs">Preset Colors:</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      "#ffffff",
                      "#f3f4f6",
                      "#fef3c7",
                      "#fecaca",
                      "#fed7aa",
                      "#d1fae5",
                      "#bfdbfe",
                      "#ddd6fe",
                      "#fbcfe8",
                      "#fce7f3",
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          onSetSelectedCellsBackgroundColor(color);
                        }}
                        className="w-full h-8 rounded border-2 border-gray-300 hover:scale-110 transition-transform hover:border-gray-500"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700"
                    onClick={() => {
                      onSetSelectedCellsBackgroundColor("");
                    }}
                  >
                    Clear Color
                  </Button>
                </div>
              )}
            </div>
          )}

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={onExportData}
          >
            <DownloadIcon className="size-4" />
            Export JSON
          </Button>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={onExportPDF}
          >
            <IconFileTypePdf className="size-4" />
            Export PDF
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
