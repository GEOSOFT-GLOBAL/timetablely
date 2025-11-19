import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GridCell from "@/components/grid-cell";
import GridHeader from "@/components/grid-header";
import { dayLabels, gridSize } from "@/constants";
import { useGridState } from "@/hooks/use-grid";
import { canMergeCells, generateTimeLabels } from "@/lib/temputils";
import { exportTimetableToPDF } from "@/lib/pdf-export";
import { sampleDatabase } from "@/mock/load-data";
import { generateAutomatedTimetable } from "@/lib/timetable";
import { ArrowLeft, Sparkles, RefreshCw, Merge, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IconFileTypePdf } from "@tabler/icons-react";

const QuickStart: React.FC = () => {
  const navigate = useNavigate();
  const gridState = useGridState();
  const [database] = React.useState(sampleDatabase);
  const [showColorPalette, setShowColorPalette] = React.useState(false);

  const {
    selectedCells,
    mergedCells,
    hiddenCells,
    columnCount,
    hoveredColumn,
    openPopover,
    editingDuration,
    tempDuration,
    defaultSlotDuration,
    columnDurations,
    cellContents,
    editingCell,
    tempCellText,
    handleCellClick,
    handleCellDoubleClick,
    mergeCells,
    addColumnAfter,
    deleteColumn,
    startEditingDuration,
    saveDurationEdit,
    cancelDurationEdit,
    setHoveredColumn,
    setOpenPopover,
    setTempCellText,
    toggleCellVertical,
    setCellAlignment,
    setCellBackgroundColor,
    setSelectedCellsBackgroundColor,
    saveCellEdit,
    cancelCellEdit,
    resetGrid,
  } = gridState;

  const timeLabels = generateTimeLabels(
    columnCount,
    columnDurations,
    defaultSlotDuration
  );

  const handleDurationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveDurationEdit();
    if (e.key === "Escape") cancelDurationEdit();
  };

  const handleGenerateTimetable = () => {
    const newCellContents = generateAutomatedTimetable(
      database,
      columnCount,
      cellContents,
      hiddenCells
    );
    gridState.setAllCellContents(newCellContents);
  };

  const handleExportPDF = () => {
    try {
      exportTimetableToPDF({
        cellContents,
        columnCount,
        columnDurations,
        defaultSlotDuration,
        hiddenCells,
        title: "Quick Start Timetable",
        subtitle: "Generated with Timetablely",
      });
    } catch (error) {
      console.error("PDF Export Error:", error);
    }
  };

  const renderCell = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    const isSelected = selectedCells.has(cellKey);
    const mergeInfo = mergedCells.get(cellKey);
    const isColumnHovered = hoveredColumn === col;
    const cellContent = cellContents.get(cellKey);

    return (
      <GridCell
        key={cellKey}
        row={row}
        col={col}
        cellKey={cellKey}
        isSelected={isSelected}
        isColumnHovered={isColumnHovered}
        mergeInfo={mergeInfo}
        hiddenCells={hiddenCells}
        cellContent={cellContent}
        editingCell={editingCell}
        tempCellText={tempCellText}
        onCellClick={handleCellClick}
        onCellDoubleClick={handleCellDoubleClick}
        onTempCellTextChange={setTempCellText}
        onSaveCellEdit={saveCellEdit}
        onCancelCellEdit={cancelCellEdit}
        onToggleCellVertical={toggleCellVertical}
        onSetCellAlignment={setCellAlignment}
        onSetCellBackgroundColor={setCellBackgroundColor}
      />
    );
  };

  const renderHeader = (time: string, index: number) => (
    <GridHeader
      key={index}
      time={time}
      index={index}
      hoveredColumn={hoveredColumn}
      editingDuration={editingDuration}
      openPopover={openPopover}
      tempDuration={tempDuration}
      columnCount={columnCount}
      onMouseEnter={() => setHoveredColumn(index)}
      onMouseLeave={() => setHoveredColumn(null)}
      onTempDurationChange={gridState.setTempDuration}
      onKeyDown={handleDurationKeyDown}
      onBlur={saveDurationEdit}
      onOpenPopoverChange={(open: boolean) =>
        setOpenPopover(open ? index : null)
      }
      onStartEditingDuration={() => startEditingDuration(index)}
      onAddColumnAfter={() => addColumnAfter(index)}
      onDeleteColumn={() => deleteColumn(index)}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="size-4" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Quick Start Timetable</h1>
                <p className="text-sm text-muted-foreground">
                  Try our timetable generator - no signup required!
                </p>
              </div>
            </div>
            <Button onClick={() => navigate("/auth/login")} className="gap-2">
              <Sparkles className="size-4" />
              Sign Up for Full Access
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Controls */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  className="w-full gap-2"
                  onClick={handleGenerateTimetable}
                >
                  <Sparkles className="size-4" />
                  Generate Sample
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleExportPDF}
                >
                  <IconFileTypePdf className="size-4" />
                  Export PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={mergeCells}
                  disabled={!canMergeCells(selectedCells)}
                >
                  <Merge className="size-4" />
                  Merge Cells
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => setShowColorPalette(!showColorPalette)}
                  disabled={selectedCells.size === 0}
                >
                  <Palette className="size-4" />
                  Color Cells
                </Button>
                {showColorPalette && selectedCells.size > 0 && (
                  <div className="p-3 border rounded-lg space-y-2 bg-gray-50 dark:bg-neutral-800">
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
                            setSelectedCellsBackgroundColor(color);
                            setShowColorPalette(false);
                          }}
                          className="w-full h-8 rounded border-2 border-gray-300 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <Button
                  variant="destructive"
                  className="w-full gap-2"
                  onClick={resetGrid}
                >
                  <RefreshCw className="size-4" />
                  Reset Grid
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sample Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tutors:</span>
                  <span className="font-medium">{database.tutors.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Courses:</span>
                  <span className="font-medium">{database.courses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sessions:</span>
                  <span className="font-medium">
                    {database.sessions.length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  💡 <strong>Tip:</strong> Double-click cells to edit, select
                  multiple cells to merge or color them!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Timetable Grid */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle>Weekly Timetable</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>
                      Interactive timetable - try editing, merging, and coloring
                      cells!
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px] font-semibold text-center sticky left-0 bg-background">
                          Time / Day
                        </TableHead>
                        {timeLabels.map(renderHeader)}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.from({ length: gridSize }, (_, row) => (
                        <tr key={row}>
                          <td className="bg-gray-200 border-2 border-gray-400 h-16 w-32 font-semibold text-gray-700 text-center sticky left-0 z-10 dark:bg-neutral-800 dark:text-neutral-200">
                            <div className="flex items-center justify-center h-full">
                              {dayLabels[row]}
                            </div>
                          </td>
                          {Array.from({ length: columnCount }, (_, col) =>
                            renderCell(row, col)
                          )}
                        </tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStart;
