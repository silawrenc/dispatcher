module.exports = function chain(strategies) {
  return function applyChain(operator, vehicles) {
    return strategies.reduce(function pipeAlterations(alteredvehicles, strategy) {
      return strategy(operator, alteredvehicles);
    }, vehicles);
  };
}
