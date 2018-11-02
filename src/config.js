const config = {

  levelHeight: 790,
  levelWidth: 395,
  
  shipWidth: 20,
  shipHeight: 100,
  shipSpinSpeed: Math.PI * 2,

  collectorRadius: 90,
  collectorArcSize: Math.PI * 0.2,

  attractorRadius: 50, // Should be <= collector radius
  attractorArcSize: Math.PI * 0.3,
  attractorOffset: 5, // Be sure to account for jitter factor
  attractorJitterFactor: 1,
  attractorSpeed: 25,

  maxFuel: 50, // Keep this below attractor radius
  fuelRate: 20,
  fuelJitterFactor: 2,

  starSpeed: 15
};

export default config;