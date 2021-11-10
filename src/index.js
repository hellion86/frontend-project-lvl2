import _ from 'lodash';

const displayDiff = (object) => {
  console.log('{');
  Object.keys(object).map((el) => (console.log(`${el}: ${object[el]}`)));
  console.log('}');
};

const genDiff = (file1, file2) => {
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const allKeys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]).sort();
  const resultDiff = allKeys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      acc[`+ ${key}`] = obj2[key];
    } else if (!_.has(obj2, key)) {
      acc[`- ${key}`] = obj1[key];
    } else if (obj2[key] !== obj1[key]) {
      acc[`- ${key}`] = obj1[key];
      acc[`+ ${key}`] = obj2[key];
    } else {
      acc[`  ${key}`] = obj1[key];
    }
    return acc;
  }, {});
  displayDiff(resultDiff);
};

export default genDiff;
