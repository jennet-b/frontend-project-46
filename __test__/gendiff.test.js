import { fileURLToPath } from 'url';
// import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const file1 = 'file1.json';
const file2 = 'file2.json';

const filepath1 = 'file1.yaml';
const filepath12 = 'file2.yml';

test('genDiff', () => {
  const data1 = getFixturePath(file1);
  const data2 = getFixturePath(file2);
  expect(genDiff(data1, data2)).toEqual(expectedDiff);
});

test('genDiff', () => {
  const data1 = getFixturePath(filepath1);
  const data2 = getFixturePath(filepath12);
  expect(genDiff(data1, data2)).toEqual(expectedDiff);
});
