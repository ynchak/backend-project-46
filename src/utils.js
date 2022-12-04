import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';

const getFormat = (file) => path.extname(file);
const getData = (file) => {
  const data = readFileSync(file);
  const format = getFormat(file);
  return parse(data, format);
};
const getFilePath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

export { getData, getFilePath };
