import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGridState } from "@/hooks/use-grid";
import { useDatabaseStore } from "@/store/databaseStore";
import type { ITimetableDatabase } from "@/interface/database";
import {
  defaultBlockedTexts,
  generateAutomatedTimetable,
} from "@/lib/timetable";
import { generateTimeLabels } from "@/lib/temputils";
import type { applyTemplate } from "@/lib/template";
import GridCell from "./grid-cell";
import GridHeader from "./grid-header";
import TimetableControls from "./timetable-controls";
import { dayLabels, gridSize } from "@/constants";

interface TimeTableProps {
  propName?: string;
}

// Sample timetable data structure
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 01:00",
  "01:00 - 02:00",
  "02:00 - 03:00",
  "03:00 - 04:00",
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Sample schedule data - you can replace this with real data
const scheduleData: Record<string, Record<string, string>> = {
  "08:00 - 09:00": {
    Monday: "Mathematics",
    Tuesday: "Physics",
    Wednesday: "Chemistry",
    Thursday: "Biology",
    Friday: "English",
  },
  "09:00 - 10:00": {
    Monday: "Physics",
    Tuesday: "Mathematics",
    Wednesday: "English",
    Thursday: "Chemistry",
    Friday: "Biology",
  },
  "10:00 - 11:00": {
    Monday: "Chemistry",
    Tuesday: "English",
    Wednesday: "Mathematics",
    Thursday: "Physics",
    Friday: "Computer Science",
  },
  "11:00 - 12:00": {
    Monday: "Biology",
    Tuesday: "Computer Science",
    Wednesday: "Physics",
    Thursday: "Mathematics",
    Friday: "Chemistry",
  },
  "12:00 - 01:00": {
    Monday: "Lunch Break",
    Tuesday: "Lunch Break",
    Wednesday: "Lunch Break",
    Thursday: "Lunch Break",
    Friday: "Lunch Break",
  },
  "01:00 - 02:00": {
    Monday: "English",
    Tuesday: "Biology",
    Wednesday: "Computer Science",
    Thursday: "English",
    Friday: "Mathematics",
  },
  "02:00 - 03:00": {
    Monday: "Computer Science",
    Tuesday: "Chemistry",
    Wednesday: "Biology",
    Thursday: "Computer Science",
    Friday: "Physics",
  },
  "03:00 - 04:00": {
    Monday: "Free Period",
    Tuesday: "Free Period",
    Wednesday: "Free Period",
    Thursday: "Free Period",
    Friday: "Free Period",
  },
};

const TimeTable: React.FC<TimeTableProps> = ({ propName }) => {
  const gridState = useGridState();
  const { database, setDatabase } = useDatabaseStore();

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
    editingDefaultDuration,
    tempDefaultDuration,
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
    saveDefaultDurationEdit,
    cancelDefaultDurationEdit,
    resetGrid,
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
    defaultSlotDuration,
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

  // Function to clear the timetable
  const handleClearTimetable = () => {
    gridState.setAllCellContents(new Map());
    alert("Timetable cleared!");
  };

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
      classId,
    );

    gridState.setAllCellContents(newCellContents);

    // Get the number of subjects for the selected class
    let subjectsCount = database.courses.length;
    let periodsCount = database.courses.reduce(
      (sum, s) => sum + s.periodsPerWeek,
      0,
    );

    if (classId) {
      const selectedClass = database.sessions.find((c) => c.id === classId);
      if (selectedClass) {
        const classSubjects = database.courses.filter((s) =>
          selectedClass.subjects.includes(s.id),
        );
        subjectsCount = classSubjects.length;
        periodsCount = classSubjects.reduce(
          (sum, s) => sum + s.periodsPerWeek,
          0,
        );
      }
    }
  };

  const handleApplyTemplate = (
    templateResult: ReturnType<typeof applyTemplate>,
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
    // For now, we'll show an alert that some settings might need manual adjustment
    alert(
      "Template applied! Note that column count and durations may need manual adjustment.",
    );
  };

  const handleGenerateAutomatedTimetableWithAlert = (classId?: string) => {
    handleGenerateAutomatedTimetable(classId);

    // Get the number of subjects for the selected class
    let subjectsCount = database.courses.length;
    let periodsCount = database.courses.reduce(
      (sum, s) => sum + s.periodsPerWeek,
      0,
    );

    if (classId) {
      const selectedClass = database.sessions.find((c) => c.id === classId);
      if (selectedClass) {
        const classSubjects = database.courses.filter((s) =>
          selectedClass.subjects.includes(s.id),
        );
        subjectsCount = classSubjects.length;
        periodsCount = classSubjects.reduce(
          (sum, s) => sum + s.periodsPerWeek,
          0,
        );
      }
    }

    alert(
      `Timetable generated! Added ${periodsCount} periods across ${subjectsCount} subjects.`,
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
    <div className="">
      <TimetableControls
        expandedClasses={expandedClasses}
        setExpandedClasses={setExpandedClasses}
      />
      <div className="rounded-lg border shadow-lg overflow-hidden">
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
            <TableBody>
              {Array.from({ length: gridSize }, (_, row) => (
                <tr key={row}>
                  <td className="bg-gray-200 border-2 border-gray-400 h-16 w-32 font-semibold text-gray-700 text-center sticky left-0 z-10">
                    <div className="flex items-center justify-center h-full">
                      {dayLabels[row]}
                    </div>
                  </td>
                  {Array.from({ length: columnCount }, (_, col) =>
                    renderCell(row, col),
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
