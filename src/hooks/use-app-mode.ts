import { useStorageString } from "./storage";
import {
    IconUsers,
    IconActivity,
    IconFolder,
    IconFileText,
    IconSchool,
    IconUser,
    IconChecklist,
    IconLayoutKanban,
} from "@tabler/icons-react";
import {
    UsersIcon,
    BookOpenIcon,
    GraduationCapIcon,
    ClipboardListIcon,
    FolderKanbanIcon,
} from "lucide-react";

export type AppMode = "education" | "individual" | "company";

export const useAppMode = () => {
    const { value: mode, set: setMode } = useStorageString("app-mode", "education");

    const isIndividual = mode === "individual";
    const isCompany = mode === "company";

    // Helper: pick value by mode (education | individual | company)
    const pick = <T,>(edu: T, ind: T, co: T): T =>
        isCompany ? co : isIndividual ? ind : edu;

    const labels = {
        tutors:  pick("Tutors",     "People",     "Members"),
        courses: pick("Courses",    "Activities", "Tasks"),
        sessions:pick("Classes",    "Groups",     "Projects"),
        tutor:   pick("Tutor",      "Person",     "Member"),
        course:  pick("Course",     "Activity",   "Task"),
        session: pick("Class",      "Group",      "Project"),
    };

    const icons = {
        tutors:   pick(IconUser,      IconUsers,     IconUsers),
        courses:  pick(IconFileText,  IconActivity,  IconChecklist),
        sessions: pick(IconSchool,    IconFolder,    IconLayoutKanban),
        // Lucide equivalents for DatabaseManager (kept separate to avoid cross-library type errors)
        tutorsLucide:   UsersIcon,
        coursesLucide:  isCompany ? ClipboardListIcon : isIndividual ? IconActivity : BookOpenIcon,
        sessionsLucide: isCompany ? FolderKanbanIcon  : isIndividual ? IconFolder   : GraduationCapIcon,
    };

    return {
        mode: (mode as AppMode) || "education",
        setMode,
        isIndividual,
        isCompany,
        pick,
        labels,
        icons,
    };
};
