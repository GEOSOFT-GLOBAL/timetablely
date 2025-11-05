import * as React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { GraduationCapIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import type { ISession } from "@/interface/database";

interface SessionItemProps {
  session: ISession;
  courseNames: string[];
  onRemove: (sessionId: string) => void;
}

const SessionItem: React.FC<SessionItemProps> = ({
  session,
  courseNames,
  onRemove,
}) => {
  return (
    <Item variant="outline" className="my-2">
      <ItemMedia>
        <GraduationCapIcon className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{session.name}</ItemTitle>
        <ItemDescription>
          Courses: {courseNames.length > 0 ? courseNames.join(", ") : "None"}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="sm" onClick={() => onRemove(session.id)}>
          <Trash2Icon className="size-4" />
        </Button>
      </ItemActions>
    </Item>
  );
};

export default SessionItem;
