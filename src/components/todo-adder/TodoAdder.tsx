/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState, useContext, useMemo, useCallback } from "react";
import TodoAdderForm from "./TodoAdderForm";
import { PriorityType } from "constants/Priority";
import { post } from "common/fetch";
import { items } from "common/apiUrl";
import { ITodo } from "redux/reducers/todo";
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

async function createTodoApi(params: CreateTodoParams): Promise<ITodo> {
  const response = await post(items(), JSON.stringify(params));
  return response;
}

export type UpdateTodoParams = CreateTodoParams;

async function updateTodoApi(todoId: number, params: UpdateTodoParams) {
  const response = await put(updateItem(todoId), JSON.stringify(params));
  return response;
}

type TodoAdderProps = {
  fetchTodo: () => void;
};

export default function TodoAdder({ fetchTodo }: TodoAdderProps) {
  const { selectedTodo, setSelectedTodo } = useContext(SelectedTodoContext);

  const injectedFormState = useMemo(() => {
    return selectedTodo
      ? {
          title: selectedTodo.title,
          startedAt: dayjs(selectedTodo.startedAt! * 1000),
          priority: selectedTodo.priority
        }
      : undefined;
  }, [selectedTodo]);

  const handleFoldOptions = useCallback(() => setSelectedTodo(undefined), []);

  return (
    <TodoAdderForm
      injectedFormState={injectedFormState}
      onFoldOptions={handleFoldOptions}
      onSubmit={async formState => {
        const unixTimeStamp = dayjs(formState.startedAt).unix();
        const params = {
          ...formState,
          // TODO: 달력 기간설정은 미지원..
          startedAt: unixTimeStamp,
          dueAt: unixTimeStamp,
          endedAt: unixTimeStamp
        };
        try {
          const response = selectedTodo
            ? await updateTodoApi(selectedTodo?.id!, params)
            : await createTodoApi(params);

          fetchTodo();
        } catch (error) {
          alert("문제가 발생했습니다.🔥");
          console.error(error);
          return Promise.reject(error);
        }
      }}
    />
  );
}
