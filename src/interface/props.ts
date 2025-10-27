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
}

export interface GridCellProps {
  row: number;
  col: number;
  cellKey: string;
  isSelected: boolean;
  tempCellText: string;
  // mergeInfo?: MergeInfo;
  isColumnHovered: boolean;
  hiddenCells: Set<string>;
  // cellContent?: CellContent;
  editingCell: string | null;
  onSaveCellEdit: () => void;
  onCancelCellEdit: () => void;
  onTempCellTextChange: (text: string) => void;
  onCellClick: (row: number, col: number) => void;
  onToggleCellVertical: (cellKey: string) => void;
  onCellDoubleClick: (row: number, col: number) => void;
  onSetCellAlignment: (
    cellKey: string,
    alignment: "left" | "center" | "right",
  ) => void;
}

export interface TemplateManagerProps {
  columnCount: number;
  hiddenCells: Set<string>;
  // database: TimetableDatabase;
  defaultSlotDuration: number;
  // mergedCells: Map<string, any>;
  // cellContents: Map<string, CellContent>;
  columnDurations: { [key: number]: number };
  // onDatabaseUpdate: (database: TimetableDatabase) => void;
  // onApplyTemplate: (template: ReturnType<typeof applyTemplate>) => void;
}

export interface ClassTimetableProps {
  dayLabels: string[];
  timeLabels: string[];
  // classData: TimetableClass;
  // cellContents: Map<string, CellContent>;
  onGenerateTimetable: (classId: string) => void;
  onExportClassPDF?: (classId: string, className: string) => void;
}

export interface DatabaseManagerProps {
  // database: TimetableDatabase;
  onLoadSampleData?: () => void;
  onGenerateTimetable: () => void;
  // onDatabaseUpdate: (database: TimetableDatabase) => void;
}
