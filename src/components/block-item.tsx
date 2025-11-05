import * as React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { BanIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

interface BlockItemProps {
  text: string;
  type: "slot" | "text";
  onRemove: (text: string) => void;
}

const BlockItem: React.FC<BlockItemProps> = ({ text, type, onRemove }) => {
  return (
    <Item variant="outline" className="my-2">
      <ItemMedia>
        <BanIcon className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          {type === "slot" ? `Blocked Slot: ${text}` : `Blocked Text: ${text}`}
        </ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="sm" onClick={() => onRemove(text)}>
          <Trash2Icon className="size-4" />
        </Button>
      </ItemActions>
    </Item>
  );
};

export default BlockItem;
