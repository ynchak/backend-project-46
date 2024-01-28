import { has } from 'lodash-es';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formats = {
  stylish,
  plain,
  json,
};
export default (diff, format) => {
  if (!has(formats, format)) {
    throw new Error(`Unknown format: ${format}`);
  }
  const formater = formats[format];
  return formater(diff);
};
