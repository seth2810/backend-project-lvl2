import fs from 'fs';

import _ from 'lodash';

const diffType = Object.freeze({
  ADDED: 'added',
  EQUALS: 'equals',
  REMOVED: 'removed',
  CHANGED: 'changed',
});

const diffSigns = Object.freeze({
  [diffType.ADDED]: '+',
  [diffType.REMOVED]: '-',
});

const getDiffType = (value1, value2) => {
  if (value1 === value2) {
    return diffType.EQUALS;
  }

  if (value1 === undefined) {
    return diffType.ADDED;
  }

  if (value2 === undefined) {
    return diffType.REMOVED;
  }

  return diffType.CHANGED;
};

const getDiff = (object1, object2) => {
  const keysUnion = _.union(Object.keys(object1), Object.keys(object2));

  const diff = keysUnion.map((key) => {
    const { [key]: value1 } = object1;
    const { [key]: value2 } = object2;
    const type = getDiffType(value1, value2);

    return {
      type, key, value1, value2,
    };
  }, []);

  return diff;
};

const getDiffLine = (type, key, value) => {
  const indent = ' '.repeat(2);
  const { [type]: sign = '' } = diffSigns;
  const signAlligned = sign.padEnd(2, ' ');

  return [indent, signAlligned, key, ': ', value].join('');
};

const formatDiff = (diff) => {
  const diffLines = diff.flatMap((item) => {
    const {
      type, key, value1, value2,
    } = item;

    switch (type) {
      case diffType.CHANGED:
        return [
          getDiffLine(diffType.ADDED, key, value2),
          getDiffLine(diffType.REMOVED, key, value1),
        ];
      case diffType.ADDED:
        return [getDiffLine(type, key, value2)];
      default:
        return [getDiffLine(type, key, value1)];
    }
  });

  const content = ['{', ...diffLines, '}'].join('\n');

  return content;
};

export default function genDiff(pathToFile1, pathToFile2) {
  const fileContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const fileContent2 = fs.readFileSync(pathToFile2, 'utf-8');

  const fileData1 = JSON.parse(fileContent1);
  const fileData2 = JSON.parse(fileContent2);
  const diff = getDiff(fileData1, fileData2);

  console.log(formatDiff(diff));
}
