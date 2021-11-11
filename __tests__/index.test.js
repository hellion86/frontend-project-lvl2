import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { makeCompare, genDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const firstConfig = getFixturePath('file1.json');
const config = getFixturePath('file1-2diff');
const firstConfigToRead = readFileSync(config, 'utf-8');
console.log(firstConfigToRead);
const secondConfig = getFixturePath('file2.json');
const thirdConfig = getFixturePath('file3.json');
const fourConfig = getFixturePath('file4.json');

test('genDiff firstConfig of secondConfig', () => {
  const expected = {
    '- follow': false,
    '  host': 'hexlet.io',
    '- proxy': '123.234.53.22',
    '- timeout': 50,
    '+ timeout': 20,
    '+ verbose': true,
  };
  expect(makeCompare(firstConfig, secondConfig)).toEqual(expected);
});

test('genDiff secondConfig of firstConfig', () => {
  const expected = {
    '+ follow': false,
    '  host': 'hexlet.io',
    '+ proxy': '123.234.53.22',
    '- timeout': 20,
    '+ timeout': 50,
    '- verbose': true,
  };
  expect(makeCompare(secondConfig, firstConfig)).toEqual(expected);
});

test('genDiff thirdConfig of fourConfig', () => {
  const expected = {
    '- follow': true,
    '- host': 'yandex.ru',
    '- proxy': '123.234.53.22',
    '- timeout': 150,
  };
  expect(makeCompare(thirdConfig, fourConfig)).toEqual(expected);
});

test('console.log', () => {
  const result = genDiff(thirdConfig, fourConfig);
  expect(result).toEqual(console.log(firstConfigToRead));
});
