import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const firstConfig = getFixturePath('file1.json');
const secondConfig = getFixturePath('file2.json');

/*
  define constants of new test yaml files (getFixturePath)
  make expectedDiff for Json and for Yaml files
*/

test('genDiff firstConfig of secondConfig', () => {
  const expected = readFile('diffResult.txt');
  expect(genDiff(firstConfig, secondConfig)).toBe(expected);
});
