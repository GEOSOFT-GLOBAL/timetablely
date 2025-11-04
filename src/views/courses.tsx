import * as React from "react";
import SectionHeader from "@/components/section-header";
import CourseItem from "@/components/course-item";
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
import { useDatabaseStore } from "@/store/databaseStore";
import type { ICourse } from "@/interface/database";
import { PRIORITY } from "@/interface/enums";

interface CoursesProps {
  propName?: string;
}

const Courses: React.FC<CoursesProps> = () => {
  const { database, setDatabase } = useDatabaseStore();
  const [newCourse, setNewCourse] = React.useState<Partial<ICourse>>({
    name: "",
    teacherId: "",
    periodsPerWeek: 1,
    priority: PRIORITY.MEDIUM,
  });

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

  return (
    <div className="flex flex-col w-full md:py-6 py-4 gap-4 px-4 lg:px-6">
      <div className="gap-4 h-full w-full">
        <SectionHeader />
      </div>
      <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 md:gap-6">
        <Card className="">
          <div className="p-4 flex flex-col gap-4">
            <Label htmlFor="courseName">Course Name</Label>
            <Input
              id="courseName"
              value={newCourse.name || ""}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
              placeholder="e.g., Mathematics"
            />

            <Label htmlFor="tutor">Assign Tutor</Label>
            <Select
              value={newCourse.teacherId}
              onValueChange={(value) =>
                setNewCourse({ ...newCourse, teacherId: value })
              }
            >
              <SelectTrigger id="tutor" className="w-full">
                <SelectValue placeholder="Select a tutor" />
              </SelectTrigger>
              <SelectContent>
                {database.tutors.length === 0 ? (
                  <SelectItem value="no-tutors" disabled>
                    No tutors available
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

            <Label htmlFor="periodsPerWeek">Periods Per Week</Label>
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

            <Label htmlFor="priority">Priority</Label>
            <Select
              value={newCourse.priority}
              onValueChange={(value) =>
                setNewCourse({ ...newCourse, priority: value as PRIORITY })
              }
            >
              <SelectTrigger id="priority" className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PRIORITY.LOW}>Low</SelectItem>
                <SelectItem value={PRIORITY.MEDIUM}>Medium</SelectItem>
                <SelectItem value={PRIORITY.HIGH}>High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CardFooter className="gap-4">
            <Button variant="outline" onClick={addCourse}>
              Save
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
              Cancel
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full h-[calc(100vh-220px)] flex flex-col px-4 overflow-y-auto">
          {database.courses.map((course) => {
            const tutor = database.tutors.find((t) => t.id === course.teacherId);
            return (
              <CourseItem
                key={course.id}
                course={course}
                tutorName={tutor?.name}
                onRemove={removeCourse}
              />
            );
          })}
          {database.courses.length === 0 && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No courses added yet
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Courses;
