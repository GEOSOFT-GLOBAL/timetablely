import {
  BookOpenIcon,
  CalendarIcon,
  DatabaseIcon,
  LayoutTemplateIcon,
  UserIcon,
  GraduationCapIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HowToUse = () => {
  const sections = [
    {
      title: "Getting Started",
      icon: DatabaseIcon,
      steps: [
        "Start by setting up your database with tutors, courses, and sessions",
        "Navigate through the sidebar to access different sections",
        "Use the Dashboard to get an overview and quick access to the timetable",
      ],
    },
    {
      title: "Managing Tutors",
      icon: UserIcon,
      steps: [
        "Add tutors with their names and availability preferences",
        "Set maximum periods per day for each tutor",
        "Mark unavailable time slots to prevent scheduling conflicts",
      ],
    },
    {
      title: "Setting Up Courses",
      icon: BookOpenIcon,
      steps: [
        "Create courses and assign them to tutors",
        "Set the number of periods per week for each course",
        "Define priority levels (HIGH, MEDIUM, LOW) for scheduling",
        "Optionally set preferred time slots or avoid consecutive periods",
      ],
    },
    {
      title: "Creating Sessions (Classes)",
      icon: GraduationCapIcon,
      steps: [
        "Create class sessions and assign relevant courses to them",
        "Each session can have multiple courses",
        "Sessions help organize timetables by class groups",
      ],
    },
    {
      title: "Working with the Timetable Grid",
      icon: CalendarIcon,
      steps: [
        "The grid displays 5 days (Monday-Friday) with customizable time slots",
        "Double-click any cell to edit its content manually",
        "Click cells to select them (selected cells turn blue)",
        "Hover over time headers to access column controls",
        "Edit column duration to adjust time slots dynamically",
        "Add or delete columns using the header menu",
        "Merge multiple selected cells to create larger blocks",
      ],
    },
    {
      title: "Grid Controls",
      icon: LayoutTemplateIcon,
      steps: [
        "Set default slot duration for new columns",
        "Select multiple cells forming a rectangle and merge them",
        "Export your timetable data for external use",
        "Reset the grid to start fresh when needed",
      ],
    },
    {
      title: "Automated Timetable Generation",
      icon: CalendarIcon,
      steps: [
        "Use the Generate button to automatically create timetables",
        "The system respects tutor availability and preferences",
        "Blocked cells (breaks, lunch, etc.) are preserved",
        "High-priority courses are scheduled first",
        "Generate for all classes or select a specific session",
      ],
    },
    {
      title: "Templates",
      icon: LayoutTemplateIcon,
      steps: [
        "Save your current timetable layout as a reusable template",
        "Add a name and description for easy identification",
        "Apply saved templates to quickly set up new timetables",
        "Delete templates you no longer need",
        "Templates preserve cell contents, merged cells, and layout",
      ],
    },
    {
      title: "Special Blocks",
      icon: DatabaseIcon,
      steps: [
        "Define blocked time slots (breaks, assemblies, lunch, etc.)",
        "Blocked cells are automatically excluded from automated scheduling",
        "Common blocks: break, lunch, devotion, assembly, sports",
        "Add custom blocked texts specific to your institution",
      ],
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">How to Use Timetablely</h1>
          <p className="text-muted-foreground">
            A comprehensive guide to creating and managing your school timetables
          </p>
        </div>

        <div className="grid gap-6">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="size-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex gap-2">
                      <span className="text-primary font-semibold">•</span>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 bg-muted/50">
          <CardHeader>
            <CardTitle>Tips for Best Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                <span className="text-sm">
                  Set up your database completely before generating timetables
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                <span className="text-sm">
                  Use templates to save time when creating similar timetables
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                <span className="text-sm">
                  Mark tutor unavailability to avoid scheduling conflicts
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                <span className="text-sm">
                  Use priority levels to ensure important courses get optimal time slots
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                <span className="text-sm">
                  Manually adjust generated timetables by double-clicking cells
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowToUse;
