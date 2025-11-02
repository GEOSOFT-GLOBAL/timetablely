import Dashboard from "@/views";
import Courses from "@/views/courses";
import Sessions from "@/views/sessions";
import Templates from "@/views/templates";
import Tutors from "@/views/tutors";

export const appRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "courses",
    element: <Courses />,
  },
  {
    path: "tutors",
    element: <Tutors />,
  },
  {
    path: "sessions",
    element: <Sessions />,
  },
  {
    path: "sessions",
    element: <Templates />,
  },
];
