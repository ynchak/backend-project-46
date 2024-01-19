import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  join(__dirname, '..', '__fixtures__', filename);
let result;
beforeEach(() => {
  const resultFile = getFixturePath('resultFlat.txt');
  result = readFileSync(resultFile, 'utf8');
});
test('flat json test', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toBe(result);
});
