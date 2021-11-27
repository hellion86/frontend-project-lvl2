import { extname, resolve } from 'path';
import { readFileSync } from 'fs';
import formatChoose from './formatters/index.js';
import makeTreeDifference from './makeTreeDiff.js';
import parse from './parsers.js';

const readDataFromFile = (file) => (readFileSync(resolve(file), 'utf-8'));

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const dataFile1 = readDataFromFile(filePath1);
  const dataFile2 = readDataFromFile(filePath2);
  const firstObject = parse(dataFile1, extname(filePath1).slice(1));
  const secondObject = parse(dataFile2, extname(filePath2).slice(1));
  return formatChoose(makeTreeDifference(firstObject, secondObject), format);
};
export default genDiff;
