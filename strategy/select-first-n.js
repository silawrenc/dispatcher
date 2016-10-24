module.exports = function BindN(n) {
  return (operator, vehicles) => vehicles.slice(0, n);
};
