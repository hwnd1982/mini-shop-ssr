
import {ReactNode} from 'react';
import Head from "next/head";
import Header from '../Header/Header';
import { NavigationState } from '@/store/features/navgationSlice';
import { ColorsState } from '@/store/features/colorsSlice';

export const MainContainer = ({
  children,
  keywords = '', 
  navigation,
  colors,
}: {
  children: ReactNode
  keywords: string
  colors: ColorsState
  navigation: NavigationState
}) => {
  return (
    <>
      <Head>
        <meta name="keywords" content={`nextjs ` + keywords} />
        <title>Главная страница</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header navigation={navigation} colors={colors}/>
        <main className="flex flex-col bg-white shrink grow">
            {children}
        </main>
      </div>
    </>
  )
}
