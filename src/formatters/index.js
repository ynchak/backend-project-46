import stylish from './stylish.js';

const formatters = {
  stylish,
  // 'plain': plain,
};

const formatOutput = (diff, format) => {
  if (!Object.hasOwn(formatters, format)) {
    throw new Error(`unknown format: ${format}`);
  }
  return formatters[format](diff);
};

export default formatOutput;
