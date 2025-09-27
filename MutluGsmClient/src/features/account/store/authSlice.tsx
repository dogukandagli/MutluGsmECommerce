import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FieldValues } from "react-hook-form";
import Auth from "../api/authtApi";
import { router } from "../../../app/router/router";

interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: "",
};

export const login = createAsyncThunk<string, FieldValues>(
  "account/login",
  async (data) => {
    const response = await Auth.login(data);
    const accessToken = response.data.accessToken;

    localStorage.setItem("response", accessToken);
    return accessToken;
  }
);

export const authtSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload;
      router.navigate("/admin/products");
    });
  },
});
