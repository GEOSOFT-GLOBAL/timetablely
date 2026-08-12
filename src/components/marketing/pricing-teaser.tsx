import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, pricingPlans } from "@/config/pricing";
import { cn } from "@/lib/utils";

/** Condensed pricing for the landing page — first three plans, four features. */
export function PricingTeaser() {
  const plans = pricingPlans.slice(0, 3);

  return (
    <Section id="pricing">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow="Pricing"
          title="Start free, pay when it grows"
          description="Plans are counted in people and work items, so they mean the same thing in every mode."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col border p-6",
                plan.isPopular
                  ? "border-primary bg-card ring-primary/20 ring-1"
                  : "bg-background"
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{plan.name}</h3>
                {plan.isPopular ? <Badge>Most popular</Badge> : null}
              </div>

              <p className="mt-4 text-3xl font-medium">
                {formatPrice(plan.monthlyPrice)}
                {plan.monthlyPrice > 0 ? (
                  <span className="text-muted-foreground text-sm font-normal">
                    {" "}
                    / month
                  </span>
                ) : null}
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                {plan.description}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {plan.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
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

        <Button variant="ghost" asChild className="mx-auto w-fit gap-2">
          <Link to="/pricing">
            Compare all plans
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </Container>
    </Section>
  );
}
