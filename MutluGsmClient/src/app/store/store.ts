import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../../features/products/store/productSlice";
import { authtSlice } from "../../features/account/store/authSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    auth: authtSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
