export interface MergeInfo {
  rowSpan: number;
  colSpan: number;
}

export interface ColumnTimes {
  start: number;
  end: number;
  duration: number;
}

export interface CellContent {
  text: string;
  isVertical: boolean;
  alignment: "left" | "center" | "right";
  className?: string; // ID of the class this cell belongs to
}

export interface CellPosition {
  row: number;
  col: number;
}

export interface GridState {
  selectedCells: Set<string>;
  mergedCells: Map<string, MergeInfo>;
  hiddenCells: Set<string>;
  columnCount: number;
  hoveredColumn: number | null;
  openPopover: number | null;
  editingDuration: number | null;
  tempDuration: string;
  defaultSlotDuration: number;
  editingDefaultDuration: boolean;
  tempDefaultDuration: string;
  columnDurations: { [key: number]: number };
  cellContents: Map<string, CellContent>;
  editingCell: string | null;
  tempCellText: string;
}

export interface GridActions {
  handleCellClick: (row: number, col: number) => void;
  handleCellDoubleClick: (row: number, col: number) => void;
  mergeCells: () => void;
  addColumnAfter: (column: number) => void;
  deleteColumn: (column: number) => void;
  startEditingDuration: (column: number) => void;
  saveDurationEdit: () => void;
  cancelDurationEdit: () => void;
  saveDefaultDurationEdit: () => void;
  cancelDefaultDurationEdit: () => void;
  resetGrid: () => void;
  setHoveredColumn: (column: number | null) => void;
  setOpenPopover: (popover: number | null) => void;
  setTempDuration: (duration: string) => void;
  setTempDefaultDuration: (duration: string) => void;
  setEditingDefaultDuration: (editing: boolean) => void;
  startEditingCell: (cellKey: string) => void;
  saveCellEdit: () => void;
  cancelCellEdit: () => void;
  setTempCellText: (text: string) => void;
  toggleCellVertical: (cellKey: string) => void;
  setCellAlignment: (
    cellKey: string,
    alignment: "left" | "center" | "right",
  ) => void;
  // updateCellContents: (contents: Map<string, CellContent>) => void;
  setAllCellContents: (contents: Map<string, CellContent>) => void;
  setAllMergedCells: (mergedCells: Map<string, any>) => void;
  setAllHiddenCells: (hiddenCells: Set<string>) => void;
}
