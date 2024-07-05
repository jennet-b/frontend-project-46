import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonPath1 = getFixturePath('file1.json');
const jsonPath2 = getFixturePath('file2.json');
const yamlPath1 = getFixturePath('file1.yaml');
const ymlPath2 = getFixturePath('file2.yml');

const expectedStylishDiff = readFile('result_stylish.txt');

const expectedPlainDiff = readFile('result_plain.txt');

const expectedJsonDiff = readFile('result_json.txt');

test('genDiff', () => {
  expect(genDiff(jsonPath1, jsonPath2)).toEqual(expectedStylishDiff);
  expect(genDiff(yamlPath1, ymlPath2)).toEqual(expectedStylishDiff);
  expect(genDiff(jsonPath1, jsonPath2, 'plain')).toEqual(expectedPlainDiff);
  expect(genDiff(yamlPath1, ymlPath2, 'plain')).toEqual(expectedPlainDiff);
  expect(genDiff(jsonPath1, jsonPath2, 'json')).toEqual(expectedJsonDiff);
  expect(genDiff(yamlPath1, ymlPath2, 'json')).toEqual(expectedJsonDiff);
});
