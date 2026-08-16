import { BuildingIcon, TicketIcon } from "lucide-react";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { modeCopy } from "@/config/onboarding";
import { getSolutionByMode } from "@/config/solutions";
import type { AppMode } from "@/context/app-mode-context";
import { cn } from "@/lib/utils";
import type { WorkspaceChoice, WorkspaceIntent } from "@/lib/workspace-api";

interface StepWorkspaceProps {
  mode: AppMode;
  value: WorkspaceChoice;
  onChange: (next: WorkspaceChoice) => void;
}

const intents: {
  intent: WorkspaceIntent;
  icon: typeof BuildingIcon;
  title: string;
  description: string;
}[] = [
  {
    intent: "create",
    icon: BuildingIcon,
    title: "Create a workspace",
    description: "Start fresh and invite your team once you are set up.",
  },
  {
    intent: "join",
    icon: TicketIcon,
    title: "Join with an invite",
    description: "Someone sent you a code or an invite link.",
  },
];

export function StepWorkspace({ mode, value, onChange }: StepWorkspaceProps) {
  const copy = modeCopy[mode];
  const solution = getSolutionByMode(mode);
  const isCompany = mode === "company";
  const isJoining = isCompany && value.intent === "join";

  return (
    <div className="flex flex-col gap-8">
      {/* Only teams share a workspace, so only they get the choice. */}
      {isCompany && (
        <div className="grid gap-3 sm:grid-cols-2">
          {intents.map((option) => {
            const isSelected = value.intent === option.intent;
            return (
              <button
                key={option.intent}
                type="button"
                onClick={() => onChange({ ...value, intent: option.intent })}
                aria-pressed={isSelected}
                className={cn(
                  "flex flex-col gap-2 border p-4 text-left transition-colors",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/40"
                )}
              >
                <option.icon
                  className={cn(
                    "size-5",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span className="font-medium">{option.title}</span>
                <span className="text-muted-foreground text-sm">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {isJoining ? (
        <Field className="max-w-lg">
          <FieldLabel htmlFor="invite-code">Invite code</FieldLabel>
          <Input
            id="invite-code"
            name="invite-code"
            value={value.inviteCode}
            onChange={(e) =>
              onChange({ ...value, inviteCode: e.target.value.toUpperCase() })
            }
            placeholder="ABCD2345"
            autoFocus
            autoComplete="off"
            spellCheck={false}
            className="font-mono tracking-[0.2em]"
          />
          <FieldDescription>
            From the invite link or the code an admin shared with you. You will
            join with their records, not a blank workspace.
          </FieldDescription>
        </Field>
      ) : (
        <Field className="max-w-lg">
          <FieldLabel htmlFor="workspace-name">{copy.workspaceLabel}</FieldLabel>
          <Input
            id="workspace-name"
            name="workspace-name"
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder={copy.workspacePlaceholder}
            autoFocus
            autoComplete="organization"
          />
          <FieldDescription>{copy.workspaceHint}</FieldDescription>
        </Field>
      )}

      {solution ? (
        <div className="bg-muted/40 flex flex-col gap-4 border p-5">
          <p className="text-muted-foreground michroma text-xs uppercase tracking-[0.18em]">
            Your workspace will use
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {solution.terminology.map((term) => (
              <div key={term.concept} className="flex flex-col gap-1">
                <span className="text-muted-foreground text-xs">
                  {term.concept}
                </span>
                <span className={cn("font-medium", solution.accent.text)}>
                  {term.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            You can switch solution later in Settings without losing anything —
            each mode keeps its own data.
          </p>
        </div>
      ) : null}
    </div>
  );
}
