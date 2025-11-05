import * as React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { LayoutGridIcon, Trash2Icon, PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import type { ITimetableTemplate } from "@/interface/database";

interface TemplateItemProps {
  template: ITimetableTemplate;
  onRemove: (templateId: string) => void;
  onEdit: (template: ITimetableTemplate) => void;
}

const TemplateItem: React.FC<TemplateItemProps> = ({
  template,
  onRemove,
  onEdit,
}) => {
  const formattedDate = template.createdAt
    ? new Date(template.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <Item variant="outline" className="my-2">
      <ItemMedia>
        <LayoutGridIcon className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{template.name}</ItemTitle>
        <ItemDescription>
          Columns: {template.columnCount} | Entries: {template.entries.length} |
          Created: {formattedDate}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="sm" onClick={() => onEdit(template)}>
          <PencilIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onRemove(template.id)}>
          <Trash2Icon className="size-4" />
        </Button>
      </ItemActions>
    </Item>
  );
};

export default TemplateItem;
