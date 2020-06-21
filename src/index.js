import fs from 'fs';
import path from 'path';

import parse from './parsers.js';
import buildDiff from './diff.js';
import { getFormatterTypes, getFormatter, defaultFormatterType } from './formatters/index.js';

export const genDiff = (pathToFile1, pathToFile2, format) => {
  const fileContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const fileExtension1 = path.extname(pathToFile1);
  const fileData1 = parse(fileContent1, fileExtension1);

  const fileContent2 = fs.readFileSync(pathToFile2, 'utf-8');
  const fileExtension2 = path.extname(pathToFile2);
  const fileData2 = parse(fileContent2, fileExtension2);

  const diff = buildDiff(fileData1, fileData2);

  const formatDiff = getFormatter(format);

  return formatDiff(diff);
};

export { getFormatterTypes, defaultFormatterType };
