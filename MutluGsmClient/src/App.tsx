import { RouterProvider } from "react-router";
import { router } from "./app/router/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useEffect, useState } from "react";
import { fetchOdataCategories } from "./features/category/store/categorySlice";
import { useAppDispatch } from "./app/store/hooks";
import { CircularProgress } from "@mui/material";
function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = async () => {
    dispatch(fetchOdataCategories("id,name"));
  };

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
