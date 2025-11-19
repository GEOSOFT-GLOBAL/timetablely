/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGridState } from "@/hooks/use-grid";
import { useDatabaseStore } from "@/store/databaseStore";
import { generateAutomatedTimetable } from "@/lib/timetable";
import { generateTimeLabels } from "@/lib/temputils";
import GridCell from "./grid-cell";
import GridHeader from "./grid-header";
import TimetableControls from "./timetable-controls";
import { dayLabels, gridSize } from "@/constants";

interface TimeTableProps {
  propName?: string;
}

const TimeTable: React.FC<TimeTableProps> = () => {
  const gridState = useGridState();
  const { database } = useDatabaseStore();

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
    setCellBackgroundColor,
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

  console.log(handleDefaultDurationKeyDown)

  const handleDurationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveDurationEdit();
    if (e.key === "Escape") cancelDurationEdit();
  };

  const startEditingDefaultDuration = () => {
    gridState.setEditingDefaultDuration(true);
    gridState.setTempDefaultDuration(defaultSlotDuration.toString());
  };

  console.log(startEditingDefaultDuration)

  const [expandedClasses, setExpandedClasses] = React.useState<{
    [key: string]: boolean;
  }>({});

  // Function to clear the timetable
  const handleClearTimetable = () => {
    gridState.setAllCellContents(new Map());
    alert("Timetable cleared!");
  };

  console.log(handleClearTimetable)

  const handleGenerateAutomatedTimetable = (classId?: string) => {
    if (database.courses.length === 0) {
      alert("Please add subjects to the database first.");
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

  const handleGenerateAutomatedTimetableWithAlert = (classId?: string) => {
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

    alert(
      `Timetable generated! Added ${periodsCount} periods across ${subjectsCount} subjects.`
    );
  };

  console.log(handleGenerateAutomatedTimetableWithAlert)

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
    <div className="">
      <TimetableControls
        expandedClasses={expandedClasses}
        setExpandedClasses={setExpandedClasses}
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

export default TimeTable;
