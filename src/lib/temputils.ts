import type { IColumnTimes } from "@/interface/types";

export const getCellKey = (row: number, col: number): string => `${row}-${col}`;

export const minutesToTimeString = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

  if (mins === 0) {
    return `${displayHour}:00 ${period}`;
  } else {
    return `${displayHour}:${mins.toString().padStart(2, "0")} ${period}`;
  }
};

export const getColumnDuration = (
  columnIndex: number,
  columnDurations: { [key: number]: number },
  defaultSlotDuration: number,
): number => {
  return columnDurations[columnIndex] || defaultSlotDuration;
};

export const getColumnTimes = (
  columnIndex: number,
  columnDurations: { [key: number]: number },
  defaultSlotDuration: number,
  baseStartTime: number = 8 * 60, // 8 AM
): IColumnTimes => {
  let startTime = baseStartTime;

  // Calculate start time by summing all previous column durations
  for (let i = 0; i < columnIndex; i++) {
    startTime += getColumnDuration(i, columnDurations, defaultSlotDuration);
  }

  const duration = getColumnDuration(
    columnIndex,
    columnDurations,
    defaultSlotDuration,
  );
  const endTime = startTime + duration;

  return {
    start: startTime,
    end: endTime,
    duration,
  };
};

export const generateTimeLabels = (
  count: number,
  columnDurations: { [key: number]: number },
  defaultSlotDuration: number,
  baseStartTime: number = 8 * 60,
): string[] => {
  const labels = [];
  for (let i = 0; i < count; i++) {
    const { start, end } = getColumnTimes(
      i,
      columnDurations,
      defaultSlotDuration,
      baseStartTime,
    );
    const startStr = minutesToTimeString(start);
    const endStr = minutesToTimeString(end);
    labels.push(`${startStr} - ${endStr}`);
  }
  return labels;
};

export const canMergeCells = (selectedCells: Set<string>): boolean => {
  if (selectedCells.size < 2) return false;

  const cells = Array.from(selectedCells).map((key: string) => {
    const [row, col] = key.split("-").map(Number);
    return { row, col };
  });

  // Check if cells form a rectangular region
  const minRow = Math.min(...cells.map((c) => c.row));
  const maxRow = Math.max(...cells.map((c) => c.row));
  const minCol = Math.min(...cells.map((c) => c.col));
  const maxCol = Math.max(...cells.map((c) => c.col));

  const expectedCount = (maxRow - minRow + 1) * (maxCol - minCol + 1);
  if (cells.length !== expectedCount) return false;

  // Check if all cells in the rectangle are selected
  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      if (!selectedCells.has(getCellKey(r, c))) return false;
    }
  }

  return true;
};
