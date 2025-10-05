import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ODataResponse } from "../../products/types/OdataResponse";
import Category from "../api/categoryApi";
import type { ICategory } from "../types/ICategory";

export const fetchOdataCategories = createAsyncThunk<
  ODataResponse<ICategory>,
  string
>("categories/fetchOdataCategories", async (merged) => {
  return await Category.get(merged);
});

const initialState = {
  status: "idle",
  categories: null as ICategory[] | null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOdataCategories.pending, (state) => {
      state.status = "pendingFetchCategories";
    });
    builder.addCase(fetchOdataCategories.fulfilled, (state, action) => {
      state.status = "idle";
      state.categories = action.payload.value;
    });
  },
});
