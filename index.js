let dispatcher = require('./dispatcher');

dispatcher.strategies = {
  "proximityFilter" : require('./strategy/proximity-filter'),
  "proximitySort" : require('./strategy/proximity-sort'),
  "demandFilter" : require('./strategy/demand-filter'),
  "demandSort" : require('./strategy/demand-sort'),
  "triage" : require('./strategy/triage'),
  "chain" : require('./strategy/chain'),
  "selectFirstN" : require('./strategy/select-first-n'),
  "selectFirst" : require('./strategy/select-first'),
  "selectRandom" : require('./strategy/select-random')
};

module.exports = dispatcher;
