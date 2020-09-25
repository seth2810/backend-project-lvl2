import fs from 'fs';
import url from 'url';
import path from 'path';

import genDiff from '../src/index.js';

const currentFilePath = url.fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

const getFixturePath = (relativePath) => path.resolve(currentDirectory, '..', '__fixtures__', relativePath);

const readFixture = (relativePath) => fs.readFileSync(getFixturePath(relativePath), 'utf-8').trim();

describe('diff', () => {
  const stylishResult = readFixture('stylish-result.txt');
  const plainResult = readFixture('plain-result.txt');
  const jsonResult = readFixture('json-result.txt');

  test.each(['json', 'yml', 'ini'])('should return correct diffs between two %s files', (type) => {
    const pathToFile1 = getFixturePath(`file1.${type}`);
    const pathToFile2 = getFixturePath(`file2.${type}`);

    expect(genDiff(pathToFile1, pathToFile2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(plainResult);
    expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(jsonResult);
  });
});
