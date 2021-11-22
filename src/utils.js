export const isObject = (item) => typeof item === 'object';
export const normalized = (item) => (item === null || item === undefined ? `${item}` : item);
