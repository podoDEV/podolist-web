import React, { ReactNode } from "react";
import { AppProps } from "next/app";
import "../common/styles/reset.css";
import Layout from "../common/styles/Layout";

// type AppProps = {
//   Component: ReactNode;
//   pageProps: any
// };

function App({ Component, pageProps }: AppProps) {
  console.log("pageProps: ", pageProps);
  console.log("Component: ", Component);
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default App;
