import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";
import { CtaSection } from "@/components/marketing/cta-section";
import { Button } from "@/components/ui/button";
import { solutions } from "@/config/solutions";
import { cn } from "@/lib/utils";

/** Side-by-side comparison of the three modes. */
const SolutionsIndex = () => {
  return (
    <>
      <Section size="lg">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            as="h1"
            eyebrow="Solutions"
            title="Three ways to run Timetablely"
            description="The scheduling engine is the same in all three. What changes is the vocabulary, the defaults, and what the app puts in front of you."
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
                  <solution.icon
                    className={cn("size-5", solution.accent.text)}
                  />
                </span>
                <h2 className="mt-5 text-xl font-semibold">{solution.name}</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  {solution.audience}
                </p>
                <p className="mt-4 flex-1 text-pretty text-sm">
                  {solution.description}
                </p>
                <Button variant="outline" asChild className="mt-6 w-full gap-2">
                  <Link to={`/solutions/${solution.slug}`}>
                    Read more
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section muted bordered>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            title="Side by side"
            description="Same concepts, different names — pick the row that sounds like your week."
          />

          <div className="bg-background overflow-x-auto border">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-medium">Concept</th>
                  {solutions.map((solution) => (
                    <th
                      key={solution.slug}
                      className="p-4 text-left font-medium whitespace-nowrap"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "size-2 rounded-full",
                            solution.accent.dot
                          )}
                        />
                        {solution.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {solutions[0].terminology.map((term, rowIndex) => (
                  <tr key={term.concept} className="border-b">
                    <th className="text-muted-foreground p-4 text-left font-normal">
                      {term.concept}
                    </th>
                    {solutions.map((solution) => (
                      <td key={solution.slug} className="p-4 font-medium">
                        {solution.terminology[rowIndex].label}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b last:border-b-0">
                  <th className="text-muted-foreground p-4 text-left align-top font-normal">
                    Best for
                  </th>
                  {solutions.map((solution) => (
                    <td
                      key={solution.slug}
                      className="text-muted-foreground p-4 align-top"
                    >
                      {solution.audience}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="text-muted-foreground p-4 text-left align-top font-normal">
                    Outcomes
                  </th>
                  {solutions.map((solution) => (
                    <td key={solution.slug} className="p-4 align-top">
                      <ul className="flex flex-col gap-2">
                        {solution.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2">
                            <Check
                              className={cn(
                                "mt-0.5 size-3.5 shrink-0",
                                solution.accent.text
                              )}
                            />
                            <span className="text-muted-foreground">
                              {outcome}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground text-sm">
            You choose a mode when you sign up, and you can switch it later in
            settings without losing any data.
          </p>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
};

export default SolutionsIndex;
