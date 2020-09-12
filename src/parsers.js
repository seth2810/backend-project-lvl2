import ini from 'ini';
import _ from 'lodash';
import yaml from 'js-yaml';

// @see https://github.com/npm/ini/issues/75
const isNumericLike = (value) => !Number.isNaN(parseFloat(value));

const convertNumericLike = (data) => _.mapValues(data, (value) => {
  if (_.isObject(value)) {
    return convertNumericLike(value);
  }

  if (isNumericLike(value)) {
    return parseFloat(value);
  }

  return value;
});

const parseIni = (content) => {
  const data = ini.parse(content);

  return convertNumericLike(data);
};

const parsers = {
  ini: parseIni,
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const parse = (content, type) => {
  const parseContent = parsers[type];

  return parseContent(content);
};

export default parse;
