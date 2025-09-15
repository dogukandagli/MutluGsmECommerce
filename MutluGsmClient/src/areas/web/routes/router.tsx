import WebLayout from "../../../app/layouts/WebLayout";

export const webRoutes = {
  path: "/",
  element: <WebLayout />,
  children: [
    {
      path: "",
    },
  ],
};
