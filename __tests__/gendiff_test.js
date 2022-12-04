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
