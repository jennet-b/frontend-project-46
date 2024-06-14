import { readFile } from './index.js';

const parse = (filepath) => {
  const data = readFile(filepath);
  const parseData = JSON.parse(data);
  return parseData;
};

export default parse;
