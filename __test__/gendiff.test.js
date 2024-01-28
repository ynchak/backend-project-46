import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

it.each([
  ['json', 'json'],
  ['yml', 'yml'],
  ['json', 'json', 'stylish'],
  ['yml', 'yml', 'stylish'],
  ['json', 'json', 'plain'],
  ['yml', 'yml', 'plain'],
  ['json', 'json', 'json'],
  ['yml', 'yml', 'json'],
])('gendiff(%s, %s, %s)', (ext1, ext2, format = 'stylish') => {
  const pathTofile1 = getFixturePath(`file1.${ext1}`);
  const pathTofile2 = getFixturePath(`file2.${ext2}`);
  const result = readFileSync(getFixturePath(`result.${format}.txt`), 'utf8');
  expect(genDiff(pathTofile1, pathTofile2, format)).toEqual(result);
});
