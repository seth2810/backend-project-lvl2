import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formatters = Object.freeze({
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
});

export default (diff, type) => formatters[type](diff);
