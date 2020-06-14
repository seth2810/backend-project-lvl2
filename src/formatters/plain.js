import _ from 'lodash';

import { diffTypes } from '../diff.js';

const buildFullPath = (path, key) => (path ? `${path}.${key}` : key);

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const formatters = [
  {
    condition: ({ type }) => type === diffTypes.NESTED,
    process: ({ key, children }, path, formatter) => formatter(children, buildFullPath(path, key)),
  },
  {
    condition: ({ type }) => type === diffTypes.CHANGED,
    process: ({ key, left, right }, path) => (
      `Property '${buildFullPath(path, key)}' was changed from ${stringify(left)} to ${stringify(right)}`
    ),
  },
  {
    condition: ({ type }) => type === diffTypes.ADDED,
    process: ({ key, value }, path) => (
      `Property '${buildFullPath(path, key)}' was added with value: ${stringify(value)}`
    ),
  },
  {
    condition: ({ type }) => type === diffTypes.REMOVED,
    process: ({ key }, path) => (
      `Property '${buildFullPath(path, key)}' was deleted`
    ),
  },
];

export default function format(diff, path = null) {
  const diffLines = diff.map((item) => {
    const formatter = formatters.find(({ condition }) => condition(item));

    if (formatter) {
      return formatter.process(item, path, format);
    }

    return null;
  }, []);

  return diffLines.filter(Boolean).join('\n');
}
