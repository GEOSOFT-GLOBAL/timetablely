import { Link } from "react-router-dom";

import {
  LegalPage,
  type LegalClause,
} from "@/components/marketing/legal-page";

/**
 * NOTE: Working draft, written to match how the product actually behaves
 * (free tier limits, plan upgrades, offline sync, user-owned content). Not
 * legal advice — have counsel review before launch or before taking payment.
 */
const clauses: LegalClause[] = [
  {
    heading: "Agreement",
    body: [
      "These terms govern your use of Timetablely. By creating an account or using the app, you agree to them. If you are agreeing on behalf of an institution or company, you confirm you are authorised to do so.",
    ],
  },
  {
    heading: "Your account",
    body: [
      "You are responsible for keeping your credentials secure and for activity that happens under your account. Tell us promptly if you believe your account has been accessed by someone else.",
      "One account is for one person. Institutions and teams should add members rather than share a single login.",
    ],
  },
  {
    heading: "Acceptable use",
    body: ["You agree not to:"],
    bullets: [
      "Use Timetablely to break the law or infringe someone else's rights.",
      "Attempt to access accounts, data or systems that are not yours.",
      "Interfere with the service, probe it for vulnerabilities without permission, or place unreasonable load on it.",
      "Resell or white-label the service except under an Enterprise agreement.",
    ],
  },
  {
    heading: "Your content",
    body: [
      "The schedules, people, work items and groups you create remain yours. You grant us only the permission needed to host, process, back up and display that content so we can provide the service.",
      "You are responsible for having the right to enter any personal data you add about other people, such as staff or students.",
    ],
  },
  {
    heading: "Plans, billing and refunds",
    body: [
      "The Starter plan is free and stays free. Paid plans are billed monthly or yearly in advance, and renew automatically until cancelled.",
      "You can cancel at any time; the plan stays active until the end of the period you have already paid for. We do not prorate refunds for partial periods, except where the law requires it.",
      "We may change prices with at least 30 days' notice before your next renewal.",
    ],
  },
  {
    heading: "Plan limits",
    body: [
      "Each plan has limits on people and work items. Reaching a limit does not delete anything — you keep access to what you have created and are asked to upgrade before adding more.",
    ],
  },
  {
    heading: "Availability",
    body: [
      "We work to keep Timetablely available, and offline mode means short outages need not stop your work. We do not promise uninterrupted service on free plans. Enterprise agreements may include a separate service level commitment.",
    ],
  },
  {
    heading: "Suspension and termination",
    body: [
      "You can delete your account at any time. We may suspend or terminate an account that breaches these terms, or where we are legally required to. Where practical we will warn you first and give you a chance to export your data.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "Timetablely generates schedules from the constraints you give it. You are responsible for reviewing a generated schedule before you rely on it or publish it. The service is provided as-is, without warranties beyond those that cannot be excluded by law.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "To the extent permitted by law, our total liability arising from the service is limited to the amount you paid us in the twelve months before the claim. We are not liable for indirect or consequential losses.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms. If a change is material, we will notify account holders by email before it takes effect. Continuing to use Timetablely after that means you accept the updated terms.",
    ],
  },
];

const Terms = () => (
  <LegalPage
    title="Terms of service"
    description="The rules for using Timetablely, in plain language."
    lastUpdated="12 August 2026"
    clauses={clauses}
    footer={
      <p className="text-muted-foreground text-sm">
        See also the{" "}
        <Link to="/privacy" className="text-primary hover:underline">
          privacy policy
        </Link>
        , or{" "}
        <Link to="/contact" className="text-primary hover:underline">
          get in touch
        </Link>{" "}
        if something here is unclear.
      </p>
    }
  />
);

export default Terms;
