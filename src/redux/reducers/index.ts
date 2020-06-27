import { combineReducers } from "redux";
import { countReducer, ICountState } from "./countReducer";
import user from "./user";
import todo from "./todo";

export type IStore = {
  count: ICountState;
};

export default combineReducers({
  user,
  todo,
  count: countReducer
});
