module.exports = function build(decider, strategyA, strategyB) {
  return function triage(operator, vehicles) {
    return decider(operator, vehicles) ? strategyA(operator, vehicles) : strategyB(operator, vehicles);
  }
}
