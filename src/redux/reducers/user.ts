import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { APPLY_USER_INFO } from "../actions/user";

export interface UserState {
  id: number;
  name: string;
}

type InitialStateType = UserState | null;
const initialState: InitialStateType = null;

export default (state: UserState | null = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return state
        ? {
            ...state,
            ...action.payload.user
          }
        : state;
    case APPLY_USER_INFO:
      return action.user;
    default:
      return state;
  }
};
