// note this is just for sorting, as it calculates square of distance,
// rather than distance, which is good enough for sorting and faster.
// Also compensate for lat/long not being isometric grid

const correction = 0.75 // cos(41.4deg)
module.exports = function (a, b) {
  return Math.pow(0.75*(b.position.long - a.position.long), 2) + Math.pow(b.position.lat - a.position.lat, 2)
}
