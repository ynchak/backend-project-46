import parseYaml from './parseYml.js';
import parseJson from './parseJson.js';

const parse = (data, ext) => {
  switch (ext) {
    case '.json': {
      return parseJson(data);
    }
    case '.yml':
    case '.yaml': {
      return parseYaml(data);
    }
    default: {
      throw new Error(`Unknown ext ${ext}`);
    }
  }
};
export default parse;
