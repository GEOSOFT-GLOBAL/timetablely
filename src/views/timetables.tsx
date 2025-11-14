/* eslint-disable @typescript-eslint/no-unused-vars */
import DatabaseManager from "@/components/database-manager";
import GridCell from "@/components/grid-cell";
import GridControlls from "@/components/grid-controlls";
import GridHeader from "@/components/grid-header";
import TemplateManager from "@/components/template-manager";
import TimetableControls from "@/components/timetable-controls";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { dayLabels, gridSize } from "@/constants";
import { useGridState } from "@/hooks/use-grid";
import type { applyTemplate } from "@/lib/template";
import { canMergeCells, generateTimeLabels } from "@/lib/temputils";
import {
  extractTimetableData,
  generateAutomatedTimetable,
  logTimetableData,
} from "@/lib/timetable";
import { sampleDatabase } from "@/mock/load-data";
import { useDatabaseStore } from "@/store/databaseStore";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import * as React from "react";

interface TimetablesProps {
  propName?: string;
}

const Timetables: React.FC<TimetablesProps> = () => {
  const gridState = useGridState();
  const { database, setDatabase } = useDatabaseStore();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<{
    title: string;
    message: string;
    type: "success" | "error" | "info";
  }>({ title: "", message: "", type: "info" });

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
    tempDefaultDuration,
    editingDefaultDuration,
    resetGrid,
    handleCellClick,
    handleCellDoubleClick,
    mergeCells,
    addColumnAfter,
    deleteColumn,
    startEditingDuration,
    saveDurationEdit,
    cancelDurationEdit,
    saveDefaultDurationEdit,
    cancelDefaultDurationEdit,
    setHoveredColumn,
    setOpenPopover,
    setTempCellText,
    toggleCellVertical,
    setCellAlignment,
    saveCellEdit,
    cancelCellEdit,
  } = gridState;

  const timeLabels = generateTimeLabels(
    columnCount,
    columnDurations,
    defaultSlotDuration
  );

  const handleDefaultDurationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveDefaultDurationEdit();
    if (e.key === "Escape") cancelDefaultDurationEdit();
  };

  const handleDurationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveDurationEdit();
    if (e.key === "Escape") cancelDurationEdit();
  };

  const startEditingDefaultDuration = () => {
    gridState.setEditingDefaultDuration(true);
    gridState.setTempDefaultDuration(defaultSlotDuration.toString());
  };

  const [expandedClasses, setExpandedClasses] = React.useState<{
    [key: string]: boolean;
  }>({});

  const showDialog = (
    title: string,
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setDialogContent({ title, message, type });
    setDialogOpen(true);
  };

  // Function to clear the timetable
  const handleClearTimetable = () => {
    gridState.setAllCellContents(new Map());
    showDialog("Success", "Timetable cleared successfully!", "success");
  };

  const handleExportData = () => {
    const timetableData = extractTimetableData(
      cellContents,
      hiddenCells,
      columnCount,
      columnDurations,
      defaultSlotDuration,
      mergedCells
    );

    logTimetableData(timetableData);

    // Also copy to clipboard as JSON
    navigator.clipboard
      .writeText(JSON.stringify(timetableData, null, 2))
      .then(() => {
        showDialog(
          "Success",
          "Timetable data copied to clipboard and logged to console!",
          "success"
        );
      })
      .catch(() => {
        showDialog(
          "Info",
          "Timetable data logged to console (clipboard copy failed)",
          "info"
        );
      });
  };

  const handleGenerateAutomatedTimetable = (classId?: string) => {
    if (database.courses.length === 0) {
      showDialog(
        "Error",
        "Please add subjects to the database first.",
        "error"
      );
      return;
    }

    const newCellContents = generateAutomatedTimetable(
      database,
      columnCount,
      cellContents,
      hiddenCells,
      classId
    );

    gridState.setAllCellContents(newCellContents);

    // Get the number of subjects for the selected class
    let subjectsCount = database.courses.length;
    let periodsCount = database.courses.reduce(
      (sum, s) => sum + s.periodsPerWeek,
      0
    );

    if (classId) {
      const selectedClass = database.sessions.find((c) => c.id === classId);
      if (selectedClass) {
        const classSubjects = database.courses.filter((s) =>
          selectedClass.subjects.includes(s.id)
        );
        subjectsCount = classSubjects.length;
        periodsCount = classSubjects.reduce(
          (sum, s) => sum + s.periodsPerWeek,
          0
        );
      }
    }
  };

  const handleApplyTemplate = (
    templateResult: ReturnType<typeof applyTemplate>
  ) => {
    gridState.setAllCellContents(templateResult.cellContents);

    // Update merged and hidden cells if available in the template
    if (templateResult.mergedCells) {
      gridState.setAllMergedCells(templateResult.mergedCells);
    }

    if (templateResult.hiddenCells) {
      gridState.setAllHiddenCells(templateResult.hiddenCells);
    }

    // Update grid state with template settings
    // Note: This would require additional hooks in useGridState to update these values
    // For now, we'll show a dialog that some settings might need manual adjustment
    showDialog(
      "Template Applied",
      "Template applied successfully! Note that column count and durations may need manual adjustment.",
      "success"
    );
  };

  const handleGenerateAutomatedTimetableWithAlert = (classId?: string) => {
    if (database.courses.length === 0) {
      showDialog(
        "Error",
        "Please add subjects to the database first.",
        "error"
      );
      return;
    }

    handleGenerateAutomatedTimetable(classId);

    // Get the number of subjects for the selected class
    let subjectsCount = database.courses.length;
    let periodsCount = database.courses.reduce(
      (sum, s) => sum + s.periodsPerWeek,
      0
    );

    if (classId) {
      const selectedClass = database.sessions.find((c) => c.id === classId);
      if (selectedClass) {
        const classSubjects = database.courses.filter((s) =>
          selectedClass.subjects.includes(s.id)
        );
        subjectsCount = classSubjects.length;
        periodsCount = classSubjects.reduce(
          (sum, s) => sum + s.periodsPerWeek,
          0
        );
      }
    }

    showDialog(
      "Timetable Generated",
      `Successfully added ${periodsCount} periods across ${subjectsCount} subjects.`,
      "success"
    );
  };

  const renderCell = (row: number, col: number, classId?: string) => {
    const cellKey = `${row}-${col}`;
    const isSelected = selectedCells.has(cellKey);
    const mergeInfo = mergedCells.get(cellKey);
    const isColumnHovered = hoveredColumn === col;
    let cellContent = cellContents.get(cellKey);

    // Filter cell content based on class ID if provided
    if (classId && cellContent) {
      // Only show content for this specific class
      if (cellContent.className && cellContent.className !== classId) {
        cellContent = undefined;
      }
    }

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
    <div className="flex flex-col w-full md:py-6 py-4 gap-4 px-4 lg:px-6">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>
              <Alert
                variant={
                  dialogContent.type === "error" ? "destructive" : "default"
                }
                className="mt-4"
              >
                {dialogContent.type === "success" && (
                  <IconCheck className="h-4 w-4" />
                )}
                {dialogContent.type === "error" && (
                  <IconAlertCircle className="h-4 w-4" />
                )}
                {dialogContent.type === "info" && (
                  <IconAlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {dialogContent.type === "success" && "Success"}
                  {dialogContent.type === "error" && "Error"}
                  {dialogContent.type === "info" && "Information"}
                </AlertTitle>
                <AlertDescription>{dialogContent.message}</AlertDescription>
              </Alert>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      <DatabaseManager
        database={database}
        onGenerateTimetable={handleGenerateAutomatedTimetableWithAlert}
        onLoadSampleData={() => setDatabase(sampleDatabase)}
      />
      <TemplateManager
        columnCount={columnCount}
        hiddenCells={hiddenCells}
        database={database}
        defaultSlotDuration={defaultSlotDuration}
        mergedCells={mergedCells}
        cellContents={cellContents}
        columnDurations={columnDurations}
        onDatabaseUpdate={setDatabase}
        onApplyTemplate={handleApplyTemplate}
      />

      <GridControlls
        canMerge={canMergeCells(selectedCells)}
        columnCount={columnCount}
        selectedCellsCount={selectedCells.size}
        tempDefaultDuration={tempDefaultDuration}
        defaultSlotDuration={defaultSlotDuration}
        editingDefaultDuration={editingDefaultDuration}
        onResetGrid={resetGrid}
        onExportData={handleExportData}
        onMergeCells={mergeCells}
        onTempDefaultDurationChange={gridState.setTempDefaultDuration}
        onSaveDefaultDurationEdit={saveDefaultDurationEdit}
        onCancelDefaultDurationEdit={cancelDefaultDurationEdit}
        onDefaultDurationKeyDown={handleDefaultDurationKeyDown}
        onStartEditingDefaultDuration={startEditingDefaultDuration}
      />
      <TimetableControls
        expandedClasses={expandedClasses}
        setExpandedClasses={setExpandedClasses}
        handleClearTimetable={handleClearTimetable}
      />
      <div className="rounded-sm border shadow-lg overflow-hidden">
        <div className="bg-primary text-primary-foreground font-bold py-3 px-4 text-center">
          Master Timetable (All Classes)
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Weekly class schedule for all subjects</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] font-semibold text-center sticky left-0 bg-background">
                  Time / Day
                </TableHead>
                {timeLabels.map(renderHeader)}
              </TableRow>
            </TableHeader>
            <TableBody className="h-full">
              {Array.from({ length: gridSize }, (_, row) => (
                <tr key={row}>
                  <td className="bg-gray-200 border-2 border-gray-400 h-16 w-32 font-semibold text-gray-700 text-center sticky left-0 z-10">
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
      </div>
    </div>
  );
};

export default Timetables;
