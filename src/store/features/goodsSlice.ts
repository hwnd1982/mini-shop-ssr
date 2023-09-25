import { FetchingState } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ParsedUrlQuery } from "querystring";
import { GOODS_URL } from "../const";
import { Product } from "./productSlice";

export interface GoodsState  extends FetchingState {
  list: Product[]
  page: number
  pages: number
  totalCount: number
}

export interface GoodsPayload {
  goods: Product[]
  page: number
  pages: number
  totalCount: number
}

type SearchParams = ParsedUrlQuery | null;

const initialState: GoodsState = {
    status: 'idle',
    error: '',
    list: [],
    page: 1,
    pages: 0,
    totalCount: 0,
  };

export const fetchGoods = createAsyncThunk<GoodsPayload, SearchParams | undefined>(
  "goods/fetchGoods",
  async (param = null) => {
    const url = new URL(GOODS_URL);

    for(const key in param) {
      url.searchParams.append(key, `${param[key]}`);
    }
    
    return await (await fetch(url)).json();
  }
);

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = "loading";
        state.list = [];
        state.error = '';
        state.pages = 0;
        state.totalCount = 0;
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.list = action.payload.goods || [];
        state.pages = action.payload.pages;
        state.page = action.payload.page;
        state.totalCount = action.payload.totalCount;
        state.status = "success";
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.status = "failed";
      });
    }
})

export const { setPage } = goodsSlice.actions;

export default goodsSlice.reducer;