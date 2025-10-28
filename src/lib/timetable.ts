import type { ITimetableEntry } from "@/interface/database";
import type { ICellContent } from "@/interface/types";
import { generateTimeLabels } from "./temputils";

export const dayLabels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const defaultBlockedTexts = [
  "break",
  "short break",
  "devotion",
  "assembly",
  "lunch",
  "recess",
  "morning devotion",
  "closing",
  "games",
  "sports",
  "free period",
];

export const extractTimetableData = (
  cellContents: Map<string, ICellContent>,
  mergedCells: Map<string, any>,
  hiddenCells: Set<string>,
  columnCount: number,
  columnDurations: { [key: number]: number },
  defaultSlotDuration: number,
): ITimetableEntry[] => {
  const timeLabels = generateTimeLabels(
    columnCount,
    columnDurations,
    defaultSlotDuration,
  );
  const entries: ITimetableEntry[] = [];

  for (let row = 0; row < 5; row++) {
    // 5 days
    for (let col = 0; col < columnCount; col++) {
      const cellKey = `${row}-${col}`;

      // Skip hidden cells (part of merged cells)
      if (hiddenCells.has(cellKey)) continue;

      const cellContent = cellContents.get(cellKey);
      const _mergeInfo = mergedCells.get(cellKey);

      const entry: ITimetableEntry = {
        cellKey,
        row,
        col,
        day: dayLabels[row],
        timeSlot: timeLabels[col],
        customText: cellContent?.text,
        // Store cell formatting properties
        isVertical: cellContent?.isVertical,
        alignment: cellContent?.alignment,
      };

      entries.push(entry);
    }
  }

  return entries;
};

export const isCellBlocked = (
  cellContent: ICellContent | undefined,
  blockedTexts: string[],
): boolean => {
  if (!cellContent?.text) return false;

  const text = cellContent.text.toLowerCase().trim();
  return blockedTexts.some((blocked) => text.includes(blocked.toLowerCase()));
};

export const generateAutomatedTimetable = (
  database: TimetableDatabase,
  columnCount: number,
  existingCellContents: Map<string, CellContent>,
  hiddenCells: Set<string>,
  selectedClassId?: string,
): Map<string, CellContent> => {
  const newCellContents = new Map(existingCellContents);
  const {
    teachers,
    subjects,
    classes,
    blockedTexts = defaultBlockedTexts,
  } = database;

  // Filter subjects based on selected class if provided
  let classSubjects = subjects;
  let className = "";

  if (selectedClassId) {
    const selectedClass = classes.find((c) => c.id === selectedClassId);
    if (selectedClass) {
      className = selectedClass.name;
      classSubjects = subjects.filter((subject) =>
        selectedClass.subjects.includes(subject.id),
      );
    }
  }

  // Create a schedule grid (5 days × columnCount slots)
  const schedule: (Subject | null)[][] = Array(5)
    .fill(null)
    .map(() => Array(columnCount).fill(null));

  // Mark blocked slots
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < columnCount; col++) {
      const cellKey = `${row}-${col}`;

      // Skip hidden cells
      if (hiddenCells.has(cellKey)) continue;

      const cellContent = existingCellContents.get(cellKey);
      if (isCellBlocked(cellContent, blockedTexts)) {
        schedule[row][col] = "BLOCKED" as any;
      }
    }
  }

  // Sort subjects by priority and periods per week
  const sortedSubjects = [...classSubjects].sort((a, b) => {
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityWeight[a.priority] * a.periodsPerWeek;
    const bPriority = priorityWeight[b.priority] * b.periodsPerWeek;
    return bPriority - aPriority;
  });

  // Track teacher assignments per day
  const teacherDailyCount: { [teacherId: string]: number[] } = {};
  teachers.forEach((teacher) => {
    teacherDailyCount[teacher.id] = Array(5).fill(0);
  });

  // Assign subjects to schedule
  for (const subject of sortedSubjects) {
    const teacher = teachers.find((t) => t.id === subject.teacherId);
    if (!teacher) continue;

    let periodsAssigned = 0;
    let attempts = 0;
    const maxAttempts = subject.periodsPerWeek * 10; // Prevent infinite loops

    while (periodsAssigned < subject.periodsPerWeek && attempts < maxAttempts) {
      attempts++;

      // Find available slots
      const availableSlots: { row: number; col: number }[] = [];

      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < columnCount; col++) {
          if (schedule[row][col] === null) {
            // Check teacher availability
            const maxPerDay = teacher.maxPeriodsPerDay || 3;
            if (teacherDailyCount[teacher.id][row] >= maxPerDay) continue;

            // Check if teacher is unavailable in this slot
            const cellKey = `${row}-${col}`;
            if (teacher.unavailableSlots?.includes(cellKey)) continue;

            // Avoid consecutive periods if specified
            if (
              subject.avoidConsecutive &&
              col > 0 &&
              schedule[row][col - 1] === subject
            )
              continue;
            if (
              subject.avoidConsecutive &&
              col < columnCount - 1 &&
              schedule[row][col + 1] === subject
            )
              continue;

            availableSlots.push({ row, col });
          }
        }
      }

      if (availableSlots.length === 0) break;

      // Prefer slots based on subject preferences
      let chosenSlots = availableSlots;
      if (subject.preferredSlots && subject.preferredSlots.length > 0) {
        const preferredAvailable = availableSlots.filter((slot) =>
          subject.preferredSlots!.includes(`${slot.row}-${slot.col}`),
        );
        if (preferredAvailable.length > 0) {
          chosenSlots = preferredAvailable;
        }
      }

      // Randomly select a slot
      const randomIndex = Math.floor(Math.random() * chosenSlots.length);
      const selectedSlot = chosenSlots[randomIndex];

      // Assign the subject
      schedule[selectedSlot.row][selectedSlot.col] = subject;
      teacherDailyCount[teacher.id][selectedSlot.row]++;
      periodsAssigned++;
    }
  }

  // Fill any remaining empty slots with subjects in a round-robin fashion
  if (sortedSubjects.length > 0) {
    let subjectIndex = 0;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < columnCount; col++) {
        if (schedule[row][col] === null) {
          // Find a subject with an available teacher
          let foundSubject = false;
          let attemptsToFindSubject = 0;

          while (
            !foundSubject &&
            attemptsToFindSubject < sortedSubjects.length
          ) {
            const subject = sortedSubjects[subjectIndex];
            const teacher = teachers.find((t) => t.id === subject.teacherId);

            if (teacher) {
              const cellKey = `${row}-${col}`;
              const maxPerDay = teacher.maxPeriodsPerDay || 3;

              // Check if teacher is available
              if (
                teacherDailyCount[teacher.id][row] < maxPerDay &&
                !teacher.unavailableSlots?.includes(cellKey)
              ) {
                // Assign the subject
                schedule[row][col] = subject;
                teacherDailyCount[teacher.id][row]++;
                foundSubject = true;
              }
            }

            // Move to next subject in round-robin fashion
            subjectIndex = (subjectIndex + 1) % sortedSubjects.length;
            attemptsToFindSubject++;
          }
        }
      }
    }
  }

  // Convert schedule back to cell contents
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < columnCount; col++) {
      const cellKey = `${row}-${col}`;
      const subject = schedule[row][col];

      if (subject && typeof subject !== "string") {
        const teacher = teachers.find((t) => t.id === subject.teacherId);
        let text = teacher
          ? `${subject.name}\n(${teacher.name})`
          : subject.name;

        // Add class name if a specific class is selected
        if (className) {
          text = `${text}\n(${className})`;
        }

        newCellContents.set(cellKey, {
          text,
          isVertical: false,
          alignment: "center",
          className: selectedClassId, // Store the class ID for filtering
        });
      }
    }
  }

  return newCellContents;
};
