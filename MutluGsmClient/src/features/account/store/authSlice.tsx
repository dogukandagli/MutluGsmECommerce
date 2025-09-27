import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { FieldValues } from "react-hook-form";
import Auth from "../api/authtApi";

interface AuthState {}

const initialState: AuthState = {};

export const login = createAsyncThunk<void, FieldValues>(
  "account/loghin",
  async (data) => {
    return await Auth.login(data);
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
