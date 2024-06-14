import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

export const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return data;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
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
