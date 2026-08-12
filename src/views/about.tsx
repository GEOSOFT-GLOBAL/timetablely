import {
  CheckCircleIcon,
  HeartIcon,
  TargetIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";
import { CtaSection } from "@/components/marketing/cta-section";
import { solutions } from "@/config/solutions";
import { cn } from "@/lib/utils";

const values = [
  {
    title: "Efficiency",
    description:
      "Scheduling is overhead. Every feature is judged on how much of it we remove.",
    icon: TargetIcon,
  },
  {
    title: "Honesty",
    description:
      "A plan that does not fit should say so on day one, not fail quietly in week three.",
    icon: CheckCircleIcon,
  },
  {
    title: "Accessibility",
    description:
      "Works offline, works on a phone, works on the machine your school actually has.",
    icon: UsersIcon,
  },
  {
    title: "Craft",
    description:
      "Scheduling software is used daily for years. It should be pleasant to open.",
    icon: HeartIcon,
  },
];

const milestones = [
  {
    year: "2023",
    title: "Project inception",
    description:
      "Timetablely started as an answer to one problem: building a school timetable by hand takes weeks and still ends up with conflicts.",
  },
  {
    year: "2024",
    title: "First release",
    description:
      "The initial version shipped with automated generation, the visual grid and PDF export.",
  },
  {
    year: "2025",
    title: "Beyond the classroom",
    description:
      "Teams and individuals started using it for projects and personal planning, so the engine was generalised into three modes.",
  },
  {
    year: "2026",
    title: "One platform, three modes",
    description:
      "Personal, Teams and Institutions now share the same scheduler, with vocabulary and defaults that match each one.",
  },
];

const About = () => {
  return (
    <>
      <Section size="lg">
        <Container className="flex flex-col gap-8">
          <SectionHeading
            as="h1"
            eyebrow="About"
            title="We build the part nobody wants to do by hand"
            description="Timetablely began as timetable software for schools. It turned out the hard part — fitting real commitments into real available time — is the same problem whether you are running a university, a team, or your own week."
          />
        </Container>
      </Section>

      <Section muted bordered size="sm">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="bg-background flex flex-col gap-3 border p-8">
            <TargetIcon className="text-primary size-5" />
            <h2 className="text-xl font-semibold">Our mission</h2>
            <p className="text-muted-foreground text-pretty">
              To give people back the hours they lose to scheduling. Efficient
              planning is not the goal in itself — it is what lets you get on
              with teaching, building or living.
            </p>
          </div>
          <div className="bg-background flex flex-col gap-3 border p-8">
            <HeartIcon className="text-primary size-5" />
            <h2 className="text-xl font-semibold">Our vision</h2>
            <p className="text-muted-foreground text-pretty">
              One scheduling engine that speaks your language — whether the
              things you are placing are called courses, tasks or activities —
              and is honest with you when the week is already full.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Values"
            title="What we optimise for"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col gap-3 border p-6"
              >
                <value.icon className="text-primary size-5" />
                <h3 className="font-semibold">{value.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section muted bordered>
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Journey" title="How we got here" />
          <ol className="flex flex-col">
            {milestones.map((milestone) => (
              <li
                key={milestone.year}
                className="flex flex-col gap-2 border-l pb-8 pl-6 last:pb-0 sm:flex-row sm:gap-8"
              >
                <span className="text-primary michroma shrink-0 text-sm sm:w-20">
                  {milestone.year}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">{milestone.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {milestone.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Who uses it"
            title="Three audiences, one product"
            description="Each mode exists because someone was already using Timetablely that way."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {solutions.map((solution) => (
              <div
                key={solution.slug}
                className="flex flex-col gap-3 border p-6"
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
                <p className="text-muted-foreground text-sm">
                  {solution.audience}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section muted bordered size="sm">
        <Container>
          <div className="bg-background flex flex-col gap-4 border p-8">
            <ZapIcon className="text-primary size-5" />
            <h2 className="text-xl font-semibold">Get involved</h2>
            <p className="text-muted-foreground max-w-2xl text-pretty">
              We are still shaping this. If something is missing, awkward, or
              nearly right — tell us. Feature requests from people who schedule
              for a living are how most of this got built.
            </p>
            <a
              href="mailto:support@timetablely.com"
              className="text-primary w-fit hover:underline"
            >
              support@timetablely.com
            </a>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
};

export default About;
