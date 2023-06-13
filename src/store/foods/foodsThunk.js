import { createAsyncThunk } from "@reduxjs/toolkit";
import { addFoods, deletefoods, editfoods } from "../../api/foodsService";
import { getFoods } from "../meals/mealsThunk";

export const addFoodsRequest = createAsyncThunk(
  "foods/addFoods",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await addFoods(payload);
      dispatch(getFoods());
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteFoodsRequest = createAsyncThunk(
  "foods/delete",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await deletefoods(payload);
      dispatch(getFoods());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editFoodsRequest = createAsyncThunk(
  "foods/edit",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await editfoods(payload);
      dispatch(getFoods());
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
