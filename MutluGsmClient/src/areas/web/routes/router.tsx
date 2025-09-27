import WebLayout from "../../../app/layouts/WebLayout";
import ProductbyCategories from "../../../features/category/components/productsByCategories";

export const webRoutes = {
  path: "/",
  element: <WebLayout />,
  children: [
    {
      path: "/:categoryName",
      element: <ProductbyCategories />,
    },
  ],
};
