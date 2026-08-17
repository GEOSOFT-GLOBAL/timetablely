import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Coins, Minus } from "lucide-react";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";
import { CtaSection } from "@/components/marketing/cta-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  formatPrice,
  pricingPlans,
  yearlySavingPercent,
} from "@/config/pricing";
import { useCreditsStore } from "@/store/creditsStore";
import { cn } from "@/lib/utils";

/** Rows for the at-a-glance comparison under the plan cards. */
const comparison = [
  { label: "People", values: ["5", "20", "Unlimited", "Unlimited"] },
  { label: "Work items", values: ["10", "50", "Unlimited", "Unlimited"] },
  { label: "PDF exports", values: ["1 / month", "Unlimited", "Unlimited", "Unlimited"] },
  { label: "Templates", values: [false, true, true, true] },
  { label: "Analytics", values: [false, true, true, true] },
  { label: "AI-assisted scheduling", values: [false, false, true, true] },
  { label: "Offline mode", values: [false, false, true, true] },
  { label: "API access", values: [false, false, true, true] },
  { label: "SSO", values: [false, false, false, true] },
  { label: "Dedicated manager", values: [false, false, false, true] },
];

const billingFaqs = [
  {
    question: "Can I change plan later?",
    answer:
      "Yes. Upgrade or downgrade at any time from your billing settings. Changes are prorated against what you have already paid.",
  },
  {
    question: "What counts as a person or a work item?",
    answer:
      "It depends on your mode. In an institution a person is a tutor and a work item is a course; for a team they are members and tasks; personally they are the people you schedule around and your own activities.",
  },
  {
    question: "Do you offer education discounts?",
    answer:
      "Yes. Schools, universities and registered non-profits get reduced pricing — get in touch and we will sort it out.",
  },
  {
    question: "What happens when I hit a plan limit?",
    answer:
      "Nothing is deleted. You keep full access to what you have already created, and you are prompted to upgrade before adding more.",
  },
];

const Pricing = () => {
  const [isAnnually, setIsAnnually] = useState(false);

  // The credit allowances come from the server catalog rather than this
  // file, so what the page promises and what a purchase delivers cannot
  // drift apart. The endpoint is public; no sign-in needed to read it.
  const catalog = useCreditsStore((state) => state.catalog);
  const loadCatalog = useCreditsStore((state) => state.loadCatalog);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  const planCredits = catalog?.planCredits ?? {};

  return (
    <>
      <Section size="lg">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              as="h1"
              eyebrow="Pricing"
              title="Simple, transparent pricing"
              description="One plan covers every mode — personal, team or institution. Start free and upgrade only when you outgrow the limits."
            />

            <div className="flex flex-col items-start gap-2 md:items-end">
              <div className="bg-muted flex h-11 w-fit shrink-0 items-center p-1">
                <RadioGroup
                  defaultValue="monthly"
                  className="h-full grid-cols-2 gap-1"
                  onValueChange={(value) => setIsAnnually(value === "annually")}
                >
                  <div className='has-[button[data-state="checked"]]:bg-background h-full transition-all'>
                    <RadioGroupItem
                      value="monthly"
                      id="monthly"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="monthly"
                      className="text-muted-foreground peer-data-[state=checked]:text-foreground flex h-full cursor-pointer items-center justify-center px-6 text-sm font-semibold"
                    >
                      Monthly
                    </Label>
                  </div>
                  <div className='has-[button[data-state="checked"]]:bg-background h-full transition-all'>
                    <RadioGroupItem
                      value="annually"
                      id="annually"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="annually"
                      className="text-muted-foreground peer-data-[state=checked]:text-foreground flex h-full cursor-pointer items-center justify-center gap-2 px-6 text-sm font-semibold"
                    >
                      Yearly
                      <Badge variant="secondary">
                        −{yearlySavingPercent}%
                      </Badge>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col border p-6",
                  plan.isPopular
                    ? "border-primary bg-card ring-primary/20 ring-1"
                    : "bg-background"
                )}
              >
                {plan.isPopular ? (
                  <Badge className="absolute -top-3 left-6">Most popular</Badge>
                ) : null}

                <Badge variant="outline" className="w-fit uppercase">
                  {plan.badge}
                </Badge>

                <p className="mt-6 text-4xl font-medium">
                  {formatPrice(
                    isAnnually ? plan.yearlyPrice : plan.monthlyPrice
                  )}
                </p>
                <p className="text-muted-foreground mt-1 h-5 text-sm">
                  {plan.monthlyPrice === 0
                    ? "Forever"
                    : isAnnually
                      ? "per year"
                      : "per month"}
                </p>

                {planCredits[plan.id] !== undefined ? (
                  <p className="mt-3 flex items-center gap-1.5 text-sm font-medium">
                    <Coins className="text-primary size-4 shrink-0" />
                    {planCredits[plan.id].toLocaleString()} credits included
                  </p>
                ) : null}

                <p className="text-muted-foreground mt-4 text-sm">
                  {plan.description}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="text-primary mt-0.5 size-4 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.isPopular ? "default" : "outline"}
                  asChild
                  className="mt-8 w-full"
                >
                  <Link to={plan.cta.to}>{plan.cta.label}</Link>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section muted bordered>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            title="Compare plans"
            description="What you get at each tier, side by side."
          />

          <div className="bg-background overflow-x-auto border">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-medium">Feature</th>
                  {pricingPlans.map((plan) => (
                    <th
                      key={plan.id}
                      className="p-4 text-left font-medium whitespace-nowrap"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b last:border-b-0">
                    <th className="text-muted-foreground p-4 text-left font-normal">
                      {row.label}
                    </th>
                    {row.values.map((value, index) => (
                      <td key={index} className="p-4">
                        {typeof value === "boolean" ? (
                          value ? (
                            <>
                              <Check className="text-primary size-4" />
                              <span className="sr-only">Included</span>
                            </>
                          ) : (
                            <>
                              <Minus className="text-muted-foreground/50 size-4" />
                              <span className="sr-only">Not included</span>
                            </>
                          )
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            title="Billing questions"
            description="The things people ask before they pay."
          />
          <Accordion type="single" collapsible className="border">
            {billingFaqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="px-6"
              >
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      <CtaSection
        title="Still deciding?"
        description="Build a real timetable in Quick Start without creating an account, and see whether it fits how you work."
        primaryLabel="Try Quick Start"
        primaryTo="/quick-start"
        secondaryLabel="Talk to us"
        secondaryTo="/contact"
      />
    </>
  );
};

export default Pricing;
