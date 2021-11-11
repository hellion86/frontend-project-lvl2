#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import { readFileSync } from 'fs';
import * as path from 'path';
import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.0.2')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const firstConfig = readFileSync(path.resolve(filepath1), 'utf-8');
    const secondConfig = readFileSync(path.resolve(filepath2), 'utf-8');
    genDiff(firstConfig, secondConfig);
  })
  .parse();
