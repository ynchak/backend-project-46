import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';

import parse from './parses/index.js';

const getFullFilePath = (filePath) => resolve(cwd(), filePath);
const getExtFile = (fileName) => extname(fileName);
const getParseData = (filePath) => {
  const fullFilePath = getFullFilePath(filePath);
  const ext = getExtFile(filePath);
  const data = readFileSync(fullFilePath);
  return parse(data, ext);
};
export default getParseData;
