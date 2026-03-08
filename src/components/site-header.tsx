import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconBell, IconMenu2 } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { SyncStatus } from "./sync-status";

interface SiteHeaderProps {
  title?: string;
}

export function SiteHeader({ title = "Overview" }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-2 px-4 lg:gap-3 lg:px-6">
        <SidebarTrigger className="-ml-1 h-9 w-9">
          <IconMenu2 className="h-5 w-5" />
        </SidebarTrigger>
        
        <Separator
          orientation="vertical"
          className="mx-1 h-6 data-[orientation=vertical]:h-6"
        />
        
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <SyncStatus />
          
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative h-9 w-9 hover:bg-accent"
          >
            <NavLink to="/app/notifications" className="relative">
              <IconBell className="h-[1.2rem] w-[1.2rem]" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
              <span className="sr-only">Notifications</span>
            </NavLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
