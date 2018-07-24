const groupBy = (items, prop) => [
  ...items
    .reduce((acc, item) => {
      const previous = acc.get(item[`${prop}`]) || [];
      acc.set(item[`${prop}`], [...previous, item]);
      return acc;
    }, new Map())
    .values(),
];

module.exports = { groupBy };
