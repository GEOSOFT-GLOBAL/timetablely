import Landing from "@/views/landing";
import QuickStart from "@/views/quick-start";
import Pricing from "@/views/pricing";
import Features from "@/views/features";
import About from "@/views/about";
import Faqs from "@/views/faqs";

export const publicRoutes = [
  {
    index: true,
    element: <Landing />,
  },
  {
    path: "quick-start",
    element: <QuickStart />,
  },
  {
    path: "pricing",
    element: <Pricing />,
  },
  {
    path: "features",
    element: <Features />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "faqs",
    element: <Faqs />,
  },
];
