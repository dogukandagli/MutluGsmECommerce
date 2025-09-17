import AdminLayout from "../../../app/layouts/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductEditPage from "../pages/ProductEditPage";
import ProductsPage from "../pages/ProductsPage";

export const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <AdminDashboard /> },
    { path: "products", element: <ProductsPage /> },
    { path: "products/new", element: <ProductCreatePage /> },
    { path: "products/:id/edit", element: <ProductEditPage /> },
  ],
};
