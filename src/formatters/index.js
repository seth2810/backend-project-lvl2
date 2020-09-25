import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';

const formatters = Object.freeze({
  STYLISH: 'stylish',
  PLAIN: 'plain',
  JSON: 'json',
});

export default (type) => {
  switch (type) {
    case formatters.STYLISH:
      return stylishFormatter;
    case formatters.PLAIN:
      return plainFormatter;
    case formatters.JSON:
      return JSON.stringify;
    default:
      throw new Error(`Formatter for type '${type}' not found`);
  }
};
