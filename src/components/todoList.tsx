/** @jsx jsx */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { State } from "../pages/_app";
import { TodoState } from "../redux/reducers/todo";
import TodoItem from "../components/todoItem";

interface Props {
  // todo:
  date: Dayjs;
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
  justify-content: space-between;
`;

interface ListTitleProps {
  today?: boolean;
}

const ListTitle = styled("span")<ListTitleProps>(({ today = true }: ListTitleProps) => ({
  fontSize: "23px",
  color: today ? "#535353" : "#d0021b"
}));

const DateTitle = styled("span")`
  margin-left: 10px;
  color: #535353;
  font-size: 15px;
`;

export const mobileScreenWidth = css`
  @media (max-width: 800px) {
    width: 100%;
    margin: auto;
  }
`;

interface FoldButtonProps {
  folded: boolean;
}

const FoldButton = styled("button")<FoldButtonProps>(({ folded }: FoldButtonProps) => ({
  border: "none",
  width: "20px",
  height: "20px",
  background: folded
    ? 'url("/images/down-btn.png") 50% 50%/ 20px 20px no-repeat'
    : 'url("/images/up-btn.png") 50% 50%/ 20px 20px no-repeat'
}));

const BorderBottom = styled("div")`
  border: 0.5px solid #ececec;
  margin: 0 0 15px;
`;

interface ListProps {
  folded: boolean;
  len: number;
}

const List = styled("button")<ListProps>(({ folded, len }: ListProps) => ({
  transition: "height 0.4s",
  WebkitTransition: "height 0.4s",
  height: folded ? "0px" : `${65 * len}px`,
  overflow: "hidden",
  border: "none",
  background: "none"
}));

function formatted(numb: number) {
  return dayjs(numb * 1000).format("YYYY.MM.DD");
}

export default function TodoList(props: Props) {
  const { delayedItems } = useSelector<State, TodoState>(state => state.todo);
  const [folded, setFolded] = useState(false);
  const numberOfDelayedItems = delayedItems ? delayedItems.length : 0;

  useEffect(() => {
    console.log("todolist");
  }, []);

  return (
    <TodoListContainer css={mobileScreenWidth}>
      <ListContainer>
        <ListTitleContainer>
          <ListTitle today={false}>Delayed</ListTitle>
          <FoldButton
            folded={folded}
            onClick={() => {
              setFolded(!folded);
            }}
          />
        </ListTitleContainer>
        <List folded={folded} len={numberOfDelayedItems}>
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
        </List>
      </ListContainer>
      <BorderBottom />
      <ListContainer>
        <ListTitleContainer>
          <ListTitle>
            Today<DateTitle>Today</DateTitle>
          </ListTitle>
        </ListTitleContainer>
      </ListContainer>
    </TodoListContainer>
  );
}
