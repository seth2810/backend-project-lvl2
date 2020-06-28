import _ from 'lodash';

import buildDiff, { diffTypes } from '../diff.js';

const diffSigns = Object.freeze({
  [diffTypes.ADDED]: '+',
  [diffTypes.REMOVED]: '-',
});

const getIndent = (depth) => ' '.repeat(depth * 2);

const formatDiffType = (type, key, value, depth, formatter) => {
  const indent = getIndent(depth + 1);
  const { [type]: sign = '' } = diffSigns;
  const signAlligned = sign.padEnd(2, ' ');
  const valueFormatted = _.isPlainObject(value)
    ? formatter(buildDiff(value, value), depth + 2)
    : value;

  return `${indent}${signAlligned}${key}: ${valueFormatted}`;
};

const formatters = {
  [diffTypes.CHANGED]: ({ key, left, right }, depth, formatDiff) => [
    formatDiffType(diffTypes.REMOVED, key, left, depth, formatDiff),
    formatDiffType(diffTypes.ADDED, key, right, depth, formatDiff),
  ],
  [diffTypes.NESTED]: ({ type, key, children }, depth, formatDiff) => [
    formatDiffType(type, key, formatDiff(children, depth + 2), depth),
  ],
  [diffTypes.EQUALS]: ({ type, key, value }, depth, formatDiff) => [
    formatDiffType(type, key, value, depth, formatDiff),
  ],
  [diffTypes.ADDED]: ({ type, key, value }, depth, formatDiff) => [
    formatDiffType(type, key, value, depth, formatDiff),
  ],
  [diffTypes.REMOVED]: ({ type, key, value }, depth, formatDiff) => [
    formatDiffType(type, key, value, depth, formatDiff),
  ],
};

const format = (diff, depth = 0) => {
  const diffLines = diff.flatMap((item) => {
    const { type } = item;

    const formatDiff = formatters[type];

    if (typeof formatDiff !== 'function') {
      throw new Error(`Unable to format type '${type}'`);
    }

    return formatDiff(item, depth, format);
  });

  const content = diffLines.join('\n');
  const bracketsIndent = getIndent(depth);

  return `{\n${content}\n${bracketsIndent}}`;
};

export default format;
