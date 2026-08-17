import Dashboard from "@/views";
import Blocks from "@/views/blocks";
import Tutors from "@/views/members-view";
import Billing from "@/views/billing";
import BillingCallback from "@/views/billing-callback";
import Courses from "@/views/items-view";
import Account from "@/views/account";
import Settings from "@/views/settings";
import Sessions from "@/views/groups-view";
import HowToUse from "@/views/how-to-use";
import Templates from "@/views/templates";
import Timetables from "@/views/schedule-view";
import Notifications from "@/views/notifications";
import Workspace from "@/views/workspace";

export const appRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "items",
    element: <Courses />,
  },
  {
    path: "members",
    element: <Tutors />,
  },
  {
    path: "groups",
    element: <Sessions />,
  },
  {
    path: "templates",
    element: <Templates />,
  },
  {
    path: "workspace",
    element: <Workspace />,
  },
  {
    path: "special-blocks",
    element: <Blocks />,
  },
  {
    path: "schedule",
    element: <Timetables />,
  },
  {
    path: "how-to-use",
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
    // Where Paystack returns the buyer. Inside /app so the page has a token
    // to confirm the payment with.
    path: "billing/callback",
    element: <BillingCallback />,
  },
  {
    path: "account",
    element: <Account />,
  },
];
