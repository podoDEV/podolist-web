import { AnyAction } from "redux";
import { APPLY_TODO, ADD_TODO, TodoActionTypes } from "../actions/todo";
import { PriorityType } from "../../constants/Priority";

type Nullable<T> = T | null;

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  completedAt: Nullable<number>;
  startedAt: Nullable<number>;
  endedAt: number;
  updatedAt: Nullable<number>;
  createdAt: Nullable<number>;
  dueAt: Nullable<number>;
  priority: PriorityType;
}

export interface TodoState {
  delayedItems: Todo[];
  items: Todo[];
}

const initialState = { delayedItems: [], items: [] } as TodoState;

export default (state = initialState, action: TodoActionTypes) => {
  switch (action.type) {
    case APPLY_TODO:
      return action.todo;
    case ADD_TODO:
      const { todo } = action;
      return {
        ...state,
        items: {
          ...state.items,
          todo
        }
      };
    default:
      return state;
  }
};
