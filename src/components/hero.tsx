import * as React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TargetCursor from "./TargetCursor";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <BackgroundRippleEffect />
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 text-center">
        <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80">
          <Sparkles className="size-3 sm:size-4 text-blue-500" />
          <span className="text-neutral-700 michroma dark:text-neutral-300">
            Smart Timetable Generation
          </span>
        </div>

        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-semibold tracking-tight syncopate text-neutral-900 md:text-6xl lg:text-7xl dark:text-neutral-100 leading-tight">
          Create Perfect Timetables
          <br />
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            In Minutes, Not Hours
          </span>
        </h1>

        <p className="mx-auto mb-8 sm:mb-10 max-w-2xl text-sm sm:text-lg goldman text-neutral-600 md:text-xl dark:text-neutral-400 px-2">
          Effortlessly design, manage, and optimize your class schedules with
          AI-powered automation. Perfect for schools, universities, and training
          centers.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row px-4">
          <Button
            size="lg"
            className="gap-2 text-sm sm:text-base goldman cursor-target w-full sm:w-auto"
            onClick={() => navigate("/auth/login")}
          >
            <Calendar className="size-4 sm:size-5" />
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 text-sm sm:text-base goldman cursor-target w-full sm:w-auto"
            onClick={() => navigate("/quick-start")}
          >
            <Clock className="size-4 sm:size-5" />
            Quick Start
          </Button>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-center michroma justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-neutral-500 dark:text-neutral-500">
          <div className="flex items-center gap-2 michroma">
            <div className="size-2 rounded-full bg-green-500 cursor-target" />
            <span>AI-Powered Generation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-blue-500 cursor-target" />
            <span>Drag & Drop Interface</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-purple-500 cursor-target" />
            <span>Export to PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
