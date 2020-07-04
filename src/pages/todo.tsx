/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx } from "@emotion/core";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { applyTodo } from "../redux/actions/todo";
import { get } from "../common/fetch";
import * as apiUrl from "../common/apiUrl";
import Navigation from "../components/navigation/navigation";
import Todo from "../components/todoList";
import styled from "@emotion/styled";
import { checkValidUser } from "../redux/actions/user";

const TodoPageContainer = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function TodoIndex() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    dispatch(checkValidUser());
    const numb = Number(date.format("YYYYMMDD"));
    get(apiUrl.fetchItems(numb)).then(res => {
      dispatch(applyTodo(res));
    });
  }, []);

  return (
    <TodoPageContainer>
      <Navigation date={date} setDate={setDate} />
      <Todo date={date} />
    </TodoPageContainer>
  );
}
