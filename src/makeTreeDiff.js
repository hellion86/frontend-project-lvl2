import _ from 'lodash';

const makeTreeDifference = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  return allKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj1, key)) {
      return { key, value: value2, status: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: value1, status: 'deleted' };
    }
    if (value2 !== value1) {
      return _.isObject(value1) && _.isObject(value2) ? { key, value: makeTreeDifference(value1, value2), status: 'nested' }
        : {
          key, value: value2, oldValue: value1, status: 'changed',
        };
    }
    return { key, value: value1, status: 'unchanged' };
  });
};

export default makeTreeDifference;
