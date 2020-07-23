import { Todo, TodoState } from "../reducers/todo";

export const ADD_TODO = "ADD_TODO" as const;
export const APPLY_TODO = "APPLY_TODO" as const;
export const UPDATE_TODO = "UPDATE_TODO" as const;
export const REMOVE_TODO = "REMOVE_TODO" as const;
export const APPLY_TODO_ITEM = "APPLY_TODO_ITEM" as const;

export const applyTodo = (todo: TodoState) => ({
  type: APPLY_TODO,
  todo
});

export const addTodo = (todo: Todo) => ({
  type: ADD_TODO,
  todo
});

export type TodoActionTypes = ReturnType<typeof applyTodo | typeof addTodo>;
export const applyTodoItem = (todo: Todo, id: number) => ({
  type: APPLY_TODO_ITEM,
  todo,
  id
});

export const updateTodoItem = (todo: Todo, id: number) => ({
  type: UPDATE_TODO,
  todo,
  id
});

export const removeTodoItem = (id: number, date: string) => ({
  type: REMOVE_TODO,
  id,
  date
});
