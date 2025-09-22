import { RouterProvider } from "react-router";
import { router } from "./app/router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
