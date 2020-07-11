import _ from 'lodash';

export const diffTypes = Object.freeze({
  ADDED: 'added',
  NESTED: 'nested',
  EQUALS: 'equals',
  REMOVED: 'removed',
  CHANGED: 'changed',
});

const getKeyDiff = (key, left, right, getDiff) => {
  if (!_.has(right, key)) {
    return { value: left[key], type: diffTypes.REMOVED, key };
  }

  if (!_.has(left, key)) {
    return { value: right[key], type: diffTypes.ADDED, key };
  }

  const leftValue = left[key];
  const rightValue = right[key];

  if (_.isPlainObject(leftValue) && _.isPlainObject(rightValue)) {
    return { children: getDiff(leftValue, rightValue), type: diffTypes.NESTED, key };
  }

  if (leftValue === rightValue) {
    return { value: leftValue, type: diffTypes.EQUALS, key };
  }

  return {
    left: leftValue, right: rightValue, type: diffTypes.CHANGED, key,
  };
};

const buildDiff = (left, right) => {
  const keysUnion = _.union(Object.keys(left), Object.keys(right)).sort();

  return keysUnion.map((key) => getKeyDiff(key, left, right, buildDiff));
};

export default buildDiff;
