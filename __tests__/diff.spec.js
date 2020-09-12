import { genDiff } from '../src/index.js';

import helpers from './helpers';

describe('diff', () => {
  const stylishResult = helpers.readFixture('stylish-result.txt');
  const plainResult = helpers.readFixture('plain-result.txt');
  const jsonResult = helpers.readFixture('json-result.txt');

  test.each(['json', 'yml', 'ini'])('should return correct diffs between two %s files', (type) => {
    const pathToFile1 = helpers.resolveFixturePath(`file1.${type}`);
    const pathToFile2 = helpers.resolveFixturePath(`file2.${type}`);

    expect(genDiff(pathToFile1, pathToFile2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(plainResult);
    expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(jsonResult);
  });
});
