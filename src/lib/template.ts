import type {
  ITimetableDatabase,
  ITimetableTemplate,
} from "@/interface/database";
import { v4 as uuidv4 } from "uuid";
import { extractTimetableData } from "./timetable";
import type { ICellContent } from "@/interface/types";

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

export const saveTemplateToDatabase = (
  template: ITimetableTemplate,
  database: ITimetableDatabase,
): ITimetableDatabase => {
  // Create a copy of the database
  const updatedDatabase = { ...database };

  // Initialize templates array if it doesn't exist
  if (!updatedDatabase.templates) {
    updatedDatabase.templates = [];
  }

  // Add or update template
  const existingIndex = updatedDatabase.templates.findIndex(
    (t) => t.id === template.id,
  );
  if (existingIndex >= 0) {
    updatedDatabase.templates[existingIndex] = template;
  } else {
    updatedDatabase.templates.push(template);
  }

  return updatedDatabase;
};

export const applyTemplate = (
  template: ITimetableTemplate,
): {
  cellContents: Map<string, ICellContent>;
  columnCount: number;
  columnDurations: { [key: number]: number };
  defaultSlotDuration: number;
  mergedCells: Map<string, any>;
  hiddenCells: Set<string>;
} => {
  // Create cell contents from template entries
  const cellContents = new Map<string, ICellContent>();
  const mergedCells = new Map<string, any>();
  const hiddenCells = new Set<string>();

  // Process entries to restore cell contents and properties
  template.entries.forEach((entry) => {
    if (entry.customText) {
      // Store all cell properties from the template
      cellContents.set(entry.cellKey, {
        text: entry.customText,
        // Store cell formatting properties if available, or use defaults
        isVertical: entry.isVertical !== undefined ? entry.isVertical : false,
        alignment: entry.alignment || "center",
        className: entry.session?.id,
      });
    }
  });

  // Restore merged cells if available
  if (template.mergedCellsData) {
    Object.entries(template.mergedCellsData).forEach(([key, value]) => {
      mergedCells.set(key, value);
    });
  }

  // Restore hidden cells if available
  if (template.hiddenCellsArray) {
    template.hiddenCellsArray.forEach((cellKey) => {
      hiddenCells.add(cellKey);
    });
  }

  return {
    cellContents,
    columnCount: template.columnCount,
    columnDurations: { ...template.columnDurations },
    defaultSlotDuration: template.defaultSlotDuration,
    mergedCells,
    hiddenCells,
  };
};

export const deleteTemplate = (
  templateId: string,
  database: ITimetableDatabase,
): ITimetableDatabase => {
  // Create a copy of the database
  const updatedDatabase = { ...database };

  // Remove template if it exists
  if (updatedDatabase.templates) {
    updatedDatabase.templates = updatedDatabase.templates.filter(
      (t) => t.id !== templateId,
    );
  }

  return updatedDatabase;
};

export const getTemplates = (
  database: ITimetableDatabase,
): ITimetableTemplate[] => {
  return database.templates || [];
};

// Get template by ID
export const getTemplateById = (
  templateId: string,
  database: ITimetableDatabase,
): ITimetableTemplate | undefined => {
  return database.templates?.find((t) => t.id === templateId);
};
