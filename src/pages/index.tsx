/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as apiUrl from "../common/apiUrl";
import { get } from "../common/fetch";
import Navigation from "../components/navigation/navigation";
import { applyTodo } from "../redux/actions/todo";
import { fetchUserInfo } from "../redux/actions/user";
import { setDarkMode } from "../redux/actions/style";
import { setLocalStorageDarkMode, getLocalStorageDarkMode } from "../common/styles/darkMode";
import { useTheme } from "emotion-theming";
import { Theme } from "../common/styles/Layout";
import TodoAdder from "components/todo-adder/TodoAdder";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ITodo } from "redux/reducers/todo";
import TodoList from "components/todoList";

const TodoPageContainer = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

function getInitDarkMode() {
  const userDarkTheme = getLocalStorageDarkMode();

  if (userDarkTheme) {
    return userDarkTheme === "true";
  }

  return matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function TodoIndex(props: any) {
  console.log("props: ", props);
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs());
  const [pageStatus, setPageStatus] = useState("NONE"); // NONE FETCHING
  const { preloader } = useTheme<Theme>();

  const fetchData = () => {
    setPageStatus("FETCHING");
    const numb = date.format("YYYYMMDD");
    // @TODO: saga로 빼기
    get(apiUrl.fetchItems(numb)).then(res => {
      dispatch(applyTodo(res));
      setPageStatus("NONE");
    });
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  useEffect(() => {
    const darkMode = getInitDarkMode();
    dispatch(setDarkMode(darkMode));
    setLocalStorageDarkMode(darkMode);

    fetchData();
    dispatch(fetchUserInfo());
  }, []);

  return (
    <TodoPageContainer>
      <Navigation date={date} setDate={setDate} />
      {pageStatus === "FETCHING" ? <img src={preloader} /> : <TodoList date={date} />}
      <TodoAdder />
    </TodoPageContainer>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const cookie = req.headers.cookie;
  const numb = dayjs().format("YYYYMMDD");
  console.log("cookie: ", cookie);
  // cookie에 값이 없거나
  // 응답값에 에러(401이라던가)가 있을 경우 login page로 리다이렉트
  if (!cookie) {
    // go login page
    res.writeHead(301, {
      Location: "/login"
    });
    res.end();
    return;
  }

  try {
    const data = await get(apiUrl.fetchItems(numb), { headers: { cookie } });
    console.log("data: ", data);
    return {
      props: {
        data
      }
    };
  } catch (error) {
    res.writeHead(301, {
      Location: "/login"
    });
    res.end();
  }
}
