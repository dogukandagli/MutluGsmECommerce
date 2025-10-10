import AdminLayout from "../../../app/layouts/AdminLayout";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductEditPage from "../pages/ProductEditPage";
import ProductsPage from "../pages/ProductsPage";
import SliderCreatePage from "../pages/SliderCreatePage";
import SlidersPage from "../pages/SlidersPage";
import { AuthGuard } from "./AuthGuard";

export const adminRoutes = {
  path: "/admin",
  element: <AuthGuard />,
  children: [
    {
      element: <AdminLayout />,
      children: [
        { path: "", element: <ProductsPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "products/new", element: <ProductCreatePage /> },
        { path: "products/edit/:id", element: <ProductEditPage /> },
        { path: "sliders/new", element: <SliderCreatePage /> },
        { path: "sliders", element: <SlidersPage /> },
      ],
    },
  ],
};
