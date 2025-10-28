import { useState } from "react";
import { getCellKey } from "@/lib/temputils";
import type { IGridActions, IGridState, IMergeInfo } from "@/interface/types";

export const useGridState = (): IGridState & IGridActions => {
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [mergedCells, setMergedCells] = useState<Map<string, IMergeInfo>>(
    new Map(),
  );
  const [hiddenCells, setHiddenCells] = useState<Set<string>>(new Set());
  const [columnCount, setColumnCount] = useState(12);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [editingDuration, setEditingDuration] = useState<number | null>(null);
  const [tempDuration, setTempDuration] = useState("");
  const [defaultSlotDuration, setDefaultSlotDuration] = useState(45);
  const [editingDefaultDuration, setEditingDefaultDuration] = useState(false);
  const [tempDefaultDuration, setTempDefaultDuration] = useState("45");
  const [columnDurations, setColumnDurations] = useState<{
    [key: number]: number;
  }>({});
  const [cellContents, setCellContents] = useState<Map<string, CellContent>>(
    new Map(),
  );
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [tempCellText, setTempCellText] = useState("");

  const handleCellClick = (row: number, col: number) => {
    const cellKey = getCellKey(row, col);

    if (hiddenCells.has(cellKey)) return;

    // If we're editing a cell, don't change selection
    if (editingCell) return;

    const newSelected = new Set(selectedCells);
    if (newSelected.has(cellKey)) {
      newSelected.delete(cellKey);
    } else {
      newSelected.add(cellKey);
    }
    setSelectedCells(newSelected);
  };

  const handleCellDoubleClick = (row: number, col: number) => {
    const cellKey = getCellKey(row, col);
    if (hiddenCells.has(cellKey)) return;

    startEditingCell(cellKey);
  };

  const mergeCells = () => {
    if (!canMergeCells(selectedCells)) return;

    const cells = Array.from(selectedCells).map((key: string) => {
      const [row, col] = key.split("-").map(Number);
      return { row, col };
    });

    const minRow = Math.min(...cells.map((c) => c.row));
    const maxRow = Math.max(...cells.map((c) => c.row));
    const minCol = Math.min(...cells.map((c) => c.col));
    const maxCol = Math.max(...cells.map((c) => c.col));

    const rowSpan = maxRow - minRow + 1;
    const colSpan = maxCol - minCol + 1;
    const masterCell = getCellKey(minRow, minCol);

    const newMergedCells = new Map(mergedCells);
    newMergedCells.set(masterCell, { rowSpan, colSpan });

    const newHiddenCells = new Set(hiddenCells);
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const cellKey = getCellKey(r, c);
        if (cellKey !== masterCell) {
          newHiddenCells.add(cellKey);
        }
      }
    }

    setMergedCells(newMergedCells);
    setHiddenCells(newHiddenCells);
    setSelectedCells(new Set());
  };

  const addColumnAfter = (afterColumnIndex: number) => {
    const newColumnCount = columnCount + 1;

    const newSelectedCells = new Set<string>();
    selectedCells.forEach((cellKey: string) => {
      const [row, col] = cellKey.split("-").map(Number);
      if (col > afterColumnIndex) {
        newSelectedCells.add(getCellKey(row, col + 1));
      } else {
        newSelectedCells.add(cellKey);
      }
    });

    const newMergedCells = new Map<string, IMergeInfo>();
    const newHiddenCells = new Set<string>();

    mergedCells.forEach((mergeInfo, cellKey) => {
      const [row, col] = cellKey.split("-").map(Number);
      let newCellKey = cellKey;

      if (col > afterColumnIndex) {
        newCellKey = getCellKey(row, col + 1);
      }

      newMergedCells.set(newCellKey, mergeInfo);

      const mergeRow = parseInt(newCellKey.split("-")[0]);
      const mergeCol = parseInt(newCellKey.split("-")[1]);

      for (let r = mergeRow; r < mergeRow + mergeInfo.rowSpan; r++) {
        for (let c = mergeCol; c < mergeCol + mergeInfo.colSpan; c++) {
          const hiddenKey = getCellKey(r, c);
          if (hiddenKey !== newCellKey) {
            newHiddenCells.add(hiddenKey);
          }
        }
      }
    });

    const newColumnDurations: { [key: number]: number } = {};
    Object.keys(columnDurations).forEach((key: string) => {
      const index = parseInt(key);
      if (index <= afterColumnIndex) {
        newColumnDurations[index] = columnDurations[index];
      } else {
        newColumnDurations[index + 1] = columnDurations[index];
      }
    });

    setColumnCount(newColumnCount);
    setSelectedCells(newSelectedCells);
    setMergedCells(newMergedCells);
    setHiddenCells(newHiddenCells);
    setColumnDurations(newColumnDurations);
    setOpenPopover(null);
  };

  const deleteColumn = (columnIndex: number) => {
    if (columnCount <= 1) return;

    const newColumnCount = columnCount - 1;

    const newSelectedCells = new Set<string>();
    selectedCells.forEach((cellKey: string) => {
      const [row, col] = cellKey.split("-").map(Number);
      if (col < columnIndex) {
        newSelectedCells.add(cellKey);
      } else if (col > columnIndex) {
        newSelectedCells.add(getCellKey(row, col - 1));
      }
    });

    const newMergedCells = new Map<string, IMergeInfo>();
    const newHiddenCells = new Set<string>();

    mergedCells.forEach((mergeInfo, cellKey) => {
      const [row, col] = cellKey.split("-").map(Number);

      if (col === columnIndex) return;
      if (col < columnIndex && col + mergeInfo.colSpan > columnIndex) return;

      let newCellKey = cellKey;
      if (col > columnIndex) {
        newCellKey = getCellKey(row, col - 1);
      }

      newMergedCells.set(newCellKey, mergeInfo);

      const mergeRow = parseInt(newCellKey.split("-")[0]);
      const mergeCol = parseInt(newCellKey.split("-")[1]);

      for (let r = mergeRow; r < mergeRow + mergeInfo.rowSpan; r++) {
        for (let c = mergeCol; c < mergeCol + mergeInfo.colSpan; c++) {
          if (c < newColumnCount) {
            const hiddenKey = getCellKey(r, c);
            if (hiddenKey !== newCellKey) {
              newHiddenCells.add(hiddenKey);
            }
          }
        }
      }
    });

    const newColumnDurations: { [key: number]: number } = {};
    Object.keys(columnDurations).forEach((key: string) => {
      const index = parseInt(key);
      if (index < columnIndex) {
        newColumnDurations[index] = columnDurations[index];
      } else if (index > columnIndex) {
        newColumnDurations[index - 1] = columnDurations[index];
      }
    });

    setColumnCount(newColumnCount);
    setSelectedCells(newSelectedCells);
    setMergedCells(newMergedCells);
    setHiddenCells(newHiddenCells);
    setColumnDurations(newColumnDurations);
    setOpenPopover(null);
  };
};
