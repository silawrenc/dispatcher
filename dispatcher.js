let validator = require('./validator');

module.exports = function (operator, vehicles, strategy) {
  validator.operator(operator);
  validator.vehicles(vehicles);
  return strategy(operator, vehicles);
};
