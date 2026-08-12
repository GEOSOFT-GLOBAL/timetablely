import { Link } from "react-router-dom";
import {
  BarChartIcon,
  BookOpenIcon,
  CalendarIcon,
  Check,
  DatabaseIcon,
  DownloadIcon,
  LayoutTemplateIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
  UsersIcon,
  WifiOffIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";
import { CtaSection } from "@/components/marketing/cta-section";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { solutions } from "@/config/solutions";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
}

/**
 * Features are grouped by the job they do rather than listed flat, so a
 * visitor can find the one thing they came to check.
 */
const featureGroups: { id: string; label: string; features: Feature[] }[] = [
  {
    id: "scheduling",
    label: "Scheduling",
    features: [
      {
        title: "Automated generation",
        icon: ZapIcon,
        description:
          "Produce a complete schedule from your constraints in seconds, with priority and availability respected before anything is placed.",
        benefits: [
          "Full grid generated in seconds",
          "Optimised for minimal conflicts",
          "Every constraint respected",
        ],
      },
      {
        title: "Visual grid editing",
        icon: CalendarIcon,
        description:
          "An interactive grid you can actually work in — drag to move, merge cells, and adjust time slots without regenerating everything.",
        benefits: [
          "Drag-and-drop placement",
          "Merge and split cells",
          "Adjustable time slots",
        ],
      },
      {
        title: "Blocked periods",
        icon: ShieldIcon,
        description:
          "Carve out breaks, assemblies, lunch or any recurring non-working period. Blocked time stays excluded from every regeneration.",
        benefits: [
          "Custom block types",
          "Recurring patterns",
          "Never overwritten by generation",
        ],
      },
      {
        title: "Reusable templates",
        icon: LayoutTemplateIcon,
        description:
          "Save a working structure and apply it to the next term, project or week instead of rebuilding it from scratch.",
        benefits: [
          "Save and manage templates",
          "One-click apply",
          "Template versioning",
        ],
      },
    ],
  },
  {
    id: "data",
    label: "Data and people",
    features: [
      {
        title: "Central database",
        icon: DatabaseIcon,
        description:
          "People, work items and groups in one place, with import and export so you are never re-typing what you already have.",
        benefits: [
          "One source of truth",
          "CSV import and export",
          "Fast bulk editing",
        ],
      },
      {
        title: "People and availability",
        icon: UserIcon,
        description:
          "Every person carries their own availability, workload ceiling and unavailable slots — and the scheduler honours all of it.",
        benefits: [
          "Per-person availability",
          "Maximum load per day",
          "Unavailable time slots",
        ],
      },
      {
        title: "Work item configuration",
        icon: BookOpenIcon,
        description:
          "Set how often something repeats, how long it takes and how urgent it is, then let priority decide what gets the good slots.",
        benefits: [
          "Priority-based placement",
          "Repeats per week",
          "Conflict prevention rules",
        ],
      },
      {
        title: "Groups",
        icon: UsersIcon,
        description:
          "Organise work into classes, projects or personal groups, each with its own schedule and its own view.",
        benefits: [
          "Group-based organisation",
          "Per-group schedules",
          "Easy duplication",
        ],
      },
    ],
  },
  {
    id: "output",
    label: "Output and insight",
    features: [
      {
        title: "PDF export",
        icon: DownloadIcon,
        description:
          "Print-ready documents with your own headers and footers, exported per group or in a single batch.",
        benefits: [
          "Professional output",
          "Custom headers and footers",
          "Batch export",
        ],
      },
      {
        title: "Analytics",
        icon: BarChartIcon,
        description:
          "See how load is distributed, where the plan is over-committed, and which slots are being wasted.",
        benefits: [
          "Workload distribution",
          "Utilisation reporting",
          "Optimisation suggestions",
        ],
      },
      {
        title: "Offline mode",
        icon: WifiOffIcon,
        description:
          "Keep working with no connection. Changes queue locally and sync the moment you are back online.",
        benefits: [
          "Full offline functionality",
          "Automatic sync",
          "Conflict resolution",
        ],
      },
      {
        title: "Customisation",
        icon: SettingsIcon,
        description:
          "Colours, time formats, display density and theme — set the app up the way your team already reads a timetable.",
        benefits: [
          "Colour coding",
          "Custom time formats",
          "Light and dark themes",
        ],
      },
    ],
  },
];

const Features = () => {
  return (
    <>
      <Section size="lg">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            as="h1"
            eyebrow="Features"
            title="Built for the constraints, not the happy path"
            description="Anything can draw a grid. Timetablely handles availability, priority, blocked time and the change that lands the week before it starts."
          />

          <Tabs defaultValue="scheduling" className="gap-8">
            <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
              {featureGroups.map((group) => (
                <TabsTrigger key={group.id} value={group.id}>
                  {group.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {featureGroups.map((group) => (
              <TabsContent key={group.id} value={group.id}>
                <div className="grid gap-6 md:grid-cols-2">
                  {group.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="bg-background hover:border-primary/40 flex flex-col gap-4 border p-6 transition-colors"
                    >
                      <feature.icon className="text-primary size-5" />
                      <h2 className="text-lg font-semibold">{feature.title}</h2>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                      <ul className="mt-auto flex flex-col gap-2 border-t pt-4">
                        {feature.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Check className="text-primary mt-0.5 size-4 shrink-0" />
                            <span className="text-muted-foreground">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Container>
      </Section>

      <Section muted bordered>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="By mode"
            title="What this looks like for you"
            description="The same features, named for the way you work."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {solutions.map((solution) => (
              <div
                key={solution.slug}
                className="bg-background flex flex-col gap-4 border p-6"
              >
                <span
                  className={cn(
                    "flex size-10 items-center justify-center border",
                    solution.accent.bg,
                    solution.accent.border
                  )}
                >
                  <solution.icon
                    className={cn("size-4", solution.accent.text)}
                  />
                </span>
                <h3 className="font-semibold">{solution.name}</h3>
                <ul className="flex flex-1 flex-col gap-2">
                  {solution.capabilities.slice(0, 3).map((capability) => (
                    <li
                      key={capability.title}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          solution.accent.text
                        )}
                      />
                      <span className="text-muted-foreground">
                        {capability.title}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" asChild className="w-full">
                  <Link to={`/solutions/${solution.slug}`}>
                    See {solution.name.toLowerCase()}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
};

export default Features;
