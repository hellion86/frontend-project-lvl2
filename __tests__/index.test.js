import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const firstConfig = getFixturePath('file1.json');
const secondConfig = getFixturePath('file2.json');
const expectedDiff = readFileSync(getFixturePath('expectedDiff'), 'utf-8');

test('genDiff firstConfig of secondConfig', () => {
  expect(genDiff(firstConfig, secondConfig)).toEqual(console.log(expectedDiff));
});
