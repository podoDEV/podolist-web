import { createWrapper } from "next-redux-wrapper";
import { AppProps } from "next/app";
import React, { FC } from "react";
import makeStore from "redux/makeStore";
import Layout from "../common/styles/Layout";
import "../common/styles/reset.css";

export interface State {
  user: null;
}

export const wrapper = createWrapper(makeStore, { debug: true });

const WrappedApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(WrappedApp);
