import * as React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CalendarClock, ChevronRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/marketing/section";
import { solutions } from "@/config/solutions";
import { cn } from "@/lib/utils";

/** Links that appear as plain items in both desktop and mobile nav. */
const flatLinks = [
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "FAQs", to: "/faqs" },
  { label: "About", to: "/about" },
];

export function SiteNav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  // Close the mobile drawer whenever navigation happens.
  React.useEffect(() => setOpen(false), [location.pathname]);

  // The header sits flush over the hero and only grows a border once the page
  // has moved, so the landing page reads as one surface at rest.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled
          ? "border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60"
          : "border-b border-transparent"
      )}
    >
      <Container className="flex h-16 items-center gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="Timetablely home"
        >
          <CalendarClock className="text-primary size-5" />
          <span className="text-lg">Timetablely</span>
        </Link>

        {/* Desktop navigation */}
        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Solutions
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[520px] gap-1 p-2">
                  {solutions.map((solution) => (
                    <li key={solution.slug}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={`/solutions/${solution.slug}`}
                          className="flex select-none items-start gap-3 rounded-none p-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent"
                        >
                          <span
                            className={cn(
                              "flex size-9 shrink-0 items-center justify-center border",
                              solution.accent.bg,
                              solution.accent.border
                            )}
                          >
                            <solution.icon
                              className={cn("size-4", solution.accent.text)}
                            />
                          </span>
                          <span className="flex flex-col gap-1">
                            <span className="text-sm font-medium">
                              {solution.name}
                            </span>
                            <span className="text-muted-foreground line-clamp-2 text-sm">
                              {solution.tagline}
                            </span>
                          </span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                  <li className="border-t pt-1">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/solutions"
                        className="text-muted-foreground flex items-center gap-1 rounded-none p-3 text-sm hover:bg-accent"
                      >
                        Compare all three
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {flatLinks.map((link) => (
              <NavigationMenuItem key={link.to}>
                <NavigationMenuLink asChild>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                        isActive && "text-primary"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />

          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link to="/auth/login">Log in</Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/auth/signup">Get started</Link>
          </Button>

          {/* Mobile navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0">
              <SheetHeader className="border-b">
                <SheetTitle className="flex items-center gap-2">
                  <CalendarClock className="text-primary size-5" />
                  Timetablely
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col overflow-y-auto p-4">
                <p className="text-muted-foreground michroma px-2 pb-2 text-xs uppercase tracking-[0.2em]">
                  Solutions
                </p>
                {solutions.map((solution) => (
                  <SheetClose asChild key={solution.slug}>
                    <Link
                      to={`/solutions/${solution.slug}`}
                      className="flex items-start gap-3 px-2 py-3 hover:bg-accent"
                    >
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center border",
                          solution.accent.bg,
                          solution.accent.border
                        )}
                      >
                        <solution.icon
                          className={cn("size-4", solution.accent.text)}
                        />
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium">
                          {solution.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {solution.tagline}
                        </span>
                      </span>
                    </Link>
                  </SheetClose>
                ))}

                <div className="my-3 border-t" />

                {flatLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      className="px-2 py-3 text-sm font-medium hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/contact"
                    className="px-2 py-3 text-sm font-medium hover:bg-accent"
                  >
                    Contact
                  </Link>
                </SheetClose>

                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  <Button asChild>
                    <Link to="/auth/signup">Get started free</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/auth/login">Log in</Link>
                  </Button>
                  <div className="flex items-center justify-between px-2 pt-2">
                    <span className="text-muted-foreground text-sm">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
