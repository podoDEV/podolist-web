const apiDomain =
  process.env.NODE_ENV === "development"
    ? "http//api.dev.podolist.com:8000"
    : "https://api.podolist.com";

export const items = () => `${apiDomain}/items`;
export const fetchItems = (date: string) => `${apiDomain}/items?date=${date}`;
export const itemsWithId = (itemId: number) => `${apiDomain}/items/${itemId}`;
export const login = () => `${apiDomain}/login/kakao`;
export const logout = () => `${apiDomain}/logout`;
export const fetchUserInfo = () => `${apiDomain}/users/me`;
export const updateItem = (todoId: number) => `${apiDomain}/items/${todoId}`;
