import * as colors from '../../lib/colors'
import * as helpers from '../../lib/helpers';
import config from '../../config';

class ShipCollector {

  constructor(attractorColor, rotation) {
    this.rotation = rotation || 0;
    this.attractorJitter = 0;
    this.attractorColor = attractorColor;
  }

  update(delta) {
    // Attractor Oscillation
    this.attractorJitter += (config.attractorSpeed * delta / 1000);
    this.attractorJitter %= Math.PI * 2;
  }

  render(context, fuel) {
    context.strokeStyle = colors.shipGray;
    context.lineWidth = 5;
    
    const c = this.getCoords(fuel);

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

  getCoords(fuel) {
    const jitter = (Math.sin(this.attractorJitter) * config.attractorJitterFactor);
    const fuelJitterFactor = (fuel / config.maxFuel) * 5;
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
        startAngle: Math.PI * .9,
        endAngle: Math.PI * 1.1
      },
      attractor: {
        x: config.collectorRadius + config.shipWidth - 10,
        y: 0,
        r: config.attractorRadius + jitter,
        startAngle: Math.PI * .9,
        endAngle: Math.PI * 1.1
      },
      matter: {
        x: config.shipWidth + fuel + 12 + jitter * fuelJitterFactor,
        y: Math.abs(jitter * fuelJitterFactor),
        r: fuel,
        startAngle: 0,
        endAngle: 2 * Math.PI
      }
    }
  }
}

export default ShipCollector;
