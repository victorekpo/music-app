import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import '@/styles/globals.css';
import style from './layout.module.css';
import { AppContextProvider } from "@/components/Context";
import { ApolloWrapper } from "@/graphql/client/wrapper";
import { NextUIProvider } from "@nextui-org/react";

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
          <Navbar />
          <div className={style.pageContainer}>
            <NextUIProvider>
              {children}
            </NextUIProvider>
          </div>
          <Footer />
          </body>
        </html>
      </AppContextProvider>
    </ApolloWrapper>
  );
}
