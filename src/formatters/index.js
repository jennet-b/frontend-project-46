import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const chooseFormatters = (file, formatType) => {
  switch (formatType) {
    case 'stylish':
      return (formatStylish(file));
    case 'plain':
      return (formatPlain(file));
    case 'json':
      return (formatJSON(file));
    default:
      throw new Error('Unknown format!');
  }
};

export default chooseFormatters;
