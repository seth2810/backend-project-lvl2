#!/usr/bin/env node

import { createRequire } from 'module';

import program from 'commander';

import genDiff from '../index.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((pathToFile1, pathToFile2, args) => {
    console.log(genDiff(pathToFile1, pathToFile2, args.format));
  });

program.parse(process.argv);
