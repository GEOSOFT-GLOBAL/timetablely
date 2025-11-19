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
import type {
  ITimetableDatabase,
  ITutor,
  ICourse,
  ISession,
} from "@/interface/database";
import { PRIORITY } from "@/interface/enums";
import {
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Merge,
  Palette,
  UserPlus,
  BookPlus,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IconFileTypePdf } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";

const QuickStart: React.FC = () => {
  const navigate = useNavigate();
  const gridState = useGridState();
  const [showColorPalette, setShowColorPalette] = React.useState(false);

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
  const [sessionDialogOpen, setSessionDialogOpen] = React.useState(false);

  // Form states
  const [newTutor, setNewTutor] = React.useState({ name: "", email: "" });
  const [newCourse, setNewCourse] = React.useState({
    name: "",
    tutorId: "",
    periodsPerWeek: 3,
    priority: PRIORITY.MEDIUM,
  });
  const [newSession, setNewSession] = React.useState({
    name: "",
    subjects: [] as string[],
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
    handleCellClick,
    handleCellDoubleClick,
    mergeCells,
    addColumnAfter,
    deleteColumn,
    startEditingDuration,
    saveDurationEdit,
    cancelDurationEdit,
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

  // Add Session
  const handleAddSession = () => {
    if (!newSession.name.trim()) return;

    const session: ISession = {
      id: uuidv4(),
      name: newSession.name,
      subjects: newSession.subjects,
    };

    setDatabase((prev) => ({
      ...prev,
      sessions: [...prev.sessions, session],
    }));

    setNewSession({ name: "", subjects: [] });
    setSessionDialogOpen(false);
  };

  const handleGenerateTimetable = () => {
    if (database.courses.length === 0) {
      alert("Please add at least one course first!");
      return;
    }

    const newCellContents = generateAutomatedTimetable(
      database,
      columnCount,
      cellContents,
      hiddenCells
    );
    gridState.setAllCellContents(newCellContents);
  };

  const handleExportPDF = () => {
    try {
      exportTimetableToPDF({
        cellContents,
        columnCount,
        columnDurations,
        defaultSlotDuration,
        hiddenCells,
        title: "Quick Start Timetable",
        subtitle: "Generated with Timetablely",
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="size-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Quick Start Timetable</h1>
                <p className="text-sm text-muted-foreground">
                  Try our timetable generator - no signup required!
                </p>
              </div>
            </div>
            <Button onClick={() => navigate("/auth/login")} className="gap-2">
              <Sparkles className="size-4" />
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Add Data */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 justify-start"
                  onClick={() => setTutorDialogOpen(true)}
                >
                  <UserPlus className="size-4" />
                  Add Tutor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 justify-start"
                  onClick={() => setCourseDialogOpen(true)}
                  disabled={database.tutors.length === 0}
                >
                  <BookPlus className="size-4" />
                  Add Course
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 justify-start"
                  onClick={() => setSessionDialogOpen(true)}
                  disabled={database.courses.length === 0}
                >
                  <Users className="size-4" />
                  Add Session
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tutors:</span>
                  <span className="font-medium">{database.tutors.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Courses:</span>
                  <span className="font-medium">{database.courses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sessions:</span>
                  <span className="font-medium">
                    {database.sessions.length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  size="sm"
                  className="w-full gap-2"
                  onClick={handleGenerateTimetable}
                  disabled={database.courses.length === 0}
                >
                  <Sparkles className="size-4" />
                  Generate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={handleExportPDF}
                >
                  <IconFileTypePdf className="size-4" />
                  Export PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={mergeCells}
                  disabled={!canMergeCells(selectedCells)}
                >
                  <Merge className="size-4" />
                  Merge
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => setShowColorPalette(!showColorPalette)}
                  disabled={selectedCells.size === 0}
                >
                  <Palette className="size-4" />
                  Color
                </Button>
                {showColorPalette && selectedCells.size > 0 && (
                  <div className="p-2 border rounded-lg space-y-2 bg-gray-50 dark:bg-neutral-800">
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
                          className="w-full h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
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
                  className="w-full gap-2"
                  onClick={resetGrid}
                >
                  <RefreshCw className="size-4" />
                  Reset
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-blue-900 dark:text-blue-100">
                  💡 Start by adding tutors, then courses, then generate your
                  timetable!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Timetable Grid */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle>Weekly Timetable</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
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
            <Button variant="outline" onClick={() => setTutorDialogOpen(false)}>
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

      {/* Add Session Dialog */}
      <Dialog open={sessionDialogOpen} onOpenChange={setSessionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Session</DialogTitle>
            <DialogDescription>
              Add a new class session (optional).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="session-name">Session Name *</Label>
              <Input
                id="session-name"
                value={newSession.name}
                onChange={(e) =>
                  setNewSession({ ...newSession, name: e.target.value })
                }
                placeholder="Class A"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSessionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddSession}
              disabled={!newSession.name.trim()}
            >
              Add Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickStart;
