import { isObject, normalized } from './utils.js';

const stylish = (diff, counter = 4) => {
  const stringify = (row, space, count) => {
    if (!isObject(row)) {
      return `${row}`;
    }
    const iter = (obj, cups, num) => {
      const result = Object.entries(obj).map(([key, value]) => {
        if (isObject(normalized(value))) {
          return `${' '.repeat(num)}${key}: {\n${iter(value, ' ', num + 4)}`;
        }
        return `${' '.repeat(num)}${key}: ${value}`;
      });
      return `${result.join('\n')}\n${' '.repeat(num - 4)}}`;
    };
    const items = iter(row, space, count);
    return `{\n${items}`;
  };

  const assembledTree = (obj, num) => {
    const tree = obj.map((record) => {
      switch (record.status) {
        case 'nested':
          return `${' '.repeat(num)}${record.key}: {\n${assembledTree(record.value, num + counter)}\n${' '.repeat(num)}}`;
        case 'changed':
          return `${' '.repeat(num - 2)}- ${record.key}: ${stringify(record.value, ' ', num + counter)}\n${' '.repeat(num - 2)}+ ${record.key}: ${stringify(record.oldValue, ' ', num)}`;
        case 'added':
          return `${' '.repeat(num - 2)}+ ${record.key}: ${stringify(record.value, ' ', num + counter)}`;
        case 'deleted':
          return `${' '.repeat(num - 2)}- ${record.key}: ${stringify(record.value, ' ', num + counter)}`;
        case 'unchanged':
          return `${' '.repeat(num)}${record.key}: ${stringify(record.value, ' ', num)}`;
        default:
      }
      return true;
    }).join('\n');
    return tree;
  };
  const displayDiff = assembledTree(diff, counter);
  return `{\n${displayDiff}\n}`;
};

export default stylish;
