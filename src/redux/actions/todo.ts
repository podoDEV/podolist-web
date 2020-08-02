import { ITodo, TodoState } from "../reducers/todo";

export const ADD_TODO = "ADD_TODO" as const;
export const APPLY_TODO = "APPLY_TODO" as const;
export const UPDATE_TODO = "UPDATE_TODO" as const;
export const REMOVE_TODO = "REMOVE_TODO" as const;
export const APPLY_TODO_ITEM = "APPLY_TODO_ITEM" as const;
export const TOGGLE_TODO = "TOGGLE_TODO" as const;

export const applyTodo = (todo: TodoState) => ({
  type: APPLY_TODO,
  todo
});

export const addTodo = (todo: ITodo) => ({
  type: ADD_TODO,
  todo
});

export type TodoActionTypes = ReturnType<typeof applyTodo | typeof addTodo | typeof toggleTodoItem>;

export const applyTodoItem = (todo: ITodo, id: number) => ({
  type: APPLY_TODO_ITEM,
  todo,
  id
});

export const updateTodoItem = (todo: ITodo, id: number) => ({
  type: UPDATE_TODO,
  todo,
  id
});

export const toggleTodoItem = (todoId: number) => ({
  type: TOGGLE_TODO,
  id: todoId
});

export const removeTodoItem = (id: number, date: string) => ({
  type: REMOVE_TODO,
  id,
  date
});
