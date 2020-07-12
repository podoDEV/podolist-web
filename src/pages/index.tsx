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

const TodoPageContainer = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
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

  useEffect(() => {
    const darkMode = getInitDarkMode();
    dispatch(setDarkMode(darkMode));
    setLocalStorageDarkMode(darkMode);

    const numb = Number(date.format("YYYYMMDD"));
    get(apiUrl.fetchItems(numb)).then(res => {
      dispatch(applyTodo(res));
      dispatch(fetchUserInfo());
    });
  }, []);

  return (
    <TodoPageContainer>
      <Navigation date={date} setDate={setDate} />
      <Todo date={date} />
    </TodoPageContainer>
  );
}
