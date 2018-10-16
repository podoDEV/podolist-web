export const APPLY_USER_INFO = 'APPLY_USER_INFO';
export const USER_LOGIN = 'USER_LOGIN';

export const userLogin = (accessToken) => ({
  type: USER_LOGIN,
  accessToken
});

export const applyUserInfo = (name) => ({
  type: APPLY_USER_INFO,
  name
});