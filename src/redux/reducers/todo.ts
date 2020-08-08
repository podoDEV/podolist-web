import {
  APPLY_TODO,
  ADD_TODO,
  TodoActionTypes,
  UPDATE_TODO,
  TOGGLE_TODO_SUCCESS
} from "../actions/todo";
import { PriorityType } from "../../constants/Priority";
import { HYDRATE } from "next-redux-wrapper";
import { HydrateActionType } from "redux/makeStore";
import produce from "immer";

type Nullable<T> = T | null;

export interface TodoType {
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
  delayedItems: TodoType[];
  items: TodoType[];
}

const initialState = { delayedItems: [], items: [] } as TodoState;

export default produce((draft: TodoState, action: TodoActionTypes | HydrateActionType) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload.todo;
    case APPLY_TODO:
      return action.todo;
    case ADD_TODO: {
      const { todo } = action;
      draft.items.push(todo);
      break;
    }
    case UPDATE_TODO:
      const { todo, id, isDelayed } = action;
      if (isDelayed) {
        const index = draft.delayedItems.findIndex(item => item.id === id);
        draft.delayedItems[index] = todo;
      } else {
        const index = draft.items.findIndex(item => item.id === id);
        draft.items[index] = todo;
      }
      break;
    case TOGGLE_TODO_SUCCESS: {
      const { todo, id, isDelayed } = action;
      if (isDelayed) {
        if (todo.isCompleted) {
          const index = draft.delayedItems.findIndex(item => item.id === id);
          draft.delayedItems.splice(index, 1);
          draft.items.push(todo);
        } else {
          const index = draft.items.findIndex(item => item.id === id);
          draft.items.splice(index, 1);
          draft.delayedItems.push(todo);
          return;
        }
      }
    }
    default:
  }
}, initialState);

// if (todo.isCompleted) {
//   const index = draft.items.findIndex(item => todo.id === item.id);
//   if (index !== -1) {
//     draft.items[index] = todo;
//   } else {
//     draft.items.push(todo);
//     draft.delayedItems = draft.delayedItems.filter(item => item.id !== todo.id);
//   }
// } else {
//   draft.delayedItems.push(todo);
//   draft.items = draft.items.filter(item => item.id !== todo.id);
// }
