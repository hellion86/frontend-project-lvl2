import _ from 'lodash';
import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { load } from 'js-yaml';

export const parse = (data, extension) => ((extension === '.yml' || extension === '.yaml') ? load(data) : JSON.parse(data));

export const genDiff = (filePath1, filePath2) => {
  const obj1 = parse(readFileSync(resolve(filePath1), 'utf-8'), extname(filePath1));
  const obj2 = parse(readFileSync(resolve(filePath2), 'utf-8'), extname(filePath2));
  const allKeys = _.uniq([..._.keys(obj1), ..._.keys(obj2)]).sort();
  const resultDiff = allKeys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      acc[`+ ${key}`] = obj2[key];
    } else if (!_.has(obj2, key)) {
      acc[`- ${key}`] = obj1[key];
    } else if (obj2[key] !== obj1[key]) {
      acc[`- ${key}`] = obj1[key];
      acc[`+ ${key}`] = obj2[key];
    } else {
      acc[`  ${key}`] = obj1[key];
    }
    return acc;
  }, {});
  const displayDiff = Object.entries(resultDiff).map(([key, value]) => (`${key}: ${value}`));
  return `{\n${displayDiff.join('\n')}\n}`;
};
