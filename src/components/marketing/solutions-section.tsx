import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { solutions } from "@/config/solutions";
import { cn } from "@/lib/utils";

/** The three-mode positioning, told once, in full. */
export function SolutionsSection() {
  return (
    <Section muted bordered id="solutions">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow="Solutions"
          title="Same engine. Three vocabularies."
          description="Timetablely adapts what things are called and how they behave to the way you work. Pick a mode when you sign up — you can switch any time."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {solutions.map((solution) => (
            <div
              key={solution.slug}
              className="bg-background flex flex-col border p-6"
            >
              <span
                className={cn(
                  "flex size-11 items-center justify-center border",
                  solution.accent.bg,
                  solution.accent.border
                )}
              >
                <solution.icon className={cn("size-5", solution.accent.text)} />
              </span>

              <h3 className="mt-5 text-xl font-semibold">{solution.name}</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {solution.audience}
              </p>
              <p className="mt-4 text-pretty">{solution.tagline}</p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {solution.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-2 text-sm">
                    <Check
                      className={cn("mt-0.5 size-4 shrink-0", solution.accent.text)}
                    />
                    <span className="text-muted-foreground">{outcome}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t mt-6 pt-4">
                <p className="text-muted-foreground michroma text-[0.65rem] uppercase tracking-[0.18em]">
                  In this mode
                </p>
                <dl className="mt-3 flex flex-col gap-1.5">
                  {solution.terminology.map((term) => (
                    <div
                      key={term.concept}
                      className="flex items-center justify-between text-sm"
                    >
                      <dt className="text-muted-foreground">{term.concept}</dt>
                      <dd className="font-medium">{term.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <Button variant="ghost" asChild className="mt-6 w-full justify-between">
                <Link to={`/solutions/${solution.slug}`}>
                  Explore {solution.name.toLowerCase()}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
