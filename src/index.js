import _ from 'lodash';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export const makeCompare = (file1, file2) => {
  const firstConfig = readFileSync(resolve(file1), 'utf-8');
  const secondConfig = readFileSync(resolve(file2), 'utf-8');
  const obj1 = JSON.parse(firstConfig);
  const obj2 = JSON.parse(secondConfig);
  const allKeys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]).sort();
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
  return resultDiff;
};

export const genDiff = (file1, file2) => {
  const diff = makeCompare(file1, file2);
  console.log('{');
  Object.keys(diff).map((el) => (console.log(`${el}: ${diff[el]}`)));
  console.log('}');
};
