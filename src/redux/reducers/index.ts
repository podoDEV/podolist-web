import { combineReducers } from "redux";
import { countReducer, ICountState } from "./countReducer";
import user from "./user";

export type IStore = {
  count: ICountState;
};

export default combineReducers({
  user,
  count: countReducer
});
