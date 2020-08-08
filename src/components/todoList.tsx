/** @jsx jsx */
import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { State } from "../pages/_app";
import { TodoState, TodoType } from "../redux/reducers/todo";
import TodoItem from "../components/todoItem";
import { useSelectedTodo } from "context/selectedTodoContext";
import { useTheme } from "emotion-theming";
import { Theme } from "../common/styles/Layout";
import { imageMap } from "../common/styles/imageMap";

interface Props {
  date: Dayjs;
}

const TodoListContainer = styled("div")`
  display: flex;
  width: 750px;
  margin: 15px 0 80px;
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
    box-sizing: border-box;
    padding: 0 25px;
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
    ? `url(${imageMap.DOWN_BTN}) 50% 50%/ 20px 20px no-repeat`
    : `url(${imageMap.UP_BTN}) 50% 50%/ 20px 20px no-repeat`
}));

const BorderBottom = styled("div")`
  margin: 15px 0;
`;

interface ListProps {
  folded: boolean;
}

const List = styled("ul")`
  height: "100%";
  overflow: "hidden";
  border: "none";
  background: "none";
`;

const FoldableList = styled("ul")<ListProps>(({ folded }: ListProps) => ({
  transition: "max-height 0.4s",
  WebkitTransition: "max-height 0.4s",
  maxHeight: folded ? "0px" : "10000px",
  overflow: "hidden",
  border: "none",
  background: "none"
}));

function formatted(numb: number) {
  return dayjs(numb * 1000).format("YYYY.MM.DD");
}

export default function TodoList(props: Props) {
  const { delayedItems, items } = useSelector<State, TodoState>(state => state.todo);
  const [folded, setFolded] = useState(false);
  const selectedDate = dayjs(props.date).format("YYYYMMDD");
  const date = dayjs(props.date).format("YYYY.MM.DD");
  const today = date === dayjs().format("YYYY.MM.DD");
  const { setSelectedTodo } = useSelectedTodo();

  const handleClickEdit = (todo: TodoType) => {
    setSelectedTodo(todo);
  };
  const { borderBottom } = useTheme<Theme>();

  return (
    <TodoListContainer css={mobileScreenWidth}>
      {delayedItems && !!delayedItems.length && (
        <>
          <ListContainer>
            <ListTitleContainer>
              <ListTitle today={false}>
                Delayed
                <span style={{ marginLeft: "15px" }}>{delayedItems.length}</span>
              </ListTitle>
              <FoldButton
                folded={folded}
                onClick={() => {
                  setFolded(!folded);
                }}
              />
            </ListTitleContainer>
            <FoldableList folded={folded}>
              {delayedItems &&
                delayedItems.map(item => {
                  const { title, priority, endedAt, isCompleted, id } = item;
                  return (
                    <TodoItem
                      text={title}
                      priority={priority}
                      selectedDate={selectedDate}
                      date={formatted(endedAt)}
                      checked={isCompleted}
                      key={`todo-item-delayed-${id}`}
                      id={id}
                      onClickEdit={() => handleClickEdit(item)}
                    />
                  );
                })}
            </FoldableList>
          </ListContainer>
          <BorderBottom style={{ border: borderBottom }} />
        </>
      )}
      <ListContainer>
        <ListTitleContainer>
          <ListTitle>
            {today ? (
              <>
                Today<DateTitle>{date}</DateTitle>
              </>
            ) : (
              date
            )}
          </ListTitle>
        </ListTitleContainer>
        <List>
          {items &&
            items.map(item => {
              const { title, priority, endedAt, id, isCompleted } = item;
              return (
                <TodoItem
                  text={title}
                  priority={priority}
                  date={formatted(endedAt)}
                  selectedDate={selectedDate}
                  checked={isCompleted}
                  key={`todo-item-${id}`}
                  id={id}
                  onClickEdit={() => handleClickEdit(item)}
                />
              );
            })}
        </List>
      </ListContainer>
    </TodoListContainer>
  );
}
