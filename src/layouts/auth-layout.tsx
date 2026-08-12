import { Link, Outlet } from "react-router-dom";
import { ArrowLeft, CalendarClock, Check } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { solutions } from "@/config/solutions";
import { cn } from "@/lib/utils";

/**
 * Two-column auth shell.
 *
 * The form column owns centering for every auth route, so the individual
 * pages no longer each repeat `w-screen min-h-screen` — which also fixes the
 * horizontal overflow that `w-screen` caused whenever a scrollbar was
 * present. The brand column only appears from lg upward.
 */
const AuthLayout = () => {
  return (
    <div className="bg-background text-foreground grid min-h-screen lg:grid-cols-2">
      {/* Form column */}
      <div className="relative flex flex-col">
        <header className="flex items-center justify-between gap-4 p-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <CalendarClock className="text-primary size-5" />
            <span>Timetablely</span>
          </Link>
          <ThemeToggle />
        </header>

        <main className="flex flex-1 items-center justify-center px-6 py-10">
          <Outlet />
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-4 p-6">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to site
          </Link>
          <div className="text-muted-foreground flex items-center gap-4 text-xs">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Help
            </Link>
          </div>
        </footer>
      </div>

      {/* Brand column */}
      <aside className="bg-muted/40 relative hidden flex-col justify-center border-l p-12 lg:flex">
        <div className="flex max-w-md flex-col gap-8">
          <p className="michroma text-primary text-xs uppercase tracking-[0.2em]">
            One engine, three ways to use it
          </p>

          <p className="text-balance text-2xl font-semibold tracking-tight">
            Plan the week before it plans you.
          </p>

          <div className="flex flex-col gap-5">
            {solutions.map((solution) => (
              <div key={solution.slug} className="flex items-start gap-4">
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center border",
                    solution.accent.bg,
                    solution.accent.border
                  )}
                >
                  <solution.icon
                    className={cn("size-4", solution.accent.text)}
                  />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{solution.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {solution.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <ul className="flex flex-col gap-2 border-t pt-6">
            {[
              "Free plan, no credit card",
              "Works offline and syncs later",
              "Export to PDF at any time",
            ].map((point) => (
              <li
                key={point}
                className="text-muted-foreground flex items-center gap-2 text-sm"
              >
                <Check className="text-primary size-4 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default AuthLayout;
