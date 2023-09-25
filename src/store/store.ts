import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {Store} from 'redux';
import {createWrapper, MakeStore} from 'next-redux-wrapper';

const makeConfiguredStore: MakeStore<any> = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export const wrapper = createWrapper<Store>(makeConfiguredStore, {debug: true});
