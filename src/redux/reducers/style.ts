import { AnyAction } from "redux";
import { TOGGLE_DARK_MODE } from "../actions/style";

export interface StyleState {
  darkMode: boolean;
}

type InitialStateType = StyleState;
const initialState: InitialStateType = { darkMode: false }; // @TODO: localstorage

// @TODO user call back 도 없애자

export default (state: StyleState = initialState, action: AnyAction) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return { state, darkMode: !state.darkMode };
    default:
      return state;
  }
};
