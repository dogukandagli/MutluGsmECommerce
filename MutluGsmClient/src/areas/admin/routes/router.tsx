import AdminLayout from "../../../app/layouts/AdminLayout";
import Login from "../components/Login";
import { InventoryExample } from "../pages/InventoryExample";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductEditPage from "../pages/ProductEditPage";

export const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <InventoryExample /> },
    { path: "products", element: <InventoryExample /> },
    { path: "products/new", element: <ProductCreatePage /> },
    { path: "products/:id/edit", element: <ProductEditPage /> },
    { path: "login", element: <Login /> },
  ],
};
