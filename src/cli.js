import { createRequire } from 'module';

import commander from 'commander';

import genDiff from './index.js';
import { formatterTypes } from './formatters/index.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const { program } = commander;

const formatters = Object.values(formatterTypes).join('|');

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option(`-f, --format [${formatters}]`, 'output format', formatterTypes.STYLISH)
  .arguments('<filepath1> <filepath2>')
  .action((pathToFile1, pathToFile2) => {
    console.log(genDiff(pathToFile1, pathToFile2, program.format));
  });

export default function runCli() {
  program.parse(process.argv);
}
