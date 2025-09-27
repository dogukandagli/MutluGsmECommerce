import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FieldValues } from "react-hook-form";
import Auth from "../api/authtApi";

interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: "",
};

export const login = createAsyncThunk<void, FieldValues>(
  "account/loghin",
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
    builder.addCase(login.fulfilled, () => {});
  },
});
