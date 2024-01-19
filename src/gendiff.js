import getParseData from './parseData.js';

const statuses = {
  added: '+',
  removed: '-',
  unchanged: ' ',
};

const diffToString = (diff) => {
  const lines = diff.map(
    ({ status, name, value }) => `  ${statuses[status]} ${name}: ${value}\n`
  );
  return ['{\n', ...lines, '}'].join('');
};

const has = (obj, prop) => Object.hasOwn(obj, prop);

const makeDiff = (data1, data2) => {
  const allKeys = [...Object.keys(data1), ...Object.keys(data2)];
  const uniqKeys = [...new Set(allKeys)].toSorted();
  const diff = uniqKeys.flatMap((key) => {
    if (has(data2, key) && !has(data1, key)) {
      return { status: 'added', name: key, value: data2[key] };
    }
    if (!has(data2, key) && has(data1, key)) {
      return { status: 'removed', name: key, value: data1[key] };
    }
    if (data1[key] === data2[key]) {
      return { status: 'unchanged', name: key, value: data1[key] };
    }
    return [
      { status: 'removed', name: key, value: data1[key] },
      { status: 'added', name: key, value: data2[key] },
    ];
  });
  return diffToString(diff);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getParseData(filepath1);
  const data2 = getParseData(filepath2);
  return makeDiff(data1, data2);
};
export default genDiff;
