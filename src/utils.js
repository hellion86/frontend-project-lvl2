import { load } from 'js-yaml';

export const isObject = (item) => typeof item === 'object';
export const normalized = (item) => (item === null || item === undefined ? `${item}` : item);
export const parse = (data, extension) => ((extension === '.yml' || extension === '.yaml') ? load(data) : JSON.parse(data));
