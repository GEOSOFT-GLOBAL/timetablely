import * as React from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/section-header";
import CourseItem from "@/components/item-card";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
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
import { useDatabaseStore } from "@/store/databaseStore";
import type { ICourse } from "@/interface/database";
import { PRIORITY } from "@/interface/enums";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppMode } from "@/hooks/use-app-mode";

interface CoursesProps {
  propName?: string;
}

const Courses: React.FC<CoursesProps> = () => {
  const { t } = useTranslation();
  const { labels } = useAppMode();
  const { database, setDatabase } = useDatabaseStore();
  const [newCourse, setNewCourse] = React.useState<Partial<ICourse>>({
    name: "",
    teacherId: "",
    periodsPerWeek: 1,
    priority: PRIORITY.MEDIUM,
  });
  const [editingCourse, setEditingCourse] = React.useState<ICourse | null>(
    null
  );
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);

  const addCourse = () => {
    if (!newCourse.name?.trim() || !newCourse.teacherId) return;

    const course: ICourse = {
      id: `course-${Date.now()}`,
      name: newCourse.name.trim(),
      teacherId: newCourse.teacherId,
      periodsPerWeek: newCourse.periodsPerWeek || 1,
      priority: newCourse.priority || PRIORITY.MEDIUM,
      duration: newCourse.duration,
      preferredSlots: newCourse.preferredSlots || [],
      avoidConsecutive: newCourse.avoidConsecutive || false,
    };

    setDatabase({
      ...database,
      courses: [...database.courses, course],
    });

    setNewCourse({
      name: "",
      teacherId: "",
      periodsPerWeek: 1,
      priority: PRIORITY.MEDIUM,
    });
  };

  const removeCourse = (courseId: string) => {
    setDatabase({
      ...database,
      courses: database.courses.filter((c) => c.id !== courseId),
    });
  };

  const handleEditCourse = (course: ICourse) => {
    setEditingCourse(course);
    setIsEditSheetOpen(true);
  };

  const updateCourse = () => {
    if (!editingCourse?.name?.trim() || !editingCourse?.teacherId) return;

    setDatabase({
      ...database,
      courses: database.courses.map((c) =>
        c.id === editingCourse.id ? editingCourse : c
      ),
    });

    setIsEditSheetOpen(false);
    setEditingCourse(null);
  };

  return (
    <div className="flex flex-col w-full md:py-6 py-4 gap-4 px-4 lg:px-6">
      <div className="gap-4 h-full w-full">
        <SectionHeader />
      </div>
      <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 md:gap-6">
        <Card className="">
          <div className="p-4 flex flex-col gap-4">
            <Label htmlFor="courseName">{t('courses.courseName', { course: labels.course })}</Label>
            <Input
              id="courseName"
              value={newCourse.name || ""}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
              placeholder={labels.course === "Activity" ? t('courses.individualPlaceholder') : t('courses.educationPlaceholder')}
            />

            <Label htmlFor="tutor">{t('courses.assignTutor', { tutor: labels.tutor })}</Label>
            <Select
              value={newCourse.teacherId}
              onValueChange={(value) =>
                setNewCourse({ ...newCourse, teacherId: value })
              }
            >
              <SelectTrigger id="tutor" className="w-full">
                <SelectValue placeholder={t('select.selectA', { item: labels.tutor.toLowerCase() })} />
              </SelectTrigger>
              <SelectContent>
                {database.tutors.length === 0 ? (
                  <SelectItem value="no-tutors" disabled>
                    {t('select.noAvailable', { items: labels.tutors.toLowerCase() })}
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

            <Label htmlFor="periodsPerWeek">{t('courses.periodsPerWeek')}</Label>
            <Input
              id="periodsPerWeek"
              type="number"
              min="1"
              value={newCourse.periodsPerWeek || 1}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  periodsPerWeek: parseInt(e.target.value) || 1,
                })
              }
            />

            <Label htmlFor="priority">{t('common.priority')}</Label>
            <Select
              value={newCourse.priority}
              onValueChange={(value) =>
                setNewCourse({ ...newCourse, priority: value as PRIORITY })
              }
            >
              <SelectTrigger id="priority" className="w-full">
                <SelectValue placeholder={t('courses.selectPriority')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PRIORITY.LOW}>{t('common.low')}</SelectItem>
                <SelectItem value={PRIORITY.MEDIUM}>{t('common.medium')}</SelectItem>
                <SelectItem value={PRIORITY.HIGH}>{t('common.high')}</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Checkbox
                id="avoidConsecutive"
                checked={newCourse.avoidConsecutive || false}
                onCheckedChange={(checked) =>
                  setNewCourse({
                    ...newCourse,
                    avoidConsecutive: checked as boolean,
                  })
                }
              />
              <Label htmlFor="avoidConsecutive">
                {t('courses.avoidConsecutive')}
              </Label>
            </div>
          </div>
          <CardFooter className="gap-4">
            <Button variant="outline" onClick={addCourse}>
              {t('common.save')}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setNewCourse({
                  name: "",
                  teacherId: "",
                  periodsPerWeek: 1,
                  priority: PRIORITY.MEDIUM,
                })
              }
            >
              {t('common.cancel')}
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full h-[calc(100vh-220px)] flex flex-col px-4 overflow-y-auto">
          {database.courses.map((course) => {
            const tutor = database.tutors.find(
              (t) => t.id === course.teacherId
            );
            return (
              <CourseItem
                key={course.id}
                course={course}
                tutorName={tutor?.name}
                onRemove={removeCourse}
                onEdit={handleEditCourse}
              />
            );
          })}
          {database.courses.length === 0 && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {t('courses.noCoursesYet', { courses: labels.courses.toLowerCase() })}
            </div>
          )}
        </Card>
      </div>

      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{t('courses.editTitle', { course: labels.course })}</SheetTitle>
            <SheetDescription>
              {t('courses.editDesc', { course: labels.course.toLowerCase() })}
            </SheetDescription>
          </SheetHeader>

          {editingCourse && (
            <div className="flex flex-col gap-4 py-4 px-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-courseName">{t('courses.courseName', { course: labels.course })}</Label>
                <Input
                  id="edit-courseName"
                  value={editingCourse.name}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, name: e.target.value })
                  }
                  placeholder={labels.course === "Activity" ? t('courses.individualPlaceholder') : t('courses.educationPlaceholder')}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-tutor">{t('courses.assignTutor', { tutor: labels.tutor })}</Label>
                <Select
                  value={editingCourse.teacherId}
                  onValueChange={(value) =>
                    setEditingCourse({ ...editingCourse, teacherId: value })
                  }
                >
                  <SelectTrigger id="edit-tutor" className="w-full">
                    <SelectValue placeholder={t('select.selectA', { item: labels.tutor.toLowerCase() })} />
                  </SelectTrigger>
                  <SelectContent>
                    {database.tutors.length === 0 ? (
                      <SelectItem value="no-tutors" disabled>
                        {t('select.noAvailable', { items: labels.tutors.toLowerCase() })}
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
                <Label htmlFor="edit-periodsPerWeek">{t('courses.periodsPerWeek')}</Label>
                <Input
                  id="edit-periodsPerWeek"
                  type="number"
                  min="1"
                  value={editingCourse.periodsPerWeek}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      periodsPerWeek: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-priority">{t('common.priority')}</Label>
                <Select
                  value={editingCourse.priority}
                  onValueChange={(value) =>
                    setEditingCourse({
                      ...editingCourse,
                      priority: value as PRIORITY,
                    })
                  }
                >
                  <SelectTrigger id="edit-priority" className="w-full">
                    <SelectValue placeholder={t('courses.selectPriority')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PRIORITY.LOW}>{t('common.low')}</SelectItem>
                    <SelectItem value={PRIORITY.MEDIUM}>{t('common.medium')}</SelectItem>
                    <SelectItem value={PRIORITY.HIGH}>{t('common.high')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="edit-avoidConsecutive"
                  checked={editingCourse.avoidConsecutive || false}
                  onCheckedChange={(checked) =>
                    setEditingCourse({
                      ...editingCourse,
                      avoidConsecutive: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="edit-avoidConsecutive">
                  {t('courses.avoidConsecutive')}
                </Label>
              </div>
            </div>
          )}

          <SheetFooter>
            <Button variant="outline" onClick={updateCourse}>
              {t('common.saveChanges')}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Courses;
