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
    const tree = data.filter((item) => item.status !== 'unchanged')
      .map((record) => {
        const fullPath = `${path}.${record.key}`;
        switch (record.status) {
          case 'added':
            return `Property '${fullPath.slice(1)}' was added with value: ${normalizedValueName(record.value)}`;
          case 'deleted':
            return `Property '${fullPath.slice(1)}' was removed`;
          case 'changed':
            return `Property '${fullPath.slice(1)}' was updated. From ${normalizedValueName(record.oldValue)} to ${normalizedValueName(record.value)}`;
          default:
            return assembledTree(record.value, fullPath);
        }
      }).join('\n');
    return tree;
  };
  return assembledTree(diff);
};
export default plain;
