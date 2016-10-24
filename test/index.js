let assert = require('assert');
let operatorData = require ('../data/operator');
let vehicleData = require('../data/vehicles');
let dispatcher = require('../index');

describe('dispatcher', function () {
  it('should have strategies avaiable', function () {
    assert.ok(dispatcher.strategies);
  });

  it('should error with invalid data', function () {
    assert.throws(() => dispatcher("foo", "bar", () => {}));
  });

  it('should invoke the strategy with valid data', function () {
    assert.equal("foo", dispatcher(operatorData, vehicleData, () => "foo"));
  });

});
