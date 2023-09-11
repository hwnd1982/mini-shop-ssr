
import {ReactNode} from 'react';
import Head from "next/head";
import { A } from "../A/A";

export const MainContainer = ({children, keywords}: {children: ReactNode, keywords: string}) => {
  return (
    <>
    <Head>
      <meta name="keywords" content={`nextjs` + keywords} />
      <title>Главная страница</title>
    </Head>
      <nav className="navbar">
        <A href='/' text='Главная' />
        <A href='/users' text='Пользователи' />
      </nav>
      <div>
        {children}
      </div>
      <style jsx>
        {`
          .navbar {
            background-color: orange;
            padding: 15px;
          } 
        `}
      </style>
    </>
  )
}
