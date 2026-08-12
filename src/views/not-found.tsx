import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/marketing/section";
import { solutions } from "@/config/solutions";
import { cn } from "@/lib/utils";

const helpfulLinks = [
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
  { label: "Quick start", to: "/quick-start" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" },
];

/** 404. Renders inside PublicLayout, so header and footer stay available. */
const NotFound = () => {
  return (
    <Section size="lg">
      <Container className="flex flex-col items-center gap-8 text-center">
        <span className="bg-muted flex size-14 items-center justify-center border">
          <Compass className="text-muted-foreground size-6" />
        </span>

        <div className="flex flex-col gap-3">
          <p className="michroma text-primary text-sm uppercase tracking-[0.2em]">
            404
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            We could not find that page
          </h1>
          <p className="text-muted-foreground max-w-md text-pretty">
            The link may be out of date, or the page may have moved. Here is the
            way back.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Report a broken link</Link>
          </Button>
        </div>

        <div className="mt-4 flex flex-col gap-6 border-t pt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {helpfulLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                to={`/solutions/${solution.slug}`}
                className="hover:border-primary/40 flex items-center gap-3 border p-4 text-left transition-colors"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center border",
                    solution.accent.bg,
                    solution.accent.border
                  )}
                >
                  <solution.icon
                    className={cn("size-4", solution.accent.text)}
                  />
                </span>
                <span className="text-sm font-medium">{solution.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default NotFound;
