import { getParseData } from './parseData.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = getParseData(filepath1);
  const data2 = getParseData(filepath2);
  console.log(data1);
  console.log(data2);
};
export default genDiff;
