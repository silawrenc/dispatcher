let assert = require('assert');
let operatorData = require('../data/operator');
let vehicleData = require('../data/vehicles');
let distance = require('../utils/distance');

let chain = require('../strategy/chain');
let demandFilter = require('../strategy/demand-filter');
let demandSort = require('../strategy/demand-sort');
let proximityFilter = require('../strategy/proximity-filter');
let proximitySort = require('../strategy/proximity-sort');
let selectFirstN = require('../strategy/select-first-n');
let selectFirst = require('../strategy/select-first');
let selectRandom = require('../strategy/select-random');
let triage = require('../strategy/triage');

describe('strategies', () => {

  /**
   * metastrategies
   * ---------------------------------------------------------------------------
  **/
  describe('chain strategy', () => {
    it('should invoke each strategy once and in order', () => {
      let A = (operator, vehicles) => {return vehicles.concat(['foo']);};
      let B = (operator, vehicles) => {return vehicles.concat(['bar']);};
      let C = (operator, vehicles) => {return vehicles.concat(['baz']);};
      let vehicles = chain([A,B,C])(operatorData, []);
      assert.equal(vehicles.length, 3);
    });

    it('should use the output of the prior strategy as input for the next one', () => {
      let A = (operator, vehicles) => [];
      let B = (operator, vehicles) => vehicles;
      let vehicles = chain([A,B])(operatorData, vehicleData);
      assert.equal(vehicles.length, 0);
    });
  });

  describe('triage strategy', () => {
    it('should invoke the first strategy if the triage function returns truthy', () => {
      let A = (operator, vehicles) => {return vehicles.concat(['foo']);};
      let B = (operator, vehicles) => {return vehicles.concat(['bar']);};
      let strategy = triage(() => true, A, B);
      let vehicles = strategy(operatorData, []);
      assert.equal(vehicles.pop(), 'foo');
    });

    it('should invoke the second strategy if the triage function returns falsy', () => {
      let A = (operator, vehicles) => {return vehicles.concat(['foo']);};
      let B = (operator, vehicles) => {return vehicles.concat(['bar']);};
      let strategy = triage(() => false, A, B);
      let vehicles = strategy(operatorData, []);
      assert.equal(vehicles.pop(), 'bar');
    });
  });

  /**
   * demand strategies
   * ---------------------------------------------------------------------------
  **/
  describe('demand filter', () => {
    it('should filter vehicles with demand above a given level', () => {
      let vehicles = demandFilter(2)(operatorData, vehicleData);
      assert.equal(vehicles.length, 0);
    });

    it('should *not* filter vehicles with demand below a given level', () => {
      let vehicles = demandFilter(3)(operatorData, vehicleData);
      assert.equal(vehicles.length, 1);
    });
  });

  describe('demand sort', () => {
    it('should not remove vehicles', () => {
      let vehicles = demandSort(operatorData, vehicleData);
      assert(vehicles.length, vehicleData.length);
    });

    it('should sort vehicles so lowest demand first', () => {
      let vehicles = demandSort(operatorData, vehicleData);
      function check(previous, vehicle) {
        return previous !== false &&  previous.demand <= vehicle.demand ? previous : false;
      }
      assert.notStrictEqual(vehicles.reduce(check), false);
    });
  });

  /**
   * proximity strategies
   * ---------------------------------------------------------------------------
  **/
  describe('proximity filter', () => {
    it('should filter vehicles further than a certain distance', () => {
      let vehicles = proximityFilter(0.001)(operatorData, vehicleData);
      assert.equal(vehicles.length, 1);
    });

    it('should *not* filter vehicles closer than the given distance', () => {
      let vehicles = proximityFilter(3)(operatorData, vehicleData);
      assert.equal(vehicles.length, 2);
    });
  });

  describe('proximity sort', () => {
    it('should not remove vehicles', () => {
      let vehicles = demandSort(operatorData, vehicleData);
      assert(vehicles.length, vehicleData.length);
    });

    it('should sort vehicles so the closest are first', () => {
      let vehicles = demandSort(operatorData, vehicleData);
      function check(previous, vehicle) {
        return previous !== false && distance(operatorData, previous) <= distance(operatorData, vehicle) ? previous : false;
      }
      assert.notStrictEqual(vehicles.reduce(check), false);
    });
  });

  /**
   * select strategies
   * ---------------------------------------------------------------------------
  **/
  describe('select first n', () => {
    it('should select exactly n vehicles', () => {
      let vehicles = selectFirstN(2)(operatorData, vehicleData);
      assert(vehicles.length, 2);
    });

    it('should select the first n vehicles', () => {
      let vehicles = selectFirstN(1)(operatorData, vehicleData);
      assert(vehicles.pop().id, 39);
    });
  });

  describe('select first', () => {
    it('should select exactly 1 vehicle', () => {
      let vehicles = selectFirst(operatorData, vehicleData);
      assert(vehicles.length, 1);
    });

    it('should select the first vehicle', () => {
      let vehicles = selectFirst(operatorData, vehicleData);
      assert(vehicles.pop().id, 39);
    });
  });

  describe('select random', () => {
    it('should select exactly 1 vehicle', () => {
      let vehicles = selectRandom(operatorData, vehicleData);
      assert(vehicles.length, 1);
    });
  });
})
