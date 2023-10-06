import { createAppAsyncThunk, FetchingState } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { COLORS_URL, getData } from "../const";
import { AppState } from "../store";

export interface Color {
  id: number;
  title: string;
  code: string;
}

export interface ColorsState  extends FetchingState {
  list: Color[],
}

const initialState: ColorsState = {
    list: [],
    status: 'idle',
    error: ''
  };

export const fetchColors = createAppAsyncThunk(
  'colors/fetchColors',
  async () => await getData(COLORS_URL),
);

const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(HYDRATE, (state, action: AppState) => {
      state.list = action.payload.colors.list;
      state.status = 'success';
      state.error = '';
    })
    .addCase(fetchColors.pending, (state) => {
      state.status = 'loading';
      state.list = [];
      state.error = '';
    })
    .addCase(fetchColors.fulfilled, (state, action) => {
      state.status = 'success';
      state.list = action.payload || [];
    })
    .addCase(fetchColors.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || '';
    });
  }
});

export default colorsSlice.reducer;
