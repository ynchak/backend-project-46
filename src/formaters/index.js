import { has } from 'lodash-es';
import stylish from './stylish.js';

const formats = {
  stylish,
}
export default (diff, format) => {
  if (!has(formats, format)) {
    throw new Error(`Unknown format: ${format}`)
  }
  const formater = formats[format];
  return formater(diff)
}