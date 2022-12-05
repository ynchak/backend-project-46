import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const formatOutput = (diff, format) => {
  if (!Object.hasOwn(formatters, format)) {
    throw new Error(`unknown format: ${format}`);
  }
  return formatters[format](diff);
};

export default formatOutput;
