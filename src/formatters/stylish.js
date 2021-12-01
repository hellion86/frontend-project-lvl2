import _ from 'lodash';

const stylish = (diffOfObjects) => {
  const states = {
    added: '+',
    deleted: '-',
  };

  const stringify = (recordValue, spaceCount) => {
    const iter = (data, spaceNum) => (
      Object.entries(data).map(([key, value]) => (_.isObject(value)
        ? `${' '.repeat(spaceNum)}${key}: {\n${iter(value, spaceNum + 4)}\n${' '.repeat(spaceNum)}}`
        : `${' '.repeat(spaceNum)}${key}: ${value}`)).join('\n')
    );
    return !_.isObject(recordValue) ? `${recordValue}` : `{\n${iter(recordValue, spaceCount)}\n${' '.repeat(spaceCount - 4)}}`;
  };

  const assembledTree = (data, spaceNum) => {
    const tree = data.map((record) => {
      switch (record.status) {
        case 'nested':
          return `${' '.repeat(spaceNum)}${record.key}: {\n${assembledTree(record.value, spaceNum + 4)}\n${' '.repeat(spaceNum)}}`;
        case 'changed':
          return `${' '.repeat(spaceNum - 2)}- ${record.key}: ${stringify(record.oldValue, spaceNum + 4)}\n${' '.repeat(spaceNum - 2)}+ ${record.key}: ${stringify(record.value, spaceNum + 4)}`;
        case 'added':
        case 'deleted':
          //return `${' '.repeat(spaceNum - 2)}+ ${record.key}: ${stringify(record.value, spaceNum + 4)}`;
          return `${' '.repeat(spaceNum - 2)}${states[record.status]} ${record.key}: ${stringify(record.value, spaceNum + 4)}`;
        default:
          return `${' '.repeat(spaceNum)}${record.key}: ${stringify(record.value, spaceNum)}`;
      }
    }).join('\n');
    return tree;
  };
  return `{\n${assembledTree(diffOfObjects, 4)}\n}`;
};

export default stylish;
