import * as React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { BookOpenIcon, Trash2Icon, PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import type { ICourse } from "@/interface/database";

interface CourseItemProps {
  course: ICourse;
  tutorName?: string;
  onRemove: (courseId: string) => void;
  onEdit: (course: ICourse) => void;
}

const CourseItem: React.FC<CourseItemProps> = ({
  course,
  tutorName,
  onRemove,
  onEdit,
}) => {
  return (
    <Item variant="outline" className="my-2">
      <ItemMedia>
        <BookOpenIcon className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{course.name}</ItemTitle>
        <ItemDescription>
          Tutor: {tutorName || "Unassigned"} | Periods/Week:{" "}
          {course.periodsPerWeek} | Priority: {course.priority}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="sm" onClick={() => onEdit(course)}>
          <PencilIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onRemove(course.id)}>
          <Trash2Icon className="size-4" />
        </Button>
      </ItemActions>
    </Item>
  );
};

export default CourseItem;
