import { combineReducers } from "redux";
import todo, { ITodo } from "./todo";
import user, { IUser } from "./user";
import style, { StyleState } from "./style";

export default combineReducers({
  user,
  todo,
  style
});

export type IStore = {
  todo: ITodo;
  user: IUser;
  style: StyleState;
};
