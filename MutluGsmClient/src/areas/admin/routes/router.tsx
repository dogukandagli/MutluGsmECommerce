import AdminLayout from "../../../app/layouts/AdminLayout";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductEditPage from "../pages/ProductEditPage";
import ProductsPage from "../pages/ProductsPage";

export const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "products", element: <ProductsPage /> },
    { path: "products/new", element: <ProductCreatePage /> },
    { path: "products/edit/:id", element: <ProductEditPage /> },
  ],
};
