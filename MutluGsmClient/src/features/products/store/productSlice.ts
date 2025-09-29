import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { IProduct } from "../types/IProduct";
import Product from "../api/productApi";
import type { ODataResponse } from "../types/OdataResponse";
import type { RootState } from "../../../app/store/store";

export const fetchOdataProducts = createAsyncThunk<
  ODataResponse<IProduct>,
  string
>("products/fetchOdataProducts", async (merged) => {
  return await Product.getProducts(merged);
});

export const createProduct = createAsyncThunk<void, FormData>(
  "products/createProduct",
  async (formdata) => {
    return await Product.createProduct(formdata);
  }
);

export const updateProduct = createAsyncThunk<void, FormData>(
  "products/updateProduct",
  async (formdata) => {
    return await Product.updateProduct(formdata);
  }
);

export const deleteProduct = createAsyncThunk<void, string>(
  "products/deleteProduct",
  async (id) => {
    return await Product.deleteProduct(id);
  }
);

const productsAdapter = createEntityAdapter<IProduct>();

const initialState = productsAdapter.getInitialState({
  status: "idle",
  products: null as IProduct[] | null,
  valueCount: 0,
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
      state.products = action.payload.value;
      state.valueCount = Number(action.payload["@odata.count"]);
      state.status = "idle";
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.status = "pendingDeleteProduct";
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(createProduct.pending, (state) => {
      state.status = "pendingCreateProduct";
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.status = "pendingUpdateProduct";
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state: RootState) => state.product);
