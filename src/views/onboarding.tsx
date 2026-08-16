import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { StepSolution } from "@/components/onboarding/step-solution";
import { StepWorkspace } from "@/components/onboarding/step-workspace";
import {
  emptyWorkspaceChoice,
  isUsableInviteCode,
  type WorkspaceChoice,
} from "@/lib/workspace-api";
import { StepSchedule } from "@/components/onboarding/step-schedule";
import { StepData } from "@/components/onboarding/step-data";
import { StepReady } from "@/components/onboarding/step-ready";
import { useWorkspaceStore } from "@/store/workspaceStore";
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

  const [searchParams] = useSearchParams();
  const createWorkspace = useWorkspaceStore((state) => state.createWorkspace);
  const joinWorkspace = useWorkspaceStore((state) => state.joinWorkspace);

  const [stepIndex, setStepIndex] = React.useState(0);
  // An invite link lands here with the code in the URL: the sender already
  // decided the mode and the intent, so both are pre-answered.
  const invitedCode = searchParams.get("invite")?.trim().toUpperCase() ?? "";
  const [mode, setSelectedMode] = React.useState<AppMode | null>(
    invitedCode ? "company" : null
  );
  const [workspace, setWorkspace] = React.useState<WorkspaceChoice>(
    invitedCode
      ? { ...emptyWorkspaceChoice, intent: "join", inviteCode: invitedCode }
      : emptyWorkspaceChoice
  );
  const [schedule, setSchedule] = React.useState<SchedulePreferences>(
    defaultSchedulePreferences
  );
  const [seedSample, setSeedSample] = React.useState(true);
  const [isFinishing, setIsFinishing] = React.useState(false);

  const solution = getSolutionByMode(mode);
  const isJoining = mode === "company" && workspace.intent === "join";

  /** Each step decides for itself whether Continue is available. */
  const canContinue = (() => {
    if (stepIndex === 0) return mode !== null;
    if (stepIndex === 1 && mode === "company") {
      return isJoining
        ? isUsableInviteCode(workspace.inviteCode)
        : workspace.name.trim().length > 0;
    }
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
      // 1. The shared container, for teams. Joining can fail — a bad code
      //    should stop the flow here rather than drop the user into a
      //    workspace that does not exist.
      let workspaceName = workspace.name.trim();

      if (mode === "company") {
        const joined = isJoining
          ? await joinWorkspace(workspace.inviteCode)
          : await createWorkspace(workspaceName);

        if (!joined) {
          setIsFinishing(false);
          toast.error(
            isJoining ? "Could not join that workspace" : "Could not create the workspace",
            {
              description:
                useWorkspaceStore.getState().error ?? "Please try again.",
            }
          );
          return;
        }

        workspaceName = joined.name;
      }

      // 2. Workspace vocabulary and behaviour.
      setMode(mode);
      setStoreMode(mode);

      // 3. Starting data, written to both the active database and the
      //    per-mode slot so switching modes later does not lose it. Someone
      //    joining an existing team inherits its records instead.
      if (seedSample && !isJoining) {
        const sample = buildSampleDatabase(mode);
        setDatabaseForMode(mode, sample);
        await setDatabase(sample);
      }

      // 4. Preferences, and the flag that stops the flow reappearing.
      complete({
        mode,
        workspaceName,
        schedule,
        seededSample: seedSample && !isJoining,
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
      title:
        mode === "company" ? "Your team workspace" : "Name your workspace",
      description: isJoining
        ? "Enter the code from your invite and you will land in your team's workspace."
        : "Something you will recognise on exports and shared views.",
      body: mode ? (
        <StepWorkspace mode={mode} value={workspace} onChange={setWorkspace} />
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
      title: isJoining ? "You are joining a team" : "How would you like to start?",
      description: isJoining
        ? "Nothing to set up here — you inherit what the workspace already has."
        : "Either way, nothing here is permanent.",
      body: isJoining ? (
        <div className="bg-muted/40 flex flex-col gap-2 border p-5">
          <p className="text-muted-foreground michroma text-xs uppercase tracking-[0.18em]">
            Starting point
          </p>
          <p className="text-sm">
            Your workspace's members, tasks and projects are already there. You
            can add your own from the moment you land.
          </p>
        </div>
      ) : mode ? (
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
          workspaceName={
            isJoining ? `Invite ${workspace.inviteCode}` : workspace.name
          }
          schedule={schedule}
          seedSample={seedSample && !isJoining}
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
