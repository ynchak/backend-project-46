import { isPlainObject, isString } from 'lodash-es';

const stringify = (value) => {
  if (isPlainObject(value)) {
    return `[complex value]`;
  }
  if (isString(value)) {
    return `'${value}'`;
  }
  return value;
};

export default (data) => {
  const plain = (diff, path) => {
    const entries = Object.entries(diff);
    const lines = entries.flatMap(([key, { status, value, valueAfter }]) => {
      const newPath = [...path, key];
      switch (status) {
        case 'added':
          return `Property '${newPath.join(
            '.'
          )}' was added with value: ${stringify(value)}`;

        case 'removed':
          return `Property '${newPath.join('.')}' was removed`;

        case 'unchanged':
          return [];

        case 'updated':
          return `Property '${newPath.join('.')}' was updated. From ${stringify(
            value
          )} to ${stringify(valueAfter)}`;

        case 'nested':
          return plain(value, newPath);
        default:
          throw new Error('');
      }
    });
    return lines.join('\n');
  };
  return plain(data, []);
};
