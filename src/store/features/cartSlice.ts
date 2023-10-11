import { FetchingState } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { CART_URL } from "../const";
import { AppState } from "../store";

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
  opened: boolean
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
    totalCount: 0,
    opened: false
  };

export const fetchGetCart = createAsyncThunk<CartPayload, void>(
  "cart/fetchGetCart",
  async () => await (await fetch(CART_URL)).json()
);

export const fetchDelCart = createAsyncThunk<CartPayload, {id: string, color: number, size: string}>(
  "cart/fetchDelCart",
  async ({id, color, size}) => await (await fetch(CART_URL, {
    method: 'DELETE',
    body: JSON.stringify({id, color, size}),
    headers: {
      'Content-Type': 'application/json',
    }
  })).json()
);

export const fetchPostCart = createAsyncThunk<CartPayload, {id: string, color: number, size: string, count?: number}>(
  "cart/fetchPostCart",
  async ({id, color, size, count = 1}) => await (await fetch(CART_URL, {
    method: 'POST',
    body: JSON.stringify({id, color, size, count}),
    headers: {
      'Content-Type': 'application/json',
    }
  })).json()
);

export const fetchPatchCart = createAsyncThunk<CartPayload, {id: string, color: number, size: string, count?: number}>(
  "cart/fetchPatchCart",
  async ({id, color, size, count}) => {
    if (count) {
      return await (await fetch(CART_URL, {
        method: 'PATCH',
        body: JSON.stringify({id, color, size, count}),
        headers: {
          'Content-Type': 'application/json',
        }
      })).json();
    }
  } 
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state, action) => {
      state.opened = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(HYDRATE, (state, action: AppState) => {
        state.list = action.payload.cart.list;
        state.products = action.payload.cart.products;
        state.totalPrice = action.payload.cart.totalPrice;
        state.totalCount =  action.payload.cart.totalCount;
        state.error = action.payload.cart.error;
        state.status = action.payload.cart.status;
      })
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
      })
      .addCase(fetchDelCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDelCart.fulfilled, (state, action) => {
        state.list = action.payload.list || [];
        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        state.totalCount =  action.payload.totalCount;
        state.status = "success";
      })
      .addCase(fetchDelCart.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.status = "failed";
      })
      .addCase(fetchPostCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostCart.fulfilled, (state, action) => {
        state.list = action.payload.list || [];
        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        state.totalCount =  action.payload.totalCount;
        state.status = "success";
        state.opened = true;
      })
      .addCase(fetchPostCart.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.status = "failed";
      })
      .addCase(fetchPatchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatchCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = action.payload.list || [];
          state.products = action.payload.products;
          state.totalPrice = action.payload.totalPrice;
          state.totalCount =  action.payload.totalCount;
          state.status = "success";
          state.opened = true;
        }
        state.status = "success";
      })
      .addCase(fetchPatchCart.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.status = "failed";
      })
    }
})

export const { openCart } = cartSlice.actions;

export default cartSlice.reducer;