import { FetchingState } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GOODS_URL } from "../const";

export interface Product {
  id: string,
  category: string,
  colors: number[],
  description: string,
  gender: string,
  materials: string,
  pic: string,
  price: number,
  size: string[],
  title: string,
  top: boolean
}

interface NotFoundItem {
  message: string
}

export interface ProductState extends FetchingState {
  data: Product | NotFoundItem | null
}

const initialState: ProductState = {
  status: "idle",
  data: null,
  error: '',
}

export const fetchProduct = createAsyncThunk<Product | NotFoundItem | null, string>(
  "product/fetchProduct",
  async id => await (await fetch(`${GOODS_URL}/${id}`)).json()
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
        state.data = null;
        state.error = '';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || '';
      });
    }
})

export default productSlice.reducer;