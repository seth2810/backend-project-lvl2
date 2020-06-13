import fs from 'fs';
import path from 'path';
import YAML from 'js-yaml';
import INI from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': YAML.safeLoad,
  '.ini': INI.parse,
};

export default function parseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath);
  const { [extension]: parser } = parsers;

  return parser(content);
}
