import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDatabaseStore } from "@/store/databaseStore";
import {
  IconUsers,
  IconBook,
  IconSchool,
  IconClock,
  IconTrendingUp,
  IconCalendar,
  IconChartBar,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { database } = useDatabaseStore();
  const navigate = useNavigate();

  // Calculate statistics
  const totalTutors = database.tutors.length;
  const totalCourses = database.courses.length;
  const totalSessions = database.sessions.length;
  const totalPeriods = database.courses.reduce(
    (sum, course) => sum + course.periodsPerWeek,
    0
  );

  // Priority breakdown
  const highPriority = database.courses.filter(
    (c) => c.priority === "HIGH"
  ).length;
  const mediumPriority = database.courses.filter(
    (c) => c.priority === "MEDIUM"
  ).length;
  const lowPriority = database.courses.filter(
    (c) => c.priority === "LOW"
  ).length;

  // Teacher workload
  const avgPeriodsPerTeacher =
    totalTutors > 0 ? (totalPeriods / totalTutors).toFixed(1) : 0;

  const stats = [
    {
      title: "Total Tutors",
      value: totalTutors,
      icon: IconUsers,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      route: "/app/tutors",
    },
    {
      title: "Total Courses",
      value: totalCourses,
      icon: IconBook,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      route: "/app/courses",
    },
    {
      title: "Total Sessions",
      value: totalSessions,
      icon: IconSchool,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      route: "/app/sessions",
    },
    {
      title: "Weekly Periods",
      value: totalPeriods,
      icon: IconClock,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      route: "/app/timetables",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 py-4 md:py-6 px-4 lg:px-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your timetable management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(stat.route)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconChartBar className="h-5 w-5" />
              Course Priority Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">High Priority</span>
                  <span className="text-sm text-muted-foreground">
                    {highPriority} courses
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{
                      width: `${
                        totalCourses > 0
                          ? (highPriority / totalCourses) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Medium Priority</span>
                  <span className="text-sm text-muted-foreground">
                    {mediumPriority} courses
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{
                      width: `${
                        totalCourses > 0
                          ? (mediumPriority / totalCourses) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Low Priority</span>
                  <span className="text-sm text-muted-foreground">
                    {lowPriority} courses
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${
                        totalCourses > 0
                          ? (lowPriority / totalCourses) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teacher Workload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconTrendingUp className="h-5 w-5" />
              Teacher Workload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Average Periods per Teacher
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {avgPeriodsPerTeacher}
                  </p>
                </div>
                <IconClock className="h-8 w-8 text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Weekly Periods
                  </p>
                  <p className="text-2xl font-bold mt-1">{totalPeriods}</p>
                </div>
                <IconCalendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => navigate("/app/timetables")}
            >
              <IconCalendar className="h-6 w-6" />
              <span>Generate Timetable</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => navigate("/app/tutors")}
            >
              <IconUsers className="h-6 w-6" />
              <span>Manage Tutors</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => navigate("/app/courses")}
            >
              <IconBook className="h-6 w-6" />
              <span>Manage Courses</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      {totalCourses === 0 && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 dark:text-blue-200">
            <p className="mb-4">
              Welcome! To get started with your timetable management:
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Add tutors (teachers) to your database</li>
              <li>Create courses (subjects) and assign teachers</li>
              <li>Set up sessions (classes) if needed</li>
              <li>Generate your timetable automatically</li>
            </ol>
            <Button className="mt-4" onClick={() => navigate("/app/tutors")}>
              Add Your First Tutor
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
