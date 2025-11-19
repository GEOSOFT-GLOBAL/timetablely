import DatabaseManager from "@/components/database-manager";
import GridCell from "@/components/grid-cell";
import GridControlls from "@/components/grid-controlls";
import GridHeader from "@/components/grid-header";
import TemplateManager from "@/components/template-manager";
import TimetableControls from "@/components/timetable-controls";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dayLabels, gridSize } from "@/constants";
import { useGridState } from "@/hooks/use-grid";
import type { applyTemplate } from "@/lib/template";
import { canMergeCells, generateTimeLabels } from "@/lib/temputils";
import {
  extractTimetableData,
  generateAutomatedTimetable,
  logTimetableData,
} from "@/lib/timetable";
import { generateAITimetable } from "@/lib/ai-timetable";
import { exportTimetableToPDF } from "@/lib/pdf-export";
import { sampleDatabase } from "@/mock/load-data";
import { useDatabaseStore } from "@/store/databaseStore";
import { IconCheck, IconAlertCircle, IconLoader2 } from "@tabler/icons-react";
import * as React from "react";

interface TimetablesProps {
  propName?: string;
}

const Timetables: React.FC<TimetablesProps> = () => {
  const gridState = useGridState();
  const { database, setDatabase } = useDatabaseStore();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState<{
    title: string;
    message: string;
    type: "success" | "error" | "info";
  }>({ title: "", message: "", type: "info" });
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = React.useState(false);
  const [apiKey, setApiKey] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const {
    selectedCells,
    mergedCells,
    hiddenCells,
    columnCount,
    hoveredColumn,
    openPopover,
    editingDuration,
    tempDuration,
    defaultSlotDuration,
    columnDurations,
    cellContents,
    editingCell,
    tempCellText,
    tempDefaultDuration,
    editingDefaultDuration,
    resetGrid,
    handleCellClick,
    handleCellDoubleClick,
    mergeCells,
    addColumnAfter,
    deleteColumn,
    startEditingDuration,
    saveDurationEdit,
    cancelDurationEdit,
    saveDefaultDurationEdit,
    cancelDefaultDurationEdit,
    setHoveredColumn,
    setOpenPopover,
    setTempCellText,
    toggleCellVertical,
    setCellAlignment,
    setCellBackgroundColor,
    setSelectedCellsBackgroundColor,
    saveCellEdit,
    cancelCellEdit,
  } = gridState;

  const timeLabels = generateTimeLabels(
    columnCount,
    columnDurations,
    defaultSlotDuration
  );

  const handleDefaultDurationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveDefaultDurationEdit();
    if (e.key === "Escape") cancelDefaultDurationEdit();
  };

  const handleDurationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveDurationEdit();
    if (e.key === "Escape") cancelDurationEdit();
  };

  const startEditingDefaultDuration = () => {
    gridState.setEditingDefaultDuration(true);
    gridState.setTempDefaultDuration(defaultSlotDuration.toString());
  };

  const [expandedClasses, setExpandedClasses] = React.useState<{
    [key: string]: boolean;
  }>({});

  const showDialog = (
    title: string,
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setDialogContent({ title, message, type });
    setDialogOpen(true);
  };

  // Function to clear the timetable
  const handleClearTimetable = () => {
    gridState.setAllCellContents(new Map());
    showDialog("Success", "Timetable cleared successfully!", "success");
  };

  // Load API key from localStorage on mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem("gemini_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Handle AI timetable generation
  const handleAIGeneration = () => {
    if (!apiKey) {
      setApiKeyDialogOpen(true);
      return;
    }
    generateWithAI();
  };

  const generateWithAI = async () => {
    if (database.courses.length === 0) {
      showDialog(
        "Error",
        "Please add subjects to the database first.",
        "error"
      );
      return;
    }

    setIsGenerating(true);
    setApiKeyDialogOpen(false);

    try {
      const newCellContents = await generateAITimetable({
        apiKey,
        database,
        columnCount,
        columnDurations,
        defaultSlotDuration,
        existingCellContents: cellContents,
        hiddenCells,
      });

      gridState.setAllCellContents(newCellContents);

      const periodsCount = database.courses.reduce(
        (sum, s) => sum + s.periodsPerWeek,
        0
      );

      showDialog(
        "AI Timetable Generated",
        `Successfully generated timetable with ${periodsCount} periods across ${database.courses.length} subjects using AI.`,
        "success"
      );
    } catch (error) {
      console.error("AI Generation Error:", error);
      showDialog(
        "AI Generation Failed",
        error instanceof Error
          ? error.message
          : "Failed to generate timetable with AI. Please check your API key and try again.",
        "error"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      showDialog("Error", "Please enter a valid API key.", "error");
      return;
    }
    localStorage.setItem("gemini_api_key", apiKey);
    generateWithAI();
  };

  const handleExportData = () => {
    const timetableData = extractTimetableData(
      cellContents,
      hiddenCells,
      columnCount,
      columnDurations,
      defaultSlotDuration,
      mergedCells
    );

    logTimetableData(timetableData);

    // Also copy to clipboard as JSON
    navigator.clipboard
      .writeText(JSON.stringify(timetableData, null, 2))
      .then(() => {
        showDialog(
          "Success",
          "Timetable data copied to clipboard and logged to console!",
          "success"
        );
      })
      .catch(() => {
        showDialog(
          "Info",
          "Timetable data logged to console (clipboard copy failed)",
          "info"
        );
      });
  };

  const handleExportPDF = () => {
    try {
      exportTimetableToPDF({
        cellContents,
        columnCount,
        columnDurations,
        defaultSlotDuration,
        hiddenCells,
        title: "Weekly Timetable",
        subtitle: "Master Schedule",
      });
      showDialog(
        "Success",
        "Timetable exported as PDF successfully!",
        "success"
      );
    } catch (error) {
      console.error("PDF Export Error:", error);
      showDialog("Error", "Failed to export PDF. Please try again.", "error");
    }
  };

  const handleGenerateAutomatedTimetable = (classId?: string) => {
    if (database.courses.length === 0) {
      showDialog(
        "Error",
        "Please add subjects to the database first.",
        "error"
      );
      return;
    }

    const newCellContents = generateAutomatedTimetable(
      database,
      columnCount,
      cellContents,
      hiddenCells,
      classId
    );

    gridState.setAllCellContents(newCellContents);
  };

  const handleApplyTemplate = (
    templateResult: ReturnType<typeof applyTemplate>
  ) => {
    gridState.setAllCellContents(templateResult.cellContents);

    // Update merged and hidden cells if available in the template
    if (templateResult.mergedCells) {
      gridState.setAllMergedCells(templateResult.mergedCells);
    }

    if (templateResult.hiddenCells) {
      gridState.setAllHiddenCells(templateResult.hiddenCells);
    }

    // Update grid state with template settings
    // Note: This would require additional hooks in useGridState to update these values
    // For now, we'll show a dialog that some settings might need manual adjustment
    showDialog(
      "Template Applied",
      "Template applied successfully! Note that column count and durations may need manual adjustment.",
      "success"
    );
  };

  const handleGenerateAutomatedTimetableWithAlert = (classId?: string) => {
    if (database.courses.length === 0) {
      showDialog(
        "Error",
        "Please add subjects to the database first.",
        "error"
      );
      return;
    }

    handleGenerateAutomatedTimetable(classId);

    // Get the number of subjects for the selected class
    let subjectsCount = database.courses.length;
    let periodsCount = database.courses.reduce(
      (sum, s) => sum + s.periodsPerWeek,
      0
    );

    if (classId) {
      const selectedClass = database.sessions.find((c) => c.id === classId);
      if (selectedClass) {
        const classSubjects = database.courses.filter((s) =>
          selectedClass.subjects.includes(s.id)
        );
        subjectsCount = classSubjects.length;
        periodsCount = classSubjects.reduce(
          (sum, s) => sum + s.periodsPerWeek,
          0
        );
      }
    }

    showDialog(
      "Timetable Generated",
      `Successfully added ${periodsCount} periods across ${subjectsCount} subjects.`,
      "success"
    );
  };

  const renderCell = (row: number, col: number, classId?: string) => {
    const cellKey = `${row}-${col}`;
    const isSelected = selectedCells.has(cellKey);
    const mergeInfo = mergedCells.get(cellKey);
    const isColumnHovered = hoveredColumn === col;
    let cellContent = cellContents.get(cellKey);

    // Filter cell content based on class ID if provided
    if (classId && cellContent) {
      // Only show content for this specific class
      if (cellContent.className && cellContent.className !== classId) {
        cellContent = undefined;
      }
    }

    return (
      <GridCell
        key={cellKey}
        row={row}
        col={col}
        cellKey={cellKey}
        isSelected={isSelected}
        isColumnHovered={isColumnHovered}
        mergeInfo={mergeInfo}
        hiddenCells={hiddenCells}
        cellContent={cellContent}
        editingCell={editingCell}
        tempCellText={tempCellText}
        onCellClick={handleCellClick}
        onCellDoubleClick={handleCellDoubleClick}
        onTempCellTextChange={setTempCellText}
        onSaveCellEdit={saveCellEdit}
        onCancelCellEdit={cancelCellEdit}
        onToggleCellVertical={toggleCellVertical}
        onSetCellAlignment={setCellAlignment}
        onSetCellBackgroundColor={setCellBackgroundColor}
      />
    );
  };

  const renderHeader = (time: string, index: number) => (
    <GridHeader
      key={index}
      time={time}
      index={index}
      hoveredColumn={hoveredColumn}
      editingDuration={editingDuration}
      openPopover={openPopover}
      tempDuration={tempDuration}
      columnCount={columnCount}
      onMouseEnter={() => setHoveredColumn(index)}
      onMouseLeave={() => setHoveredColumn(null)}
      onTempDurationChange={gridState.setTempDuration}
      onKeyDown={handleDurationKeyDown}
      onBlur={saveDurationEdit}
      onOpenPopoverChange={(open: boolean) =>
        setOpenPopover(open ? index : null)
      }
      onStartEditingDuration={() => startEditingDuration(index)}
      onAddColumnAfter={() => addColumnAfter(index)}
      onDeleteColumn={() => deleteColumn(index)}
    />
  );

  return (
    <div className="flex flex-col w-full md:py-6 py-4 gap-4 px-4 lg:px-6">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <DialogDescription>
              <Alert
                variant={
                  dialogContent.type === "error" ? "destructive" : "default"
                }
                className="mt-4"
              >
                {dialogContent.type === "success" && (
                  <IconCheck className="h-4 w-4" />
                )}
                {dialogContent.type === "error" && (
                  <IconAlertCircle className="h-4 w-4" />
                )}
                {dialogContent.type === "info" && (
                  <IconAlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {dialogContent.type === "success" && "Success"}
                  {dialogContent.type === "error" && "Error"}
                  {dialogContent.type === "info" && "Information"}
                </AlertTitle>
                <AlertDescription>{dialogContent.message}</AlertDescription>
              </Alert>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Gemini API Key</DialogTitle>
            <DialogDescription>
              Please enter your Google Gemini API key to use AI-powered
              timetable generation. Your key will be saved locally for future
              use.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveApiKey()}
              />
              <p className="text-xs text-muted-foreground">
                Get your API key from{" "}
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Google AI Studio
                </a>
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setApiKeyDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveApiKey} disabled={!apiKey.trim()}>
              Save & Generate
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isGenerating && (
        <Dialog open={isGenerating}>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <IconLoader2 className="h-5 w-5 animate-spin" />
                Generating AI Timetable
              </DialogTitle>
              <DialogDescription>
                Please wait while AI generates your optimal timetable...
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <DatabaseManager
        database={database}
        onGenerateTimetable={handleGenerateAutomatedTimetableWithAlert}
        onGenerateAITimetable={handleAIGeneration}
        onLoadSampleData={() => setDatabase(sampleDatabase)}
      />
      <TemplateManager
        columnCount={columnCount}
        hiddenCells={hiddenCells}
        database={database}
        defaultSlotDuration={defaultSlotDuration}
        mergedCells={mergedCells}
        cellContents={cellContents}
        columnDurations={columnDurations}
        onDatabaseUpdate={setDatabase}
        onApplyTemplate={handleApplyTemplate}
      />

      <GridControlls
        canMerge={canMergeCells(selectedCells)}
        columnCount={columnCount}
        selectedCellsCount={selectedCells.size}
        tempDefaultDuration={tempDefaultDuration}
        defaultSlotDuration={defaultSlotDuration}
        editingDefaultDuration={editingDefaultDuration}
        onResetGrid={resetGrid}
        onExportData={handleExportData}
        onExportPDF={handleExportPDF}
        onMergeCells={mergeCells}
        onTempDefaultDurationChange={gridState.setTempDefaultDuration}
        onSaveDefaultDurationEdit={saveDefaultDurationEdit}
        onCancelDefaultDurationEdit={cancelDefaultDurationEdit}
        onDefaultDurationKeyDown={handleDefaultDurationKeyDown}
        onStartEditingDefaultDuration={startEditingDefaultDuration}
        onSetSelectedCellsBackgroundColor={setSelectedCellsBackgroundColor}
      />
      <TimetableControls
        expandedClasses={expandedClasses}
        setExpandedClasses={setExpandedClasses}
        handleClearTimetable={handleClearTimetable}
      />
      <div className="rounded-sm border shadow-lg overflow-hidden">
        <div className="bg-primary text-primary-foreground font-bold py-3 px-4 text-center">
          Master Timetable (All Classes)
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Weekly class schedule for all subjects</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] font-semibold text-center sticky left-0 bg-background">
                  Time / Day
                </TableHead>
                {timeLabels.map(renderHeader)}
              </TableRow>
            </TableHeader>
            <TableBody className="h-full">
              {Array.from({ length: gridSize }, (_, row) => (
                <tr key={row}>
                  <td className="bg-gray-200 border-2 border-gray-400 h-16 w-32 font-semibold text-gray-700 text-center sticky left-0 z-10">
                    <div className="flex items-center justify-center h-full">
                      {dayLabels[row]}
                    </div>
                  </td>
                  {Array.from({ length: columnCount }, (_, col) =>
                    renderCell(row, col)
                  )}
                </tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Timetables;
