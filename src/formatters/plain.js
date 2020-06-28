import _ from 'lodash';

import { diffTypes } from '../diff.js';

const buildFullPath = (path, key) => [path, key].filter(Boolean).join('.');

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const formatters = {
  [diffTypes.NESTED]: ({ key, children }, path, formatter) => (
    formatter(children, buildFullPath(path, key))
  ),
  [diffTypes.CHANGED]: ({ key, left, right }, path) => (
    `Property '${buildFullPath(path, key)}' was changed from ${stringify(left)} to ${stringify(right)}`
  ),
  [diffTypes.ADDED]: ({ key, value }, path) => (
    `Property '${buildFullPath(path, key)}' was added with value: ${stringify(value)}`
  ),
  [diffTypes.REMOVED]: ({ key }, path) => (
    `Property '${buildFullPath(path, key)}' was deleted`
  ),
};

const format = (diff, path = null) => {
  const diffLines = diff.filter(({ type }) => type !== diffTypes.EQUALS).map((item) => {
    const { type } = item;

    const formatDiff = formatters[type];

    if (typeof formatDiff !== 'function') {
      throw new Error(`Unable to format type '${type}'`);
    }

    return formatDiff(item, path, format);
  });

  return diffLines.filter(Boolean).join('\n');
};

export default format;
