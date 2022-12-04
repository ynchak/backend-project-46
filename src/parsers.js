import yaml from 'js-yaml';

const parse = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data, 'utf-8');
    default:
      throw new Error(`unknown format: ${format}`);
  }
};

export default parse;
