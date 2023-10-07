import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {Store} from 'redux';
import {createWrapper, MakeStore} from 'next-redux-wrapper';

const makeConfiguredStore: MakeStore<any> = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export const wrapper = createWrapper<Store>(makeConfiguredStore);

export type AppStore = ReturnType<typeof makeConfiguredStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = Store['dispatch'];