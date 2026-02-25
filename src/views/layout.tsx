import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const pageTitles: Record<string, string> = {
  "/app/dashboard": "Dashboard",
  "/app/timetables": "Timetables",
  "/app/courses": "Courses",
  "/app/tutors": "Tutors",
  "/app/sessions": "Sessions",
  "/app/templates": "Templates",
  "/app/analytics": "Analytics",
  "/app/settings": "Settings",
  "/app/account": "Account",
  "/app/billing": "Billing",
  "/app/notifications": "Notifications",
};

const Layout = () => {
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || "Overview";

  return (
    <SidebarProvider
      defaultOpen
      style={
        {
          "--sidebar-width": "280px",
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
