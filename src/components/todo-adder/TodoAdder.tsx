/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useState } from "react";
import TodoAdderForm from "./TodoAdderForm";
import { PriorityType } from "constants/Priority";
import { post } from "common/fetch";
import { items } from "common/apiUrl";
import { Todo } from "redux/reducers/todo";
import dayjs from "dayjs";

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
  return (
    <TodoAdderForm
      onSubmit={async formState => {
        const unixTimeStamp = dayjs(formState.startedAt).unix();

        try {
          const response = await createTodoApi({
            ...formState,
            // TODO: 달력 기간설정은 미지원..
            startedAt: unixTimeStamp,
            dueAt: unixTimeStamp,
            endedAt: unixTimeStamp
          });
        } catch (error) {
          alert("문제가 발생했습니다.🔥");
          console.error(error);
        }
      }}
    />
  );
}
