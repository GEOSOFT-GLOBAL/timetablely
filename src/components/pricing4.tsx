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
  title = "Pricing",
  description = "Check out our affordable pricing plans.",
  plans = [
    {
      name: "Free",
      badge: "Free",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      features: [
        "Unlimited Integrations",
        "Windows, Linux, Mac support",
        "24/7 Support",
        "Free updates",
      ],
      buttonText: "Get Started",
    },
    {
      name: "Pro",
      badge: "Pro",
      monthlyPrice: "$29",
      yearlyPrice: "$249",
      features: [
        "Everything in FREE",
        "Live call suport every month",
        "Unlimited Storage",
      ],
      buttonText: "Purchase",
    },
    {
      name: "Elite",
      badge: "Elite",
      monthlyPrice: "$59",
      yearlyPrice: "$549",
      features: [
        "Everything in PRO",
        "Advanced analytics",
        "Custom branding",
        "Unlimited users",
      ],
      buttonText: "Purchase",
      isPopular: true,
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
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
