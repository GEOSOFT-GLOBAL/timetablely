import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/marketing/section";

interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

/** Closing call to action. Every marketing page ends with one of these. */
export function CtaSection({
  title = "Start with the free plan",
  description = "Set up your first schedule in a few minutes. No credit card, no trial clock — upgrade only when you outgrow it.",
  primaryLabel = "Create a free account",
  primaryTo = "/auth/signup",
  secondaryLabel = "Try it without signing up",
  secondaryTo = "/quick-start",
}: CtaSectionProps) {
  return (
    <Section bordered>
      <Container>
        <div className="bg-card flex flex-col items-center gap-6 border p-10 text-center sm:p-16">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-pretty sm:text-lg">
            {description}
          </p>
          <div className="flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <Link to={primaryTo}>
                {primaryLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to={secondaryTo}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
