import stylish from './stylish.js';

const formatOutput = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`unknown format: ${format}`);
  }
};

export default formatOutput;
