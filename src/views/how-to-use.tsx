import {
  BookOpenIcon,
  CalendarIcon,
  DatabaseIcon,
  LayoutTemplateIcon,
  UserIcon,
  GraduationCapIcon,
  FolderKanbanIcon,
  ClipboardListIcon,
  UsersIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppMode } from "@/hooks/use-app-mode";

const HowToUse = () => {
  const { labels, pick } = useAppMode();

  const sections = [
    {
      title: "Getting Started",
      icon: DatabaseIcon,
      steps: pick(
        [
          "Start by setting up your database with tutors, courses, and sessions",
          "Navigate through the sidebar to access different sections",
          "Use the Dashboard to get an overview and quick access to the timetable",
        ],
        [
          "Start by setting up your data with people, activities, and groups",
          "Navigate through the sidebar to access different sections",
          "Use the Dashboard to get an overview and quick access to the schedule",
        ],
        [
          "Start by adding your team members, creating tasks, and organising them into projects",
          "Navigate through the sidebar to access Members, Tasks, and Projects",
          "Use the Dashboard to get an overview of your project board",
        ]
      ),
    },
    {
      title: `Managing ${labels.tutors}`,
      icon: pick(UserIcon, UserIcon, UsersIcon),
      steps: pick(
        [
          "Add tutors with their names and availability preferences",
          "Set maximum periods per day for each tutor",
          "Mark unavailable time slots to prevent scheduling conflicts",
        ],
        [
          "Add people with their names and availability preferences",
          "Set maximum periods per day for each person",
          "Mark unavailable time slots to avoid conflicts",
        ],
        [
          "Add team members with their names and working-hours preferences",
          "Set capacity limits (maximum tasks per sprint) for each member",
          "Mark out-of-office or unavailable periods to prevent overallocation",
        ]
      ),
    },
    {
      title: `Setting Up ${labels.courses}`,
      icon: pick(BookOpenIcon, BookOpenIcon, ClipboardListIcon),
      steps: pick(
        [
          "Create courses and assign them to tutors",
          "Set the number of periods per week for each course",
          "Define priority levels (HIGH, MEDIUM, LOW) for scheduling",
          "Optionally set preferred time slots or avoid consecutive periods",
        ],
        [
          "Create activities and assign them to people",
          "Set the number of periods per week for each activity",
          "Define priority levels (HIGH, MEDIUM, LOW) for scheduling",
          "Optionally set preferred time slots or avoid consecutive periods",
        ],
        [
          "Create tasks and assign them to team members",
          "Set estimated effort (periods) required per sprint for each task",
          "Define priority levels (HIGH, MEDIUM, LOW) — high-priority tasks are scheduled first",
          "Set due dates or preferred time windows for each task",
        ]
      ),
    },
    {
      title: `Creating ${labels.sessions}`,
      icon: pick(GraduationCapIcon, GraduationCapIcon, FolderKanbanIcon),
      steps: pick(
        [
          "Create class sessions and assign relevant courses to them",
          "Each session can have multiple courses",
          "Sessions help organise timetables by class groups",
        ],
        [
          "Create groups and assign relevant activities to them",
          "Each group can have multiple activities",
          "Groups help organise schedules by team or category",
        ],
        [
          "Create projects and assign relevant tasks to them",
          "Each project can contain multiple tasks across different members",
          "Projects help organise work into deliverable milestones or sprints",
        ]
      ),
    },
    {
      title: pick("Working with the Timetable Grid", "Working with the Schedule Grid", "Working with the Project Board Grid"),
      icon: CalendarIcon,
      steps: pick(
        [
          "The grid displays 5 days (Monday–Friday) with customisable time slots",
          "Double-click any cell to edit its content manually",
          "Click cells to select them (selected cells turn blue)",
          "Hover over time headers to access column controls",
          "Edit column duration to adjust time slots dynamically",
          "Add or delete columns using the header menu",
          "Merge multiple selected cells to create larger blocks",
        ],
        [
          "The grid displays 5 days (Monday–Friday) with customisable time slots",
          "Double-click any cell to edit its content manually",
          "Click cells to select them (selected cells turn blue)",
          "Hover over time headers to access column controls",
          "Edit column duration to adjust time slots dynamically",
          "Add or delete columns using the header menu",
          "Merge multiple selected cells to create larger blocks",
        ],
        [
          "The grid displays 5 working days with customisable sprint columns",
          "Double-click any cell to manually assign a task or note",
          "Click cells to select them for bulk actions (selected cells turn blue)",
          "Hover over column headers to access sprint controls",
          "Edit sprint duration to reflect your team's cadence",
          "Add or remove sprint columns as your project evolves",
          "Merge cells to represent multi-day or blocked work items",
        ]
      ),
    },
    {
      title: "Grid Controls",
      icon: LayoutTemplateIcon,
      steps: [
        "Set default slot duration for new columns",
        "Select multiple cells forming a rectangle and merge them",
        pick("Export your timetable data for external use", "Export your schedule data for external use", "Export your project board data for external use"),
        "Reset the grid to start fresh when needed",
      ],
    },
    {
      title: pick("Automated Timetable Generation", "Automated Schedule Generation", "Automated Sprint Planning"),
      icon: CalendarIcon,
      steps: pick(
        [
          "Use the Generate button to automatically create timetables",
          "The system respects tutor availability and preferences",
          "Blocked cells (breaks, lunch, etc.) are preserved",
          "High-priority courses are scheduled first",
          "Generate for all classes or select a specific session",
        ],
        [
          "Use the Generate button to automatically create schedules",
          "The system respects people's availability and preferences",
          "Blocked cells (breaks, lunch, etc.) are preserved",
          "High-priority activities are scheduled first",
          "Generate for all groups or select a specific group",
        ],
        [
          "Use the Generate button to automatically plan your sprint board",
          "The system respects member capacity and out-of-office periods",
          "Blocked cells (standups, reviews, OOO, etc.) are preserved",
          "High-priority tasks are assigned first",
          "Generate across all projects or focus on a single project",
        ]
      ),
    },
    {
      title: "Templates",
      icon: LayoutTemplateIcon,
      steps: [
        pick(
          "Save your current timetable layout as a reusable template",
          "Save your current schedule layout as a reusable template",
          "Save your current sprint board layout as a reusable template"
        ),
        "Add a name and description for easy identification",
        pick(
          "Apply saved templates to quickly set up new timetables",
          "Apply saved templates to quickly set up new schedules",
          "Apply saved templates to quickly kick off new sprints or projects"
        ),
        "Delete templates you no longer need",
        "Templates preserve cell contents, merged cells, and layout",
      ],
    },
    {
      title: "Special Blocks",
      icon: DatabaseIcon,
      steps: pick(
        [
          "Define blocked time slots (breaks, assemblies, lunch, etc.)",
          "Blocked cells are automatically excluded from automated scheduling",
          "Common blocks: break, lunch, devotion, assembly, sports",
          "Add custom blocked texts specific to your institution",
        ],
        [
          "Define blocked time slots (breaks, lunch, personal time, etc.)",
          "Blocked cells are automatically excluded from automated scheduling",
          "Common blocks: break, lunch, rest, focus time",
          "Add custom blocked texts specific to your routine",
        ],
        [
          "Define blocked time slots (standups, planning, reviews, OOO, etc.)",
          "Blocked cells are automatically excluded from automated sprint planning",
          "Common blocks: standup, sprint planning, retrospective, OOO, public holiday",
          "Add custom blocked labels specific to your team's workflow",
        ]
      ),
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {pick("How to Use Timetablely", "How to Use Timetablely (Individual)", "How to Use Timetablely (Company)")}
          </h1>
          <p className="text-muted-foreground">
            {pick(
              "A comprehensive guide to creating and managing your school timetables",
              "A comprehensive guide to creating and managing your personal schedules",
              "A comprehensive guide to planning and managing your team's work"
            )}
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
                  {pick(
                    "Set up your database completely before generating timetables",
                    "Set up your data completely before generating schedules",
                    "Add all members and define their capacity before running sprint planning"
                  )}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                <span className="text-sm">
                  Use templates to save time when creating similar {pick("timetables", "schedules", "sprint boards")}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                <span className="text-sm">
                  {pick(
                    "Mark tutor unavailability to avoid scheduling conflicts",
                    "Mark people's unavailability to avoid scheduling conflicts",
                    "Mark member OOO and blocked periods to prevent overallocation"
                  )}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                <span className="text-sm">
                  Use priority levels to ensure important {pick("courses", "activities", "tasks")} get optimal time slots
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-semibold">•</span>
                <span className="text-sm">
                  Manually adjust generated {pick("timetables", "schedules", "sprint boards")} by double-clicking cells
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
