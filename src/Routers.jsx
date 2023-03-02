import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./pages/Posts";

export default function Routers() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Posts />,
    },
  ]);
  return <RouterProvider router={router} />;
}
