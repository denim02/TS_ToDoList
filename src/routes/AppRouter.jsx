import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/todos",
        children: [
          {
            path: "",
            lazy: () => import("../pages/ListPage"),
          },
          {
            path: ":id",
            lazy: () => import("../pages/DetailsPage"),
          },
          {
            path: ":id/edit",
            lazy: () => import("../pages/EditPage"),
          },
          {
            path: "create",
            lazy: () => import("../pages/CreatePage"),
          },
          {
            path: ":id/delete",
            lazy: () => import("../pages/DeletePage"),
          },
        ],
      },
      {
        path: "*",
        lazy: () => import("../pages/NotFoundPage"),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
