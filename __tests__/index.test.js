import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const firstConfig = getFixturePath('file1.json');
const secondConfig = getFixturePath('file2.json');
const thirdConfig = getFixturePath('file3.json');
const fourConfig = getFixturePath('file4.json');

test('genDiff firstConfig of secondConfig', () => {
  const expected = [
    '{',
    '- follow: false',
    '  host: hexlet.io',
    '- proxy: 123.234.53.22',
    '- timeout: 50',
    '+ timeout: 20',
    '+ verbose: true',
    '}'].join('\n');
  expect(genDiff(firstConfig, secondConfig)).toEqual(expected);
});

test('genDiff secondConfig of firstConfig', () => {
  const expected = [
    '{',
    '+ follow: false',
    '  host: hexlet.io',
    '+ proxy: 123.234.53.22',
    '- timeout: 20',
    '+ timeout: 50',
    '- verbose: true',
    '}'].join('\n');
  expect(genDiff(secondConfig, firstConfig)).toEqual(expected);
});

test('genDiff thirdConfig of fourConfig', () => {
  const expected = [
    '{',
    '- follow: false',
    '- host: hexlet.io',
    '- proxy: 123.234.53.22',
    '- timeout: 50',
    '}'].join('\n');
  expect(genDiff(thirdConfig, fourConfig)).toEqual(expected);
});
