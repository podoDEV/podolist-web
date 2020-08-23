/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useMemo, useCallback } from "react";
import TodoAdderForm from "./TodoAdderForm";
import { PriorityType } from "constants/Priority";
import { post, put } from "common/fetch";
import { items, updateItem } from "common/apiUrl";
import { TodoType } from "redux/reducers/todo";
import dayjs, { Dayjs } from "dayjs";
import { useSelectedTodo } from "context/selectedTodoContext";

export type CreateTodoParams = {
  dueAt: number;
  endedAt: number;
  priority: PriorityType;
  startedAt: number;
  title: string;
};

async function createTodoApi(params: CreateTodoParams): Promise<TodoType> {
  const response = await post(items(), JSON.stringify(params));
  return response;
}

export type UpdateTodoParams = CreateTodoParams & Pick<TodoType, "isCompleted">;

export async function updateTodoApi(todoId: number, params: Partial<UpdateTodoParams>) {
  const response = await put(updateItem(todoId), JSON.stringify(params));
  return response;
}

type TodoAdderProps = {
  fetchTodo: () => void;
  date: Dayjs;
};

export default function TodoAdder({ date, fetchTodo }: TodoAdderProps) {
  const { selectedTodo, setSelectedTodo } = useSelectedTodo();

  const injectedFormState = useMemo(() => {
    return selectedTodo
      ? {
          title: selectedTodo.title,
          startedAt: dayjs(selectedTodo.startedAt! * 1000),
          priority: selectedTodo.priority
        }
      : {
          title: "",
          startedAt: date,
          priority: PriorityType.MEDIUM
        };
  }, [selectedTodo, date]);

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
            ? await updateTodoApi(selectedTodo.id!, params)
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
