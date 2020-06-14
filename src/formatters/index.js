import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';

export const formatterTypes = Object.freeze({
  STYLISH: 'stylish',
  PLAIN: 'plain',
});

export default function getFormatter(type) {
  switch (type) {
    case formatterTypes.STYLISH:
      return stylishFormatter;
    case formatterTypes.PLAIN:
      return plainFormatter;
    default:
      return null;
  }
}
