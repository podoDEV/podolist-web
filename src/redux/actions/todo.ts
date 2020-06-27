import { TodoState } from "../reducers/todo";

export const APPLY_TODO = "APPLY_TODO";

export const applyTodo = (todo: TodoState) => ({
  type: APPLY_TODO,
  todo
});
