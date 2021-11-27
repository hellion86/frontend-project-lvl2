import { load } from 'js-yaml';

const parse = (data, extension) => {
  switch (extension) {
    case 'yml' || 'yaml':
      return load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Extension ${extension} is not supported!`);
  }
};
export default parse;
