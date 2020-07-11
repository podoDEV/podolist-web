import { AnyAction } from "redux";
import { SET_DARK_MODE } from "../actions/style";

export interface StyleState {
  darkMode: boolean;
}

const initialState: StyleState = { darkMode: false }; // @TODO: localstorage

export default (state: StyleState = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return { darkMode: action.darkMode };
    default:
      return state;
  }
};
