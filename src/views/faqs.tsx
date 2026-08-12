import { Link } from "react-router-dom";
import { MessageCircleQuestion } from "lucide-react";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

/** Grouped so a visitor can scan to their category instead of reading 15 rows. */
const faqGroups = [
  {
    id: "basics",
    title: "Getting started",
    faqs: [
      {
        question: "What is Timetablely?",
        answer:
          "Timetablely is a scheduling platform. It started as timetable software for schools, and the same engine now runs three ways: as a personal task tracker, as project management for teams, and as full timetable scheduling for institutions.",
      },
      {
        question: "Which mode should I choose?",
        answer:
          "Pick the one that matches who you are scheduling for. Personal is for your own week, Teams is for projects and members, Institutions is for classes, tutors and courses. You choose at sign-up and can switch later in settings without losing data.",
      },
      {
        question: "Can I try it without signing up?",
        answer:
          "Yes. Quick Start gives you a working timetable in the browser with no account — limited to a handful of people and courses and a couple of generations per session, but everything else works.",
      },
      {
        question: "How does automated generation work?",
        answer:
          "You give it constraints — availability, priority, how often something repeats, and the periods that are blocked — and the scheduler places everything against those rules, resolving conflicts as it goes. It produces a full grid in seconds.",
      },
    ],
  },
  {
    id: "using",
    title: "Using the app",
    faqs: [
      {
        question: "Can I edit a generated schedule by hand?",
        answer:
          "Yes. Every cell is editable — double-click to change it, drag to move it, merge cells, and adjust time slots. You can regenerate around what you have already placed.",
      },
      {
        question: "What are blocked periods?",
        answer:
          "Time that can never be scheduled into: breaks, assemblies, lunch, standing meetings. Define them once and every generation excludes them.",
      },
      {
        question: "What are templates?",
        answer:
          "A saved schedule structure you can apply again — to the next term, the next project, or a parallel class — so you are not rebuilding the same shape twice.",
      },
      {
        question: "How do I set availability?",
        answer:
          "Each person carries their own availability, a maximum load per day, and any unavailable slots. The scheduler treats all of it as a hard constraint.",
      },
      {
        question: "Can I import existing data?",
        answer:
          "Yes. Import people, work items and groups from CSV to get set up quickly instead of typing everything in.",
      },
      {
        question: "Can I export what I have made?",
        answer:
          "Yes — high-quality PDF export with customisable headers and footers, per group or as a batch.",
      },
    ],
  },
  {
    id: "accounts",
    title: "Plans, data and devices",
    faqs: [
      {
        question: "Does it work offline?",
        answer:
          "Yes. Timetablely keeps working with no connection, storing changes locally and syncing them when you are back online.",
      },
      {
        question: "Can I use it on multiple devices?",
        answer:
          "Yes. It is a progressive web app, so it runs on desktop, tablet and phone with the same account and the same data.",
      },
      {
        question: "Is it suitable for a large institution?",
        answer:
          "Yes. It handles everything from a single freelancer's week to a university managing thousands of courses across departments.",
      },
      {
        question: "How secure is my data?",
        answer:
          "Data is encrypted in transit and at rest, passwords are hashed, and access to production systems is restricted. The privacy policy sets out exactly what we collect and why.",
      },
      {
        question: "What happens if I hit a plan limit?",
        answer:
          "Nothing is deleted. You keep everything you have created and are prompted to upgrade before adding more.",
      },
      {
        question: "How often is Timetablely updated?",
        answer:
          "Regularly, and updates apply in the background — you are always on the current version without doing anything.",
      },
    ],
  },
];

const Faqs = () => {
  return (
    <>
      <Section size="lg">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            as="h1"
            eyebrow="FAQs"
            title="Frequently asked questions"
            description="What people ask before and just after they start. If yours is not here, ask us directly."
          />

          <div className="flex flex-col gap-12">
            {faqGroups.map((group) => (
              <div key={group.id} className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">{group.title}</h2>
                <Accordion type="single" collapsible className="border">
                  {group.faqs.map((faq) => (
                    <AccordionItem
                      key={faq.question}
                      value={faq.question}
                      className="px-6"
                    >
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-pretty">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section muted bordered size="sm">
        <Container>
          <div className="bg-background flex flex-col items-start gap-4 border p-8 sm:flex-row sm:items-center">
            <MessageCircleQuestion className="text-primary size-6 shrink-0" />
            <div className="flex-1">
              <h2 className="font-semibold">Still have a question?</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Send it over — we answer every message, usually within a
                business day.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link to="/contact">Contact support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/quick-start">Try Quick Start</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Faqs;
