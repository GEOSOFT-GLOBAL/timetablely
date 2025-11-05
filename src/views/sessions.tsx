import * as React from "react";
import SectionHeader from "@/components/section-header";
import SessionItem from "@/components/session-item";
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
import type { ISession } from "@/interface/database";
import { XIcon } from "lucide-react";

interface SessionsProps {
  propName?: string;
}

const Sessions: React.FC<SessionsProps> = () => {
  const { database, setDatabase } = useDatabaseStore();
  const [newSession, setNewSession] = React.useState<Partial<ISession>>({
    name: "",
    subjects: [],
  });
  const [selectedCourse, setSelectedCourse] = React.useState<string>("");
  const [editingSession, setEditingSession] = React.useState<ISession | null>(
    null
  );
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);
  const [editSelectedCourse, setEditSelectedCourse] =
    React.useState<string>("");

  const addCourseToSession = (courseId: string) => {
    if (!courseId || newSession.subjects?.includes(courseId)) return;
    setNewSession({
      ...newSession,
      subjects: [...(newSession.subjects || []), courseId],
    });
    setSelectedCourse("");
  };

  const removeCourseFromSession = (courseId: string) => {
    setNewSession({
      ...newSession,
      subjects: newSession.subjects?.filter((id) => id !== courseId) || [],
    });
  };

  const addSession = () => {
    if (!newSession.name?.trim()) return;

    const session: ISession = {
      id: `session-${Date.now()}`,
      name: newSession.name.trim(),
      subjects: newSession.subjects || [],
    };

    setDatabase({
      ...database,
      sessions: [...database.sessions, session],
    });

    setNewSession({ name: "", subjects: [] });
  };

  const removeSession = (sessionId: string) => {
    setDatabase({
      ...database,
      sessions: database.sessions.filter((s) => s.id !== sessionId),
    });
  };

  const handleEditSession = (session: ISession) => {
    setEditingSession(session);
    setIsEditSheetOpen(true);
  };

  const addCourseToEditingSession = (courseId: string) => {
    if (
      !courseId ||
      !editingSession ||
      editingSession.subjects?.includes(courseId)
    )
      return;
    setEditingSession({
      ...editingSession,
      subjects: [...(editingSession.subjects || []), courseId],
    });
    setEditSelectedCourse("");
  };

  const removeCourseFromEditingSession = (courseId: string) => {
    if (!editingSession) return;
    setEditingSession({
      ...editingSession,
      subjects: editingSession.subjects?.filter((id) => id !== courseId) || [],
    });
  };

  const updateSession = () => {
    if (!editingSession?.name?.trim()) return;

    setDatabase({
      ...database,
      sessions: database.sessions.map((s) =>
        s.id === editingSession.id ? editingSession : s
      ),
    });

    setIsEditSheetOpen(false);
    setEditingSession(null);
    setEditSelectedCourse("");
  };

  return (
    <div className="flex flex-col w-full md:py-6 py-4 gap-4 px-4 lg:px-6">
      <div className="gap-4 h-full w-full">
        <SectionHeader />
      </div>
      <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 md:gap-6">
        <Card className="">
          <div className="p-4 flex flex-col gap-4">
            <Label htmlFor="sessionName">Class Name</Label>
            <Input
              id="sessionName"
              value={newSession.name || ""}
              onChange={(e) =>
                setNewSession({ ...newSession, name: e.target.value })
              }
              placeholder="e.g., Class 1A, Grade 10B"
            />

            <Label htmlFor="course">Assign Courses</Label>
            <Select value={selectedCourse} onValueChange={addCourseToSession}>
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

            {newSession.subjects && newSession.subjects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {newSession.subjects.map((subjectId) => {
                  const course = database.courses.find(
                    (c) => c.id === subjectId
                  );
                  return (
                    <div
                      key={subjectId}
                      className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                    >
                      <span>{course?.name || subjectId}</span>
                      <button
                        type="button"
                        onClick={() => removeCourseFromSession(subjectId)}
                        className="hover:bg-secondary-foreground/20 rounded-sm p-0.5"
                      >
                        <XIcon className="size-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <CardFooter className="gap-4">
            <Button variant="outline" onClick={addSession}>
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => setNewSession({ name: "", subjects: [] })}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full h-[calc(100vh-220px)] flex flex-col px-4 overflow-y-auto">
          {database.sessions.map((session) => {
            const courseNames = session.subjects.map((subjectId) => {
              const course = database.courses.find((c) => c.id === subjectId);
              return course?.name || subjectId;
            });
            return (
              <SessionItem
                key={session.id}
                session={session}
                courseNames={courseNames}
                onRemove={removeSession}
                onEdit={handleEditSession}
              />
            );
          })}
          {database.sessions.length === 0 && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No classes added yet
            </div>
          )}
        </Card>
      </div>

      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Class</SheetTitle>
            <SheetDescription>
              Make changes to the class details below.
            </SheetDescription>
          </SheetHeader>

          {editingSession && (
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-sessionName">Class Name</Label>
                <Input
                  id="edit-sessionName"
                  value={editingSession.name}
                  onChange={(e) =>
                    setEditingSession({
                      ...editingSession,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g., Class 1A, Grade 10B"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-course">Assign Courses</Label>
                <Select
                  value={editSelectedCourse}
                  onValueChange={addCourseToEditingSession}
                >
                  <SelectTrigger id="edit-course" className="w-full">
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

                {editingSession.subjects &&
                  editingSession.subjects.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {editingSession.subjects.map((subjectId) => {
                        const course = database.courses.find(
                          (c) => c.id === subjectId
                        );
                        return (
                          <div
                            key={subjectId}
                            className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                          >
                            <span>{course?.name || subjectId}</span>
                            <button
                              type="button"
                              onClick={() =>
                                removeCourseFromEditingSession(subjectId)
                              }
                              className="hover:bg-secondary-foreground/20 rounded-sm p-0.5"
                            >
                              <XIcon className="size-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>
            </div>
          )}

          <SheetFooter>
            <Button variant="outline" onClick={updateSession}>
              Save Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sessions;
