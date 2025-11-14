import React from "react";
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

const FONT_OPTIONS = [
	{ value: "default", label: "System Default" },
	{ value: "inter", label: "Inter" },
	{ value: "roboto", label: "Roboto" },
	{ value: "open-sans", label: "Open Sans" },
	{ value: "lato", label: "Lato" },
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
	const [font, setFont] = React.useState(
		localStorage.getItem("app-font") || "default"
	);
	const [fontSize, setFontSize] = React.useState(
		localStorage.getItem("app-font-size") || "medium"
	);
	const [language, setLanguage] = React.useState(
		localStorage.getItem("app-language") || "en"
	);
	const [compactMode, setCompactMode] = React.useState(
		localStorage.getItem("app-compact-mode") === "true"
	);
	const [animations, setAnimations] = React.useState(
		localStorage.getItem("app-animations") !== "false"
	);
	const [highContrast, setHighContrast] = React.useState(
		localStorage.getItem("app-high-contrast") === "true"
	);

	const handleFontChange = (value: string) => {
		setFont(value);
		localStorage.setItem("app-font", value);
		document.documentElement.style.fontFamily =
			value === "default" ? "" : value;
	};

	const handleFontSizeChange = (value: string) => {
		setFontSize(value);
		localStorage.setItem("app-font-size", value);
		const sizes = { small: "14px", medium: "16px", large: "18px" };
		document.documentElement.style.fontSize =
			sizes[value as keyof typeof sizes];
	};

	const handleLanguageChange = (value: string) => {
		setLanguage(value);
		localStorage.setItem("app-language", value);
	};

	const handleCompactModeToggle = () => {
		const newValue = !compactMode;
		setCompactMode(newValue);
		localStorage.setItem("app-compact-mode", String(newValue));
	};

	const handleAnimationsToggle = () => {
		const newValue = !animations;
		setAnimations(newValue);
		localStorage.setItem("app-animations", String(newValue));
		if (!newValue) {
			document.documentElement.classList.add("reduce-motion");
		} else {
			document.documentElement.classList.remove("reduce-motion");
		}
	};

	const handleHighContrastToggle = () => {
		const newValue = !highContrast;
		setHighContrast(newValue);
		localStorage.setItem("app-high-contrast", String(newValue));
		if (newValue) {
			document.documentElement.classList.add("high-contrast");
		} else {
			document.documentElement.classList.remove("high-contrast");
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
								<Select value={font} onValueChange={handleFontChange}>
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
								<Select value={fontSize} onValueChange={handleFontSizeChange}>
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
									pressed={compactMode}
									onPressedChange={handleCompactModeToggle}
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
								<Select value={language} onValueChange={handleLanguageChange}>
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
									pressed={highContrast}
									onPressedChange={handleHighContrastToggle}
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
									pressed={animations}
									onPressedChange={handleAnimationsToggle}
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
