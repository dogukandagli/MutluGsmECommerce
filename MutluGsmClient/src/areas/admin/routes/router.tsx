import AdminLayout from "../../../app/layouts/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";

export const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      path: "dashboard",
      element: <AdminDashboard />,
    },
  ],
};
