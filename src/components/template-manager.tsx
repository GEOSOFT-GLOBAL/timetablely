import * as React from "react";
import { Button } from "@/components/ui/button";
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
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  saveAsTemplate,
  saveTemplateToDatabase,
  applyTemplate,
  getTemplates,
} from "@/lib/template";
import { useDatabaseStore } from "@/store/databaseStore";
import type { TemplateManagerProps } from "@/interface/props";
import { SaveIcon, LayoutTemplateIcon, Trash2Icon } from "lucide-react";

const TemplateManager: React.FC<TemplateManagerProps> = ({
  columnCount,
  hiddenCells,
  database: propDatabase,
  defaultSlotDuration,
  mergedCells,
  cellContents,
  columnDurations,
  onDatabaseUpdate,
  onApplyTemplate,
}) => {
  const { database: storeDatabase, setDatabase } = useDatabaseStore();
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  const [templateName, setTemplateName] = React.useState("");
  const [templateDescription, setTemplateDescription] = React.useState("");
  const [selectedTemplateId, setSelectedTemplateId] = React.useState("");

  // Use prop database if provided, otherwise use store database
  const database = propDatabase || storeDatabase;
  const templates = getTemplates(database);

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      alert("Please enter a template name");
      return;
    }

    const template = saveAsTemplate(
      templateName,
      cellContents,
      mergedCells,
      hiddenCells,
      columnCount,
      columnDurations,
      defaultSlotDuration
    );

    // Add description if provided
    if (templateDescription) {
      template.description = templateDescription;
    }

    template.createdAt = new Date().toISOString();

    const updatedDatabase = saveTemplateToDatabase(template, database);
    
    // Update database through prop callback or store
    if (onDatabaseUpdate) {
      onDatabaseUpdate(updatedDatabase);
    } else {
      setDatabase(updatedDatabase);
    }

    setShowSaveModal(false);
    setTemplateName("");
    setTemplateDescription("");
  };

  const handleApplyTemplate = () => {
    if (!selectedTemplateId) {
      alert("Please select a template");
      return;
    }

    const template = templates.find((t) => t.id === selectedTemplateId);
    if (!template) {
      alert("Template not found");
      return;
    }

    const appliedTemplate = applyTemplate(template);
    onApplyTemplate(appliedTemplate);
    setSelectedTemplateId("");
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (!confirm("Are you sure you want to delete this template?")) {
      return;
    }

    const updatedDatabase = {
      ...database,
      templates: (database.templates || []).filter((t) => t.id !== templateId),
    };
    
    // Update database through prop callback or store
    if (onDatabaseUpdate) {
      onDatabaseUpdate(updatedDatabase);
    } else {
      setDatabase(updatedDatabase);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutTemplateIcon className="size-5" />
          Template Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Save Template Section */}
        <div className="space-y-2">
          <Label>Save Current Layout</Label>
          <Sheet open={showSaveModal} onOpenChange={setShowSaveModal}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <SaveIcon className="size-4" />
                Save as Template
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Save Template</SheetTitle>
                <SheetDescription>
                  Save the current timetable layout as a reusable template.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="templateName">Template Name</Label>
                  <Input
                    id="templateName"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="e.g., Weekly Schedule"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="templateDescription">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="templateDescription"
                    value={templateDescription}
                    onChange={(e) => setTemplateDescription(e.target.value)}
                    placeholder="Describe this template..."
                    rows={3}
                  />
                </div>
              </div>
              <SheetFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowSaveModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveTemplate}>Save Template</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Apply Template Section */}
        <div className="space-y-2">
          <Label>Apply Saved Template</Label>
          <div className="flex gap-2">
            <Select
              value={selectedTemplateId}
              onValueChange={setSelectedTemplateId}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.length === 0 ? (
                  <SelectItem value="no-templates" disabled>
                    No templates available
                  </SelectItem>
                ) : (
                  templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button
              onClick={handleApplyTemplate}
              disabled={!selectedTemplateId}
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Template List */}
        {templates.length > 0 && (
          <div className="space-y-2">
            <Label>Saved Templates ({templates.length})</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{template.name}</p>
                    {template.description && (
                      <p className="text-xs text-muted-foreground">
                        {template.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {template.columnCount} columns • {template.entries.length}{" "}
                      entries
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TemplateManager;
