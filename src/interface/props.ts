/* eslint-disable @typescript-eslint/no-explicit-any */
import type { applyTemplate } from "@/lib/template";
import type { ISession, ITimetableDatabase } from "./database";
import type { ICellContent, IMergeInfo } from "./types";

export interface GridHeaderProps {
  time: string;
  index: number;
  onBlur: () => void;
  columnCount: number;
  tempDuration: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onDeleteColumn: () => void;
  openPopover: number | null;
  hoveredColumn: number | null;
  onAddColumnAfter: () => void;
  editingDuration: number | null;
  onStartEditingDuration: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onOpenPopoverChange: (open: boolean) => void;
  onTempDurationChange: (value: string) => void;
}

export interface GridControlsProps {
  canMerge: boolean;
  columnCount: number;
  onResetGrid: () => void;
  onExportData: () => void;
  onExportPDF?: () => void;
  onMergeCells: () => void;
  selectedCellsCount: number;
  tempDefaultDuration: string;
  defaultSlotDuration: number;
  editingDefaultDuration: boolean;
  onSaveDefaultDurationEdit: () => void;
  onCancelDefaultDurationEdit: () => void;
  onStartEditingDefaultDuration: () => void;
  onTempDefaultDurationChange: (value: string) => void;
  onDefaultDurationKeyDown: (e: React.KeyboardEvent) => void;
  onSetSelectedCellsBackgroundColor?: (color: string) => void;
}

export interface GridCellProps {
  row: number;
  col: number;
  cellKey: string;
  isSelected: boolean;
  tempCellText: string;
  mergeInfo?: IMergeInfo;
  isColumnHovered: boolean;
  hiddenCells: Set<string>;
  cellContent?: ICellContent;
  editingCell: string | null;
  onSaveCellEdit: () => void;
  onCancelCellEdit: () => void;
  onTempCellTextChange: (text: string) => void;
  onCellClick: (row: number, col: number) => void;
  onToggleCellVertical: (cellKey: string) => void;
  onCellDoubleClick: (row: number, col: number) => void;
  onSetCellAlignment: (
    cellKey: string,
    alignment: "left" | "center" | "right"
  ) => void;
  onSetCellBackgroundColor: (cellKey: string, color: string) => void;
}

export interface TemplateManagerProps {
  columnCount: number;
  hiddenCells: Set<string>;
  database: ITimetableDatabase;
  defaultSlotDuration: number;
  mergedCells: Map<string, any>;
  cellContents: Map<string, ICellContent>;
  columnDurations: { [key: number]: number };
  onDatabaseUpdate: (database: ITimetableDatabase) => void;
  onApplyTemplate: (template: ReturnType<typeof applyTemplate>) => void;
}

export interface ClassTimetableProps {
  dayLabels: string[];
  timeLabels: string[];
  classData: ISession;
  cellContents: Map<string, ICellContent>;
  onGenerateTimetable: (classId: string) => void;
  onExportClassPDF?: (classId: string, className: string) => void;
}

export interface DatabaseManagerProps {
  database: ITimetableDatabase;
  onLoadSampleData?: () => void;
  onGenerateTimetable?: () => void;
  onGenerateAITimetable?: () => void;
  onDatabaseUpdate?: (database: ITimetableDatabase) => void;
}
