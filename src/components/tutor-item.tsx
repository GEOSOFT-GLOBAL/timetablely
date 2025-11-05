import * as React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { UserIcon, Trash2Icon, PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import type { ITutor } from "@/interface/database";

interface TutorItemProps {
  tutor: ITutor;
  onRemove: (tutorId: string) => void;
  onEdit: (tutor: ITutor) => void;
}

const TutorItem: React.FC<TutorItemProps> = ({ tutor, onRemove, onEdit }) => {
  return (
    <Item variant="outline" className="my-2">
      <ItemMedia>
        <UserIcon className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{tutor.name}</ItemTitle>
        <ItemDescription>
          Max periods: {tutor.maxPeriodsPerDay || 3} | Subjects:{" "}
          {tutor.subjects.length > 0 ? tutor.subjects.join(", ") : "None"}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="sm" onClick={() => onEdit(tutor)}>
          <PencilIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onRemove(tutor.id)}>
          <Trash2Icon className="size-4" />
        </Button>
      </ItemActions>
    </Item>
  );
};

export default TutorItem;
