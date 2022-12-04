import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount - 2);
const getBracketIndent = (depth) => replacer.repeat(depth * spacesCount - spacesCount);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const entries = Object.entries(data);
  const lines = entries.map(([key, value]) => `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`);

  return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const lines = node.map((data) => {
      const {
        status, key, value, children,
      } = data;

      switch (status) {
        case 'nested': {
          return `${getIndent(depth)}  ${key}: ${iter(children, depth + 1)}`;
        }
        case 'added': {
          return `${getIndent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        }
        case 'removed': {
          return `${getIndent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
        }
        case 'unchanged': {
          return `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
        }
        default:
          throw new Error(`Type ${status} is unknown`);
      }
    });
    return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
  };

  return iter(tree, 1);
};
export default stylish;
