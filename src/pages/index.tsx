/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as apiUrl from "../common/apiUrl";
import { get } from "../common/fetch";
import Navigation from "../components/navigation/navigation";
import Todo from "../components/todoList";
import { applyTodo } from "../redux/actions/todo";
import { fetchUserInfo } from "../redux/actions/user";
import { setDarkMode } from "../redux/actions/style";
import { setLocalStorageDarkMode, getLocalStorageDarkMode } from "../common/styles/darkMode";
import { useTheme } from "emotion-theming";
import { Theme } from "../common/styles/Layout";
import TodoAdder from "components/todo-adder-form/TodoAdder";

const TodoPageContainer = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

function getInitDarkMode() {
  const userDarkTheme = getLocalStorageDarkMode();

  if (userDarkTheme) {
    return userDarkTheme === "true";
  }

  return matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function TodoIndex() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs());
  const [pageStatus, setPageStatus] = useState("NONE"); // NONE FETCHING
  const { preloader } = useTheme<Theme>();

  const fetchData = () => {
    setPageStatus("FETCHING");
    const numb = Number(date.format("YYYYMMDD"));
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
      {pageStatus === "FETCHING" ? <img src={preloader} /> : <Todo date={date} />}
      <TodoAdder />
    </TodoPageContainer>
  );
}
