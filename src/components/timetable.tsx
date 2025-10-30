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
import { defaultBlockedTexts } from "@/lib/timetable";
import { generateTimeLabels } from "@/lib/temputils";

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

  return (
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
              {daysOfWeek.map((day) => (
                <TableHead key={day} className="text-center font-semibold">
                  {day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeSlots.map((timeSlot) => (
              <TableRow key={timeSlot}>
                <TableCell className="font-medium text-center bg-muted sticky left-0">
                  {timeSlot}
                </TableCell>
                {daysOfWeek.map((day) => (
                  <TableCell key={`${timeSlot}-${day}`} className="text-center">
                    <div
                      className={`py-2 px-3 rounded ${
                        scheduleData[timeSlot]?.[day] === "Lunch Break"
                          ? "bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200"
                          : scheduleData[timeSlot]?.[day] === "Free Period"
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                            : "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200"
                      }`}
                    >
                      {scheduleData[timeSlot]?.[day] || "-"}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TimeTable;
