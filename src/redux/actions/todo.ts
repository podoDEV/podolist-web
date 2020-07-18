import { Todo, TodoState } from "../reducers/todo";

export const APPLY_TODO = "APPLY_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const APPLY_TODO_ITEM = "APPLY_TODO_ITEM";

export const applyTodo = (todo: TodoState) => ({
  type: APPLY_TODO,
  todo
});

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
