import { AnyAction } from "redux";

export default (state = { userInfo: null }, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
