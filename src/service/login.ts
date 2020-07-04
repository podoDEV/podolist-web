import { post, get } from "../common/fetch";
import * as apiUrl from "../common/apiUrl";

export const login = (accessToken: string) => {
  return post(apiUrl.login(), JSON.stringify({ accessToken }));
};

export const fetchUserInfo = () => {
  return get(apiUrl.fetchUserInfo());
};

export const checkValidUser = () => {
  return get(apiUrl.validSessionId());
};
