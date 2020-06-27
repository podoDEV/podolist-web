/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx } from "@emotion/core";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { applyTodo } from "../redux/actions/todo";
import { State } from "./_app";
import { get } from "../common/fetch";
import * as apiUrl from "../common/apiUrl";
import { TodoState } from "../redux/reducers/todo";
import { UserState } from "../reducers/user";
import Navigation from "../components/navigation/navigation";
import Todo from "../components/todoList";
import styled from "@emotion/styled";

const TodoPageContainer = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function TodoIndex() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const numb = Number(date.format("YYYYMMDD"));
    get(apiUrl.fetchItems(numb)).then(res => {
      dispatch(applyTodo(res));
    });
  }, []);

  const user = useSelector<State, UserState | null>(state => state.user);
  const todo = useSelector<State, TodoState>(state => state.todo);

  return (
    <TodoPageContainer>
      <Navigation date={date} setDate={setDate} name={user.name} />
      <Todo date={date} />
    </TodoPageContainer>
  );
}
