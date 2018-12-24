export const APPLY_USER_INFO = 'APPLY_USER_INFO';
export const FETCH_USER_INFO_SAGA = 'FETCH_USER_INFO_SAGA';
export const USER_LOGIN = 'USER_LOGIN';

export const userLogin = (accessToken) => ({
  type: USER_LOGIN,
  accessToken
});

export const fetchUserInfoSaga = () => ({
  type: FETCH_USER_INFO_SAGA
});

export const applyUserInfo = (userInfo) => ({
  type: APPLY_USER_INFO,
  userInfo
});
