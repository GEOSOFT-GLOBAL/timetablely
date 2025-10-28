import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import * as React from "react";
import data from "./data.json";
import Dashboard from "./index";
import TimeTable from "@/components/timetable";

interface LayoutProps {
  propName: type;
}

const Layout: React.FC<LayoutProps> = ({ propName }) => {
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6 gap-4 h-full w-full">
                  <Dashboard />
                </div>
                <div className="flex w-full">
                  <div className="w-3/4">
                    <TimeTable />
                  </div>
                  <div className="w-1/4">
                    <SectionCards />
                  </div>
                </div>
                {/*<div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>*/}
                {/*<DataTable data={data} />*/}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
