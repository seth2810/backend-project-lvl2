import YAML from 'js-yaml';
import INI from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': YAML.safeLoad,
  '.ini': INI.parse,
};

const parse = (content, extension) => {
  const parser = parsers[extension];

  return parser(content);
};

export default parse;
