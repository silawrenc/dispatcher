let assert = require('assert');
let distance = require('../utils/distance');
let operatorData = require('../data/operator');

function position (lat, long) {
  return {
    position: {
      lat: lat,
      long: long
    }
  }
}

describe('utils', () => {
  describe('distance', () => {
    it('should show co-located points as such', function () {
      assert.equal(distance(operatorData, operatorData), 0);
    });

    it('should commute', function () {
      let a = position(1, 1);
      let b = position(2, 4);
      assert.equal(distance(a, b), distance(b, a));
    });

    it('should order relative distances correctly', function () {
      let a = position(1, 1);
      let b = position(2, 3);
      let c = position(3, 6);
      assert(distance(a, b) < distance(a, c));
    });
  });
})
