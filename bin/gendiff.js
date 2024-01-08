#!/usr/bin/env node

import { program } from 'commander';

const getDiff = (filepath1, filepath2) => {
  console.log(filepath1, filepath2);
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action(getDiff);

program.parse(process.argv);
