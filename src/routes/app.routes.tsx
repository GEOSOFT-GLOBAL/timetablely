import Dashboard from "@/views";
import Blocks from "@/views/blocks";
import Tutors from "@/views/tutors";
import Billing from "@/views/billing";
import Courses from "@/views/courses";
import Account from "@/views/account";
import Settings from "@/views/settings";
import Sessions from "@/views/sessions";
import HowToUse from "@/views/how-to-use";
import Templates from "@/views/templates";
import Timetables from "@/views/timetables";
import Notifications from "@/views/notifications";

export const appRoutes = [
  {
    path: "dashboard",
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
    path: "templates",
    element: <Templates />,
  },
  {
    path: "special-blocks",
    element: <Blocks />,
  },
  {
    path: "timetables",
    element: <Timetables />,
  },
  {
    path: "walkthrough",
    element: <HowToUse />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
  {
    path: "notifications",
    element: <Notifications />,
  },
  {
    path: "billing",
    element: <Billing />,
  },
  {
    path: "account",
    element: <Account />,
  },
];
