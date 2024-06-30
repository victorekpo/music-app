import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppContextProvider } from "@/components/Context";
import { ApolloWrapper } from "@/graphql/client/wrapper";
import { NextUIProvider } from "@nextui-org/react";
import db from '../db/config/connection';
import '@/styles/globals.css';
import style from './layout.module.css';
import { Toaster } from "react-hot-toast";

if (process.env.NODE_ENV !== 'production') {
  db.once("open", () => {
    console.info('connected in dev env')
  })
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music App",
  description: "This app will be used to organize music for all uses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloWrapper>
       <AppContextProvider>
        <html lang="en">
        <body className="container">
        <div className={style.mainContainer}>
          <div className={style.navBar}>
            <Navbar/>
          </div>
          <div><Toaster/></div>
          <div className={style.pageContainer}>
            <NextUIProvider>
              {children}
            </NextUIProvider>
          </div>
        </div>
        <div className={style.footerContainer}>
          <Footer/>
        </div>
        </body>
        </html>
       </AppContextProvider>
    </ApolloWrapper>
  );
}