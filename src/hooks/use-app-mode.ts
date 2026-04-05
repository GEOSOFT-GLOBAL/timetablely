import { useStorageString } from "./storage";
import {
    IconUsers,
    IconActivity,
    IconFolder,
    IconFileText,
    IconSchool,
    IconUser
} from "@tabler/icons-react";
import {
    UsersIcon,
    BookOpenIcon,
    GraduationCapIcon
} from "lucide-react";

export type AppMode = "education" | "individual";

export const useAppMode = () => {
    const { value: mode, set: setMode } = useStorageString("app-mode", "education");

    const isIndividual = mode === "individual";

    const labels = {
        tutors: isIndividual ? "People" : "Tutors",
        courses: isIndividual ? "Activities" : "Courses",
        sessions: isIndividual ? "Groups" : "Classes",
        tutor: isIndividual ? "Person" : "Tutor",
        course: isIndividual ? "Activity" : "Course",
        session: isIndividual ? "Group" : "Class",
    };

    const icons = {
        tutors: isIndividual ? IconUsers : IconUser,
        courses: isIndividual ? IconActivity : IconFileText,
        sessions: isIndividual ? IconFolder : IconSchool,
        // Lucide equivalents for DatabaseManager
        tutorsLucide: isIndividual ? UsersIcon : UsersIcon, // Users is fine for both
        coursesLucide: isIndividual ? IconActivity : BookOpenIcon,
        sessionsLucide: isIndividual ? IconFolder : GraduationCapIcon,
    };

    return {
        mode: (mode as AppMode) || "education",
        setMode,
        isIndividual,
        labels,
        icons,
    };
};
