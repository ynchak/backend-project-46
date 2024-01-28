import { isPlainObject, isString } from 'lodash-es';

const stringify = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
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
      const newPath = [...path, key].join('.');
      const stringifyValue = stringify(value);
      const stringifiedAfter = stringify(valueAfter);
      switch (status) {
        case 'added':
          return `Property '${newPath}' was added with value: ${stringifyValue}`;

        case 'removed':
          return `Property '${newPath}' was removed`;

        case 'unchanged':
          return [];

        case 'updated':
          return `Property '${newPath}' was updated. From ${stringifyValue} to ${stringifiedAfter}`;

        case 'nested':
          return plain(value, [...path, key]);
        default:
          throw new Error('');
      }
    });
    return lines.join('\n');
  };
  return plain(data, []);
};
