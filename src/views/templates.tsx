import * as React from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/section-header";
import TemplateItem from "@/components/template-item";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDatabaseStore } from "@/store/databaseStore";
import type { ITimetableTemplate } from "@/interface/database";
import { CalendarIcon } from "lucide-react";

interface TemplatesProps {
  propName?: string;
}

const Templates: React.FC<TemplatesProps> = () => {
  const { t } = useTranslation();
  const { database, setDatabase } = useDatabaseStore();
  const [newTemplate, setNewTemplate] = React.useState<
    Partial<ITimetableTemplate>
  >({
    name: "",
    description: "",
    columnCount: 5,
    defaultSlotDuration: 60,
    entries: [],
    columnDurations: {},
  });
  const [editingTemplate, setEditingTemplate] =
    React.useState<ITimetableTemplate | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = React.useState(false);

  const addTemplate = () => {
    if (!newTemplate.name?.trim()) return;

    const template: ITimetableTemplate = {
      id: `template-${Date.now()}`,
      name: newTemplate.name.trim(),
      description: newTemplate.description || "",
      createdAt: new Date().toISOString(),
      columnCount: newTemplate.columnCount || 5,
      defaultSlotDuration: newTemplate.defaultSlotDuration || 60,
      entries: newTemplate.entries || [],
      hiddenCellsArray: newTemplate.hiddenCellsArray || [],
      mergedCellsData: newTemplate.mergedCellsData || {},
      columnDurations: newTemplate.columnDurations || {},
    };

    setDatabase({
      ...database,
      templates: [...(database.templates || []), template],
    });

    setNewTemplate({
      name: "",
      description: "",
      columnCount: 5,
      defaultSlotDuration: 60,
      entries: [],
      columnDurations: {},
    });
  };

  const removeTemplate = (templateId: string) => {
    setDatabase({
      ...database,
      templates: (database.templates || []).filter((t) => t.id !== templateId),
    });
  };

  const handleEditTemplate = (template: ITimetableTemplate) => {
    setEditingTemplate(template);
    setIsEditSheetOpen(true);
  };

  const updateTemplate = () => {
    if (!editingTemplate?.name?.trim()) return;

    setDatabase({
      ...database,
      templates: (database.templates || []).map((t) =>
        t.id === editingTemplate.id ? editingTemplate : t
      ),
    });

    setIsEditSheetOpen(false);
    setEditingTemplate(null);
  };

  return (
    <div className="flex flex-col w-full md:py-6 py-4 gap-4 px-4 lg:px-6">
      <div className="gap-4 h-full w-full">
        <SectionHeader />
      </div>
      <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 md:gap-6">
        <Card className="">
          <div className="p-4 flex flex-col gap-4">
            <Label htmlFor="templateName">{t('templates.templateName')}</Label>
            <Input
              id="templateName"
              value={newTemplate.name || ""}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, name: e.target.value })
              }
              placeholder={t('templates.namePlaceholder')}
            />

            <Label htmlFor="description">{t('common.description')}</Label>
            <Textarea
              id="description"
              value={newTemplate.description || ""}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, description: e.target.value })
              }
              placeholder={t('templates.descPlaceholder')}
              rows={3}
            />

            <Label htmlFor="columnCount">{t('templates.columnCount')}</Label>
            <Input
              id="columnCount"
              type="number"
              min="1"
              value={newTemplate.columnCount || 5}
              onChange={(e) =>
                setNewTemplate({
                  ...newTemplate,
                  columnCount: parseInt(e.target.value) || 5,
                })
              }
            />

            <Label htmlFor="slotDuration">{t('templates.slotDuration')}</Label>
            <Input
              id="slotDuration"
              type="number"
              min="1"
              value={newTemplate.defaultSlotDuration || 60}
              onChange={(e) =>
                setNewTemplate({
                  ...newTemplate,
                  defaultSlotDuration: parseInt(e.target.value) || 60,
                })
              }
            />
          </div>
          <CardFooter className="gap-4">
            <Button variant="outline" onClick={addTemplate}>
              {t('common.save')}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setNewTemplate({
                  name: "",
                  description: "",
                  columnCount: 5,
                  defaultSlotDuration: 60,
                  entries: [],
                  columnDurations: {},
                })
              }
            >
              {t('common.cancel')}
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full h-[calc(100vh-220px)] flex flex-col px-4 overflow-y-auto">
          {(database.templates || []).map((template) => (
            <TemplateItem
              key={template.id}
              template={template}
              onRemove={removeTemplate}
              onEdit={handleEditTemplate}
            />
          ))}
          {(!database.templates || database.templates.length === 0) && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {t('templates.noTemplatesYet')}
            </div>
          )}
        </Card>
      </div>

      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{t('templates.editTitle')}</SheetTitle>
            <SheetDescription>
              {t('templates.editDesc')}
            </SheetDescription>
          </SheetHeader>

          {editingTemplate && (
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-templateName">{t('templates.templateName')}</Label>
                <Input
                  id="edit-templateName"
                  value={editingTemplate.name}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      name: e.target.value,
                    })
                  }
                  placeholder={t('templates.namePlaceholder')}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-description">{t('common.description')}</Label>
                <Textarea
                  id="edit-description"
                  value={editingTemplate.description || ""}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      description: e.target.value,
                    })
                  }
                  placeholder={t('templates.descPlaceholder')}
                  rows={3}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-columnCount">{t('templates.columnCount')}</Label>
                <Input
                  id="edit-columnCount"
                  type="number"
                  min="1"
                  value={editingTemplate.columnCount}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      columnCount: parseInt(e.target.value) || 5,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-slotDuration">
                  {t('templates.slotDuration')}
                </Label>
                <Input
                  id="edit-slotDuration"
                  type="number"
                  min="1"
                  value={editingTemplate.defaultSlotDuration}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      defaultSlotDuration: parseInt(e.target.value) || 60,
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="size-4" />
                <span>
                  {t('templates.created')}{" "}
                  {editingTemplate.createdAt
                    ? new Date(editingTemplate.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          )}

          <SheetFooter>
            <Button variant="outline" onClick={updateTemplate}>
              {t('common.saveChanges')}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Templates;
