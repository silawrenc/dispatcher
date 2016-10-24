let distance = require('../utils/distance');

module.exports = function bindLimit(limit) {
  return function applyFilter(operator, vehicles) {
    function proximity(a) {
      return distance(operator, a) < limit;
    }

    return vehicles.filter(proximity);
  }
}
