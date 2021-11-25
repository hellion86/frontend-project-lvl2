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
      if (record.status === 'nested') {
        const fullPath = `${path}.${record.key}`;
        return assembledTree(record.value, fullPath);
      }
      const normalizedPath = `${path}.${record.key}`.slice(1);
      switch (record.status) {
        case 'added':
          return `Property '${normalizedPath}' was added with value: ${normalizedValueName(record.value)}`;
        case 'deleted':
          return `Property '${normalizedPath}' was removed`;
        case 'changed':
          return `Property '${normalizedPath}' was updated. From ${normalizedValueName(record.oldValue)} to ${normalizedValueName(record.value)}`;
        default:
          return false;
      }
    }).filter((el) => el).join('\n');
    return tree;
  };
  return assembledTree(diff);
};
export default plain;
