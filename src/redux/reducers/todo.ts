import { AnyAction } from "redux";
import { APPLY_TODO, ADD_TODO, TodoActionTypes } from "../actions/todo";
import { PriorityType } from "../../constants/Priority";
import { HYDRATE } from "next-redux-wrapper";

type Nullable<T> = T | null;

export interface ITodo {
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
  delayedItems: ITodo[];
  items: ITodo[];
}

const initialState = { delayedItems: [], items: [] } as TodoState;

export default (state = initialState, action: TodoActionTypes) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.todo
      };
    case APPLY_TODO:
      console.log("action.todo: ", action.todo);
      return action.todo;
    case ADD_TODO: {
      const { todo } = action;

      return {
        ...state,
        items: [...state.items, todo]
      };
    }
    default:
      return state;
  }
};
