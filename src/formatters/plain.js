import _ from 'lodash';
import { isObject, normalized } from '../utils.js';

const plain = (diff) => {
  const seeWhatIn = (record) => {

  };
  const assembledTree = (data) => {
    const tree = data.map((record) => {
      if (Array.isArray(record.value)) {
        return assembledTree(record.value);
      }
      if (record.status !== 'unchanged') {
        return `no arrays in ${record.key} `;
      }
    }).join('\n');
    return tree;
		};
 	return assembledTree(diff);
};
export default plain;
