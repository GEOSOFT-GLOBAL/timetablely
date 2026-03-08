import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  DatabaseIcon,
  DownloadIcon,
  HeartIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      title: "Efficiency",
      description: "Save time and effort with automated timetable generation",
      icon: TargetIcon,
    },
    {
      title: "Innovation",
      description: "Leverage advanced algorithms for optimal scheduling",
      icon: DatabaseIcon,
    },
    {
      title: "Accessibility",
      description: "Use anywhere with offline support and responsive design",
      icon: UsersIcon,
    },
    {
      title: "Reliability",
      description: "Robust system designed for schools of all sizes",
      icon: CheckCircleIcon,
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Project Inception",
      description: "Timetablely was born out of a need for efficient timetable management in schools.",
    },
    {
      year: "2024",
      title: "First Release",
      description: "Launch of the initial version with core timetable generation features.",
    },
    {
      year: "2025",
      title: "Major Update",
      description: "Introduction of AI-powered scheduling and advanced analytics.",
    },
    {
      year: "2026",
      title: "Global Expansion",
      description: "Timetablely now serves schools in over 50 countries worldwide.",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6 py-6">
      {/* Hero Section */}
      <div className="px-4 lg:px-6 py-8 bg-linear-to-r from-primary/5 to-secondary/5 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <CalendarIcon className="size-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">About Timetablely</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Revolutionizing school timetable management with intelligent automation
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Timetablely is a comprehensive timetable management system designed to
            simplify the complex process of creating and maintaining school timetables.
            Our mission is to save educators time and effort by providing an intuitive
            platform with powerful automation capabilities.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="size-5" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To empower educational institutions with intelligent timetable
                management solutions that save time, reduce stress, and improve
                efficiency. We believe that efficient scheduling allows educators to
                focus on what truly matters - teaching and learning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartIcon className="size-5" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the leading timetable management solution for educational
                institutions worldwide, recognized for our innovative approach,
                reliability, and commitment to customer success. We envision a future
                where timetable creation is effortless and optimized.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Values */}
      <div className="px-4 lg:px-6">
        <h2 className="text-2xl font-bold mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-3">
                  <value.icon className="size-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="px-4 lg:px-6">
        <h2 className="text-2xl font-bold mb-6">Our Journey</h2>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="px-4 lg:px-6">
        <h2 className="text-2xl font-bold mb-6">What Makes Timetablely Special</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClockIcon className="size-5" />
                Automated Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Generate complete timetables in seconds with intelligent algorithms
                that respect all constraints and preferences.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DatabaseIcon className="size-5" />
                Comprehensive Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Manage all your school data in one place with an intuitive interface
                for tutors, courses, sessions, and blocks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DownloadIcon className="size-5" />
                PDF Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Export professional-quality PDF documents ready for printing or digital
                distribution.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-4 lg:px-6 py-8 bg-muted/50 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us on Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            We're constantly working to improve Timetablely and expand our features.
            If you have feedback, suggestions, or would like to get involved, we'd
            love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@timetablely.com" className="text-primary hover:underline">
              support@timetablely.com
            </a>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">+1 (555) 123-4567</span>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            © 2026 Timetablely. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About