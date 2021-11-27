import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const firstJsonConfig = getFixturePath('file1.json');
const secondJsonConfig = getFixturePath('file2.json');
const firstYamlConfig = getFixturePath('file1.yml');
const secondYamlConfig = getFixturePath('file2.yml');

test('first stylish YAML diff', () => {
  const expected = readFile('diffResultStylish.txt');
  expect(genDiff(firstYamlConfig, secondYamlConfig, 'stylish')).toBe(expected);
});

test('secont stylish JSON diff', () => {
  const expected = readFile('diffResultStylish.txt');
  expect(genDiff(firstJsonConfig, secondJsonConfig, 'stylish')).toBe(expected);
});

test('first plain YAML diff', () => {
  const expected = readFile('diffResultPlain.txt');
  expect(genDiff(firstYamlConfig, secondYamlConfig, 'plain')).toBe(expected);
});

test('second plain JSON diff', () => {
  const expected = readFile('diffResultPlain.txt');
  expect(genDiff(firstJsonConfig, secondJsonConfig, 'plain')).toBe(expected);
});

test('first json parser of JSON diff', () => {
  const expected = readFile('diffResultJSON.txt');
  expect(genDiff(firstJsonConfig, secondJsonConfig, 'json')).toBe(expected);
});
