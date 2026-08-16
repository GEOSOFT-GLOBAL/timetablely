import * as React from "react";
import { NavLink } from "react-router-dom";
import type { Icon } from "@tabler/icons-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatTileProps {
  label: string;
  value: React.ReactNode;
  /** One line under the number: what the number is made of. */
  hint?: React.ReactNode;
  icon: Icon;
  /** Page this number belongs to. */
  to: string;
  /** Tailwind classes for the icon, from the mode's accent. */
  accent?: { text: string; bg: string };
  /** Rendered under the hint — a meter, a badge, anything small. */
  children?: React.ReactNode;
}

/**
 * One headline number. Always a link: a count the user disagrees with is only
 * useful if the page that fixes it is one click away.
 */
export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  hint,
  icon: TileIcon,
  to,
  accent,
  children,
}) => (
  <Card className="hover:border-primary/40 gap-0 py-0 transition-colors">
    <NavLink to={to} className="flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-muted-foreground truncate text-sm">{label}</p>
          <p className="mt-2 text-3xl font-bold tabular-nums">{value}</p>
        </div>
        <div className={cn("p-2", accent?.bg ?? "bg-muted")}>
          <TileIcon className={cn("h-5 w-5", accent?.text ?? "text-primary")} />
        </div>
      </div>
      {hint && (
        <p className="text-muted-foreground text-xs leading-relaxed">{hint}</p>
      )}
      {children}
    </NavLink>
  </Card>
);

export default StatTile;
