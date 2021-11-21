import _ from 'lodash';
import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import stylish from './stylish.js';
import { isObject, normalized, parse } from './utils.js';

export const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const firsObject = parse(readFileSync(resolve(filePath1), 'utf-8'), extname(filePath1));
  const secondObject = parse(readFileSync(resolve(filePath2), 'utf-8'), extname(filePath2));
  const makeTreeDifference = (obj1, obj2) => {
    const allKeys = _.union(_.keys(obj1), _.keys(obj2)).sort();
    return allKeys.map((key) => {
      const value1 = normalized(obj1[key]);
      const value2 = normalized(obj2[key]);
      if (!_.has(obj1, key)) {
        return { key, value: value2, status: 'added' };
      }
      if (!_.has(obj2, key)) {
        return { key, value: value1, status: 'deleted' };
      }
      if (value2 !== value1) {
        if (isObject(value1) && isObject(value2)) {
          return { key, value: makeTreeDifference(value1, value2), status: 'nested' };
        }
        return {
          key, value: value1, oldValue: value2, status: 'changed',
        };
      }
      return { key, value: value1, status: 'unchanged' };
    });
  };

  let formatChoose;
  switch (format) {
    case 'stylish':
      formatChoose = stylish(makeTreeDifference(firsObject, secondObject));
      break;
    case 'plain':
      console.log('plain');
      break;
    default:
  }
  return formatChoose;
};
export default genDiff;
