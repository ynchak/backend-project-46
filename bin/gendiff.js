#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

const getDiff = (filepath1, filepath2) => {
  const { format } = program.opts();
  console.log(genDiff(filepath1, filepath2, format));
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action(getDiff);

program.parse(process.argv);
