/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import { State } from "../pages/_app";
import { TodoState } from "../redux/reducers/todo";
import TodoItem from "../components/todoItem";
import dayjs from "dayjs";

interface Props {
  // todo:
}

const TodoListContainer = styled("div")`
  display: flex;
  width: 750px;
  margin: 15px 0;
  flex-direction: column;
`;

const ListContainer = styled("ul")`
  display: flex;
  flex-direction: column;
`;

const ListTitleContainer = styled("div")`
  display: flex;
  margin-bottom: 15px;
`;

const ListTitle = styled("span")`
  font-size: 23px;
  color: #d0021b;
`;

export const mobileScreenWidth = css`
  @media (max-width: 800px) {
    width: 100%;
    margin: auto;
  }
`;

export const FoldButton = styled("button")``;

function formatted(numb: number) {
  return dayjs(numb * 1000).format("YYYY.MM.DD");
}

export default function TodoList(props: Props) {
  const { delayedItems, items } = useSelector<State, TodoState>(state => state.todo);

  return (
    <TodoListContainer css={mobileScreenWidth}>
      <ListContainer>
        <ListTitleContainer>
          <ListTitle>DelayedItems</ListTitle>
          <FoldButton>fold</FoldButton>
        </ListTitleContainer>
        {delayedItems &&
          delayedItems.map(({ title, priority, endedAt }, key) => (
            <TodoItem
              text={title}
              priority={priority}
              date={formatted(endedAt)}
              checked={false}
              key={key}
            />
          ))}
      </ListContainer>
    </TodoListContainer>
  );
}
