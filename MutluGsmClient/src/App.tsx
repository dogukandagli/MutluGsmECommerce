import { RouterProvider } from "react-router";
import { router } from "./app/router/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
