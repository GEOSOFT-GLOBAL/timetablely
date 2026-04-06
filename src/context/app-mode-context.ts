import * as React from "react";

export type AppMode = "education" | "individual" | "company";

export interface AppModeContextValue {
    mode: AppMode;
    setMode: (mode: AppMode) => void;
}

export const AppModeContext = React.createContext<AppModeContextValue | null>(null);
