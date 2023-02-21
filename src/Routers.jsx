import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./pages/Create";
import Posts from "./pages/Posts";

export default function Routers() {
  const router = createBrowserRouter([
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/",
      element: <Posts />,
    },
  ]);
  return <RouterProvider router={router} />;
}
