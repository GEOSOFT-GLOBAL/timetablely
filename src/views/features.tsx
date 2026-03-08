import {
  CalendarIcon,
  DatabaseIcon,
  LayoutTemplateIcon,
  UserIcon,
  BookOpenIcon,
  GraduationCapIcon,
  SettingsIcon,
  DownloadIcon,
  ShieldIcon,
  ZapIcon,
  BarChartIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      title: "Automated Timetable Generation",
      icon: ZapIcon,
      description: "Generate complete timetables automatically with intelligent scheduling algorithms that respect teacher availability, course priorities, and constraints.",
      benefits: [
        "Quick generation in seconds",
        "Optimized for minimal conflicts",
        "Respects all constraints",
      ],
    },
    {
      title: "Comprehensive Database Management",
      icon: DatabaseIcon,
      description: "Manage all your school data in one place including tutors, courses, sessions, and special blocks with an intuitive interface.",
      benefits: [
        "Centralized data storage",
        "Easy data entry and editing",
        "Data import/export capabilities",
      ],
    },
    {
      title: "Tutor Management",
      icon: UserIcon,
      description: "Add and manage teachers with detailed information including availability preferences, maximum periods per day, and unavailable time slots.",
      benefits: [
        "Complete tutor profiles",
        "Availability tracking",
        "Workload management",
      ],
    },
    {
      title: "Course Configuration",
      icon: BookOpenIcon,
      description: "Set up courses with custom parameters including periods per week, priority levels, and scheduling preferences.",
      benefits: [
        "Priority-based scheduling",
        "Flexible course settings",
        "Conflict prevention rules",
      ],
    },
    {
      title: "Session (Class) Management",
      icon: GraduationCapIcon,
      description: "Organize timetables by class groups with customizable sessions that can contain multiple courses.",
      benefits: [
        "Class-based organization",
        "Session-specific scheduling",
        "Easy session duplication",
      ],
    },
    {
      title: "Visual Timetable Grid",
      icon: CalendarIcon,
      description: "Interactive timetable grid with support for manual editing, cell merging, and dynamic time slot adjustments.",
      benefits: [
        "Visual timetable editing",
        "Drag-and-drop operations",
        "Merge and split cells",
      ],
    },
    {
      title: "Timetable Templates",
      icon: LayoutTemplateIcon,
      description: "Create and reuse timetable templates to save time when setting up similar schedules for different classes or terms.",
      benefits: [
        "Save and manage templates",
        "One-click template application",
        "Template versioning",
      ],
    },
    {
      title: "Blocked Time Management",
      icon: ShieldIcon,
      description: "Define blocked time slots for breaks, assemblies, lunch, and other non-teaching periods that are automatically excluded from scheduling.",
      benefits: [
        "Custom block types",
        "Recurring block patterns",
        "Conflict prevention",
      ],
    },
    {
      title: "PDF Export",
      icon: DownloadIcon,
      description: "Export your timetables as high-quality PDF documents ready for printing or digital distribution.",
      benefits: [
        "Professional PDF output",
        "Customizable headers/footers",
        "Batch export capabilities",
      ],
    },
    {
      title: "Analytics & Insights",
      icon: BarChartIcon,
      description: "Get detailed statistics and insights about your timetable including teacher workload, course distribution, and scheduling efficiency.",
      benefits: [
        "Real-time analytics",
        "Workload balancing reports",
        "Scheduling optimization suggestions",
      ],
    },
    {
      title: "Offline Support",
      icon: DatabaseIcon,
      description: "Continue working even without an internet connection with our comprehensive offline support and synchronization.",
      benefits: [
        "Full offline functionality",
        "Automatic data sync",
        "Conflict resolution",
      ],
    },
    {
      title: "Customization Options",
      icon: SettingsIcon,
      description: "Customize every aspect of your timetable including colors, fonts, time formats, and display preferences.",
      benefits: [
        "Full theme customization",
        "Custom time formats",
        "Dark mode support",
      ],
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Timetablely Features</h1>
          <p className="text-muted-foreground">
            Powerful tools for creating, managing, and optimizing your school timetables
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-3">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <span className="text-primary font-semibold">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ZapIcon className="size-5" />
              Why Choose Timetablely?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-card rounded-lg">
                <h3 className="font-semibold mb-2">Save Time</h3>
                <p className="text-sm text-muted-foreground">
                  Automate timetable creation and management processes
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg">
                <h3 className="font-semibold mb-2">Reduce Conflicts</h3>
                <p className="text-sm text-muted-foreground">
                  Intelligent scheduling prevents double bookings and conflicts
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg">
                <h3 className="font-semibold mb-2">Improve Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  Optimized timetables maximize teacher and classroom utilization
                </p>
              </div>
              <div className="p-4 bg-card rounded-lg">
                <h3 className="font-semibold mb-2">Easy Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Share timetables and collaborate with your team
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Features