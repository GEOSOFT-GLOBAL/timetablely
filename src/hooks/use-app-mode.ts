import * as React from "react";
import { AppModeContext, type AppMode } from "@/context/app-mode-context";
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

// Re-export so existing imports of AppMode from this file keep working
export type { AppMode };

export const useAppMode = () => {
    const ctx = React.useContext(AppModeContext);
    if (!ctx) throw new Error("useAppMode must be used inside <AppModeProvider>");

    const { mode, setMode } = ctx;

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
        mode,
        setMode,
        isIndividual,
        isCompany,
        pick,
        labels,
        icons,
    };
};
