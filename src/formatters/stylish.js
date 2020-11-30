import _ from 'lodash';

import { diffTypes } from '../diff.js';

const indentStep = 4;

const getIndent = (size) => ' '.repeat(size);

const wrapLines = (lines, depth) => `{\n${lines.join('\n')}\n${getIndent(depth)}}`;

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return value;
  }

  const entries = Object.entries(value);
  const innerDepth = depth + indentStep;
  const lines = entries.map(([key, child]) => `${getIndent(innerDepth)}${key}: ${stringify(child, innerDepth)}`);

  return wrapLines(lines, depth);
};

const mappings = {
  [diffTypes.NESTED]: ({ key, children }, depth, iter) => `${getIndent(depth)}    ${key}: ${iter(children, depth + indentStep)}`,
  [diffTypes.ADDED]: ({ key, value }, depth) => `${getIndent(depth)}  + ${key}: ${stringify(value, depth + indentStep)}`,
  [diffTypes.DELETED]: ({ key, value }, depth) => `${getIndent(depth)}  - ${key}: ${stringify(value, depth + indentStep)}`,
  [diffTypes.UNCHANGED]: ({ key, value }, depth) => `${getIndent(depth)}    ${key}: ${stringify(value, depth + indentStep)}`,
  [diffTypes.CHANGED]: ({ key, value1, value2 }, depth) => [
    `${getIndent(depth)}  - ${key}: ${stringify(value1, depth + indentStep)}`,
    `${getIndent(depth)}  + ${key}: ${stringify(value2, depth + indentStep)}`,
  ],
};

export default (diff) => {
  const iter = (nodes, depth) => {
    const lines = nodes.flatMap((node) => {
      const { type } = node;

      return mappings[type](node, depth, iter);
    });

    return wrapLines(lines, depth);
  };

  return iter(diff, 0);
};
