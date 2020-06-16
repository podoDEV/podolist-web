import { createWrapper, MakeStore } from "next-redux-wrapper";
import { AppProps } from "next/app";
import React, { FC } from "react";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Layout from "../common/styles/Layout";
import "../common/styles/reset.css";
import reducer from "../reducers";

export interface State {
  user: null;
}

const makeStore: MakeStore<State> = () => {
  const middlewares: any = [];
  const enhancer =
    process.env.NODE_ENV === "production" // eslint-disable-line no-undef
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  return createStore(reducer, {}, enhancer);
};

const wrapper = createWrapper(makeStore, { debug: true });

const WrappedApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(WrappedApp);
