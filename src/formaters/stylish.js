const stylish = (diff) => {
  const entries = Object.entries(diff);
  const lines = entries.flatMap(
    ([key, { status, valueBefore, valueAfter }]) => {
      switch (status) {
        case 'added': {
          return `  + ${key}: ${valueAfter}`;
        }
        case 'removed': {
          return `  - ${key}: ${valueBefore}`;
        }
        case 'unchanged': {
          return `    ${key}: ${valueBefore}`;
        }
        case 'updated': {
          return [`  - ${key}: ${valueBefore}`, `  + ${key}: ${valueAfter}`];
        }
        default:
          throw new Error('');
      }
    }
  );
  return ['{', ...lines, '}'].join('\n');
};
export default stylish;
