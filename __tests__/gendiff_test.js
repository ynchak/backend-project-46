import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Flat json files', () => {
  const firstFile = getFixturePath('flat1.json');
  const secondFile = getFixturePath('flat2.json');
  const resultFile = readFile('flat-result.txt');
  expect(genDiff(firstFile, secondFile)).toBe(resultFile);
});
test('Flat yml files', () => {
  const firstFile = getFixturePath('flat1.yml');
  const secondFile = getFixturePath('flat2.yml');
  const resultFile = readFile('flat-result.txt');
  expect(genDiff(firstFile, secondFile)).toBe(resultFile);
});
test('Nested json files', () => {
  const firstFile = getFixturePath('nested-file1.json');
  const secondFile = getFixturePath('nested-file2.json');
  const resultFile = readFile('nested-result.txt');
  expect(genDiff(firstFile, secondFile)).toBe(resultFile);
});
test('Nested yaml files', () => {
  const firstFile = getFixturePath('nested-file1.yaml');
  const secondFile = getFixturePath('nested-file2.yaml');
  const resultFile = readFile('nested-result.txt');
  expect(genDiff(firstFile, secondFile)).toBe(resultFile);
});
test('Nested json files output plain', () => {
  const firstFile = getFixturePath('nested-file1.json');
  const secondFile = getFixturePath('nested-file2.json');
  const resultFile = readFile('plain-result.txt');
  expect(genDiff(firstFile, secondFile, 'plain')).toBe(resultFile);
});
test('Nested yaml files output plain', () => {
  const firstFile = getFixturePath('nested-file1.yaml');
  const secondFile = getFixturePath('nested-file2.yaml');
  const resultFile = readFile('plain-result.txt');
  expect(genDiff(firstFile, secondFile, 'plain')).toBe(resultFile);
});
test('Nested yaml files output json', () => {
  const firstFile = getFixturePath('nested-file1.yaml');
  const secondFile = getFixturePath('nested-file2.yaml');
  const resultFile = readFile('json-result.txt');
  expect(genDiff(firstFile, secondFile, 'json')).toBe(resultFile);
});
test('Nested json files output json', () => {
  const firstFile = getFixturePath('nested-file1.json');
  const secondFile = getFixturePath('nested-file2.json');
  const resultFile = readFile('json-result.txt');
  expect(genDiff(firstFile, secondFile, 'json')).toBe(resultFile);
});
