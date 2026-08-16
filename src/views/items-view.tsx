import * as React from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "lucide-react";

import SectionHeader from "@/components/section-header";
import CourseItem from "@/components/item-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppMode } from "@/hooks/use-app-mode";
import type { ICourse } from "@/interface/database";
import { PRIORITY } from "@/interface/enums";
import { cn } from "@/lib/utils";
import { useDatabaseStore } from "@/store/databaseStore";

/** Empty draft, reused by the add form and when it is cleared. */
const emptyDraft: Partial<ICourse> = {
  name: "",
  teacherId: "",
  periodsPerWeek: 1,
  priority: PRIORITY.MEDIUM,
};

type PriorityFilter = "ALL" | PRIORITY;

const filters: PriorityFilter[] = [
  "ALL",
  PRIORITY.HIGH,
  PRIORITY.MEDIUM,
  PRIORITY.LOW,
];

interface CoursesProps {
  propName?: string;
}

/**
 * Work items — courses, tasks or activities — as one card grid for every
 * mode. The record is identical across modes, so the page is too; only the
 * vocabulary from `useAppMode` changes.
 */
const Courses: React.FC<CoursesProps> = () => {
  const { t } = useTranslation();
  const { labels } = useAppMode();
  const { database, setDatabase } = useDatabaseStore();

  const [draft, setDraft] = React.useState<Partial<ICourse>>(emptyDraft);
  const [editing, setEditing] = React.useState<ICourse | null>(null);
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<PriorityFilter>("ALL");

  const addCourse = () => {
    if (!draft.name?.trim() || !draft.teacherId) return;

    const course: ICourse = {
      id: `course-${Date.now()}`,
      name: draft.name.trim(),
      teacherId: draft.teacherId,
      periodsPerWeek: draft.periodsPerWeek || 1,
      priority: draft.priority || PRIORITY.MEDIUM,
      duration: draft.duration,
      preferredSlots: draft.preferredSlots || [],
      avoidConsecutive: draft.avoidConsecutive || false,
    };

    setDatabase({ ...database, courses: [...database.courses, course] });
    setDraft(emptyDraft);
    setIsAddOpen(false);
  };

  const removeCourse = (courseId: string) => {
    setDatabase({
      ...database,
      courses: database.courses.filter((course) => course.id !== courseId),
    });
  };

  const handleEditCourse = (course: ICourse) => {
    setEditing(course);
    setIsEditOpen(true);
  };

  const updateCourse = () => {
    if (!editing?.name?.trim() || !editing?.teacherId) return;

    setDatabase({
      ...database,
      courses: database.courses.map((course) =>
        course.id === editing.id ? editing : course
      ),
    });

    setIsEditOpen(false);
    setEditing(null);
  };

  /** Changing priority is a one-click decision — no need to open the sheet. */
  const changePriority = (courseId: string, priority: PRIORITY) => {
    setDatabase({
      ...database,
      courses: database.courses.map((course) =>
        course.id === courseId ? { ...course, priority } : course
      ),
    });
  };

  const visible =
    filter === "ALL"
      ? database.courses
      : database.courses.filter((course) => course.priority === filter);

  const countFor = (value: PriorityFilter) =>
    value === "ALL"
      ? database.courses.length
      : database.courses.filter((course) => course.priority === value).length;

  const filterLabel = (value: PriorityFilter) =>
    value === "ALL" ? t("common.all") : t(`common.${value.toLowerCase()}`);

  /**
   * The add and edit sheets ask for exactly the same things, so they share a
   * body and differ only in what they write to.
   */
  const renderForm = (
    value: Partial<ICourse>,
    onChange: (next: Partial<ICourse>) => void,
    idPrefix: string
  ) => (
    <div className="flex flex-col gap-4 px-3 py-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}-name`}>
          {t("courses.courseName", { course: labels.course })}
        </Label>
        <Input
          id={`${idPrefix}-name`}
          value={value.name || ""}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          placeholder={
            labels.course === "Activity"
              ? t("courses.individualPlaceholder")
              : t("courses.educationPlaceholder")
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}-tutor`}>
          {t("courses.assignTutor", { tutor: labels.tutor })}
        </Label>
        <Select
          value={value.teacherId}
          onValueChange={(teacherId) => onChange({ ...value, teacherId })}
        >
          <SelectTrigger id={`${idPrefix}-tutor`} className="w-full">
            <SelectValue
              placeholder={t("select.selectA", {
                item: labels.tutor.toLowerCase(),
              })}
            />
          </SelectTrigger>
          <SelectContent>
            {database.tutors.length === 0 ? (
              <SelectItem value="no-tutors" disabled>
                {t("select.noAvailable", {
                  items: labels.tutors.toLowerCase(),
                })}
              </SelectItem>
            ) : (
              database.tutors.map((tutor) => (
                <SelectItem key={tutor.id} value={tutor.id}>
                  {tutor.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}-periods`}>
          {t("courses.periodsPerWeek")}
        </Label>
        <Input
          id={`${idPrefix}-periods`}
          type="number"
          min="1"
          value={value.periodsPerWeek ?? 1}
          onChange={(e) =>
            onChange({
              ...value,
              periodsPerWeek: parseInt(e.target.value) || 1,
            })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`${idPrefix}-priority`}>{t("common.priority")}</Label>
        <Select
          value={value.priority}
          onValueChange={(priority) =>
            onChange({ ...value, priority: priority as PRIORITY })
          }
        >
          <SelectTrigger id={`${idPrefix}-priority`} className="w-full">
            <SelectValue placeholder={t("courses.selectPriority")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={PRIORITY.LOW}>{t("common.low")}</SelectItem>
            <SelectItem value={PRIORITY.MEDIUM}>{t("common.medium")}</SelectItem>
            <SelectItem value={PRIORITY.HIGH}>{t("common.high")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id={`${idPrefix}-avoidConsecutive`}
          checked={value.avoidConsecutive || false}
          onCheckedChange={(checked) =>
            onChange({ ...value, avoidConsecutive: checked as boolean })
          }
        />
        <Label htmlFor={`${idPrefix}-avoidConsecutive`}>
          {t("courses.avoidConsecutive")}
        </Label>
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-4 px-4 py-4 md:py-6 lg:px-6">
      <div className="h-full w-full gap-4">
        <SectionHeader />
      </div>

      {/* Section title, count, and the filters that narrow the grid */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 border px-4 py-2">
          <span className="text-lg font-semibold">{labels.courses}</span>
          <span className="text-primary text-lg font-bold tabular-nums">
            {database.courses.length}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filters.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={cn(
                "border px-3 py-1.5 text-xs transition-colors",
                filter === value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "text-muted-foreground hover:text-foreground hover:border-primary/40"
              )}
            >
              {filterLabel(value)}
              <span className="ml-1.5 tabular-nums opacity-70">
                {countFor(value)}
              </span>
            </button>
          ))}

          <Button onClick={() => setIsAddOpen(true)} className="gap-2">
            <PlusIcon className="size-4" />
            {t("common.add")} {labels.course}
          </Button>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="text-muted-foreground flex h-[300px] items-center justify-center border border-dashed">
          {database.courses.length === 0
            ? t("courses.noCoursesYet", {
                courses: labels.courses.toLowerCase(),
              })
            : t("courses.noneMatchFilter", {
                courses: labels.courses.toLowerCase(),
              })}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visible.map((course) => (
            <CourseItem
              key={course.id}
              course={course}
              tutorName={
                database.tutors.find((tutor) => tutor.id === course.teacherId)
                  ?.name
              }
              onRemove={removeCourse}
              onEdit={handleEditCourse}
              onPriorityChange={changePriority}
            />
          ))}
        </div>
      )}

      {/* Add */}
      <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
        <SheetContent side="right" className="w-full sm:w-96">
          <SheetHeader>
            <SheetTitle>
              {t("common.add")} {labels.course}
            </SheetTitle>
            <SheetDescription>
              {t("courses.addDesc", { course: labels.course.toLowerCase() })}
            </SheetDescription>
          </SheetHeader>

          {renderForm(draft, setDraft, "add")}

          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={addCourse}>{t("common.save")}</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Edit */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent side="right" className="w-full sm:w-96">
          <SheetHeader>
            <SheetTitle>
              {t("courses.editTitle", { course: labels.course })}
            </SheetTitle>
            <SheetDescription>
              {t("courses.editDesc", { course: labels.course.toLowerCase() })}
            </SheetDescription>
          </SheetHeader>

          {editing &&
            renderForm(
              editing,
              (next) => setEditing({ ...editing, ...next } as ICourse),
              "edit"
            )}

          <SheetFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={updateCourse}>{t("common.saveChanges")}</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Courses;
