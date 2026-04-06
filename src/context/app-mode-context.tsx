import * as React from "react";
import { type AppMode, AppModeContext } from "./app-mode-context";

const STORAGE_KEY = "app-mode";
const DEFAULT_MODE: AppMode = "education";

function readMode(): AppMode {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "education" || stored === "individual" || stored === "company") {
            return stored;
        }
    } catch {
        // ignore
    }
    return DEFAULT_MODE;
}

export function AppModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setModeState] = React.useState<AppMode>(readMode);

    const setMode = React.useCallback((newMode: AppMode) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newMode));
        } catch {
            // ignore
        }
        setModeState(newMode);
    }, []);

    return (
        <AppModeContext.Provider value={{ mode, setMode }}>
            {children}
        </AppModeContext.Provider>
    );
}
