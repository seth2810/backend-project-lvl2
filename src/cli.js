import { createRequire } from 'module';

import commander from 'commander';

import genDiff from './index.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const { program } = commander;

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((pathToFile1, pathToFile2) => {
    console.log(genDiff(pathToFile1, pathToFile2));
  });

export default function runCli() {
  program.parse(process.argv);
}
