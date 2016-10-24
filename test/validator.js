let assert = require('assert');
let operatorData = require('../data/operator');
let vehicleData = require('../data/vehicles');
let validator = require('../validator');

describe('validator', function() {
  describe('#operator()', function() {
    it('should throw a validation error with invalid data', function() {
      assert.throws(() => validator.operator({}));
    });

    it('should validate valid data', function() {
      validator.operator(operatorData);
    });
  });

  describe('#vehicle()', function() {
    it('should throw a validation error with invalid data', function() {
      assert.throws(() => validator.vehicles([1,3]));
    });

    it('should validate with a single set of valid data', function() {
      validator.vehicles(vehicleData);
    });

    it('should validate with no data', function() {
      validator.vehicles([]);
    });
  });
});
