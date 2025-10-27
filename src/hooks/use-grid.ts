import { useState } from "react";
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
};
