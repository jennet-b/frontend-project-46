import _ from 'lodash';

const type = {
  nested: 'nested',
  added: 'added',
  deleted: 'deleted',
  changed: 'changed',
  unchanged: 'unchanged',
};

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const astTree = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: type.nested, children: buildTree(obj1[key], obj2[key]) };
    }

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: type.added, value: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: type.deleted, value: obj1[key] };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, type: type.changed, valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }

    return { key, type: type.unchanged, value: obj1[key] };
  });
  return astTree;
};

export { type };
export default buildTree;
