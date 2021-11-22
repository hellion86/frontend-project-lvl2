import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatChoose = (diff, format) => {
  switch (format) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      return stylish(diff);
  }
};

export default formatChoose;
