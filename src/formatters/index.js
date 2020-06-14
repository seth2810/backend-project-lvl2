import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';

export const formatterTypes = Object.freeze({
  STYLISH: 'stylish',
  PLAIN: 'plain',
  JSON: 'json',
});

export default function getFormatter(type) {
  switch (type) {
    case formatterTypes.STYLISH:
      return stylishFormatter;
    case formatterTypes.PLAIN:
      return plainFormatter;
    case formatterTypes.JSON:
      return JSON.stringify;
    default:
      return null;
  }
}
