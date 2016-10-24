module.exports = function selectRandom(operator, vehicles) {
  let value = Math.floor(Math.random()*vehicles.length);
  return vehicles.slice(value, value+1);
}
