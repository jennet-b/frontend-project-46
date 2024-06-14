import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const buildFullPath = (filePath) => path.resolve(process.cwd(), filePath);

const readFile = (fullPath) => fs.readFileSync(fullPath, 'UTF-8');

const getFileFormat = (filePath) => path.extname(filePath).slice(1);

const genDiff = (filepath1, filepath2) => {
  const fileData1 = readFile(buildFullPath(filepath1));
  const fileData2 = readFile(buildFullPath(filepath2));
  const data1 = parse(fileData1, getFileFormat(filepath1));
  const data2 = parse(fileData2, getFileFormat(filepath2));
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = keys.sort();
  const diff = sortedKeys.flatMap((key) => {
    if (!Object.hasOwn(data1, key)) {
      return `+ ${key}: ${data2[key]}`;
    }
    if (!Object.hasOwn(data2, key)) {
      return `- ${key}: ${data1[key]}`;
    }
    if (data1[key] === data2[key]) {
      return `  ${key}: ${data1[key]}`;
    }
    return [
      `- ${key}: ${data1[key]}`,
      `+ ${key}: ${data2[key]}`,
    ];
  });

  return `{\n  ${diff.join('\n  ')}\n}`;
};

export default genDiff;
export { readFile, buildFullPath, getFileFormat };
