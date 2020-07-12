import { combineReducers } from "redux";
import todo from "./todo";
import user from "./user";
import style from "./style";

export default combineReducers({
  user,
  todo,
  style
});
