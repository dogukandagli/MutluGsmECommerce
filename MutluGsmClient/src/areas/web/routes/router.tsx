import WebLayout from "../../../app/layouts/WebLayout";
import CategoryProductsPage from "../pages/CategoryProductsPage";
import HomePage from "../pages/HomePage";

export const webRoutes = {
  path: "/",
  element: <WebLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/:categoryName",
      element: <CategoryProductsPage />,
    },
  ],
};
