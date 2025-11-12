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
import type { DatabaseManagerProps } from "@/interface/props";

const DatabaseManager: React.FC<DatabaseManagerProps> = ({
  database,
  onGenerateTimetable,
  onLoadSampleData,
}) => {
  const navigate = useNavigate();
  const { database: storeDatabase } = useDatabaseStore();

  // Use prop database if provided, otherwise use store database
  const activeDatabase = database || storeDatabase;

  const stats = [
    {
      title: "Tutors",
      count: activeDatabase.tutors.length,
      icon: UserIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      route: "/tutors",
    },
    {
      title: "Courses",
      count: activeDatabase.courses.length,
      icon: BookOpenIcon,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      route: "/courses",
    },
    {
      title: "Classes",
      count: activeDatabase.sessions.length,
      icon: GraduationCapIcon,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      route: "/sessions",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DatabaseIcon className="size-5" />
          <h2 className="text-lg font-semibold">Database Overview</h2>
        </div>
        {onLoadSampleData && (
          <Button variant="outline" size="sm" onClick={onLoadSampleData}>
            Load Sample Data
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="flex items-center justify-start flex-1 gap-4">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`size-4 ${stat.color}`} />
                  </div>
                  <CardTitle className="text-md font-medium">
                    {stat.title}
                  </CardTitle>
                  <div>
                    <div className="text-2xl font-bold">{stat.count}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(stat.route)}
                  className="gap-1"
                >
                  <PlusIcon className="size-4" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {onGenerateTimetable && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Generate Timetable</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Create timetables based on your database
                </p>
              </div>
              <Button onClick={onGenerateTimetable}>Generate</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DatabaseManager;
