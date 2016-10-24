// filters to demand *below* a certain level

module.exports = function bindLimit(limit) {
  return (operator, vehicles) => vehicles.filter((vehicle) => vehicle.demand < limit);
}
