import * as React from "react";
import { useTranslation } from "react-i18next";
import { PencilIcon, RepeatIcon, Trash2Icon, UserRoundXIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppMode } from "@/hooks/use-app-mode";
import type { ICourse } from "@/interface/database";
import { PRIORITY } from "@/interface/enums";
import { cn } from "@/lib/utils";

interface CourseItemProps {
  course: ICourse;
  tutorName?: string;
  onRemove: (courseId: string) => void;
  onEdit: (course: ICourse) => void;
  /** Omit to render priority as a read-only chip instead of a control. */
  onPriorityChange?: (courseId: string, priority: PRIORITY) => void;
}

const getInitials = (name?: string) => {
  if (!name) return "—";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/** Left edge stripe, so priority is readable before anything is parsed. */
const priorityStripe: Record<PRIORITY, string> = {
  [PRIORITY.HIGH]: "bg-destructive",
  [PRIORITY.MEDIUM]: "bg-amber-500",
  [PRIORITY.LOW]: "bg-emerald-500",
};

/**
 * One work item — a course, a task or an activity, depending on the
 * workspace. The three modes differ only in what things are called, so they
 * share this card rather than each growing their own layout.
 *
 * High priority inverts the card. It is the strongest signal available and
 * matches what the scheduler does: highest priority is placed first.
 */
const CourseItem: React.FC<CourseItemProps> = ({
  course,
  tutorName,
  onRemove,
  onEdit,
  onPriorityChange,
}) => {
  const { t } = useTranslation();
  const { labels } = useAppMode();

  const isUrgent = course.priority === PRIORITY.HIGH;
  const isUnassigned = !tutorName;

  return (
    <article
      className={cn(
        "group relative flex flex-col border transition-colors",
        isUrgent
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-card-foreground hover:border-primary/40"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-1",
          isUrgent ? "bg-primary-foreground/50" : priorityStripe[course.priority]
        )}
      />

      {/* Owner and the two things you can do to the record */}
      <div
        className={cn(
          "flex items-start justify-between gap-2 border-b p-3 pl-4",
          isUrgent ? "border-primary-foreground/20" : "border-border"
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="size-9 rounded-none">
            <AvatarFallback
              className={cn(
                "rounded-none text-xs font-semibold",
                isUrgent
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {getInitials(tutorName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p
              className={cn(
                "michroma text-[10px] uppercase tracking-[0.18em]",
                isUrgent ? "text-primary-foreground/70" : "text-muted-foreground"
              )}
            >
              {labels.tutor}
            </p>
            <p className="truncate text-sm font-medium">
              {tutorName ?? t("courses.unassigned")}
            </p>
          </div>
        </div>

        <div className="flex shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-8",
              isUrgent && "hover:bg-primary-foreground/15 text-primary-foreground"
            )}
            onClick={() => onEdit(course)}
            aria-label={t("common.edit")}
          >
            <PencilIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-8",
              isUrgent
                ? "hover:bg-primary-foreground/15 text-primary-foreground"
                : "hover:text-destructive"
            )}
            onClick={() => onRemove(course.id)}
            aria-label={t("common.remove")}
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      </div>

      {/* What the item is, and how much of the week it asks for */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-lg leading-tight font-semibold text-balance">
          {course.name}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "border px-2 py-0.5 text-xs tabular-nums",
              isUrgent
                ? "border-primary-foreground/30"
                : "border-border text-muted-foreground"
            )}
          >
            {t("courses.perWeek", { count: course.periodsPerWeek || 0 })}
          </span>

          {course.avoidConsecutive && (
            <span
              className={cn(
                "flex items-center gap-1 border px-2 py-0.5 text-xs",
                isUrgent
                  ? "border-primary-foreground/30"
                  : "border-border text-muted-foreground"
              )}
            >
              <RepeatIcon className="size-3" />
              {t("courses.noBackToBack")}
            </span>
          )}

          {isUnassigned && (
            <span className="border-destructive text-destructive bg-destructive/10 flex items-center gap-1 border px-2 py-0.5 text-xs">
              <UserRoundXIcon className="size-3" />
              {t("courses.unassigned")}
            </span>
          )}
        </div>
      </div>

      {/* Priority, editable in place — the one field worth changing from here */}
      <div
        className={cn(
          "flex items-center justify-between gap-2 border-t p-3 pl-4",
          isUrgent ? "border-primary-foreground/20" : "border-border"
        )}
      >
        <span
          className={cn(
            "michroma text-[10px] uppercase tracking-[0.18em]",
            isUrgent ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {t("common.priority")}
        </span>

        {onPriorityChange ? (
          <Select
            value={course.priority}
            onValueChange={(value) =>
              onPriorityChange(course.id, value as PRIORITY)
            }
          >
            <SelectTrigger
              size="sm"
              className={cn(
                "w-32",
                isUrgent &&
                  "border-primary-foreground/30 text-primary-foreground dark:bg-primary-foreground/10 dark:hover:bg-primary-foreground/15"
              )}
              aria-label={t("common.priority")}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PRIORITY.HIGH}>{t("common.high")}</SelectItem>
              <SelectItem value={PRIORITY.MEDIUM}>
                {t("common.medium")}
              </SelectItem>
              <SelectItem value={PRIORITY.LOW}>{t("common.low")}</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <span className="text-sm font-medium">
            {t(`common.${course.priority.toLowerCase()}`)}
          </span>
        )}
      </div>
    </article>
  );
};

export default CourseItem;
