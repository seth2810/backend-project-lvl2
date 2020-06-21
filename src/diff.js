import _ from 'lodash';

export const diffTypes = Object.freeze({
  ADDED: 'added',
  NESTED: 'nested',
  EQUALS: 'equals',
  REMOVED: 'removed',
  CHANGED: 'changed',
});

const getKeyDiff = (key, object1, object2, getDiff) => {
  if (!_.has(object2, key)) {
    return { value: object1[key], type: diffTypes.REMOVED, key };
  }

  if (!_.has(object1, key)) {
    return { value: object2[key], type: diffTypes.ADDED, key };
  }

  const value1 = object1[key];
  const value2 = object2[key];

  if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
    return { children: getDiff(value1, value2), type: diffTypes.NESTED, key };
  }

  if (value1 === value2) {
    return { value: value1, type: diffTypes.EQUALS, key };
  }

  return {
    left: value1, right: value2, type: diffTypes.CHANGED, key,
  };
};

const buildDiff = (object1, object2) => {
  const keysUnion = _.union(Object.keys(object1), Object.keys(object2)).sort();

  const diff = keysUnion.map((key) => getKeyDiff(key, object1, object2, buildDiff));

  return diff;
};

export default buildDiff;
