// Disable ESLint because var is used by JSDoc!
// eslint-disable-next-line no-unused-vars
const Bar = require('./bar');

/**
 * @param {Array<Bar>} bars
 * @param {string} name
 * @return {Bar | undefined}
 */
function findBarByName(bars, name) {
  return bars.find((bar) => bar.name === name);
}

module.exports = {
  findBarByName,
};
