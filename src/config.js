const config = {

  levelHeight: 790,
  levelWidth: 395,
  
  shipWidth: 20,
  shipHeight: 100,
  shipSpinSpeed: Math.PI * 2,

  collectorRadius: 90,
  attractorRadius: 50, // Should be <= collector radius
  attractorOffset: 5, // Be sure to account for jitter factor, below
  attractorJitterFactor: 1,
  attractorSpeed: 25,

  maxFuel: 50, // Try to keep this below attractor radius
  fuelRate: 7.5,
  fuelJitterFactor: 2,

  starSpeed: 15
};

export default config;