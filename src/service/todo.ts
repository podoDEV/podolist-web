import { deleteFetch, get, put } from "../common/fetch";
import * as apiUrl from "../common/apiUrl";

export const fetchTodo = (date: string) => {
  return get(apiUrl.fetchItems(date));
};

export const removeTodoItem = (id: number) => {
  return deleteFetch(apiUrl.itemsWithId(id));
};

export const updateTodoItem = (id: number) => {
  // return put(apiUrl.fetchUserInfo()); body
};
