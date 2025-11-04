import SectionHeader from "@/components/section-header";
import TutorItem from "@/components/tutor-item";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { useDatabaseStore } from "@/store/databaseStore";
import type { ITutor } from "@/interface/database";

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
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No tutors added yet
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Tutors;
