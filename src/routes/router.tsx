import Layout from "@/views/layout";
import { createHashRouter } from "react-router-dom";

export const routes = createHashRouter([
  {
    path: "/",
    element: <Layout />,
  },
]);
