import { FetchingState, SearchParams } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CART_URL } from "../const";

export interface CartItem {
  id: string
  color: number
  count: number
  size: string
}

export interface CartProducts {
  [id: string] : {
    title: string
    price: number
    pic:string
  }
}

export interface CartState  extends FetchingState {
  list: CartItem[]
  products: CartProducts
  totalPrice: number
  totalCount: number
}

export interface CartPayload {
  list: CartItem[]
  products: CartProducts
  totalPrice: number
  totalCount: number
}

const initialState: CartState = {
    status: 'idle',
    error: '',
    list: [],
    products: {},
    totalPrice: 0,
    totalCount: 0
  };

export const fetchGetCart = createAsyncThunk<CartPayload, SearchParams>(
  "cart/fetchGetCart",
  async () => await (await fetch(CART_URL)).json()
);

const cartSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGetCart.pending, (state) => {
        state.status = "loading";
        state.list = [];
        state.products = {};
        state.error = '';
        state.totalPrice = 0;
        state.totalCount =  0;
      })
      .addCase(fetchGetCart.fulfilled, (state, action) => {
        state.list = action.payload.list || [];
        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        state.totalCount =  action.payload.totalCount;
        state.status = "success";
      })
      .addCase(fetchGetCart.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.status = "failed";
      });
    }
})

export default cartSlice.reducer;