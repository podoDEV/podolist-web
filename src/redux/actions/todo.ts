import { Todo } from "./../reducers/todo";
import { TodoState } from "../reducers/todo";

export const APPLY_TODO = "APPLY_TODO" as const;
export const ADD_TODO = "ADD_TODO" as const;

export const applyTodo = (todo: TodoState) => ({
  type: APPLY_TODO,
  todo
});

export const addTodo = (todo: Todo) => ({
  type: ADD_TODO,
  todo
});

export type TodoActionTypes = ReturnType<typeof applyTodo | typeof addTodo>;
