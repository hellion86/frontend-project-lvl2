const normalizedValueName = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const assembledTree = (data, path = '') => {
    const tree = data.map((record) => {
      const fullPath = `${path}.${record.key}`;
      switch (record.status) {
        case 'nested':
          return assembledTree(record.value, fullPath);
        case 'added':
          return `Property '${fullPath.slice(1)}' was added with value: ${normalizedValueName(record.value)}`;
        case 'deleted':
          return `Property '${fullPath.slice(1)}' was removed`;
        case 'changed':
          return `Property '${fullPath.slice(1)}' was updated. From ${normalizedValueName(record.oldValue)} to ${normalizedValueName(record.value)}`;
        default:
          return false;
      }
    }).filter((el) => el).join('\n');
    return tree;
  };
  return assembledTree(diff);
};
export default plain;
