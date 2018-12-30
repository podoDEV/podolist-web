/* eslint-disable */
const apiDomain = 'http://api.dev.podolist.com:8000';

export const items = () => `${apiDomain}/items`;
export const fetchItems = (date) => `${apiDomain}/items?date=${date}`;
export const itemsWithId = (itemId) => `${apiDomain}/items/${itemId}`;
export const login = () => `${apiDomain}/login/kakao`;
export const fetchUserInfo = () => `${apiDomain}/users/me`;
