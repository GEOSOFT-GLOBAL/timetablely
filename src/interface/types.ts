export interface IMergeInfo {
  rowSpan: number;
  colSpan: number;
}

export interface IColumnTimes {
  start: number;
  end: number;
  duration: number;
}

export interface ICellContent {
  text: string;
  isVertical: boolean;
  alignment: "left" | "center" | "right";
  className?: string; // ID of the class this cell belongs to
}

export interface ICellPosition {
  row: number;
  col: number;
}

export interface IGridState {
  selectedCells: Set<string>;
  mergedCells: Map<string, IMergeInfo>;
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
  cellContents: Map<string, ICellContent>;
  editingCell: string | null;
  tempCellText: string;
}

export interface IGridActions {
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
  // updateCellContents: (contents: Map<string, ICellContent>) => void;
  setAllCellContents: (contents: Map<string, ICellContent>) => void;
  setAllMergedCells: (mergedCells: Map<string, any>) => void;
  setAllHiddenCells: (hiddenCells: Set<string>) => void;
}
