#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import * as path from 'path';
import { genDiff } from './index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(path.resolve(filepath1));
    console.log(path.resolve(filepath2));
    console.log(`Current directory: ${cwd()}`);
    const result1 = readFileSync(path.resolve(filepath1), 'utf-8');
    const result2 = readFileSync(path.resolve(filepath2), 'utf-8');
    console.log(result1);
    console.log(result2);
  })
  .parse();
