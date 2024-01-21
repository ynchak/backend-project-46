const has = (obj, prop) => Object.hasOwn(obj, prop);

// const difference = {
//   status: '',
//   valueBefore: '',
//   valueAfter: '',
//   children: [],
// };

const buildDiff = (before, after) => {
  const allKeys = [...Object.keys(before), ...Object.keys(after)];
  const uniqKeys = [...new Set(allKeys)].toSorted();
  const diff = uniqKeys.reduce((acc, key) => {
    const valueBefore = before[key];
    const valueAfter = after[key];
    if (!has(before, key) && has(after, key)) {
      return { ...acc, [key]: { status: 'added', valueAfter } };
    }
    if (has(before, key) && !has(after, key)) {
      return { ...acc, [key]: { status: 'removed', valueBefore } };
    }
    if (valueBefore === valueAfter) {
      return { ...acc, [key]: { status: 'unchanged', valueBefore } };
    }
    return { ...acc, [key]: { status: 'updated', valueBefore, valueAfter } };
  }, {});
  return diff;
};

export default buildDiff;
