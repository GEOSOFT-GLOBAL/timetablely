import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SUPPORT_EMAIL = "support@timetablely.com";
const SALES_EMAIL = "sales@timetablely.com";

const topics = [
  { value: "support", label: "Product support" },
  { value: "sales", label: "Sales and Enterprise" },
  { value: "billing", label: "Billing" },
  { value: "feedback", label: "Feedback or a feature request" },
  { value: "other", label: "Something else" },
];

const Contact = () => {
  const [searchParams] = useSearchParams();
  const initialTopic = searchParams.get("topic") ?? "support";

  const [topic, setTopic] = React.useState(
    topics.some((item) => item.value === initialTopic) ? initialTopic : "support"
  );

  /**
   * There is no public contact endpoint yet, so the form composes a mail
   * message rather than pretending to submit and silently dropping it.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");

    const recipient = topic === "sales" ? SALES_EMAIL : SUPPORT_EMAIL;
    const subject = `[${topic}] Message from ${name || "the website"}`;
    const body = `${message}\n\n—\n${name}\n${email}`;

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    toast.success("Opening your email client", {
      description: `Your message is addressed to ${recipient}.`,
    });
  };

  return (
    <Section size="lg">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Talk to us"
            description="Questions about the product, a plan, or whether Timetablely fits how your institution works — we answer all of them."
          />

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="hover:border-primary/40 flex items-start gap-4 border p-5 transition-colors"
            >
              <Mail className="text-primary mt-0.5 size-5 shrink-0" />
              <span className="flex flex-col gap-1">
                <span className="font-medium">Support</span>
                <span className="text-muted-foreground text-sm">
                  {SUPPORT_EMAIL}
                </span>
                <span className="text-muted-foreground text-sm">
                  Typical reply within one business day.
                </span>
              </span>
            </a>

            <a
              href={`mailto:${SALES_EMAIL}`}
              className="hover:border-primary/40 flex items-start gap-4 border p-5 transition-colors"
            >
              <MessageSquare className="text-primary mt-0.5 size-5 shrink-0" />
              <span className="flex flex-col gap-1">
                <span className="font-medium">Sales and Enterprise</span>
                <span className="text-muted-foreground text-sm">
                  {SALES_EMAIL}
                </span>
                <span className="text-muted-foreground text-sm">
                  Rollouts, custom integrations, education pricing.
                </span>
              </span>
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card flex h-fit flex-col gap-5 border p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="topic">What is this about?</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger id="topic" className="w-full">
                <SelectValue placeholder="Choose a topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Tell us what you are trying to do."
            />
          </div>

          <Button type="submit" className="w-full gap-2">
            <Send className="size-4" />
            Send message
          </Button>

          <p className="text-muted-foreground text-xs">
            This opens your email client with the message ready to send, so you
            keep a copy of what you sent.
          </p>
        </form>
      </Container>
    </Section>
  );
};

export default Contact;
