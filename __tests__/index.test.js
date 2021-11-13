import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import fs from 'fs';
import { genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const firstJsonConfig = getFixturePath('file1.json');
const secondJsonConfig = getFixturePath('file2.json');
const firstYamlConfig = getFixturePath('file1.yml');
const secondYamlConfig = getFixturePath('file2.yml');

test('Test YAML diff', () => {
  const expected = readFile('diffResult.txt');
  expect(genDiff(firstYamlConfig, secondYamlConfig)).toBe(expected);
});

test('Test JSON diff', () => {
  const expected = readFile('diffResult.txt');
  expect(genDiff(firstJsonConfig, secondJsonConfig)).toBe(expected);
});
