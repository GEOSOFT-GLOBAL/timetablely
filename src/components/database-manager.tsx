import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDatabaseStore } from "@/store/databaseStore";
import {
  UserIcon,
  BookOpenIcon,
  GraduationCapIcon,
  PlusIcon,
  DatabaseIcon,
} from "lucide-react";
import { IconSparkles } from "@tabler/icons-react";
import { useAppMode } from "@/hooks/use-app-mode";
import type { DatabaseManagerProps } from "@/interface/props";

const DatabaseManager: React.FC<DatabaseManagerProps> = ({
  database,
  onGenerateTimetable,
  onGenerateAITimetable,
  onLoadSampleData,
}) => {
  const navigate = useNavigate();
  const { database: storeDatabase } = useDatabaseStore();

  // Use prop database if provided, otherwise use store database
  const activeDatabase = database || storeDatabase;

  const { labels, icons } = useAppMode();

  const stats = [
    {
      title: labels.tutors,
      count: activeDatabase.tutors.length,
      icon: icons.tutorsLucide,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      route: "/app/tutors",
    },
    {
      title: labels.courses,
      count: activeDatabase.courses.length,
      icon: icons.coursesLucide,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      route: "/app/courses",
    },
    {
      title: labels.sessions,
      count: activeDatabase.sessions.length,
      icon: icons.sessionsLucide,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      route: "/app/sessions",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <DatabaseIcon className="size-5" />
          <h2 className="text-lg font-semibold">Database Overview</h2>
        </div>
        {onLoadSampleData && (
          <Button variant="outline" size="sm" onClick={onLoadSampleData} className="w-full sm:w-auto">
            Load Sample Data
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
                <div className="flex items-center justify-start flex-1 gap-3 sm:gap-4">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`size-4 ${stat.color}`} />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <CardTitle className="text-sm sm:text-md font-medium">
                      {stat.title}
                    </CardTitle>
                    <div className="text-xl sm:text-2xl font-bold">{stat.count}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(stat.route)}
                  className="gap-1 w-full sm:w-auto"
                >
                  <PlusIcon className="size-4" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(onGenerateTimetable || onGenerateAITimetable) && (
        <Card>
          <CardContent className="pt-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Generate Timetable</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Create timetables based on your database
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {onGenerateTimetable && (
                  <Button variant="outline" onClick={onGenerateTimetable} className="w-full sm:w-auto">
                    Generate
                  </Button>
                )}
                {onGenerateAITimetable && (
                  <Button onClick={onGenerateAITimetable} className="gap-2 w-full sm:w-auto">
                    <IconSparkles className="h-4 w-4" />
                    AI Generate
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DatabaseManager;
