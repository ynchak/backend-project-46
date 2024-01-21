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
  return uniqKeys.reduce((diff, key) => {
    const valueBefore = before[key];
    const valueAfter = after[key];
    if (!has(before, key) && has(after, key)) {
      return { ...diff, [key]: { status: 'added', valueAfter } };
    }
    if (has(before, key) && !has(after, key)) {
      return { ...diff, [key]: { status: 'removed', valueBefore } };
    }
    if (valueBefore === valueAfter) {
      return { ...diff, [key]: { status: 'unchanged', valueBefore } };
    }
    return { ...diff, [key]: { status: 'updated', valueBefore, valueAfter } };
  }, {});
};

export default buildDiff;
