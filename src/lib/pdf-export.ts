import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ICellContent } from "@/interface/types";
import { generateTimeLabels } from "./temputils";

const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export interface PDFExportConfig {
  cellContents: Map<string, ICellContent>;
  columnCount: number;
  columnDurations: { [key: number]: number };
  defaultSlotDuration: number;
  hiddenCells: Set<string>;
  title?: string;
  subtitle?: string;
}

export const exportTimetableToPDF = (config: PDFExportConfig): void => {
  const {
    cellContents,
    columnCount,
    columnDurations,
    defaultSlotDuration,
    hiddenCells,
    title = "Weekly Timetable",
    subtitle,
  } = config;

  // Create new PDF document
  const doc = new jsPDF({
    orientation: columnCount > 6 ? "landscape" : "portrait",
    unit: "mm",
    format: "a4",
  });

  // Generate time labels
  const timeLabels = generateTimeLabels(
    columnCount,
    columnDurations,
    defaultSlotDuration
  );

  // Add title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, doc.internal.pageSize.getWidth() / 2, 15, {
    align: "center",
  });

  // Add subtitle if provided
  if (subtitle) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(subtitle, doc.internal.pageSize.getWidth() / 2, 22, {
      align: "center",
    });
  }

  // Add generation date
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(
    `Generated on: ${dateStr}`,
    doc.internal.pageSize.getWidth() / 2,
    subtitle ? 28 : 22,
    { align: "center" }
  );

  // Prepare table data
  const headers = ["Day / Time", ...timeLabels];
  const rows: string[][] = [];

  for (let row = 0; row < 5; row++) {
    const rowData: string[] = [dayLabels[row]];

    for (let col = 0; col < columnCount; col++) {
      const cellKey = `${row}-${col}`;

      // Skip hidden cells
      if (hiddenCells.has(cellKey)) {
        rowData.push("");
        continue;
      }

      const cellContent = cellContents.get(cellKey);
      rowData.push(cellContent?.text || "");
    }

    rows.push(rowData);
  }

  // Generate table
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: subtitle ? 35 : 28,
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 3,
      overflow: "linebreak",
      halign: "center",
      valign: "middle",
    },
    headStyles: {
      fillColor: [66, 139, 202],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: {
        fillColor: [240, 240, 240],
        fontStyle: "bold",
        halign: "center",
        cellWidth: 25,
      },
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
    margin: { top: 10, left: 10, right: 10 },
  });

  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  // Save the PDF
  const fileName = `timetable_${new Date().getTime()}.pdf`;
  doc.save(fileName);
};
