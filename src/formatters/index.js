import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
};

const formatOutput = (diff, format) => {
  if (!Object.hasOwn(formatters, format)) {
    throw new Error(`unknown format: ${format}`);
  }
  return formatters[format](diff);
};

export default formatOutput;
