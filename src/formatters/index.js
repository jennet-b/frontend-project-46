import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const chooseFormatters = (filesDif, formatType) => {
  switch (formatType) {
    case 'stylish':
      return (formatStylish(filesDif));
    case 'plain':
      return (formatPlain(filesDif));
    case 'json':
      return (formatJSON(filesDif));
    default:
      throw new Error('Unknown format!');
  }
};

export default chooseFormatters;
