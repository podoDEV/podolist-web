import { combineReducers } from "redux";
import { countReducer, ICountState } from "./count";
import todo from "./todo";
import user from "./user";

export type IStore = {
  count: ICountState;
};

export default combineReducers({
  user,
  todo,
  count: countReducer
});
