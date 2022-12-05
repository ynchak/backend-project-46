import { getData, getFilePath } from './utils.js';
import makeDiff from './makeDiff.js';
import formatOutput from './formatters/index.js';

const genDiff = (fileToPath1, fileToPath2, format = 'stylish') => {
  const [file1, file2] = [getFilePath(fileToPath1), getFilePath(fileToPath2)];
  const [data1, data2] = [getData(file1), getData(file2)];
  const diff = makeDiff(data1, data2);
  console.log(format)
  return formatOutput(diff, format);
};
export default genDiff;
