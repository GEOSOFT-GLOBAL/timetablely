import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";
import { CtaSection } from "@/components/marketing/cta-section";
import { Button } from "@/components/ui/button";
import { getSolution, solutions } from "@/config/solutions";
import { cn } from "@/lib/utils";

/**
 * One page per mode, driven entirely by the solutions config so the three
 * pages cannot drift out of sync structurally.
 */
const SolutionDetail = () => {
  const { slug } = useParams();
  const solution = getSolution(slug);

  if (!solution) return <Navigate to="/solutions" replace />;

  const others = solutions.filter((item) => item.slug !== solution.slug);

  return (
    <>
      <Section size="lg">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <span
              className={cn(
                "flex size-12 items-center justify-center border",
                solution.accent.bg,
                solution.accent.border
              )}
            >
              <solution.icon className={cn("size-6", solution.accent.text)} />
            </span>

            <SectionHeading
              as="h1"
              eyebrow={`For ${solution.name.toLowerCase()}`}
              title={solution.headline}
              description={solution.description}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="gap-2">
                <Link to="/auth/signup">
                  Get started free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/quick-start">Try it without an account</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 border-t pt-6">
            {solution.outcomes.map((outcome) => (
              <div key={outcome} className="flex items-center gap-2 text-sm">
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    solution.accent.dot
                  )}
                />
                <span className="text-muted-foreground">{outcome}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section muted bordered>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Capabilities"
            title={`What ${solution.name.toLowerCase()} get`}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {solution.capabilities.map((capability) => (
              <div
                key={capability.title}
                className="bg-background flex flex-col gap-2 border p-6"
              >
                <div className="flex items-start gap-2">
                  <Check
                    className={cn("mt-1 size-4 shrink-0", solution.accent.text)}
                  />
                  <h3 className="font-semibold">{capability.title}</h3>
                </div>
                <p className="text-muted-foreground pl-6 text-sm">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Getting started"
              title="How it goes"
              description="Most people are through this in well under an hour."
            />
            <ol className="flex flex-col">
              {solution.workflow.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 border-l pb-8 pl-6 last:pb-0"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-muted-foreground michroma text-xs uppercase tracking-[0.18em]">
                      Step {index + 1}
                    </span>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-card h-fit border p-6">
            <h3 className="font-semibold">What things are called</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Timetablely uses your field's vocabulary, not generic labels.
            </p>
            <dl className="mt-6 flex flex-col gap-3">
              {solution.terminology.map((term) => (
                <div
                  key={term.concept}
                  className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
                >
                  <dt className="text-muted-foreground text-sm">
                    {term.concept}
                  </dt>
                  <dd className="font-medium">{term.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section muted bordered size="sm">
        <Container className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Not quite your situation?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                to={`/solutions/${other.slug}`}
                className="bg-background group hover:border-primary/40 flex items-center gap-4 border p-5 transition-colors"
              >
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center border",
                    other.accent.bg,
                    other.accent.border
                  )}
                >
                  <other.icon className={cn("size-4", other.accent.text)} />
                </span>
                <span className="flex flex-col">
                  <span className="font-medium">{other.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {other.tagline}
                  </span>
                </span>
                <ArrowRight className="text-muted-foreground ml-auto size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
};

export default SolutionDetail;
