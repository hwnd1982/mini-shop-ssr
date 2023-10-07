import { Action, AnyAction, createAsyncThunk, Store, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { ParsedUrlQuery } from "querystring";
import { MouseEventHandler } from "react";

export type DefaultComponentsProps = {[index: string]: string | number};
export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type ClickHandler = MouseEventHandler<HTMLAnchorElement>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type ThunkApiConfig = {
  state: RootState
  dispatch: AppDispatch
  rejectValue: RootState
}
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAsyncThunk & AnyAction>

export interface FetchingState {
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();

export type SearchParams = ParsedUrlQuery | null | undefined;
