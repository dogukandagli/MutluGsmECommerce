import { createBrowserRouter } from "react-router";
import { adminRoutes } from "../../areas/admin/routes/router";
import { webRoutes } from "../../areas/web/routes/router";

export const router = createBrowserRouter([adminRoutes, webRoutes]);
