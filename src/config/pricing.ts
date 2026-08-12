/**
 * Single source of truth for plans, shared by the pricing page and the
 * landing-page teaser so the two can never drift apart.
 *
 * Feature copy is deliberately mode-neutral ("people", "work items",
 * "groups") because the same plan applies whether those are tutors and
 * courses, members and tasks, or your own activities.
 */
export interface PricingPlan {
  id: string;
  name: string;
  badge: string;
  monthlyPrice: number;
  /** Charged once per year. Below twelve months of the monthly price. */
  yearlyPrice: number;
  description: string;
  features: string[];
  cta: { label: string; to: string };
  isPopular?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    badge: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Everything you need to schedule your own week.",
    features: [
      "Up to 5 people",
      "Up to 10 work items",
      "Automatic generation",
      "Manual editing and drag-and-drop",
      "1 PDF export per month",
      "Email support",
    ],
    cta: { label: "Get started free", to: "/auth/signup" },
  },
  {
    id: "basic",
    name: "Basic",
    badge: "Basic",
    monthlyPrice: 19,
    yearlyPrice: 190,
    description: "For a small team or a single department.",
    features: [
      "Everything in Starter",
      "Up to 20 people",
      "Up to 50 work items",
      "Unlimited PDF exports",
      "Reusable templates",
      "Workload analytics",
      "Priority email support",
    ],
    cta: { label: "Choose Basic", to: "/auth/signup?plan=basic" },
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Pro",
    monthlyPrice: 49,
    yearlyPrice: 490,
    description: "For whole institutions and growing organisations.",
    features: [
      "Everything in Basic",
      "Unlimited people and work items",
      "AI-assisted scheduling",
      "Custom blocked periods",
      "Offline mode with sync",
      "Advanced analytics and reports",
      "API access",
      "Priority email and chat support",
    ],
    cta: { label: "Choose Pro", to: "/auth/signup?plan=pro" },
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For multi-campus and multi-team rollouts.",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "Onboarding and training",
      "SSO integration",
      "White-label option",
      "24/7 phone and email support",
    ],
    cta: { label: "Contact sales", to: "/contact?topic=sales" },
  },
];

/** Percentage saved by paying yearly, derived from the Pro plan. */
export const yearlySavingPercent = Math.round(
  (1 - 490 / (49 * 12)) * 100
);

export const formatPrice = (amount: number) =>
  amount === 0 ? "Free" : `$${amount}`;
