import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

export default (state = { userInfo: null }, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.user
      };
    default:
      return state;
  }
};
