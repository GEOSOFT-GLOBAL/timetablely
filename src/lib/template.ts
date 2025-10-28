import type { ITimetableTemplate } from "@/interface/database";
import type { ICellContent } from "@/interface/types";
import { extractTimetableData } from "./timetable";
import { v4 as uuidv4 } from "uuid";

export const saveAsTemplate = (
  name: string,
  cellContents: Map<string, ICellContent>,
  mergedCells: Map<string, any>,
  hiddenCells: Set<string>,
  columnCount: number,
  columnDurations: { [key: number]: number },
  defaultSlotDuration: number,
): ITimetableTemplate => {
  // Extract timetable data
  const entries = extractTimetableData(
    cellContents,
    mergedCells,
    hiddenCells,
    columnCount,
    columnDurations,
    defaultSlotDuration,
  );

  // Store merged cells information
  const mergedCellsData: { [key: string]: any } = {};
  mergedCells.forEach((value, key) => {
    mergedCellsData[key] = value;
  });

  // Store hidden cells as array
  const hiddenCellsArray = Array.from(hiddenCells);

  // Create template object
  const template: ITimetableTemplate = {
    id: uuidv4(),
    name,
    entries,
    columnCount,
    columnDurations,
    defaultSlotDuration,
    mergedCellsData,
    hiddenCellsArray,
  };

  return template;
};
