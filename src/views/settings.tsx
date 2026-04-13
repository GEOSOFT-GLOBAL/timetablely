import * as React from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/i18n";
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
import { IconMoon, IconSun, IconDeviceDesktop, IconUser, IconActivity, IconLayoutKanban } from "@tabler/icons-react";
import { useStorageString, useStorageBoolean } from "@/hooks/storage";
import { useAppMode, type AppMode } from "@/hooks/use-app-mode";

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
  const { t } = useTranslation();
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
  const { mode: appMode, setMode: setAppMode } = useAppMode();

  const changeMode = (newMode: AppMode) => {
    if (newMode === appMode) return;
    setAppMode(newMode);
  };

  const changeLanguage = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    window.location.reload();
  };

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
          <h1 className="text-2xl font-semibold">{t('settings.title')}</h1>
          <p className="text-muted-foreground text-sm">
            {t('settings.subtitle')}
          </p>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList>
          <TabsTrigger value="appearance">{t('settings.tabs.appearance')}</TabsTrigger>
          <TabsTrigger value="general">{t('settings.tabs.general')}</TabsTrigger>
          <TabsTrigger value="accessibility">{t('settings.tabs.accessibility')}</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.theme.title')}</CardTitle>
              <CardDescription>
                {t('settings.theme.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t('settings.theme.colorMode')}</Label>
                <div className="flex gap-2">
                  <Toggle
                    pressed={theme === "light"}
                    onPressedChange={() => setTheme("light")}
                    aria-label="Light theme"
                    className="flex-1"
                  >
                    <IconSun className="mr-2 size-4" />
                    {t('settings.theme.light')}
                  </Toggle>
                  <Toggle
                    pressed={theme === "dark"}
                    onPressedChange={() => setTheme("dark")}
                    aria-label="Dark theme"
                    className="flex-1"
                  >
                    <IconMoon className="mr-2 size-4" />
                    {t('settings.theme.dark')}
                  </Toggle>
                  <Toggle
                    pressed={theme === "system"}
                    onPressedChange={() => setTheme("system")}
                    aria-label="System theme"
                    className="flex-1"
                  >
                    <IconDeviceDesktop className="mr-2 size-4" />
                    {t('settings.theme.system')}
                  </Toggle>
                </div>
                <p className="text-muted-foreground text-xs">
                  {t('settings.theme.hint')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('settings.typography.title')}</CardTitle>
              <CardDescription>
                {t('settings.typography.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="font-select">{t('settings.typography.fontFamily')}</Label>
                <Select value={font ?? "default"} onValueChange={setFont}>
                  <SelectTrigger id="font-select">
                    <SelectValue placeholder={t('settings.typography.selectFont')} />
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
                <Label htmlFor="font-size-select">{t('settings.typography.fontSize')}</Label>
                <Select
                  value={fontSize ?? "medium"}
                  onValueChange={setFontSize}
                >
                  <SelectTrigger id="font-size-select">
                    <SelectValue placeholder={t('settings.typography.selectSize')} />
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
              <CardTitle>{t('settings.display.title')}</CardTitle>
              <CardDescription>
                {t('settings.display.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('settings.display.compactMode')}</Label>
                  <p className="text-muted-foreground text-xs">
                    {t('settings.display.compactHint')}
                  </p>
                </div>
                <Toggle
                  pressed={compactMode ?? false}
                  onPressedChange={setCompactMode}
                  aria-label="Toggle compact mode"
                >
                  {compactMode ? t('settings.display.on') : t('settings.display.off')}
                </Toggle>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.appMode.title')}</CardTitle>
              <CardDescription>
                {t('settings.appMode.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t('settings.appMode.label')}</Label>
                <div className="flex gap-2">
                  <Toggle
                    pressed={appMode === "education"}
                    onPressedChange={() => changeMode("education")}
                    aria-label="Education mode"
                    className="flex-1"
                  >
                    <IconUser className="mr-2 size-4" />
                    {t('settings.appMode.education')}
                  </Toggle>
                  <Toggle
                    pressed={appMode === "individual"}
                    onPressedChange={() => changeMode("individual")}
                    aria-label="Individual mode"
                    className="flex-1"
                  >
                    <IconActivity className="mr-2 size-4" />
                    {t('settings.appMode.individual')}
                  </Toggle>
                  <Toggle
                    pressed={appMode === "company"}
                    onPressedChange={() => changeMode("company")}
                    aria-label="Company mode"
                    className="flex-1"
                  >
                    <IconLayoutKanban className="mr-2 size-4" />
                    {t('settings.appMode.company')}
                  </Toggle>
                </div>
                <p
                  className="text-muted-foreground text-xs mt-2"
                  dangerouslySetInnerHTML={{ __html: t('settings.appMode.hint') }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('settings.language.title')}</CardTitle>
              <CardDescription>
                {t('settings.language.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language-select">{t('settings.language.label')}</Label>
                <Select value={language ?? "en"} onValueChange={changeLanguage}>
                  <SelectTrigger id="language-select">
                    <SelectValue placeholder={t('settings.language.selectLang')} />
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
                  {t('settings.language.hint')}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.accessibility.title')}</CardTitle>
              <CardDescription>
                {t('settings.accessibility.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('settings.accessibility.highContrast')}</Label>
                  <p className="text-muted-foreground text-xs">
                    {t('settings.accessibility.highContrastHint')}
                  </p>
                </div>
                <Toggle
                  pressed={highContrast ?? false}
                  onPressedChange={setHighContrast}
                  aria-label="Toggle high contrast"
                >
                  {highContrast ? t('settings.display.on') : t('settings.display.off')}
                </Toggle>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('settings.accessibility.animations')}</Label>
                  <p className="text-muted-foreground text-xs">
                    {t('settings.accessibility.animationsHint')}
                  </p>
                </div>
                <Toggle
                  pressed={animations ?? true}
                  onPressedChange={setAnimations}
                  aria-label="Toggle animations"
                >
                  {animations ? t('settings.display.on') : t('settings.display.off')}
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
