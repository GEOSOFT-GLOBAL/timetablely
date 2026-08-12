import { Link } from "react-router-dom";

import {
  LegalPage,
  type LegalClause,
} from "@/components/marketing/legal-page";

/**
 * NOTE: This is a working draft written to match what the product actually
 * does today (account data, schedule data, offline sync, anonymous visit
 * analytics). It has not been reviewed by a lawyer — have counsel review it
 * before you take payments or launch publicly.
 */
const clauses: LegalClause[] = [
  {
    heading: "Who we are",
    body: [
      "Timetablely is a scheduling application operated by the Timetablely team. This policy explains what personal data we collect when you use the website and the app, why we collect it, and what you can do about it.",
      "If you have a question about anything here, contact us at privacy@timetablely.com.",
    ],
  },
  {
    heading: "Data we collect",
    body: ["We collect three kinds of data, and no more than we need."],
    bullets: [
      "Account data: your name, email address and password hash, created when you sign up.",
      "Schedule data: the people, work items, groups and timetables you create in the app. This is your content.",
      "Usage data: anonymous page visits, recorded with a random session identifier that is not linked to your account and is discarded when the browser session ends.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Account data is used to authenticate you and to contact you about your account. Schedule data is used to provide the service — generating, storing and exporting your timetables. Usage data is used in aggregate to understand which parts of the product people actually reach.",
      "We do not sell personal data, and we do not use your schedule data to train models.",
    ],
  },
  {
    heading: "Offline storage",
    body: [
      "Timetablely works offline. When it does, your schedule data is stored locally in your browser so you can keep working without a connection, and synchronised to our servers when you are back online. Clearing your browser storage removes the local copy.",
    ],
  },
  {
    heading: "Cookies and local storage",
    body: [
      "We use browser storage for things the product cannot work without: your session token, your theme preference, and your selected workspace mode. We do not use advertising or cross-site tracking cookies.",
    ],
  },
  {
    heading: "Sharing and processors",
    body: [
      "We share data only with the service providers needed to run Timetablely — hosting, database, email delivery and payment processing. Each is bound to use the data only to provide their service to us.",
      "We may disclose data if we are legally required to, and we will tell you unless we are prohibited from doing so.",
    ],
  },
  {
    heading: "Retention",
    body: [
      "Account and schedule data is kept for as long as your account is active. If you delete your account, we delete your data within 30 days, except where we must keep records for legal or accounting reasons.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can request a copy of your data, correct it, or ask us to delete it. Export is also available directly in the app. Email privacy@timetablely.com and we will respond within 30 days.",
    ],
  },
  {
    heading: "Security",
    body: [
      "Data is encrypted in transit and at rest, passwords are hashed, and access to production systems is limited to the people who need it. No system is perfectly secure — if a breach affects you, we will tell you.",
    ],
  },
  {
    heading: "Children",
    body: [
      "Timetablely is used by schools, but accounts are intended for staff rather than pupils. We do not knowingly collect personal data directly from children. If an institution schedules pupils, that data is entered and controlled by the institution.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If we change this policy materially, we will update the date at the top and notify account holders by email before the change takes effect.",
    ],
  },
];

const Privacy = () => (
  <LegalPage
    title="Privacy policy"
    description="What we collect, why we collect it, and what you can ask us to do with it."
    lastUpdated="12 August 2026"
    clauses={clauses}
    footer={
      <p className="text-muted-foreground text-sm">
        Questions about this policy? Reach us through the{" "}
        <Link to="/contact" className="text-primary hover:underline">
          contact page
        </Link>{" "}
        or read the{" "}
        <Link to="/terms" className="text-primary hover:underline">
          terms of service
        </Link>
        .
      </p>
    }
  />
);

export default Privacy;
