import { readFileSync } from 'node:fs';
import path from 'node:path';

const getData = (file) => JSON.parse(readFileSync(file));
const getFilePath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

export { getData, getFilePath };