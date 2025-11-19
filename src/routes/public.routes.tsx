import Landing from "@/views/landing";
import QuickStart from "@/views/quick-start";

export const publicRoutes = [
  {
    index: true,
    element: <Landing />,
  },
  {
    path: "quick-start",
    element: <QuickStart />,
  },
];
