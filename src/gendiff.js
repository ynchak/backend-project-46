import buildDiff from './buildDiff.js';
import formatDiff from './formaters/index.js';
import getParseData from './parseData.js';

const genDiff = (pathTofile1, pathTofile2, format = 'stylish') => {
  const dataBefore = getParseData(pathTofile1);
  const dataAfter = getParseData(pathTofile2);
  const diff = buildDiff(dataBefore, dataAfter);
  return formatDiff(diff, format);
};
export default genDiff;
