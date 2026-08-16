import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useModeDatabase } from "@/hooks/use-mode-database";

const pageTitles: Record<string, string> = {
  "/app/dashboard": "Dashboard",
  "/app/schedule": "Schedule",
  "/app/items": "Items",
  "/app/members": "Members",
  "/app/groups": "Groups",
  "/app/templates": "Templates",
  "/app/analytics": "Analytics",
  "/app/workspace": "Workspace",
  "/app/how-to-use": "How to Use",
  "/app/settings": "Settings",
  "/app/account": "Account",
  "/app/billing": "Billing",
  "/app/notifications": "Notifications",
};

const Layout = () => {
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || "Overview";
  
  // Initialize mode-specific database switching
  useModeDatabase();

  return (
    <SidebarProvider
      // Starts as an icon rail: the destination list is short and stable, so
      // the width is better spent on the schedule. The header trigger expands
      // it, and that choice is remembered.
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "240px",
          "--sidebar-width-icon": "72px",
          "--header-height": "64px",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={currentTitle} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
