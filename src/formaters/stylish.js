import { isObject } from 'lodash-es';

const stringify = (data, depth) => {
  if (!isObject(data)) {
    return `${data}`;
  }
  const lines = Object.entries(data).map(([key, value]) => {
    const indent = ' '.repeat(4 * depth - 2);
    return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
  });
  const indent = ' '.repeat(4 * (depth - 1));
  return ['{', ...lines, `${indent}}`].join('\n');
};

export default (data) => {
  const stylish = (diff, depth) => {
    const spaceCount = 4;
    const indent = ' '.repeat(spaceCount * depth - 2);
    const lastIndent = ' '.repeat(spaceCount * (depth - 1));
    const entries = Object.entries(diff);
    const lines = entries.flatMap(([key, { status, value, valueAfter }]) => {
      switch (status) {
        case 'added': {
          return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
        }
        case 'removed': {
          return `${indent}- ${key}: ${stringify(value, depth + 1)}`;
        }
        case 'unchanged': {
          return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
        }
        case 'updated': {
          return [
            `${indent}- ${key}: ${stringify(value, depth + 1)}`,
            `${indent}+ ${key}: ${stringify(valueAfter, depth + 1)}`,
          ];
        }
        case 'nested': {
          return `${indent}  ${key}: ${stringify(stylish(value, depth + 1))}`;
        }
        default:
          throw new Error('');
      }
    });
    return ['{', ...lines, `${lastIndent}}`].join('\n');
  };
  return stylish(data, 1);
};
