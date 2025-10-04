import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Slider from "../api/sliderApi";
import type { ISlider } from "../types/ISlider";

export const fetchOdataSliders = createAsyncThunk<ISlider[], string>(
  "sliders/fetchOdataSliders",
  async (url) => {
    return await Slider.getSliders(url);
  }
);

export const createSlider = createAsyncThunk<void, FormData>(
  "sliders/createSlider",
  async (formdata) => {
    return await Slider.crateSlider(formdata);
  }
);

const initialState = {
  status: "idle",
  sliders: null as ISlider[] | null,
};

export const sliderSlice = createSlice({
  name: "Slider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOdataSliders.pending, (state) => {
      state.status = "pendingFetchSliders";
    });
    builder.addCase(fetchOdataSliders.fulfilled, (state, action) => {
      (state.status = "idle"), (state.sliders = action.payload);
    });
    builder.addCase(createSlider.pending, (state) => {
      state.status = "pendingCreateSlider";
    });
    builder.addCase(createSlider.fulfilled, (state) => {
      state.status = "idle";
    });
    builder.addCase(createSlider.rejected, (state) => {
      state.status = "idle";
    });
  },
});
