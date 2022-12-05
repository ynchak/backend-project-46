import _ from 'lodash';

const normalize = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const lines = node.flatMap((data) => {
      const {
        status, key, value, fromValue, toValue, children,
      } = data;

      switch (status) {
        case 'nested': {
          return iter(children, `${path}${key}.`);
        }
        case 'added': {
          return `Property '${path}${key}' was added with value: ${normalize(value)}`;
        }
        case 'removed': {
          return `Property '${path}${key}' was removed`;
        }
        case 'updated': {
          return `Property '${path}${key}' was updated. From ${normalize(fromValue)} to ${normalize(toValue)}`;
        }
        default:
          return [];
      }
    });
    return lines.join('\n');
  };

  return iter(tree, '');
};
export default plain;
