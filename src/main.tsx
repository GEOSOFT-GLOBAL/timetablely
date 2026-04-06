import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./font.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/router.tsx";
import { Toaster } from "sonner";
import { AppModeProvider } from "./context/app-mode-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppModeProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={routes} />
        <Toaster/>
      </ThemeProvider>
    </AppModeProvider>
  </StrictMode>
);
