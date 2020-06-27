import { UserState } from "../reducers/user";

export const APPLY_USER_INFO = "APPLY_USER_INFO";

export const applyUserInfo = (user: UserState) => ({
  type: APPLY_USER_INFO,
  user
});
