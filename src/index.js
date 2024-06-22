import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';
import chooseFormatters from './formatters/index.js';

const readFile = (filepath) => {
  const fullpath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullpath, 'utf-8');
};

const getData = (filepath) => {
  const data = readFile(filepath);
  const extension = path.extname(filepath).slice(1);
  return parse(data, extension);
};

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const astTree = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: buildTree(obj1[key], obj2[key]) };
    }

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }

    return { key, type: 'unchanged', value: obj1[key] };
  });

  return astTree;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = buildTree(data1, data2);

  return chooseFormatters(diff, formatName);
};

export default genDiff;
