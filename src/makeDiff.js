import _ from 'lodash';

const makeDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sorted = _.sortBy(keys);
  const diff = sorted.flatMap((key) => {
    if (!_.has(data1, key)) {
      return { status: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { status: 'removed', key, value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { status: 'nested', key, children: makeDiff(data1[key], data2[key]) };
    }
    if (data1[key] !== data2[key]) {
      return {
        status: 'updated', key, fromValue: data1[key], toValue: data2[key],
      };
    }
    return { status: 'unchanged', key, value: data1[key] };
  });
  return diff;
};
export default makeDiff;
