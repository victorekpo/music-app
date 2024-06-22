import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import '@/styles/globals.css';
import style from './layout.module.css';
import { AppContextProvider } from "@/components/Context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloWrapper } from "@/utils/graphql/wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music App",
  description: "This app will be used to organize music for all uses.",
};

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: httpLink, // authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
            {/*<ApolloProvider client={client}>*/}
            {children}
            {/*</ApolloProvider>*/}
          </div>
          <Footer />
          </body>
        </html>
      </AppContextProvider>
    </ApolloWrapper>
  );
}
