import Landing from "@/views/landing";
import QuickStart from "@/views/quick-start";
import Pricing from "@/views/pricing";
import Features from "@/views/features";
import About from "@/views/about";
import Faqs from "@/views/faqs";
import Contact from "@/views/contact";
import SolutionsIndex from "@/views/solutions";
import SolutionDetail from "@/views/solutions/solution-detail";
import Privacy from "@/views/legal/privacy";
import Terms from "@/views/legal/terms";
import NotFound from "@/views/not-found";

export const publicRoutes = [
  {
    index: true,
    element: <Landing />,
  },
  {
    path: "solutions",
    element: <SolutionsIndex />,
  },
  {
    path: "solutions/:slug",
    element: <SolutionDetail />,
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
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "privacy",
    element: <Privacy />,
  },
  {
    path: "terms",
    element: <Terms />,
  },
  // Catch-all: unknown public URLs get the 404 page inside the site shell
  // rather than the router's bare error screen.
  {
    path: "*",
    element: <NotFound />,
  },
];
