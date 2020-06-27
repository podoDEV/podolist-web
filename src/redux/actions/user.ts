export const LOGIN = "LOGIN";

export const login = (accessToken: string) => ({
  type: LOGIN,
  accessToken
});
