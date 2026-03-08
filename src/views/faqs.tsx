import {
  ChevronDownIcon,
  ChevronUpIcon,
  HelpCircleIcon,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is Timetablely?",
      answer: "Timetablely is an intelligent timetable management system designed for schools and educational institutions. It helps you create, manage, and optimize timetables with ease using automated scheduling algorithms.",
    },
    {
      question: "How does the automated timetable generation work?",
      answer: "Our system uses advanced scheduling algorithms that take into account various constraints including teacher availability, course priorities, classroom capacities, and institutional rules. It generates optimized timetables in seconds while minimizing conflicts.",
    },
    {
      question: "Can I manually edit the generated timetables?",
      answer: "Yes! You can manually edit any timetable cell by double-clicking on it. You can also merge cells, adjust time slots, and make other modifications to the automatically generated timetables.",
    },
    {
      question: "Is Timetablely available offline?",
      answer: "Yes, Timetablely includes comprehensive offline support. You can continue working without an internet connection, and your data will automatically sync when you're back online.",
    },
    {
      question: "Can I export my timetables?",
      answer: "Absolutely! You can export your timetables as high-quality PDF documents. The export feature includes customizable headers, footers, and other formatting options.",
    },
    {
      question: "How do I manage tutor availability?",
      answer: "You can set tutor availability in the Tutors section. Each tutor can have specific time slots marked as unavailable, and the system will respect these constraints when generating timetables.",
    },
    {
      question: "What are timetable templates?",
      answer: "Timetable templates allow you to save your timetable configurations for future use. You can create templates from existing timetables and apply them to new classes or terms, saving you time and effort.",
    },
    {
      question: "How do I set course priorities?",
      answer: "You can set course priorities (High, Medium, Low) in the Courses section. High-priority courses are scheduled first to ensure they get the most favorable time slots.",
    },
    {
      question: "What are blocked time slots?",
      answer: "Blocked time slots are non-teaching periods such as breaks, assemblies, or lunch that should be excluded from scheduling. You can define custom blocked time slots in the Blocks section.",
    },
    {
      question: "Can I import data from other systems?",
      answer: "Yes, Timetablely supports importing data from CSV files. You can import tutors, courses, sessions, and other data to quickly set up your database.",
    },
    {
      question: "Is Timetablely suitable for large schools?",
      answer: "Timetablely is designed to handle schools of all sizes, from small primary schools to large secondary schools and universities. The system can manage thousands of courses and teachers efficiently.",
    },
    {
      question: "How secure is my data?",
      answer: "We take data security very seriously. All your data is encrypted and stored securely. We follow industry best practices to ensure your information remains safe and protected.",
    },
    {
      question: "Can I use Timetablely on multiple devices?",
      answer: "Yes, Timetablely is a progressive web application (PWA) that works on all modern devices. You can use it on your computer, tablet, or smartphone with the same account.",
    },
    {
      question: "What support options are available?",
      answer: "We offer comprehensive support including documentation, video tutorials, and email support. If you encounter any issues, our support team is ready to help you.",
    },
    {
      question: "How often is Timetablely updated?",
      answer: "We regularly update Timetablely with new features and improvements. Updates are automatic and happen in the background, so you always have access to the latest version.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex w-full flex-col gap-6 py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Find answers to common questions about Timetablely
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b last:border-b-0 border-border">
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 text-left"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {openIndex === index ? (
                      <ChevronUpIcon className="size-5" />
                    ) : (
                      <ChevronDownIcon className="size-5" />
                    )}
                  </Button>
                  {openIndex === index && (
                    <div className="px-4 pb-4 text-sm text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircleIcon className="size-5" />
              Still Have Questions?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you can't find the answer to your question, please don't hesitate to
              contact us. Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>Contact Support</Button>
              <Button variant="outline">View Documentation</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Faqs