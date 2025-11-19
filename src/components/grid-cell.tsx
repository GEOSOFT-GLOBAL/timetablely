import { getAlignmentClass } from "@/helpers/grid-helper";
import type { GridCellProps } from "@/interface/props";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  MoreVertical,
  RotateCcw,
  Palette,
} from "lucide-react";
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const GridCell: React.FC<GridCellProps> = ({
  row,
  col,
  cellKey,
  isSelected,
  isColumnHovered,
  mergeInfo,
  hiddenCells,
  cellContent,
  editingCell,
  tempCellText,
  onCellClick,
  onCellDoubleClick,
  onTempCellTextChange,
  onSaveCellEdit,
  onCancelCellEdit,
  onToggleCellVertical,
  onSetCellAlignment,
  onSetCellBackgroundColor,
}) => {
  const [showCellMenu, setShowCellMenu] = React.useState(false);

  if (hiddenCells.has(cellKey)) {
    return null;
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSaveCellEdit();
    }
    if (e.key === "Escape") {
      onCancelCellEdit();
    }
  };

  const hasContent = cellContent && cellContent.text.trim();
  const alignmentClass = getAlignmentClass(cellContent?.alignment || "center");
  const backgroundColor = cellContent?.backgroundColor;
  
  // Determine the background color based on state
  const getBgColor = () => {
    if (editingCell === cellKey) return "bg-yellow-50";
    if (isSelected) return "bg-blue-300";
    if (mergeInfo) return "bg-green-100";
    if (isColumnHovered && !backgroundColor) return "bg-gray-50";
    return backgroundColor ? "" : "bg-white";
  };

  return (
    <td
      key={cellKey}
      className={`
        border-2 border-gray-400 h-[100px] w-[150px] cursor-pointer transition-all duration-200 relative group
        ${getBgColor()}
        ${!backgroundColor ? "hover:bg-gray-100" : ""}
        ${isSelected ? "border-blue-500 shadow-lg" : ""}
        ${mergeInfo ? "border-green-500" : ""}
        ${editingCell === cellKey ? "border-yellow-400" : ""}
      `}
      style={{
        backgroundColor: backgroundColor && editingCell !== cellKey && !isSelected && !mergeInfo ? backgroundColor : undefined,
      }}
      rowSpan={mergeInfo?.rowSpan || 1}
      colSpan={mergeInfo?.colSpan || 1}
      onClick={() => onCellClick(row, col)}
      onDoubleClick={() => onCellDoubleClick(row, col)}
    >
      <div className="flex items-center justify-center h-full text-sm font-medium text-gray-700 relative p-2">
        {editingCell === cellKey ? (
          <textarea
            value={tempCellText}
            onChange={(e) => onTempCellTextChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={onSaveCellEdit}
            className="w-full h-full resize-none border rounded px-2 py-1 text-sm"
            autoFocus
            placeholder="Enter text..."
          />
        ) : (
          <>
            {hasContent ? (
              <div
                className={`
                w-full h-full flex items-center justify-center
                ${alignmentClass}
              `}
                style={{
                  transform: cellContent.isVertical ? "rotate(90deg)" : "none",
                  transformOrigin: "center",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  className="block wrap-break-words origin-center"
                  style={{
                    maxWidth: cellContent.isVertical ? "20px" : "100%",
                    lineHeight: "1.2",
                  }}
                >
                  {cellContent.text.split("\n").map((line, index) => {
                    // Check if this line is a teacher name (starts with parenthesis)
                    if (line.startsWith("(") && line.endsWith(")")) {
                      return (
                        <div
                          key={index}
                          className="text-xs"
                          style={{ fontSize: "50%" }}
                        >
                          {line}
                        </div>
                      );
                    }
                    return <div key={index}>{line}</div>;
                  })}
                </div>
              </div>
            ) : (
              <span className="text-gray-400 text-xs">
                {mergeInfo
                  ? `${mergeInfo.rowSpan}×${mergeInfo.colSpan}`
                  : `${row},${col}`}
              </span>
            )}

            {/* Cell menu - only show when cell has content or is hovered */}
            {(hasContent || isSelected) && (
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Popover open={showCellMenu} onOpenChange={setShowCellMenu}>
                  <PopoverTrigger asChild>
                    <button
                      className="bg-white border border-gray-300 rounded p-1 shadow-lg hover:bg-gray-50 outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCellMenu(!showCellMenu);
                      }}
                    >
                      <MoreVertical size={10} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-48 p-1"
                    align="center"
                    sideOffset={5}
                  >
                    <div className="flex flex-col">
                      <button
                        onClick={() => {
                          onCellDoubleClick(row, col);
                          setShowCellMenu(false);
                        }}
                        className="px-3 py-2 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <span>✏️</span> Edit Text
                      </button>

                      <button
                        onClick={() => {
                          onToggleCellVertical(cellKey);
                          setShowCellMenu(false);
                        }}
                        className="px-3 py-2 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2"
                      >
                        <RotateCcw size={14} />
                        {cellContent?.isVertical ? "Horizontal" : "Vertical"}
                      </button>

                      <div className="border-t border-gray-200 my-1" />

                      <div className="px-3 py-1 text-xs font-medium text-gray-500">
                        Alignment
                      </div>

                      <button
                        onClick={() => {
                          onSetCellAlignment(cellKey, "left");
                          setShowCellMenu(false);
                        }}
                        className={`px-3 py-2 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2 ${
                          cellContent?.alignment === "left"
                            ? "bg-blue-50 text-blue-600"
                            : ""
                        }`}
                      >
                        <AlignLeft size={14} /> Left
                      </button>

                      <button
                        onClick={() => {
                          onSetCellAlignment(cellKey, "center");
                          setShowCellMenu(false);
                        }}
                        className={`px-3 py-2 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2 ${
                          cellContent?.alignment === "center"
                            ? "bg-blue-50 text-blue-600"
                            : ""
                        }`}
                      >
                        <AlignCenter size={14} /> Center
                      </button>

                      <button
                        onClick={() => {
                          onSetCellAlignment(cellKey, "right");
                          setShowCellMenu(false);
                        }}
                        className={`px-3 py-2 text-left text-sm hover:bg-gray-100 rounded flex items-center gap-2 ${
                          cellContent?.alignment === "right"
                            ? "bg-blue-50 text-blue-600"
                            : ""
                        }`}
                      >
                        <AlignRight size={14} /> Right
                      </button>

                      <div className="border-t border-gray-200 my-1" />

                      <div className="px-3 py-1 text-xs font-medium text-gray-500 flex items-center gap-2">
                        <Palette size={12} />
                        Background Color
                      </div>

                      <div className="px-3 py-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-gray-600">Custom:</label>
                          <input
                            type="color"
                            value={cellContent?.backgroundColor || "#ffffff"}
                            onChange={(e) => {
                              e.stopPropagation();
                              onSetCellBackgroundColor(cellKey, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full h-8 cursor-pointer rounded border border-gray-300"
                          />
                        </div>
                        <div className="grid grid-cols-5 gap-1">
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
                              onClick={(e) => {
                                e.stopPropagation();
                                onSetCellBackgroundColor(cellKey, color);
                              }}
                              className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSetCellBackgroundColor(cellKey, "");
                            setShowCellMenu(false);
                          }}
                          className="w-full px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                        >
                          Clear Color
                        </button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </>
        )}
      </div>
    </td>
  );
};

export default GridCell;
