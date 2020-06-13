import fs from 'fs';
import path from 'path';
import YAML from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': YAML.safeLoad,
};

export default function parseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath);
  const { [extension]: parser } = parsers;

  return parser(content);
}
