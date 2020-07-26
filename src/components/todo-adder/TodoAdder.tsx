/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState, useContext } from "react";
import TodoAdderForm from "./TodoAdderForm";
import { PriorityType } from "constants/Priority";
import { post } from "common/fetch";
import { items } from "common/apiUrl";
import { Todo } from "redux/reducers/todo";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { addTodo } from "redux/actions/todo";
import { SelectedTodoContext } from "pages";

export type CreateTodoParams = {
  dueAt: number;
  endedAt: number;
  priority: PriorityType;
  startedAt: number;
  title: string;
};

async function createTodoApi(params: CreateTodoParams): Promise<Todo> {
  const response = await post(items(), JSON.stringify(params));
  return response;
}

export default function TodoAdder() {
  const dispatch = useDispatch();
  const { selectedTodo } = useContext(SelectedTodoContext);

  return (
    <TodoAdderForm
      todoFormState={
        selectedTodo && {
          title: selectedTodo.title,
          startedAt: dayjs(selectedTodo.startedAt),
          priority: selectedTodo.priority
        }
      }
      onSubmit={async formState => {
        const unixTimeStamp = dayjs(formState.startedAt).unix();
        try {
          const todo = await createTodoApi({
            ...formState,
            // TODO: 달력 기간설정은 미지원..
            startedAt: unixTimeStamp,
            dueAt: unixTimeStamp,
            endedAt: unixTimeStamp
          });
          dispatch(addTodo(todo));
        } catch (error) {
          alert("문제가 발생했습니다.🔥");
          console.error(error);
        }
      }}
    />
  );
}
