import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { modeCopy } from "@/config/onboarding";
import { getSolutionByMode } from "@/config/solutions";
import type { AppMode } from "@/context/app-mode-context";
import { cn } from "@/lib/utils";

interface StepWorkspaceProps {
  mode: AppMode;
  value: string;
  onChange: (value: string) => void;
}

export function StepWorkspace({ mode, value, onChange }: StepWorkspaceProps) {
  const copy = modeCopy[mode];
  const solution = getSolutionByMode(mode);

  return (
    <div className="flex flex-col gap-8">
      <Field className="max-w-lg">
        <FieldLabel htmlFor="workspace-name">{copy.workspaceLabel}</FieldLabel>
        <Input
          id="workspace-name"
          name="workspace-name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={copy.workspacePlaceholder}
          autoFocus
          autoComplete="organization"
        />
        <FieldDescription>{copy.workspaceHint}</FieldDescription>
      </Field>

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
                <span
                  className={cn("font-medium", solution.accent.text)}
                >
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
