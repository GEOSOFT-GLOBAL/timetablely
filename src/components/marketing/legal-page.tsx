import * as React from "react";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";

export interface LegalClause {
  heading: string;
  /** Paragraphs, rendered in order. */
  body: string[];
  /** Optional bullets rendered under the paragraphs. */
  bullets?: string[];
}

interface LegalPageProps {
  title: string;
  description: string;
  lastUpdated: string;
  clauses: LegalClause[];
  footer?: React.ReactNode;
}

/** Shared shell for policy documents: sticky contents plus numbered clauses. */
export function LegalPage({
  title,
  description,
  lastUpdated,
  clauses,
  footer,
}: LegalPageProps) {
  const slugify = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <Section size="lg">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <SectionHeading as="h1" title={title} description={description} />
          <p className="text-muted-foreground text-sm">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav className="h-fit lg:sticky lg:top-24">
            <p className="michroma text-muted-foreground text-xs uppercase tracking-[0.18em]">
              Contents
            </p>
            <ol className="mt-4 flex flex-col gap-2">
              {clauses.map((clause, index) => (
                <li key={clause.heading}>
                  <a
                    href={`#${slugify(clause.heading)}`}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {index + 1}. {clause.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-10">
            {clauses.map((clause, index) => (
              <section
                key={clause.heading}
                id={slugify(clause.heading)}
                className="flex scroll-mt-24 flex-col gap-3"
              >
                <h2 className="text-xl font-semibold">
                  {index + 1}. {clause.heading}
                </h2>
                {clause.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-muted-foreground text-pretty"
                  >
                    {paragraph}
                  </p>
                ))}
                {clause.bullets ? (
                  <ul className="text-muted-foreground flex list-disc flex-col gap-2 pl-5">
                    {clause.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {footer ? <div className="border-t pt-8">{footer}</div> : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
