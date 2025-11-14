import { GoogleGenAI } from "@google/genai";
import type { ITimetableDatabase } from "@/interface/database";
import type { ICellContent } from "@/interface/types";
import { generateTimeLabels } from "./temputils";

const dayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export interface AITimetableConfig {
  apiKey: string;
  database: ITimetableDatabase;
  columnCount: number;
  columnDurations: { [key: number]: number };
  defaultSlotDuration: number;
  existingCellContents: Map<string, ICellContent>;
  hiddenCells: Set<string>;
  selectedClassId?: string;
}

export const generateAITimetable = async (
  config: AITimetableConfig
): Promise<Map<string, ICellContent>> => {
  const {
    apiKey,
    database,
    columnCount,
    columnDurations,
    defaultSlotDuration,
    existingCellContents,
    hiddenCells,
    selectedClassId,
  } = config;

  // Initialize Gemini AI
  const ai = new GoogleGenAI({ apiKey });

  // Prepare data for AI
  const timeLabels = generateTimeLabels(
    columnCount,
    columnDurations,
    defaultSlotDuration
  );

  // Filter subjects based on selected class
  let classSubjects = database.courses;
  let className = "";

  if (selectedClassId) {
    const selectedClass = database.sessions.find(
      (c) => c.id === selectedClassId
    );
    if (selectedClass) {
      className = selectedClass.name;
      classSubjects = database.courses.filter((subject) =>
        selectedClass.subjects.includes(subject.id)
      );
    }
  }

  // Collect blocked slots
  const blockedSlots: string[] = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < columnCount; col++) {
      const cellKey = `${row}-${col}`;
      if (hiddenCells.has(cellKey)) {
        blockedSlots.push(cellKey);
        continue;
      }
      const cellContent = existingCellContents.get(cellKey);
      if (cellContent?.text) {
        blockedSlots.push(cellKey);
      }
    }
  }

  // Create prompt for AI
  const prompt = `You are an expert timetable scheduler. Generate an optimal weekly timetable based on the following constraints:

**Time Slots:**
${timeLabels.map((time, idx) => `Slot ${idx}: ${time}`).join("\n")}

**Days:**
${dayLabels.map((day, idx) => `Day ${idx}: ${day}`).join("\n")}

**Subjects:**
${classSubjects
  .map(
    (subject) =>
      `- ${subject.name} (ID: ${subject.id}): ${
        subject.periodsPerWeek
      } periods/week, Priority: ${subject.priority}, Teacher: ${
        database.tutors.find((t) => t.id === subject.teacherId)?.name ||
        "Unknown"
      }`
  )
  .join("\n")}

**Teachers:**
${database.tutors
  .map(
    (teacher) =>
      `- ${teacher.name} (ID: ${teacher.id}): Max ${
        teacher.maxPeriodsPerDay || 3
      } periods/day${
        teacher.unavailableSlots
          ? `, Unavailable: ${teacher.unavailableSlots.join(", ")}`
          : ""
      }`
  )
  .join("\n")}

**Blocked Slots (already occupied or breaks):**
${blockedSlots.length > 0 ? blockedSlots.join(", ") : "None"}

**Constraints:**
1. Each subject must be scheduled for exactly the specified periods per week
2. Teachers cannot exceed their max periods per day
3. Avoid scheduling teachers in their unavailable slots
4. High priority subjects should get better time slots (morning preferred)
5. Distribute subjects evenly across the week
6. Avoid consecutive periods for the same subject when possible
7. Do not use blocked slots

**Output Format:**
Return ONLY a valid JSON array with this exact structure (no markdown, no explanation):
[
  {"day": 0, "slot": 0, "subjectId": "subject-id"},
  {"day": 1, "slot": 2, "subjectId": "subject-id"}
]

Where:
- day: 0-4 (Monday to Friday)
- slot: 0-${columnCount - 1}
- subjectId: the ID of the subject to schedule

Generate the optimal timetable now:`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const text = response.text || "";

    // Parse AI response
    let schedule: Array<{ day: number; slot: number; subjectId: string }>;

    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("No JSON array found in response");
      }
      schedule = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.log(parseError);
      console.error("Failed to parse AI response:", text);
      throw new Error("AI returned invalid format. Please try again.");
    }

    // Convert AI schedule to cell contents
    const newCellContents = new Map(existingCellContents);

    for (const entry of schedule) {
      const { day, slot, subjectId } = entry;

      // Validate entry
      if (day < 0 || day >= 5 || slot < 0 || slot >= columnCount) {
        console.warn(`Invalid schedule entry: day=${day}, slot=${slot}`);
        continue;
      }

      const cellKey = `${day}-${slot}`;

      // Skip if slot is blocked
      if (blockedSlots.includes(cellKey)) {
        continue;
      }

      // Find subject and teacher
      const subject = classSubjects.find((s) => s.id === subjectId);
      if (!subject) {
        console.warn(`Subject not found: ${subjectId}`);
        continue;
      }

      const teacher = database.tutors.find((t) => t.id === subject.teacherId);
      let text = teacher ? `${subject.name}\n(${teacher.name})` : subject.name;

      if (className) {
        text = `${text}\n(${className})`;
      }

      newCellContents.set(cellKey, {
        text,
        isVertical: false,
        alignment: "center",
        className: selectedClassId,
      });
    }

    return newCellContents;
  } catch (error) {
    console.error("AI Timetable Generation Error:", error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes("429") || error.message.includes("quota")) {
        throw new Error(
          "Rate limit exceeded. Please wait a moment and try again. Free tier has limited requests per minute."
        );
      }
      if (
        error.message.includes("404") ||
        error.message.includes("not found")
      ) {
        throw new Error(
          "Model not available. Please check your API key or try again later."
        );
      }
      if (error.message.includes("401") || error.message.includes("API key")) {
        throw new Error(
          "Invalid API key. Please check your API key and try again."
        );
      }
    }

    throw error;
  }
};
