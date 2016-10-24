# Dispatcher
This is a first pass at an approach for a flexible, configurable algorithm to tackle the problem of choosing which vehicle to send an operator to go pick up based on operator/vehicle/demand criteria.

## Installation
You should be able to install using
```
npm install git://github.com/silawrenc/dispatcher
```
...and then...
```
npm test
```
...to check everything is a-ok.


## Usage
The example below shows how to build up an algorithm out of strategies, and apply that algorithm to operator/vehicle data (data schemas are defined in the test cases, examples in [./data](./data)). You can use any of the strategies in the library, or build your own: the function signature is just `(operator, vehicles) => vehicles`. Metastrategies exist for chaining strategies or bifurcating algorithms based on matching criteria.

```javascript
let dispatcher = require('./index');
let defaultStrategy = dispatcher.strategies.chain([
  dispatcher.strategies.demandFilter(0), //only areas with negative demand
  dispatcher.strategies.proximitySort, // sort nearest to top
  dispatcher.strategies.selectFirstN(3), //pick the top three
  dispatcher.strategies.selectRandom, // pick at random from them
]);

let billStrategy = dispatcher.strategies.selectRandom;

let isBill (operator) => operator.id === 2;

let decisionStrategy = dispatcher.strategies.triage(isBill, billStrategy, defaultStrategy)

let [vehicle] = dispatcher(operator, vehicles, decisionStrategy);
```
