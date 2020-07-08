import { createWrapper } from "next-redux-wrapper";
import { AppProps } from "next/app";
import React, { FC } from "react";
import makeStore from "redux/makeStore";
import Layout from "../common/styles/Layout";
import { TodoState } from "../redux/reducers/todo";
import { StyleState } from "../redux/reducers/style";
import { UserState } from "../redux/reducers/user";

export interface State {
  user: UserState | null;
  todo: TodoState;
  style: StyleState;
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
