import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";

import BubbleMenu from "@/components/BubbleMenu";
import { SiteNav } from "@/components/marketing/site-nav";
import { SiteFooter } from "@/components/marketing/site-footer";

/**
 * Shell for every public (unauthenticated) page.
 *
 * The primary navigation is the conventional sticky header. The BubbleMenu is
 * kept as a brand flourish on the landing page only, where it has room to
 * breathe and does not compete with in-page navigation.
 */
/**
 * Routes that are tools rather than pages. They carry their own toolbar and
 * need the full viewport, so the marketing shell steps out of the way.
 */
const TOOL_ROUTES = ["/quick-start"];

const PublicLayout: React.FC = () => {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";
  const isTool = TOOL_ROUTES.includes(pathname);

  const bubbleItems = [
    {
      label: "personal",
      href: "/solutions/personal",
      ariaLabel: "Timetablely for personal use",
      rotation: -8,
      hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
    },
    {
      label: "teams",
      href: "/solutions/teams",
      ariaLabel: "Timetablely for teams",
      rotation: 8,
      hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
    },
    {
      label: "institutions",
      href: "/solutions/institutions",
      ariaLabel: "Timetablely for institutions",
      rotation: -8,
      hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
    },
    {
      label: "pricing",
      href: "/pricing",
      ariaLabel: "Pricing",
      rotation: 8,
      hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
    },
    {
      label: "quick start",
      href: "/quick-start",
      ariaLabel: "Quick Start",
      rotation: -8,
      hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
    },
  ];

  // Reset scroll on navigation — without this, moving between long marketing
  // pages lands the visitor mid-page.
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  if (isTool) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <SiteNav />

      {isLanding ? (
        <BubbleMenu
          items={bubbleItems}
          menuAriaLabel="Toggle quick navigation"
          placement="bottom-right"
          useFixedPosition
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      ) : null}

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
};

export default PublicLayout;
