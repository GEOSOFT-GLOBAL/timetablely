import * as React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <BackgroundRippleEffect />
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-2 text-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80">
          <Sparkles className="size-4 text-blue-500" />
          <span className="text-neutral-700 dark:text-neutral-300">
            Smart Timetable Generation
          </span>
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl lg:text-7xl dark:text-neutral-100">
          Create Perfect Timetables
          <br />
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            In Minutes, Not Hours
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-600 md:text-xl dark:text-neutral-400">
          Effortlessly design, manage, and optimize your class schedules with
          AI-powered automation. Perfect for schools, universities, and training
          centers.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="gap-2 text-base"
            onClick={() => navigate("/auth/login")}
          >
            <Calendar className="size-5" />
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 text-base"
            onClick={() => navigate("/quick-start")}
          >
            <Clock className="size-5" />
            Quick Start
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-500 dark:text-neutral-500">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-500" />
            <span>AI-Powered Generation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-blue-500" />
            <span>Drag & Drop Interface</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-purple-500" />
            <span>Export to PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;