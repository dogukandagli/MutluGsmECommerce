import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../../features/products/store/productSlice";
import { authtSlice } from "../../features/account/store/authSlice";
import { categorySlice } from "../../features/category/store/categorySlice";
import { sliderSlice } from "../../features/slider/store/sliderSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    auth: authtSlice.reducer,
    category: categorySlice.reducer,
    slider: sliderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
