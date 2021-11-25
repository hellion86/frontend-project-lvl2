import { extname } from 'path';
import formatChoose from './formatters/index.js';
import { readDataFromFile, makeTreeDifference } from './utils.js';
import parse from './parsers.js';

export const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const dataFile1 = readDataFromFile(filePath1);
  const dataFile2 = readDataFromFile(filePath2);
  const firstObject = parse(dataFile1, extname(filePath1));
  const secondObject = parse(dataFile2, extname(filePath2));
  return formatChoose(makeTreeDifference(firstObject, secondObject), format);
};
export default genDiff;
