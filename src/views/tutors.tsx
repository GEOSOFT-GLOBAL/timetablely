import SectionHeader from "@/components/section-header";
import TutorItem from "@/components/tutor-item";
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
import * as React from "react";
import { useDatabaseStore } from "@/store/databaseStore";
import type { ITutor } from "@/interface/database";
import { RefreshCcwIcon, UserCircle, XIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface TutorsProps {
  propName?: string;
}

const Tutors: React.FC<TutorsProps> = () => {
  const { database, setDatabase } = useDatabaseStore();
  const [newTutor, setNewTutor] = React.useState<Partial<ITutor>>({
    name: "",
    subjects: [],
    maxPeriodsPerDay: 3,
  });
  const [selectedCourse, setSelectedCourse] = React.useState<string>("");

  const addCourseToTutor = (courseId: string) => {
    if (!courseId || newTutor.subjects?.includes(courseId)) return;
    setNewTutor({
      ...newTutor,
      subjects: [...(newTutor.subjects || []), courseId],
    });
    setSelectedCourse("");
  };

  const removeCourseFromTutor = (courseId: string) => {
    setNewTutor({
      ...newTutor,
      subjects: newTutor.subjects?.filter((id) => id !== courseId) || [],
    });
  };

  const addTutor = () => {
    if (!newTutor.name?.trim()) return;

    const tutor: ITutor = {
      id: `tutor-${Date.now()}`,
      name: newTutor.name.trim(),
      subjects: newTutor.subjects || [],
      maxPeriodsPerDay: newTutor.maxPeriodsPerDay || 3,
      unavailableSlots: newTutor.unavailableSlots || [],
    };

    setDatabase({
      ...database,
      tutors: [...database.tutors, tutor],
    });

    setNewTutor({ name: "", subjects: [], maxPeriodsPerDay: 3 });
  };

  const removeTutor = (tutorId: string) => {
    setDatabase({
      ...database,
      tutors: database.tutors.filter((t) => t.id !== tutorId),
      courses: database.courses.filter((c) => c.teacherId !== tutorId),
    });
  };

  return (
    <div className="flex flex-col w-full md:py-6 py-4 gap-4 px-4 lg:px-6">
      <div className="gap-4 h-full w-full">
        <SectionHeader />
      </div>
      <div className=" grid grid-cols-1 w-full gap-4 md:grid-cols-2 md:gap-6">
        <Card className="">
          <div className="p-4 flex flex-col gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newTutor.name || ""}
              onChange={(e) =>
                setNewTutor({ ...newTutor, name: e.target.value })
              }
            />
            <Label htmlFor="course">Courses</Label>
            <Select value={selectedCourse} onValueChange={addCourseToTutor}>
              <SelectTrigger id="course" className="w-full">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {database.courses.length === 0 ? (
                  <SelectItem value="no-courses" disabled>
                    No courses available
                  </SelectItem>
                ) : (
                  database.courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {newTutor.subjects && newTutor.subjects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {newTutor.subjects.map((subjectId) => {
                  const course = database.courses.find(
                    (c) => c.id === subjectId,
                  );
                  return (
                    <div
                      key={subjectId}
                      className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                    >
                      <span>{course?.name || subjectId}</span>
                      <button
                        type="button"
                        onClick={() => removeCourseFromTutor(subjectId)}
                        className="hover:bg-secondary-foreground/20 rounded-sm p-0.5"
                      >
                        <XIcon className="size-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <Label htmlFor="maxPeriods">Max Periods Per Day</Label>
            <Input
              id="maxPeriods"
              type="number"
              value={newTutor.maxPeriodsPerDay || 3}
              onChange={(e) =>
                setNewTutor({
                  ...newTutor,
                  maxPeriodsPerDay: parseInt(e.target.value) || 3,
                })
              }
            />
          </div>
          <CardFooter className="gap-4">
            <Button variant="outline" onClick={addTutor}>
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setNewTutor({ name: "", subjects: [], maxPeriodsPerDay: 3 })
              }
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full h-[calc(100vh-220px)] flex flex-col px-4 overflow-y-auto">
          {database.tutors.map((tutor) => (
            <TutorItem key={tutor.id} tutor={tutor} onRemove={removeTutor} />
          ))}
          {database.tutors.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <UserCircle />
                </EmptyMedia>
                <EmptyTitle>No Tutor</EmptyTitle>
                <EmptyDescription>
                  No Tutors found, created and available tutors will appear here
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" size="sm">
                  <RefreshCcwIcon />
                  Refresh
                </Button>
              </EmptyContent>
            </Empty>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Tutors;
