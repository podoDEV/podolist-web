import { ITodo, TodoState } from "../reducers/todo";

export const ADD_TODO = "ADD_TODO" as const;
export const APPLY_TODO = "APPLY_TODO" as const;
export const UPDATE_TODO = "UPDATE_TODO" as const;
export const REMOVE_TODO = "REMOVE_TODO" as const;
export const APPLY_TODO_ITEM = "APPLY_TODO_ITEM" as const;
export const ADD_TODAY_TODO_LIST = "ADD_TODAY_TODO_LIST" as const;

export const TOGGLE_TODO = "TOGGLE_TODO" as const;
export const TOGGLE_TODO_SUCCESS = "TOGGLE_TODO_SUCCESS" as const;

export const applyTodo = (todo: TodoState) => ({
  type: APPLY_TODO,
  todo
});

export const addTodo = (todo: ITodo) => ({
  type: ADD_TODO,
  todo
});

export type TodoActionTypes = ReturnType<
  | typeof applyTodo
  | typeof addTodo
  | typeof toggleTodoItem
  | typeof updateTodoItem
  | typeof toggleTodoSuccess
>;

export const applyTodoItem = (todo: ITodo, id: number) => ({
  type: APPLY_TODO_ITEM,
  todo,
  id
});

export const updateTodoItem = (todo: ITodo, id: number, isDelayed?: boolean) => ({
  type: UPDATE_TODO,
  todo,
  id,
  isDelayed
});

export const toggleTodoItem = (todoId: number, isCompleted: boolean) => ({
  type: TOGGLE_TODO,
  id: todoId,
  isCompleted
});

export const removeTodoItem = (id: number, date: string) => ({
  type: REMOVE_TODO,
  id,
  date
});

export const toggleTodoSuccess = (id: number, todo: ITodo, isDelayed?: boolean) => ({
  type: TOGGLE_TODO_SUCCESS,
  todo,
  id,
  isDelayed
});
