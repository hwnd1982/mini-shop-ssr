import '@/styles/globals.css'
import type { AppProps } from "next/app";
import { wrapper } from '@/store/store';
import { Provider } from 'react-redux';
import { fetchNavgation } from '@/store/features/navgationSlice';
import { AppThunkDispatch } from '@/types/types';
import { fetchColors } from '@/store/features/colorsSlice';
import { fetchGetCart } from '@/store/features/cartSlice';

export default function WrappedApp({Component, ...rest}: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  )
}

WrappedApp.getInitialProps = wrapper.getInitialAppProps(store => async () => {
  const dispatch:AppThunkDispatch = store.dispatch;

  await Promise.all([
    dispatch(fetchNavgation()),
    dispatch(fetchColors()),
    dispatch(fetchGetCart()),
  ]);
  
  return {pageProps: {store}};
});
