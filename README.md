# Timetablely

Timetablely is a modern, responsive web application designed to help users create, manage, and share timetables with ease. Built with React, TypeScript, and Vite, it offers a fast and intuitive user experience.

## ✨ Features

-   **Intuitive Interface:** A clean and user-friendly interface for managing schedules.
-   **Customizable Themes:** Light and dark mode support with the ability to switch between themes.
-   **Responsive Design:** Fully responsive layout that works on all devices.
-   **Quick Create:** Easily add new events or tasks to your timetable.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18 or higher)
-   [pnpm](https://pnpm.io/) (or your preferred package manager)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/timetablely.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd timetablely
    ```
3.  Install the dependencies:
    ```sh
    pnpm install
    ```
4.  Start the development server:
    ```sh
    pnpm run dev
    ```

The application should now be running on `http://localhost:5173`.

## 📂 App Structure

The project follows a modular structure to keep the codebase organized and maintainable.

```
/src
├── /app            # Core application logic
├── /assets         # Static assets (images, fonts)
├── /components     # Reusable UI components
│   ├── /ui         # Components from shadcn/ui
│   └── theme-provider.tsx
├── /helpers        # Helper functions
├── /hooks          # Custom React hooks
├── /interface      # TypeScript interfaces and types
├── /lib            # Utility functions and library configurations
├── /mock           # Mock data for development
├── /routes         # Routing configuration (React Router)
├── /store          # Global state management
├── /views          # Application pages/views
├── constants.ts    # Application constants
├── main.tsx        # Main application entry point
└── index.css       # Global styles
```

## 🧩 Main Components

-   **`ThemeProvider`**: Manages the application's theme (light/dark mode) and provides it to all components.
-   **`RouterProvider`**: Handles client-side routing using `react-router-dom`. The routes are defined in the `/routes` directory.
-   **`NavMain`**: The main navigation component, which includes links to different parts of the application and quick action buttons.
-   **UI Components (`/components/ui`)**: A collection of reusable UI components, likely built using a library like `shadcn/ui`, including `Button`, `Sidebar`, and more.

## 🛠️ Built With

-   [Vite](https://vitejs.dev/) - Next-generation front-end tooling.
-   [React](https://react.dev/) - A JavaScript library for building user interfaces.
-   [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript.
-   [React Router](https://reactrouter.com/) - Declarative routing for React applications.
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
-   [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
-   [Tabler Icons](https.tabler-icons.io) - A set of over 4700 free MIT-licensed high-quality SVG icons.