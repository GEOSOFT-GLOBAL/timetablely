import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CalendarRange,
  DownloadIcon,
  LayoutTemplate,
  ShieldCheck,
  WifiOff,
  ZapIcon,
} from "lucide-react";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    icon: ZapIcon,
    title: "Automatic generation",
    description:
      "A complete, conflict-free schedule in seconds — constraints respected before the first cell is filled.",
  },
  {
    icon: CalendarRange,
    title: "Drag-and-drop grid",
    description:
      "Move anything by hand. Merge cells, resize slots, and regenerate only what you have not locked.",
  },
  {
    icon: ShieldCheck,
    title: "Conflict detection",
    description:
      "Double bookings and over-committed people surface while you edit, not after you publish.",
  },
  {
    icon: LayoutTemplate,
    title: "Reusable templates",
    description:
      "Save a structure once and apply it to the next term, the next project, or the next week.",
  },
  {
    icon: DownloadIcon,
    title: "PDF export",
    description:
      "Print-ready output with your own headers and footers, per group or in a single batch.",
  },
  {
    icon: WifiOff,
    title: "Works offline",
    description:
      "Keep working with no connection. Everything syncs the moment you are back online.",
  },
  {
    icon: BarChart3,
    title: "Workload analytics",
    description:
      "See distribution across people and spot where the plan is over-committed.",
  },
];

export function FeatureHighlights() {
  return (
    <Section muted bordered>
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Capabilities"
            title="Everything the schedule needs"
            description="Built for the messy part — the constraints, the exceptions, and the change that lands the week before."
          />
          <Button variant="outline" asChild className="w-fit shrink-0 gap-2">
            <Link to="/features">
              See all features
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="bg-background hover:border-primary/40 flex flex-col gap-3 border p-6 transition-colors"
            >
              <highlight.icon className="text-primary size-5" />
              <h3 className="font-semibold">{highlight.title}</h3>
              <p className="text-muted-foreground text-sm">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
