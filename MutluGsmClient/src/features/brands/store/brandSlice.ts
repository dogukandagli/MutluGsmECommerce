import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Brand from "../api/brandApi";
import type { ODataResponse } from "../../products/types/OdataResponse";
import type { IBrand } from "../types/IBrand";

export const fetchOdataBrands = createAsyncThunk<ODataResponse<IBrand>, string>(
  "categories/fetchOdataBrands",
  async (merged) => {
    return await Brand.getBrands(merged);
  }
);

export const createBrand = createAsyncThunk<void, string>(
  "brands/createBrand",
  async (name) => {
    return await Brand.createBrand({ name });
  }
);

const initialState = {
  status: "idle",
  brands: null as IBrand[] | null,
};

export const brandSlice = createSlice({
  name: "Brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOdataBrands.pending, (state) => {
      state.status = "pendingFetchBrands";
    });
    builder.addCase(fetchOdataBrands.fulfilled, (state, action) => {
      (state.status = "idle"), (state.brands = action.payload.value);
    });
    builder.addCase(createBrand.pending, (state) => {
      state.status = "pendingCrateBrand";
    });
    builder.addCase(createBrand.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(createBrand.rejected, (state) => {
      state.status = "idle";
    });
  },
});
