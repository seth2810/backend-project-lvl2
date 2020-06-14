import _ from 'lodash';

export const diffTypes = Object.freeze({
  ADDED: 'added',
  NESTED: 'nested',
  EQUALS: 'equals',
  REMOVED: 'removed',
  CHANGED: 'changed',
});

const diffBuilders = [
  {
    type: diffTypes.NESTED,
    condition: (left, right) => _.isPlainObject(left) && _.isPlainObject(right),
    build: (left, right, getDiff) => ({ children: getDiff(left, right) }),
  },
  {
    type: diffTypes.EQUALS,
    condition: (left, right) => left === right,
    build: (value) => ({ value }),
  },
  {
    type: diffTypes.ADDED,
    condition: (left) => left === undefined,
    build: (left, right) => ({ value: right }),
  },
  {
    type: diffTypes.REMOVED,
    condition: (left, right) => right === undefined,
    build: (value) => ({ value }),
  },
  {
    type: diffTypes.CHANGED,
    condition: () => true,
    build: (left, right) => ({ left, right }),
  },
];

export default function buildDiff(object1, object2) {
  const keysUnion = _.union(Object.keys(object1), Object.keys(object2)).sort();

  const diff = keysUnion.map((key) => {
    const { [key]: value1 } = object1;
    const { [key]: value2 } = object2;
    const { type, build } = diffBuilders.find(({ condition }) => condition(value1, value2));

    return Object.assign(build(value1, value2, buildDiff), { type, key });
  }, []);

  return diff;
}
