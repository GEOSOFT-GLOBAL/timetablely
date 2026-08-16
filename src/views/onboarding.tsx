import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { StepSolution } from "@/components/onboarding/step-solution";
import { StepWorkspace } from "@/components/onboarding/step-workspace";
import { StepSchedule } from "@/components/onboarding/step-schedule";
import { StepData } from "@/components/onboarding/step-data";
import { StepReady } from "@/components/onboarding/step-ready";
import { buildSampleDatabase } from "@/config/onboarding";
import { getSolutionByMode } from "@/config/solutions";
import type { AppMode } from "@/context/app-mode-context";
import { useAppMode } from "@/hooks/use-app-mode";
import { useAuthStore } from "@/store/authStore";
import { useDatabaseStore } from "@/store/databaseStore";
import { useModeSpecificDatabaseStore } from "@/store/modeSpecificDatabaseStore";
import {
  defaultSchedulePreferences,
  useOnboardingStore,
  type SchedulePreferences,
} from "@/store/onboardingStore";

const STEP_LABELS = [
  "Your solution",
  "Workspace",
  "Your week",
  "Starting point",
  "Ready",
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { setMode } = useAppMode();
  const user = useAuthStore((state) => state.user);
  const setDatabase = useDatabaseStore((state) => state.setDatabase);
  const setDatabaseForMode = useModeSpecificDatabaseStore(
    (state) => state.setDatabaseForMode
  );
  const setStoreMode = useModeSpecificDatabaseStore((state) => state.setMode);
  const { complete, dismiss } = useOnboardingStore();

  const [stepIndex, setStepIndex] = React.useState(0);
  const [mode, setSelectedMode] = React.useState<AppMode | null>(null);
  const [workspaceName, setWorkspaceName] = React.useState("");
  const [schedule, setSchedule] = React.useState<SchedulePreferences>(
    defaultSchedulePreferences
  );
  const [seedSample, setSeedSample] = React.useState(true);
  const [isFinishing, setIsFinishing] = React.useState(false);

  const solution = getSolutionByMode(mode);

  /** Each step decides for itself whether Continue is available. */
  const canContinue = (() => {
    if (stepIndex === 0) return mode !== null;
    return true;
  })();

  const goBack = () => setStepIndex((step) => Math.max(step - 1, 0));

  const goNext = () => {
    if (!canContinue) return;
    setStepIndex((step) => Math.min(step + 1, STEP_LABELS.length - 1));
  };

  /** Writes every answer through to the stores the app actually reads. */
  const finish = async () => {
    if (!mode) return;
    setIsFinishing(true);

    try {
      // 1. Workspace vocabulary and behaviour.
      setMode(mode);
      setStoreMode(mode);

      // 2. Starting data, written to both the active database and the
      //    per-mode slot so switching modes later does not lose it.
      if (seedSample) {
        const sample = buildSampleDatabase(mode);
        setDatabaseForMode(mode, sample);
        await setDatabase(sample);
      }

      // 3. Preferences, and the flag that stops the flow reappearing.
      complete({
        mode,
        workspaceName: workspaceName.trim(),
        schedule,
        seededSample: seedSample,
      });

      toast.success("Your workspace is ready", {
        description: seedSample
          ? "We added some example data you can edit or clear."
          : "Add your first records whenever you are ready.",
      });

      navigate("/app/dashboard", { replace: true });
    } catch {
      setIsFinishing(false);
      toast.error("Could not finish setup", {
        description: "Your answers were kept — please try again.",
      });
    }
  };

  const handleSkip = () => {
    dismiss();
    navigate("/app/dashboard", { replace: true });
  };

  const firstName = user?.firstname?.trim();

  const stepContent = [
    {
      title: firstName
        ? `Welcome, ${firstName}. What are you scheduling?`
        : "What are you scheduling?",
      description:
        "This sets what things are called and how the app behaves. You can change it later in Settings.",
      body: <StepSolution value={mode} onChange={setSelectedMode} />,
    },
    {
      title: "Name your workspace",
      description: "Something you will recognise on exports and shared views.",
      body: mode ? (
        <StepWorkspace
          mode={mode}
          value={workspaceName}
          onChange={setWorkspaceName}
        />
      ) : null,
    },
    {
      title: "Set up your week",
      description:
        "These become the defaults for every new schedule. Individual slots stay editable.",
      body: mode ? (
        <StepSchedule mode={mode} value={schedule} onChange={setSchedule} />
      ) : null,
    },
    {
      title: "How would you like to start?",
      description: "Either way, nothing here is permanent.",
      body: mode ? (
        <StepData mode={mode} value={seedSample} onChange={setSeedSample} />
      ) : null,
    },
    {
      title: "You are all set",
      description: solution
        ? `Your workspace is configured for ${solution.name.toLowerCase()}.`
        : undefined,
      body: mode ? (
        <StepReady
          mode={mode}
          workspaceName={workspaceName}
          schedule={schedule}
          seedSample={seedSample}
        />
      ) : null,
    },
  ];

  const current = stepContent[stepIndex];
  const isLastStep = stepIndex === STEP_LABELS.length - 1;

  return (
    <OnboardingLayout
      stepIndex={stepIndex}
      stepCount={STEP_LABELS.length}
      stepLabels={STEP_LABELS}
      title={current.title}
      description={current.description}
      onSkip={handleSkip}
      actions={
        <>
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={stepIndex === 0 || isFinishing}
            className="gap-2 sm:w-auto"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          {isLastStep ? (
            <Button onClick={finish} disabled={isFinishing} className="gap-2">
              {isFinishing ? <Spinner /> : null}
              {isFinishing ? "Setting up…" : "Go to my workspace"}
            </Button>
          ) : (
            <Button onClick={goNext} disabled={!canContinue} className="gap-2">
              Continue
              <ArrowRight className="size-4" />
            </Button>
          )}
        </>
      }
    >
      {current.body}
    </OnboardingLayout>
  );
};

export default Onboarding;
