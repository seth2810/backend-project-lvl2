import _ from 'lodash';

import buildDiff, { diffTypes } from './diff.js';

const diffSigns = Object.freeze({
  [diffTypes.ADDED]: '+',
  [diffTypes.REMOVED]: '-',
});

const getIndent = (depth) => ' '.repeat(depth * 2);

function formatDiffType(type, key, value, depth, formatter) {
  const indent = getIndent(depth + 1);
  const { [type]: sign = '' } = diffSigns;
  const signAlligned = sign.padEnd(2, ' ');
  const valueFormatted = _.isPlainObject(value)
    ? formatter(buildDiff(value, value), depth + 2)
    : value;

  return `${indent}${signAlligned}${key}: ${valueFormatted}`;
}

const formatters = [
  {
    condition: ({ type }) => type === diffTypes.CHANGED,
    process: ({ key, left, right }, depth, formatter) => [
      formatDiffType(diffTypes.REMOVED, key, left, depth, formatter),
      formatDiffType(diffTypes.ADDED, key, right, depth, formatter),
    ],
  },
  {
    condition: ({ type }) => type === diffTypes.NESTED,
    process: ({ type, key, children }, depth, formatter) => [
      formatDiffType(type, key, formatter(children, depth + 2), depth),
    ],
  },
  {
    condition: () => true,
    process: ({ type, key, value }, depth, formatter) => [
      formatDiffType(type, key, value, depth, formatter),
    ],
  },
];

export default function format(diff, depth = 0) {
  const diffLines = diff.flatMap((item) => {
    const formatter = formatters.find(({ condition }) => condition(item));

    return formatter.process(item, depth, format);
  });

  const content = diffLines.join('\n');
  const bracketsIndent = getIndent(depth);

  return `{\n${content}\n${bracketsIndent}}`;
}
