import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import chooseFormatters from './formatters/index.js';
import buildTree from './buildTree.js';

const readFile = (filepath) => {
  const fullpath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullpath, 'utf-8');
};

const getData = (filepath) => {
  const data = readFile(filepath);
  const formatFile = path.extname(filepath).slice(1);
  return parse(data, formatFile);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = buildTree(data1, data2);

  return chooseFormatters(diff, formatName);
};

export default genDiff;
