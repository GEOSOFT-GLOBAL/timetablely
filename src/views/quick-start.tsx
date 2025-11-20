import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GridCell from "@/components/grid-cell";
import GridHeader from "@/components/grid-header";
import { dayLabels, gridSize } from "@/constants";
import { useGridState } from "@/hooks/use-grid";
import { canMergeCells, generateTimeLabels } from "@/lib/temputils";
import { exportTimetableToPDF } from "@/lib/pdf-export";
import { generateAutomatedTimetable } from "@/lib/timetable";
import type { ITimetableDatabase, ITutor, ICourse } from "@/interface/database";
import { PRIORITY } from "@/interface/enums";
import {
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Merge,
  Palette,
  UserPlus,
  BookPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IconFileTypePdf } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import { useSessionStorage } from "@/hooks/storage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const MAX_COLUMNS_FREE = 12;
const MAX_TUTORS_FREE = 12;
const MAX_COURSES_FREE = 11;
const MAX_REGENERATIONS_FREE = 2;

interface QuickStartUsage {
  regenerations: number;
}

const QuickStart: React.FC = () => {
  const navigate = useNavigate();
  const { value: usage, set: setUsage } = useSessionStorage<QuickStartUsage>(
    "quickstart_usage",
    { regenerations: 0 }
  );
  const gridState = useGridState();
  const [showColorPalette, setShowColorPalette] = React.useState(false);
  const [className, setClassName] = React.useState("My Class");

  // Database state
  const [database, setDatabase] = React.useState<ITimetableDatabase>({
    tutors: [],
    courses: [],
    sessions: [],
    blockedSlots: [],
    blockedTexts: [],
    templates: [],
  });

  // Dialog states
  const [tutorDialogOpen, setTutorDialogOpen] = React.useState(false);
  const [courseDialogOpen, setCourseDialogOpen] = React.useState(false);
  const [limitDialogOpen, setLimitDialogOpen] = React.useState(false);
  const [limitType, setLimitType] = React.useState<
    "tutors" | "courses" | "regenerations" | "columns"
  >("columns");

  // Form states
  const [newTutor, setNewTutor] = React.useState({ name: "", email: "" });
  const [newCourse, setNewCourse] = React.useState({
    name: "",
    tutorId: "",
    periodsPerWeek: 3,
    priority: PRIORITY.MEDIUM,
  });

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
    resetGrid,
  } = gridState;

  const timeLabels = generateTimeLabels(
    columnCount,
    columnDurations,
    defaultSlotDuration
  );

  const handleDurationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveDurationEdit();
    if (e.key === "Escape") cancelDurationEdit();
  };

  // Add Tutor
  const handleAddTutor = () => {
    if (!newTutor.name.trim()) return;

    if (database.tutors.length >= MAX_TUTORS_FREE) {
      setLimitType("tutors");
      setLimitDialogOpen(true);
      return;
    }

    const tutor: ITutor = {
      id: uuidv4(),
      name: newTutor.name,
      email: newTutor.email,
      subjects: [],
    };

    setDatabase((prev) => ({
      ...prev,
      tutors: [...prev.tutors, tutor],
    }));

    setNewTutor({ name: "", email: "" });
    setTutorDialogOpen(false);
  };

  // Add Course
  const handleAddCourse = () => {
    if (!newCourse.name.trim() || !newCourse.tutorId) return;

    if (database.courses.length >= MAX_COURSES_FREE) {
      setLimitType("courses");
      setLimitDialogOpen(true);
      return;
    }

    const course: ICourse = {
      id: uuidv4(),
      name: newCourse.name,
      teacherId: newCourse.tutorId,
      periodsPerWeek: newCourse.periodsPerWeek,
      priority: newCourse.priority,
    };

    setDatabase((prev) => ({
      ...prev,
      courses: [...prev.courses, course],
    }));

    setNewCourse({
      name: "",
      tutorId: "",
      periodsPerWeek: 3,
      priority: PRIORITY.MEDIUM,
    });
    setCourseDialogOpen(false);
  };

  const handleGenerateTimetable = () => {
    if (database.courses.length === 0) {
      alert("Please add at least one course first!");
      return;
    }

    const currentUsage = usage || { regenerations: 0 };
    if (currentUsage.regenerations >= MAX_REGENERATIONS_FREE) {
      setLimitType("regenerations");
      setLimitDialogOpen(true);
      return;
    }

    const newCellContents = generateAutomatedTimetable(
      database,
      columnCount,
      cellContents,
      hiddenCells
    );
    gridState.setAllCellContents(newCellContents);

    // Increment regeneration count
    setUsage({ regenerations: currentUsage.regenerations + 1 });
  };

  const handleExportPDF = (type: "standard" | "premium" = "standard") => {
    if (type === "premium") {
      alert(
        "Premium PDF export is available for paid accounts. Sign up to unlock!"
      );
      navigate("/auth/login");
      return;
    }

    try {
      exportTimetableToPDF({
        cellContents,
        columnCount,
        columnDurations,
        defaultSlotDuration,
        hiddenCells,
        title: className || "Quick Start Timetable",
        subtitle: "Generated with Timetablely (Free)",
      });
    } catch (error) {
      console.error("PDF Export Error:", error);
    }
  };

  const renderCell = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    const isSelected = selectedCells.has(cellKey);
    const mergeInfo = mergedCells.get(cellKey);
    const isColumnHovered = hoveredColumn === col;
    const cellContent = cellContents.get(cellKey);

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

  const handleAddColumnAfter = (index: number) => {
    if (columnCount >= MAX_COLUMNS_FREE) {
      setLimitType("columns");
      setLimitDialogOpen(true);
      return;
    }
    addColumnAfter(index);
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
      onAddColumnAfter={() => handleAddColumnAfter(index)}
      onDeleteColumn={() => deleteColumn(index)}
    />
  );

  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80 shrink-0">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="gap-1 h-8"
              >
                <ArrowLeft className="size-3" />
                Back
              </Button>
              <div>
                <h1 className="text-lg font-bold">Quick Start Timetable</h1>
                <p className="text-xs text-muted-foreground">
                  Try without signup - limited features
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => navigate("/auth/login")}
              className="gap-1 h-8"
            >
              <Sparkles className="size-3" />
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 py-3 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 h-full">
            {/* Sidebar Controls */}
            <div className="lg:col-span-1 space-y-2 overflow-y-auto">
              {/* Setup */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Setup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Class Name
                    </Label>
                    <Input
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      placeholder="Enter class name"
                      className="text-sm h-8"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-xs h-8"
                      onClick={() => setTutorDialogOpen(true)}
                      disabled={database.tutors.length >= MAX_TUTORS_FREE}
                    >
                      <UserPlus className="size-3" />
                      Tutor ({database.tutors.length}/{MAX_TUTORS_FREE})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-xs h-8"
                      onClick={() => setCourseDialogOpen(true)}
                      disabled={
                        database.tutors.length === 0 ||
                        database.courses.length >= MAX_COURSES_FREE
                      }
                    >
                      <BookPlus className="size-3" />
                      Course ({database.courses.length}/{MAX_COURSES_FREE})
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats & Time */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Stats & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Usage Stats - Compact Grid */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tutors:</span>
                      <span
                        className={`font-medium ${
                          database.tutors.length >= MAX_TUTORS_FREE
                            ? "text-amber-600"
                            : ""
                        }`}
                      >
                        {database.tutors.length}/{MAX_TUTORS_FREE}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Courses:</span>
                      <span
                        className={`font-medium ${
                          database.courses.length >= MAX_COURSES_FREE
                            ? "text-amber-600"
                            : ""
                        }`}
                      >
                        {database.courses.length}/{MAX_COURSES_FREE}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Columns:</span>
                      <span
                        className={`font-medium ${
                          columnCount >= MAX_COLUMNS_FREE
                            ? "text-amber-600"
                            : ""
                        }`}
                      >
                        {columnCount}/{MAX_COLUMNS_FREE}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gens:</span>
                      <span
                        className={`font-medium ${
                          (usage?.regenerations || 0) >= MAX_REGENERATIONS_FREE
                            ? "text-amber-600"
                            : ""
                        }`}
                      >
                        {usage?.regenerations || 0}/{MAX_REGENERATIONS_FREE}
                      </span>
                    </div>
                  </div>

                  {/* Time Settings - Compact */}
                  <div className="border-t pt-2 space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Slot Duration
                    </Label>
                    {editingDefaultDuration ? (
                      <div className="flex gap-1">
                        <Input
                          type="number"
                          value={tempDefaultDuration}
                          onChange={(e) =>
                            gridState.setTempDefaultDuration(e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveDefaultDurationEdit();
                            if (e.key === "Escape") cancelDefaultDurationEdit();
                          }}
                          className="h-7 text-xs"
                          autoFocus
                          min="5"
                          max="480"
                        />
                        <Button
                          size="sm"
                          onClick={saveDefaultDurationEdit}
                          className="h-7 px-2 text-xs"
                        >
                          ✓
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelDefaultDurationEdit}
                          className="h-7 px-2 text-xs"
                        >
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">
                          {defaultSlotDuration} min
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            gridState.setEditingDefaultDuration(true);
                            gridState.setTempDefaultDuration(
                              defaultSlotDuration.toString()
                            );
                          }}
                          className="h-6 text-xs px-2"
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5">
                  <Button
                    size="sm"
                    className="w-full gap-1 h-8 text-xs"
                    onClick={handleGenerateTimetable}
                    disabled={
                      database.courses.length === 0 ||
                      (usage?.regenerations || 0) >= MAX_REGENERATIONS_FREE
                    }
                  >
                    <Sparkles className="size-3" />
                    Generate ({usage?.regenerations || 0}/
                    {MAX_REGENERATIONS_FREE})
                  </Button>

                  <div className="grid grid-cols-2 gap-1.5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-1 h-8 text-xs"
                        >
                          <IconFileTypePdf className="size-3" />
                          PDF
                          <ChevronDown className="size-2 ml-auto" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={() => handleExportPDF("standard")}
                          className="text-xs"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">Standard</span>
                            <span className="text-xs text-muted-foreground">
                              Free
                            </span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleExportPDF("premium")}
                          className="text-xs"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">Premium ✨</span>
                            <span className="text-xs text-muted-foreground">
                              Paid
                            </span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1 h-8 text-xs"
                      onClick={mergeCells}
                      disabled={!canMergeCells(selectedCells)}
                    >
                      <Merge className="size-3" />
                      Merge
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1 h-8 text-xs col-span-2"
                      onClick={() => setShowColorPalette(!showColorPalette)}
                      disabled={selectedCells.size === 0}
                    >
                      <Palette className="size-3" />
                      Color Cells
                    </Button>
                  </div>
                  {showColorPalette && selectedCells.size > 0 && (
                    <div className="p-1.5 border rounded space-y-1 bg-gray-50 dark:bg-neutral-800">
                      <div className="grid grid-cols-5 gap-1">
                        {[
                          "#ffffff",
                          "#f3f4f6",
                          "#fef3c7",
                          "#fecaca",
                          "#fed7aa",
                          "#d1fae5",
                          "#bfdbfe",
                          "#ddd6fe",
                          "#fbcfe8",
                          "#fce7f3",
                        ].map((color) => (
                          <button
                            key={color}
                            onClick={() => {
                              setSelectedCellsBackgroundColor(color);
                              setShowColorPalette(false);
                            }}
                            className="w-full h-5 rounded border border-gray-300 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full gap-1 h-8 text-xs"
                    onClick={resetGrid}
                  >
                    <RefreshCw className="size-3" />
                    Reset Grid
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Timetable Grid */}
            <div className="lg:col-span-3 overflow-hidden flex flex-col">
              <Card className="flex-1 flex flex-col overflow-hidden">
                <CardHeader className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-2 shrink-0">
                  <CardTitle className="text-base">
                    {className || "Weekly Timetable"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1 overflow-auto">
                  <div className="h-full">
                    <Table>
                      <TableCaption>
                        Double-click cells to edit, select multiple to merge or
                        color!
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[150px] font-semibold text-center sticky left-0 bg-background">
                            Time / Day
                          </TableHead>
                          {timeLabels.map(renderHeader)}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Array.from({ length: gridSize }, (_, row) => (
                          <tr key={row}>
                            <td className="bg-gray-200 border-2 border-gray-400 h-16 w-32 font-semibold text-gray-700 text-center sticky left-0 z-10 dark:bg-neutral-800 dark:text-neutral-200">
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Add Tutor Dialog */}
        <Dialog open={tutorDialogOpen} onOpenChange={setTutorDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Tutor</DialogTitle>
              <DialogDescription>
                Add a new tutor to your database.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tutor-name">Name *</Label>
                <Input
                  id="tutor-name"
                  value={newTutor.name}
                  onChange={(e) =>
                    setNewTutor({ ...newTutor, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tutor-email">Email</Label>
                <Input
                  id="tutor-email"
                  type="email"
                  value={newTutor.email}
                  onChange={(e) =>
                    setNewTutor({ ...newTutor, email: e.target.value })
                  }
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setTutorDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddTutor} disabled={!newTutor.name.trim()}>
                Add Tutor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Course Dialog */}
        <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Course</DialogTitle>
              <DialogDescription>
                Add a new course and assign a tutor.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="course-name">Course Name *</Label>
                <Input
                  id="course-name"
                  value={newCourse.name}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, name: e.target.value })
                  }
                  placeholder="Mathematics"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-tutor">Tutor *</Label>
                <Select
                  value={newCourse.tutorId}
                  onValueChange={(value) =>
                    setNewCourse({ ...newCourse, tutorId: value })
                  }
                >
                  <SelectTrigger id="course-tutor">
                    <SelectValue placeholder="Select a tutor" />
                  </SelectTrigger>
                  <SelectContent>
                    {database.tutors.map((tutor) => (
                      <SelectItem key={tutor.id} value={tutor.id}>
                        {tutor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-periods">Periods per Week</Label>
                <Input
                  id="course-periods"
                  type="number"
                  min="1"
                  max="10"
                  value={newCourse.periodsPerWeek}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      periodsPerWeek: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course-priority">Priority</Label>
                <Select
                  value={newCourse.priority}
                  onValueChange={(value) =>
                    setNewCourse({ ...newCourse, priority: value as PRIORITY })
                  }
                >
                  <SelectTrigger id="course-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PRIORITY.HIGH}>High</SelectItem>
                    <SelectItem value={PRIORITY.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={PRIORITY.LOW}>Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCourseDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCourse}
                disabled={!newCourse.name.trim() || !newCourse.tutorId}
              >
                Add Course
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Limit Warning Dialog */}
        <Dialog open={limitDialogOpen} onOpenChange={setLimitDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                {limitType === "tutors" && "Tutor Limit Reached"}
                {limitType === "courses" && "Course Limit Reached"}
                {limitType === "columns" && "Column Limit Reached"}
                {limitType === "regenerations" && "Generation Limit Reached"}
              </DialogTitle>
              <DialogDescription>
                {limitType === "tutors" &&
                  `You've reached the maximum of ${MAX_TUTORS_FREE} tutors for Quick Start mode.`}
                {limitType === "courses" &&
                  `You've reached the maximum of ${MAX_COURSES_FREE} courses for Quick Start mode.`}
                {limitType === "columns" &&
                  `You've reached the maximum of ${MAX_COLUMNS_FREE} columns for Quick Start mode.`}
                {limitType === "regenerations" &&
                  `You've used all ${MAX_REGENERATIONS_FREE} free generations for this session.`}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 dark:bg-amber-950 dark:border-amber-800">
                <p className="text-sm text-amber-900 dark:text-amber-100">
                  <strong>Free Mode Limits:</strong>
                </p>
                <ul className="text-sm text-amber-800 dark:text-amber-200 mt-2 ml-4 list-disc space-y-1">
                  <li>{MAX_TUTORS_FREE} tutors</li>
                  <li>{MAX_COURSES_FREE} courses</li>
                  <li>{MAX_COLUMNS_FREE} columns</li>
                  <li>{MAX_REGENERATIONS_FREE} generations per session</li>
                </ul>
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-3">
                  Sign up for a free account to unlock:
                </p>
                <ul className="text-sm text-amber-800 dark:text-amber-200 mt-2 ml-4 list-disc space-y-1">
                  <li>Unlimited tutors, courses & columns</li>
                  <li>Unlimited generations</li>
                  <li>Save your timetables</li>
                  <li>AI-powered generation</li>
                  <li>Premium PDF exports</li>
                </ul>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setLimitDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                Continue
              </Button>
              <Button
                onClick={() => navigate("/auth/login")}
                className="w-full sm:w-auto gap-2"
              >
                <Sparkles className="size-4" />
                Sign Up Free
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default QuickStart;
