import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";

const steps = [
  {
    title: "Describe what you have",
    description:
      "People, work items and groups — tutors and courses, members and tasks, or your own activities. Enter them or import a CSV.",
  },
  {
    title: "Set the rules",
    description:
      "Availability, priority, how often something repeats, and the periods nothing can be scheduled into.",
  },
  {
    title: "Generate",
    description:
      "Timetablely places everything against your constraints in seconds and flags anything that cannot fit.",
  },
  {
    title: "Adjust and share",
    description:
      "Drag any cell to move it, regenerate the rest, then export to PDF or share the live view.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow="How it works"
          title="Four steps from blank page to schedule"
          description="The same flow whichever mode you are in — only the vocabulary changes."
        />

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="bg-background flex flex-col gap-3 border border-t-2 border-t-primary p-6"
            >
              <span className="text-primary michroma text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
