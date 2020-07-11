/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as apiUrl from "../common/apiUrl";
import { get } from "../common/fetch";
import Navigation from "../components/navigation/navigation";
import Todo from "../components/todoList";
import { applyTodo } from "../redux/actions/todo";

const slide = keyframes`
  0% { height: 0% }
  100% { height: 100% }
`;

const bounce = keyframes`
  from, 4%, 10%, 16%, to {transform: translate3d(0,0,0);}
  8% {transform: translate3d(0, -10px, 0);}
  12% {transform: translate3d(0, -5px, 0);}
  18% {transform: translate3d(0,-2px,0);}
`;

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

  return (
    <TodoPageContainer>
      <Navigation date={date} setDate={setDate} />
      <Todo date={date} />
    </TodoPageContainer>
  );
}
