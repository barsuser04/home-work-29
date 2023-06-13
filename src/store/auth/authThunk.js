import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp } from "../../api/authService";
import { STOREGE_KEY } from "../../constants";

export const signUpRequest = createAsyncThunk(
  "auth/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await signUp(data);
      localStorage.setItem(STOREGE_KEY, JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInRequest = createAsyncThunk(
  "auth/signIn",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await signIn(payload);
      localStorage.setItem(STOREGE_KEY, JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "admin/logOut",
  async (_, { rejectWithValue }) => {
    localStorage.removeItem(STOREGE_KEY);
  }
);
