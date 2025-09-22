import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { IProduct } from "../types/IProduct";
import Product from "../api/productApi";
import type { ODataResponse } from "../types/OdataResponse";

export const fetchOdataProducts = createAsyncThunk<
  ODataResponse<IProduct>,
  string
>("products/fetchOdataProducts", async (merged) => {
  return await Product.getProducts(merged);
});

export const deleteProduct = createAsyncThunk<null, string>(
  "products/deleteProduct",
  async (id) => {
    return await Product.deleteProduct(id);
  }
);

const productsAdapter = createEntityAdapter<IProduct>();

const initialState = productsAdapter.getInitialState({
  status: "idle",
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOdataProducts.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchOdataProducts.fulfilled, (state, action) => {
      productsAdapter.upsertMany(state, action.payload.value);
      state.status = "idle";
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.status = "pendingDeleteProduct";
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.status = "idle";
    });
  },
});
