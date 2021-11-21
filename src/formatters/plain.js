const normalizedValueName = (object) => {
  if (typeof object === 'object') {
    return '[complex value]';
  }
  if (typeof object === 'string' && object !== 'null') {
    return `'${object}'`;
  }
  return object;
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
          return `Property '${normalizedPath}' was added with ${normalizedValueName(record.value)}`;
        case 'deleted':
          return `Property '${normalizedPath}' was removed`;
        case 'changed':
          return `Property '${normalizedPath}' was updated from ${normalizedValueName(record.value)} to ${normalizedValueName(record.oldValue)}`;
        default:
          return false;
      }
    }).filter((el) => el).join('\n');
    return tree;
  };
  return assembledTree(diff);
};
export default plain;
