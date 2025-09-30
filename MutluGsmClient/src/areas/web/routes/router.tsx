import WebLayout from "../../../app/layouts/WebLayout";
import ProductDetailPage from "../components/ProductDetailPage";
import CategoryProductsPage from "../pages/CategoryProductsPage";
import HomePage from "../pages/HomePage";
import StoreContactAndMap from "../pages/StoreContactAndMap";

export const webRoutes = {
  path: "/",
  element: <WebLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/:type/:value",
      element: <CategoryProductsPage />,
    },
    {
      path: "contact",
      element: <StoreContactAndMap />,
    },
    {
      path: "product/:productId",
      element: <ProductDetailPage />,
    },
  ],
};
