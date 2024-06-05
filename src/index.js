import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const fullPath = path.resolve(filepath, process.cwd());
  const data = fs.readFileSync(fullPath, 'utf8');
  return data;
};

const parse = (filepath) => {
  const data = readFile(filepath);
  const parseData = JSON.parse(data);
  return parseData;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
    
};

export default genDiff;
