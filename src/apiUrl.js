const apiDomain = 'http://seong0428.iptime.org:8000';

export const items = () => `${apiDomain}/items`;
export const itemsWithId = (itemId) => `${apiDomain}/items/${itemId}`;
