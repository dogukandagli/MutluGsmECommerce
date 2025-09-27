import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { ODataResponse } from "../../products/types/OdataResponse";
import Category from "../api/categoryApi";
import type { ICategorySelect } from "../../products/types/ICategorySelect";
import type { RootState } from "../../../app/store/store";

export const fetchOdataCategories = createAsyncThunk<
  ODataResponse<ICategorySelect>,
  string
>("categories/fetchOdataCategories", async (merged) => {
  return await Category.get(merged);
});

const categoryAdapter = createEntityAdapter<ICategorySelect>();

const initialState = categoryAdapter.getInitialState({
  status: "idle",
});

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
      categoryAdapter.setAll(state, action.payload.value);
    });
  },
});

export const {
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
  selectEntities: selectCategoryEntities,
  selectAll: selectAllCategory,
  selectTotal: selectTotalCategory,
} = categoryAdapter.getSelectors((state: RootState) => state.category);
