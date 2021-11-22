import { load } from 'js-yaml';

const parse = (data, extension) => ((extension === '.yml' || extension === '.yaml') ? load(data) : JSON.parse(data));

export default parse;
