"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

interface PricingPlan {
  name: string;
  badge: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

interface Pricing4Props {
  title?: string;
  description?: string;
  plans?: PricingPlan[];
  className?: string;
}

const Pricing4 = ({
  title = "Simple, Transparent Pricing",
  description = "Choose the perfect plan for your school's timetable management needs. All plans include our core features.",
  plans = [
    {
      name: "Starter",
      badge: "Free",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      features: [
        "Up to 5 tutors",
        "Up to 10 courses",
        "Basic timetable generation",
        "Manual timetable editing",
        "PDF export (1 timetable per month)",
        "Email support",
        "7-day free trial of Pro features",
      ],
      buttonText: "Get Started",
    },
    {
      name: "Basic",
      badge: "Basic",
      monthlyPrice: "$19",
      yearlyPrice: "$190",
      features: [
        "Everything in Starter",
        "Up to 20 tutors",
        "Up to 50 courses",
        "Advanced timetable generation",
        "Unlimited PDF exports",
        "Timetable templates",
        "Priority email support",
        "Analytics dashboard",
      ],
      buttonText: "Choose Basic",
    },
    {
      name: "Pro",
      badge: "Pro",
      monthlyPrice: "$49",
      yearlyPrice: "$490",
      features: [
        "Everything in Basic",
        "Unlimited tutors",
        "Unlimited courses",
        "AI-powered scheduling",
        "Custom blocked time slots",
        "Offline support",
        "Priority email & chat support",
        "Advanced analytics & reports",
        "API access",
      ],
      buttonText: "Choose Pro",
      isPopular: true,
    },
    {
      name: "Enterprise",
      badge: "Enterprise",
      monthlyPrice: "$99",
      yearlyPrice: "$990",
      features: [
        "Everything in Pro",
        "Unlimited everything",
        "Dedicated account manager",
        "Custom integrations",
        "Onboarding & training",
        "24/7 phone & email support",
        "White-label option",
        "Custom feature development",
        "SSO integration",
      ],
      buttonText: "Contact Sales",
    },
  ],
  className = "",
}: Pricing4Props) => {
  const [isAnnually, setIsAnnually] = useState(false);
  return (
    <section className={`py-32 w-full flex flex-col items-center justify-center ${className}`}>
      <div className="container">
        <div className="flex w-full flex-col gap-6">
          <h2 className="text-pretty text-4xl font-bold lg:text-6xl">
            {title}
          </h2>
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <p className="text-muted-foreground max-w-3xl lg:text-xl">
              {description}
            </p>
            <div className="bg-muted flex h-11 w-fit shrink-0 items-center rounded-md p-1 text-lg">
              <RadioGroup
                defaultValue="monthly"
                className="h-full grid-cols-2"
                onValueChange={(value) => {
                  setIsAnnually(value === "annually");
                }}
              >
                <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
                  <RadioGroupItem
                    value="monthly"
                    id="monthly"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="monthly"
                    className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center px-7 font-semibold"
                  >
                    Monthly
                  </Label>
                </div>
                <div className='has-[button[data-state="checked"]]:bg-background h-full rounded-md transition-all'>
                  <RadioGroupItem
                    value="annually"
                    id="annually"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="annually"
                    className="text-muted-foreground peer-data-[state=checked]:text-primary flex h-full cursor-pointer items-center justify-center gap-1 px-7 font-semibold"
                  >
                    Yearly
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-lg border p-6 text-left ${
                  plan.isPopular ? "bg-muted" : ""
                }`}
              >
                <Badge className="mb-8 block w-fit uppercase">
                  {plan.badge}
                </Badge>
                <span className="text-4xl font-medium">
                  {isAnnually ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <p
                  className={`text-muted-foreground ${
                    plan.monthlyPrice === "$0" ? "invisible" : ""
                  }`}
                >
                  {isAnnually ? "Per year" : "Per month"}
                </p>
                <Separator className="my-6" />
                <div className="flex h-full flex-col justify-between gap-20">
                  <ul className="text-muted-foreground space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <Check className="size-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">{plan.buttonText}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing4 };
