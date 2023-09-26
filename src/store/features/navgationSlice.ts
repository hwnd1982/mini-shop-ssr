import { createAppAsyncThunk, FetchingState } from "@/types/types";
import { createSlice} from "@reduxjs/toolkit";
import { CATEGOY_URL, getData } from "../const";

export type Category = {
  title: string
  slug: string
}

export interface Navigation {
  [key: string]: {
    title: string,
    banner: {
      description: string,
      id: string,
      bg: {
        [key: string]: string
      },
    },
    list: Category[]
  }
}

export interface NavigationState extends FetchingState {
  gender: string,
  genderList: string[],
  list: Navigation,
}

const initialState: NavigationState = {
    gender: '',
    list: {},
    genderList: [],
    status: 'idle',
    error: ''
  };

export const fetchNavgation = createAppAsyncThunk(
  'navgation/fetchNavgation',
  async () => await getData(CATEGOY_URL),
);

const navgationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActiveGender: (state, action) => {
      state.gender = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchNavgation.pending, (state) => {
      state.status = 'loading';
      state.list = {};
      state.genderList = [];
      state.error = '';
    })
    .addCase(fetchNavgation.fulfilled, (state, action) => {
      const genderList: string[] = action?.payload ? Object.keys(action?.payload) : [];

      state.status = 'success';
      state.list = action?.payload || {};
      state.genderList = genderList || [];
      state.gender = state.gender || genderList[0];
      state.error = '';
    })
    .addCase(fetchNavgation.rejected, (state, action) => {
      state.status = 'failed',
      state.error = action.error.message || '';
    })
  }
});

export const { setActiveGender } = navgationSlice.actions;

export default navgationSlice.reducer;
