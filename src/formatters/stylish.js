import _ from 'lodash';

import { diffTypes } from '../diff.js';

const indentString = ' '.repeat(2);

export const diffSigns = Object.freeze({
  ADDED: '+',
  DELETED: '-',
});

const wrapInBrackets = (str, closeIndent) => `{\n${str}\n${closeIndent}}`;

const stringify = (key, value, indent, sign = ' ') => {
  const prefix = `${indent}${sign} ${key}: `;

  if (!_.isPlainObject(value)) {
    return `${prefix}${value}`;
  }

  const innerKeys = Object.keys(value);
  const wrapIndent = `${indent}${indentString}`;
  const innerIndent = `${indent}${indentString.repeat(2)}`;
  const lines = innerKeys.map((innerKey) => stringify(innerKey, value[innerKey], innerIndent));
  const content = wrapInBrackets(lines.join('\n'), wrapIndent);

  return `${prefix}${content}`;
};

const format = (diff) => {
  const iter = (innerDiff, depth) => {
    const wrapIndent = indentString.repeat(depth);
    const innerIndent = indentString.repeat(depth + 1);

    const diffLines = innerDiff.flatMap((item) => {
      const { type, key } = item;

      switch (type) {
        case diffTypes.NESTED:
          return stringify(key, iter(item.children, depth + 2), innerIndent);
        case diffTypes.CHANGED:
          return [
            stringify(key, item.value1, innerIndent, diffSigns.DELETED),
            stringify(key, item.value2, innerIndent, diffSigns.ADDED),
          ];
        case diffTypes.UNCHANGED:
          return stringify(key, item.value, innerIndent);
        case diffTypes.ADDED:
          return stringify(key, item.value, innerIndent, diffSigns.ADDED);
        case diffTypes.DELETED:
          return stringify(key, item.value, innerIndent, diffSigns.DELETED);
        default:
          throw new Error(`Unable to format type '${type}'`);
      }
    });

    return wrapInBrackets(diffLines.join('\n'), wrapIndent);
  };

  return iter(diff, 0);
};

export default format;
