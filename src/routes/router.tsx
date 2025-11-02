import ErrorView from "@/views/error-view";
import Layout from "@/views/layout";
import { createHashRouter } from "react-router-dom";
import { appRoutes } from "./app.routes";

export const routes = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorView />,
    children: [...appRoutes],
  },
]);
