
import {ReactNode} from 'react';
import Head from "next/head";
import Header from '../Header/Header';
import { NavigationState } from '@/store/features/navgationSlice';

export const MainContainer = ({
  children,
  keywords = '', 
  navigation
}: {
  children: ReactNode,
  keywords: string, 
  navigation: NavigationState
}) => {
  return (
    <>
    <Head>
      <meta name="keywords" content={`nextjs ` + keywords} />
      <title>Главная страница</title>
    </Head>
    <div>
      <Header navigation={navigation} />
      {children}
    </div>
    </>
  )
}
