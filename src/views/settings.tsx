import * as React from "react";
import { useTheme } from "@/components/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { IconMoon, IconSun, IconDeviceDesktop } from "@tabler/icons-react";
import { useStorageString, useStorageBoolean } from "@/hooks/storage";

const FONT_OPTIONS = [
  { value: "default", label: "System Default" },
  // Body & UI Fonts
  { value: "Montserrat", label: "Montserrat (Default)" },
  { value: "Nunito Sans", label: "Nunito Sans" },
  { value: "Titillium Web", label: "Titillium Web" },
  { value: "Mozilla Text", label: "Mozilla Text" },
  { value: "Oswald", label: "Oswald" },
  // Display & Headings
  { value: "Audiowide", label: "Audiowide" },
  { value: "Orbitron", label: "Orbitron" },
  { value: "Michroma", label: "Michroma" },
  { value: "Syncopate", label: "Syncopate" },
  { value: "Tektur", label: "Tektur" },
  { value: "Goldman", label: "Goldman" },
  { value: "Zen Tokyo Zoo", label: "Zen Tokyo Zoo" },
  // Monospace
  { value: "Fira Code", label: "Fira Code (Code)" },
  // Decorative
  { value: "CalSans", label: "CalSans" },
  { value: "Rubik Distressed", label: "Rubik Distressed" },
  { value: "Rubik Moonrocks", label: "Rubik Moonrocks" },
  { value: "Special Gothic Expanded One", label: "Special Gothic" },
  { value: "Winky Rough", label: "Winky Rough" },
  { value: "Tagesschrift", label: "Tagesschrift" },
  // Script & Calligraphy
  { value: "Snell BT", label: "Snell BT (Script)" },
  { value: "Desirable Calligraphy", label: "Desirable Calligraphy" },
];

const FONT_SIZE_OPTIONS = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
];

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { value: font, set: setFont } = useStorageString("app-font", "default");
  const { value: fontSize, set: setFontSize } = useStorageString(
    "app-font-size",
    "medium"
  );
  const { value: language, set: setLanguage } = useStorageString(
    "app-language",
    "en"
  );
  const { value: compactMode, set: setCompactMode } = useStorageBoolean(
    "app-compact-mode",
    false
  );
  const { value: animations, set: setAnimations } = useStorageBoolean(
    "app-animations",
    true
  );
  const { value: highContrast, set: setHighContrast } = useStorageBoolean(
    "app-high-contrast",
    false
  );

  // Apply settings on mount and when values change
  React.useEffect(() => {
    if (font) {
      if (font === "default") {
        document.documentElement.style.fontFamily = "";
      } else {
        document.documentElement.style.fontFamily = `"${font}", sans-serif`;
      }
    }
  }, [font]);

  React.useEffect(() => {
    if (fontSize) {
      const sizes = { small: "14px", medium: "16px", large: "18px" };
      document.documentElement.style.fontSize =
        sizes[fontSize as keyof typeof sizes];
    }
  }, [fontSize]);

  React.useEffect(() => {
    if (animations !== null) {
      if (!animations) {
        document.documentElement.classList.add("reduce-motion");
      } else {
        document.documentElement.classList.remove("reduce-motion");
      }
    }
  }, [animations]);

  React.useEffect(() => {
    if (highContrast !== null) {
      if (highContrast) {
        document.documentElement.classList.add("high-contrast");
      } else {
        document.documentElement.classList.remove("high-contrast");
      }
    }
  }, [highContrast]);

  return (
    <div className="flex flex-1 flex-col md:py-6 py-4 gap-4 px-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground text-sm">
            Manage your application preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Select your preferred color mode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Color Mode</Label>
                <div className="flex gap-2">
                  <Toggle
                    pressed={theme === "light"}
                    onPressedChange={() => setTheme("light")}
                    aria-label="Light theme"
                    className="flex-1"
                  >
                    <IconSun className="mr-2 size-4" />
                    Light
                  </Toggle>
                  <Toggle
                    pressed={theme === "dark"}
                    onPressedChange={() => setTheme("dark")}
                    aria-label="Dark theme"
                    className="flex-1"
                  >
                    <IconMoon className="mr-2 size-4" />
                    Dark
                  </Toggle>
                  <Toggle
                    pressed={theme === "system"}
                    onPressedChange={() => setTheme("system")}
                    aria-label="System theme"
                    className="flex-1"
                  >
                    <IconDeviceDesktop className="mr-2 size-4" />
                    System
                  </Toggle>
                </div>
                <p className="text-muted-foreground text-xs">
                  Choose how the app looks. System will match your device
                  settings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>
                Customize font settings for the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="font-select">Font Family</Label>
                <Select value={font ?? "default"} onValueChange={setFont}>
                  <SelectTrigger id="font-select">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="font-size-select">Font Size</Label>
                <Select
                  value={fontSize ?? "medium"}
                  onValueChange={setFontSize}
                >
                  <SelectTrigger id="font-size-select">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_SIZE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display</CardTitle>
              <CardDescription>
                Adjust display and layout preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact Mode</Label>
                  <p className="text-muted-foreground text-xs">
                    Reduce spacing for a denser layout
                  </p>
                </div>
                <Toggle
                  pressed={compactMode ?? false}
                  onPressedChange={setCompactMode}
                  aria-label="Toggle compact mode"
                >
                  {compactMode ? "On" : "Off"}
                </Toggle>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>
                Set your preferred language and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language-select">Language</Label>
                <Select value={language ?? "en"} onValueChange={setLanguage}>
                  <SelectTrigger id="language-select">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-muted-foreground text-xs">
                  Select your preferred language for the interface
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>
                Configure accessibility features for better usability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>High Contrast</Label>
                  <p className="text-muted-foreground text-xs">
                    Increase contrast for better visibility
                  </p>
                </div>
                <Toggle
                  pressed={highContrast ?? false}
                  onPressedChange={setHighContrast}
                  aria-label="Toggle high contrast"
                >
                  {highContrast ? "On" : "Off"}
                </Toggle>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animations</Label>
                  <p className="text-muted-foreground text-xs">
                    Enable smooth transitions and animations
                  </p>
                </div>
                <Toggle
                  pressed={animations ?? true}
                  onPressedChange={setAnimations}
                  aria-label="Toggle animations"
                >
                  {animations ? "On" : "Off"}
                </Toggle>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
