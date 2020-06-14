import parse from './parsers.js';
import buildDiff from './diff.js';
import formatStylish from './stylish.js';

const formatters = {
  stylish: formatStylish,
};

export default function genDiff(pathToFile1, pathToFile2, format) {
  const fileData1 = parse(pathToFile1);
  const fileData2 = parse(pathToFile2);
  const { [format]: formatter } = formatters;
  const diff = buildDiff(fileData1, fileData2);

  return formatter(diff);
}
