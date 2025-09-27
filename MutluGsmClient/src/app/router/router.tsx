import { createBrowserRouter } from "react-router";
import { adminRoutes } from "../../areas/admin/routes/router";
import { webRoutes } from "../../areas/web/routes/router";
import Login from "../../features/account/components/Login";

export const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
  },
  adminRoutes,
  webRoutes,
]);
