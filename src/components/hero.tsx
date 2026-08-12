import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/marketing/section";
import { solutions } from "@/config/solutions";
import { cn } from "@/lib/utils";

const Hero: React.FC = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden">
      <BackgroundRippleEffect />

      <Container className="relative z-10 flex flex-col items-center py-20 text-center">
        <div className="border-border bg-background/80 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs backdrop-blur-sm sm:text-sm">
          <Sparkles className="size-3.5 text-primary" />
          <span className="michroma text-muted-foreground">
            One scheduling engine · three ways to use it
          </span>
        </div>

        <h1 className="syncopate mb-6 max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
          Plan the week
          <br />
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            before it plans you
          </span>
        </h1>

        <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-pretty text-sm sm:text-lg md:text-xl">
          Timetablely turns constraints into a schedule that actually fits —
          whether you are tracking your own week, running a team's projects, or
          building a whole institution's timetable.
        </p>

        <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row">
          <Button
            size="lg"
            asChild
            className="w-full gap-2 sm:w-auto sm:min-w-[190px]"
          >
            <Link to="/auth/signup">
              Get started free
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full gap-2 sm:w-auto sm:min-w-[190px]"
          >
            <Link to="/quick-start">
              <Zap className="size-4" />
              Try it without an account
            </Link>
          </Button>
        </div>

        <p className="text-muted-foreground mt-4 text-xs">
          No credit card required · Free plan forever
        </p>

        {/* Mode entry points — the fastest route to the page that matches the
            visitor's actual situation. */}
        <div className="mt-14 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              to={`/solutions/${solution.slug}`}
              className="group bg-background/60 hover:bg-accent/60 flex items-center gap-3 border p-4 text-left backdrop-blur-sm transition-colors"
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center border",
                  solution.accent.bg,
                  solution.accent.border
                )}
              >
                <solution.icon className={cn("size-4", solution.accent.text)} />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-sm font-medium">
                  For {solution.name.toLowerCase()}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {solution.terminology
                    .map((term) => term.label)
                    .join(" · ")}
                </span>
              </span>
              <ArrowRight className="text-muted-foreground ml-auto size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Hero;
