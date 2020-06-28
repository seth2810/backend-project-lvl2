import YAML from 'js-yaml';
import INI from 'ini';

const parsers = {
  json: JSON.parse,
  yml: YAML.safeLoad,
  ini: INI.parse,
};

const parse = (content, type) => {
  const parseContent = parsers[type];

  return parseContent(content);
};

export default parse;
