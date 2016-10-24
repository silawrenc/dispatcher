// sorts so minimum demand first
module.exports = (operator, vehicles) => vehicles.sort((a,b) => a.demand - b.demand);
