import { has, isObject } from 'lodash-es';

// const difference = {
//   status: '',
//   valueBefore: '',
//   valueAfter: '',
//   children: [],
// };

const buildDiff = (before, after) => {
  const allKeys = [...Object.keys(before), ...Object.keys(after)];
  const uniqKeys = [...new Set(allKeys)].toSorted();
  return uniqKeys.reduce((diff, key) => {
    const valueBefore = before[key];
    const valueAfter = after[key];
    if (!has(before, key) && has(after, key)) {
      return { ...diff, [key]: { status: 'added', value: valueAfter } };
    }
    if (has(before, key) && !has(after, key)) {
      return { ...diff, [key]: { status: 'removed', value: valueBefore } };
    }
    if (valueBefore === valueAfter) {
      return { ...diff, [key]: { status: 'unchanged', value: valueBefore } };
    }
    if (isObject(valueBefore) && isObject(valueAfter)) {
      const value = buildDiff(valueBefore, valueAfter);
      return { ...diff, [key]: { status: 'nested', value } };
    }
    return {
      ...diff,
      [key]: { status: 'updated', value: valueBefore, valueAfter },
    };
  }, {});
};

export default buildDiff;
