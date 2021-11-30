import stylish from './stylish.js';
import plain from './plain.js';

const formatChoose = (diff, format) => {
  switch (format) {
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      return stylish(diff);
  }
};

export default formatChoose;
