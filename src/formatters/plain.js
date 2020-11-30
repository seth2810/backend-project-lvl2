import _ from 'lodash';

import { diffTypes } from '../diff.js';

const stringifyPath = (path) => path.join('.');

const stringify = (data) => {
  if (_.isPlainObject(data)) {
    return '[complex value]';
  }

  if (_.isString(data)) {
    return `'${data}'`;
  }

  return data;
};

const mapping = {
  [diffTypes.NESTED]: (path, { children }, iter) => iter(children, path),
  [diffTypes.ADDED]: (path, { value }) => `Property '${stringifyPath(path)}' was added with value: ${stringify(value)}`,
  [diffTypes.DELETED]: (path) => `Property '${stringifyPath(path)}' was removed`,
  [diffTypes.CHANGED]: (path, { value1, value2 }) => `Property '${stringifyPath(path)}' was updated. From ${stringify(value1)} to ${stringify(value2)}`,
  [diffTypes.UNCHANGED]: () => [],
};

export default (diff) => {
  const iter = (nodes, path) => {
    const lines = nodes.flatMap((node) => {
      const { type, key } = node;

      return mapping[type]([...path, key], node, iter);
    });

    return lines.join('\n');
  };

  return iter(diff, []);
};
