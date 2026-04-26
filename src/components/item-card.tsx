import * as React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpenIcon, Trash2Icon, PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import type { ICourse } from "@/interface/database";
import { PRIORITY } from "@/interface/enums";

interface CourseItemProps {
  course: ICourse;
  tutorName?: string;
  onRemove: (courseId: string) => void;
  onEdit: (course: ICourse) => void;
  isCompany?: boolean;
}

const getInitials = (name?: string) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getPriorityVariant = (priority: PRIORITY): "default" | "destructive" | "outline" | "secondary" => {
  switch (priority) {
    case PRIORITY.HIGH:
      return "destructive";
    case PRIORITY.MEDIUM:
      return "secondary";
    case PRIORITY.LOW:
      return "outline";
    default:
      return "default";
  }
};

const CourseItem: React.FC<CourseItemProps> = ({
  course,
  tutorName,
  onRemove,
  onEdit,
  isCompany = false,
}) => {
  // Company mode: card variant
  if (isCompany) {
    return (
      <Card className="flex flex-col gap-3 p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between">
          <span className="font-medium text-sm line-clamp-2">{course.name}</span>
          <Badge variant={getPriorityVariant(course.priority)} className="ml-2 whitespace-nowrap">
            {course.priority}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Avatar className="size-5">
            <AvatarFallback>{getInitials(tutorName)}</AvatarFallback>
          </Avatar>
          <span className="truncate">{tutorName ?? "Unassigned"}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Effort: {course.periodsPerWeek} period{course.periodsPerWeek !== 1 ? "s" : ""}/week
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(course)}>
            <PencilIcon className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onRemove(course.id)}>
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      </Card>
    );
  }

  // Default mode: list variant
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
