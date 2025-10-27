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
