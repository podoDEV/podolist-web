import { combineReducers } from "redux";
import { countReducer, ICountState } from "./count";
import todo from "./todo";
import user from "./user";
import style from "./style";

export type IStore = {
  count: ICountState;
};

export default combineReducers({
  user,
  todo,
  style,
  count: countReducer
});
