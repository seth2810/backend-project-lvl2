import _ from 'lodash';

import { diffTypes } from '../diff.js';

const buildFullPath = (path, key) => _.compact([path, key]).join('.');

const stringify = (data) => {
  if (_.isPlainObject(data)) {
    return '[complex value]';
  }

  if (_.isString(data)) {
    return `'${data}'`;
  }

  return data;
};

const format = (diff) => {
  const iter = (innerDiff, path) => {
    const diffLines = innerDiff.flatMap((item) => {
      const { type, key } = item;
      const itemPath = buildFullPath(path, key);

      switch (type) {
        case diffTypes.UNCHANGED:
          return [];
        case diffTypes.NESTED:
          return iter(item.children, itemPath);
        case diffTypes.CHANGED:
          return `Property '${itemPath}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
        case diffTypes.ADDED:
          return `Property '${itemPath}' was added with value: ${stringify(item.value)}`;
        case diffTypes.DELETED:
          return `Property '${itemPath}' was removed`;
        default:
          throw new Error(`Unable to format type '${type}'`);
      }
    });

    return diffLines.join('\n');
  };

  return iter(diff, null);
};

export default format;
