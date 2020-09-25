import _ from 'lodash';

export const diffTypes = Object.freeze({
  ADDED: 'added',
  NESTED: 'nested',
  DELETED: 'deleted',
  CHANGED: 'changed',
  UNCHANGED: 'unchanged',
});

const getKeyDiff = (key, object1, object2, getDiff) => {
  if (!_.has(object2, key)) {
    return { key, type: diffTypes.DELETED, value: object1[key] };
  }

  if (!_.has(object1, key)) {
    return { key, type: diffTypes.ADDED, value: object2[key] };
  }

  const value1 = object1[key];
  const value2 = object2[key];

  if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
    return { key, type: diffTypes.NESTED, children: getDiff(value1, value2) };
  }

  if (value1 === value2) {
    return { key, type: diffTypes.UNCHANGED, value: value1 };
  }

  return {
    key, type: diffTypes.CHANGED, value1, value2,
  };
};

const buildDiff = (left, right) => {
  const keysUnion = _.union(Object.keys(left), Object.keys(right));
  const sortedKeys = _.sortBy(keysUnion);

  return sortedKeys.map((key) => getKeyDiff(key, left, right, buildDiff));
};

export default buildDiff;
