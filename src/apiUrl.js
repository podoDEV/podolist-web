const apiDomain = 'http://api.podolist.xyz:8000';

export const items = () => `${apiDomain}/items`;
export const itemsWithId = (itemId) => `${apiDomain}/items/${itemId}`;
export const login = () => `${apiDomain}/login`;
