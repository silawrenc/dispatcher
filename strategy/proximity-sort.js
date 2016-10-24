let distance = require('../utils/distance');

module.exports = function applySort(operator, vehicles) {
  // note, should memoize this for performance.
  function comparison(a, b) {
    return distance(operator, a) - distance(operator, b);
  }

  return vehicles.sort(comparison);
}
