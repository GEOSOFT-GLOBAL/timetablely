import * as React from "react";
import { MoreVertical } from "lucide-react";
import type { GridHeaderProps } from "@/interface/props";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const GridHeader: React.FC<GridHeaderProps> = ({
  time,
  index,
  hoveredColumn,
  editingDuration,
  openPopover,
  tempDuration,
  columnCount,
  onMouseEnter,
  onMouseLeave,
  onTempDurationChange,
  onKeyDown,
  onBlur,
  onOpenPopoverChange,
  onStartEditingDuration,
  onAddColumnAfter,
  onDeleteColumn,
}) => {
  return (
    <th
      className={`bg-muted border-2 border-border h-12 w-16 font-semibold text-foreground text-center sticky top-0 z-10 text-sm whitespace-nowrap relative group cursor-pointer transition-all duration-200 ${
        hoveredColumn === index ? "bg-muted/80" : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {editingDuration === index ? (
        <div className="flex items-center justify-center h-full px-1">
          <Input
            type="number"
            value={tempDuration}
            onChange={(e) => onTempDurationChange(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            className="w-full min-w-[50px] h-8 text-xs text-center"
            autoFocus
            placeholder="minutes"
            min="5"
            max="480"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full px-1">
          <div className="text-xs text-left leading-tight pl-3">
            {time.includes("-") ? (
              <>
                <span>{time.split("-")[0]}-</span>
                <wbr />
                <span>{time.split("-")[1]}</span>
              </>
            ) : (
              <span>{time}</span>
            )}
          </div>
        </div>
      )}

      {hoveredColumn === index && editingDuration === null && (
        <div className="absolute -top-1 right-1 z-[100]">
          <Popover
            open={openPopover === index}
            onOpenChange={onOpenPopoverChange}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 bg-background shadow-lg"
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-1" align="center" sideOffset={5}>
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onStartEditingDuration}
                  className="justify-start text-sm h-9"
                >
                  <span className="mr-2">✏️</span> Edit Duration
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onAddColumnAfter}
                  className="justify-start text-sm h-9"
                >
                  <span className="mr-2">➕</span> Add Column
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDeleteColumn}
                  disabled={columnCount <= 1}
                  className={`justify-start text-sm h-9 ${
                    columnCount > 1
                      ? "hover:bg-destructive/10 hover:text-destructive"
                      : ""
                  }`}
                >
                  <span className="mr-2">🗑️</span> Delete Column
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </th>
  );
};

export default GridHeader;
