import { createRequire } from 'module';

import commander from 'commander';

import { getFormatterTypes, defaultFormatterType, genDiff } from './index.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const { program } = commander;

const runCli = () => {
  const formatterTypes = getFormatterTypes();
  const formatterOptions = formatterTypes.join('|');

  program
    .version(version)
    .description('Compares two configuration files and shows a difference.')
    .option(`-f, --format [${formatterOptions}]`, 'output format', defaultFormatterType)
    .arguments('<filepath1> <filepath2>')
    .action((pathToFile1, pathToFile2) => {
      console.log(genDiff(pathToFile1, pathToFile2, program.format));
    });

  program.parse(process.argv);
};

export default runCli;
