import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const chooseFormatters = (filesDif, formatType) => {
  switch (formatType) {
    case 'plain': return (formatPlain(filesDif));
    // case 'json': return (JSON.stringify(filesDif));
    case 'stylish': return (formatStylish(filesDif));
    default: throw new Error(`Unknown format: '${formatType}'!`);
  }
};

export default chooseFormatters;
