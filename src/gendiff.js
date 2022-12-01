import _ from 'lodash'
import { getData, getFile } from "./utils.js";

const makeDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  const diff = keys.flatMap((key) => {
    if (!_.has(data1, key)) {
      return { status: 'added', key: [key], value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { status: 'removed', key: [key], value: data1[key] };
    }
    if (data1[key] === data2[key]) {
      return { status: 'unchanged', key: [key], value: data1[key] };
    }
    return [
      { status: 'removed', key: [key], value: data1[key] },
      { status: 'added', key: [key], value: data2[key] },
    ]
  });
  return diff;
}

const diffToString = (diff) => diff.map((item) => {
  const { status, key, value } = item;
  switch (status) {
    case 'added':
      return `  + ${key}: ${value}`;
    case 'removed':
      return `  - ${key}: ${value}`;
    case 'unchanged':
      return `    ${key}: ${value}`
    default:
      break;
  }
}).join('\n');

const genDiff = (fileToPath1, fileToPath2) => {
  const [file1, file2] = [getFile(fileToPath1), getFile(fileToPath2)];
  const [data1, data2] = [getData(file1), getData(file2)];
  const diff =  makeDiff(data1, data2);
  return `{\n${diffToString(diff)}\n}`;
}
export default genDiff;