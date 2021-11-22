import { isObject, normalized } from '../utils.js';

const stylish = (diffOfObjects) => {
  const stringify = (recordValue, spaceCount) => {
    const iter = (data, spaceNum) => {
      const result = Object.entries(data).map(([key, value]) => {
        if (isObject(normalized(value))) {
          return `${' '.repeat(spaceNum)}${key}: {\n${iter(value, spaceNum + 4)}\n${' '.repeat(spaceNum)}}`;
        }
        return `${' '.repeat(spaceNum)}${key}: ${value}`;
      }).join('\n');
      return `${result}`;
    };
    return !isObject(recordValue) ? `${recordValue}` : `{\n${iter(recordValue, spaceCount)}\n${' '.repeat(spaceCount - 4)}}`;
  };

  const assembledTree = (data, spaceNum) => {
    const tree = data.map((record) => {
      switch (record.status) {
        case 'nested':
          return `${' '.repeat(spaceNum)}${record.key}: {\n${assembledTree(record.value, spaceNum + 4)}\n${' '.repeat(spaceNum)}}`;
        case 'changed':
          return `${' '.repeat(spaceNum - 2)}- ${record.key}: ${stringify(record.oldValue, spaceNum + 4)}\n${' '.repeat(spaceNum - 2)}+ ${record.key}: ${stringify(record.value, spaceNum + 4)}`;
        case 'added':
          return `${' '.repeat(spaceNum - 2)}+ ${record.key}: ${stringify(record.value, spaceNum + 4)}`;
        case 'deleted':
          return `${' '.repeat(spaceNum - 2)}- ${record.key}: ${stringify(record.value, spaceNum + 4)}`;
        case 'unchanged':
          return `${' '.repeat(spaceNum)}${record.key}: ${stringify(record.value, spaceNum)}`;
        default:
          return false;
      }
    }).join('\n');
    return tree;
  };
  return `{\n${assembledTree(diffOfObjects, 4)}\n}`;
};

export default stylish;
