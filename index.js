import _ from 'lodash';

const genDiff = (file1, file2) => {
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const items1 = Object.entries(obj1);
  const result = items1.map(([key, value]) => {
    if (_.has(obj2, key)) {
      console.log(key);
    }
  });
  console.log(result);
};

export default genDiff;
