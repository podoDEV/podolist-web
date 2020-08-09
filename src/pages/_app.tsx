import { createWrapper } from "next-redux-wrapper";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { FC, useEffect } from "react";
import ReactGA from "react-ga";
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

ReactGA.initialize("UA-91279503-3", {
  debug: false
});

const WrappedApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  });

  return (
    <Layout>
      <Head>
        <title>포도리스트::TODOLIST</title>
        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;400;900&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="생각보다 괜찮은 투두리스트::포도리스트" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <meta
          name="keywords"
          content="todo list, todo, podolist, podo list, 투두리스트, 일정, 일정관리, 포도리스트"
        />
        <meta property="og:title" content="포도리스트::🍇" />
        <meta property="og:description" content="생각보다 괜찮은 투두리스트::포도리스트" />
        <meta
          property="og:image"
          content="https://s3.ap-northeast-2.amazonaws.com/podolist.com/static/met.png"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default wrapper.withRedux(WrappedApp);
