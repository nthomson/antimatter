import * as colors from '../../lib/colors'
import * as helpers from '../../lib/helpers';
import config from '../../config';

class ShipCollector {

  constructor(ship, attractorColor, rotation) {
    this.rotation = rotation || 0;
    this.attractorJitter = 0;
    this.attractorColor = attractorColor;
    this.fuel = 0;
    this.addFuel = this.subFuel = 0;
    this.ship = ship;
  }

  update(delta) {
    const deltaSeconds = delta / 1000;
    // Attractor Oscillation
    this.attractorJitter += (config.attractorSpeed * deltaSeconds);
    this.attractorJitter %= Math.PI * 2;

    this.coords = this.getCoords();
    this.matter = this.coords.matter;
    this.attractor = this.coords.attractor;

    if (this.addFuel) {
      
      // console.log(this.addFuel);
      const fuelDelta = Math.min(deltaSeconds * config.fuelRate, this.addFuel);
      this.addFuel = Math.max(this.addFuel - fuelDelta, 0);

      this.fuel = Math.min(this.fuel + fuelDelta, config.maxFuel);
    }

    if (this.subFuel) {
      const fuelDelta = Math.min(deltaSeconds * config.fuelRate, this.subFuel);
      this.subFuel = Math.max(this.subFuel - fuelDelta, 0);

      this.fuel = Math.max(this.fuel - fuelDelta, 0);
    }
  }

  render(context) {
    context.strokeStyle = colors.shipGray;
    context.lineWidth = 5;
    
    const c = this.coords;
    

    // Rotate matrix before drawing
    helpers.transformMatrix(context, 0, 0, 1, this.rotation);

    helpers.drawLine(context, c.connector);
    helpers.drawArc(context, c.collector);

    context.lineWidth = 3;
    context.strokeStyle = this.attractorColor;
    context.fillStyle = this.attractorColor;

    helpers.drawArc(context, c.attractor);
    helpers.drawArc(context, c.matter, true);

    // Reset rotation
    helpers.transformMatrix(context, 0, 0, 1, -this.rotation);
  }

  capture(matter) {
    matter.defuel();
    matter.moveTo(this);
    this.refuel(matter.fuelMass);
  }

  refuel(fuel) {
    this.addFuel += fuel;
  }

  defuel(fuel) {
    this.subFuel += fuel;
  }

  annihilate(fuel) {
    // TODO
    console.log('BOOM!', fuel);
  }

  attractorCollide(item) {
    switch (item.type) {
      case 'matter':
        item.color === this.attractorColor && this.capture(item);
        break;
      default:
        break;
    }
  }

  matterCollide(item) {
    switch (item.type) {
      case 'matter':
        item.color !== this.attractorColor && this.annihilate(item.fuelMass);
        break;
      default:
        break;
    }
  }

  globalCoords() {
    const rotationAngle = -(this.ship.rotation + this.rotation);
    const point = {
      x: config.shipWidth + 17,
      y: this.attractor.y
    };

    return helpers.globalCoords(point, this.ship, rotationAngle);
  }

  getCoords(fuel) {
    const jitter = (Math.sin(this.attractorJitter) * config.attractorJitterFactor);
    const fuelJitter = (this.fuel / config.maxFuel) * config.fuelJitterFactor;
    return {
      connector: {
        startX: 0,
        startY: 0,
        endX: config.shipWidth,
        endY: 0
      },
      collector: {
        x: config.collectorRadius + config.shipWidth,
        y: 0,
        r: config.collectorRadius,
        startAngle: Math.PI - config.collectorArcSize / 2,
        endAngle: Math.PI + config.collectorArcSize / 2
      },
      attractor: {
        x: config.collectorRadius + config.shipWidth - (config.collectorRadius - config.attractorRadius - config.attractorOffset),
        y: 0,
        r: config.attractorRadius + jitter,
        startAngle: Math.PI - config.attractorArcSize / 2,
        endAngle: Math.PI + config.attractorArcSize / 2
      },
      matter: {
        x: config.shipWidth + this.fuel + 12 + jitter * fuelJitter,
        y: Math.abs(jitter * fuelJitter),
        r: this.fuel,
        startAngle: 0,
        endAngle: 2 * Math.PI
      }
    }
  }
}

export default ShipCollector;
