import { UserState } from "../reducers/user";

export const USER_LOGIN = "USER_LOGIN";
export const APPLY_USER_INFO = "APPLY_USER_INFO";
export const FETCH_USER_INFO = "FETCH_USER_INFO";
export const CHECK_VALID_USER = "CHECK_VALID_USER";

export const checkValidUser = (callback?: Function) => ({
  type: "CHECK_VALID_USER",
  callback
});

export const userLogin = (accessToken: string) => ({
  type: USER_LOGIN,
  accessToken
});

export const fetchUserInfo = () => ({
  type: FETCH_USER_INFO
});

export const applyUserInfo = (user: UserState) => ({
  type: APPLY_USER_INFO,
  user
});
