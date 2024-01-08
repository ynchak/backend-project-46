const parse = (data, ext) => {
  switch (ext) {
    case '.json': {
      return JSON.parse(data);
    }
    default: {
      throw new Error(`Unknown ext ${ext}`);
    }
  }
};
export default parse;
