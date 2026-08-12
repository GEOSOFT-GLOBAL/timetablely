import { Link } from "react-router-dom";
import { CalendarClock, Mail } from "lucide-react";

import { Container } from "@/components/marketing/section";
import { ThemeToggle } from "@/components/theme-toggle";
import { solutions } from "@/config/solutions";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "Quick start", to: "/quick-start" },
      { label: "FAQs", to: "/faqs" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", to: "/privacy" },
      { label: "Terms of service", to: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold tracking-tight"
            >
              <CalendarClock className="text-primary size-5" />
              <span className="text-lg">Timetablely</span>
            </Link>
            <p className="text-muted-foreground max-w-xs text-sm">
              One scheduling engine, three ways to use it — for yourself, for
              your team, or for your whole institution.
            </p>
            <a
              href="mailto:support@timetablely.com"
              className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-2 text-sm transition-colors"
            >
              <Mail className="size-4" />
              support@timetablely.com
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Solutions</h3>
            <ul className="flex flex-col gap-2">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    to={`/solutions/${solution.slug}`}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">{column.heading}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Timetablely. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Link
              to="/auth/login"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Log in
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link
              to="/auth/signup"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Sign up
            </Link>
            <ThemeToggle className="ml-2" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
