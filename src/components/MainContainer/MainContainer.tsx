
import {ReactNode} from 'react';
import Head from "next/head";
import Header from '../Header/Header';
import { NavigationState } from '@/store/features/navgationSlice';
import { CartState } from '@/store/features/cartSlice';
import { ColorsState } from '@/store/features/colorsSlice';

export const MainContainer = ({
  children,
  keywords = '', 
  navigation,
  colors,
  cart
}: {
  children: ReactNode
  keywords: string
  colors: ColorsState
  navigation: NavigationState
  cart: CartState
}) => {
  return (
    <>
    <Head>
      <meta name="keywords" content={`nextjs ` + keywords} />
      <title>Главная страница</title>
    </Head>
    <div>
      <Header navigation={navigation} cart={cart} colors={colors}/>
      {children}
    </div>
    </>
  )
}
