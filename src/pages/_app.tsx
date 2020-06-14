import React, { FC } from "react";
import { AppProps } from "next/app";
import "../common/styles/reset.css";
import Layout from "../common/styles/Layout";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import reducer from "../reducers";
import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

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
