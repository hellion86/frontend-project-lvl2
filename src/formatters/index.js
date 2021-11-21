import stylish from './stylish.js';
import plain from './plain.js';

const formatChoose = (diff, format) => (format === 'stylish' ? stylish(diff) : plain(diff));

export default formatChoose;
