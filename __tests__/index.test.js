import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const firstConfig = getFixturePath('file1.json');
const secondConfig = getFixturePath('file2.json');

/*
  define constants of new test yaml files (getFixturePath)
  make expectedDiff for Json and for Yaml files
*/

test('genDiff firstConfig of secondConfig', () => {
  const expected = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;
  expect(genDiff(firstConfig, secondConfig)).toEqual(expected);
});
