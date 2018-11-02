import ShipCollector from './ShipCollector';
import * as colors from '../../lib/colors';
import * as helpers from '../../lib/helpers';
import config from '../../config';

class Ship {

  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;

    this.rotation = 0; // in radians

    this.redArm = new ShipCollector(this, colors.redMatter, Math.PI);
    this.blueArm = new ShipCollector(this, colors.blueMatter);
  }

  warp() {
    this.inWarp = !this.inWarp;
  }

  spin(antiClockwise) {
    if (!this.spinning) {
      this.spinning = true;
      this.antiClockwise = antiClockwise;
      this.stopAngle = this.rotation + (Math.PI * (antiClockwise ? -1 : 1));
    }
  }

  stopSpin() {
    if (this.spinning) {
      this.spinning = false;  
    }
  }

  offsetCircle(circle, rotation) {
    const rotationAngle = -(this.rotation + rotation);
    const coords = helpers.globalCoords(circle, this, rotationAngle);
    coords.r = circle.r;
    return coords;
  }

  blueMatter() {
    return this.offsetCircle(this.blueArm.matter, this.blueArm.rotation);
  }

  redMatter() {
    return this.offsetCircle(this.redArm.matter), this.redArm.rotation; 
  }

  blueAttractor() {
    return this.offsetCircle(this.blueArm.attractor, this.blueArm.rotation);
  }

  redAttractor() {
    return this.offsetCircle(this.redArm.attractor, this.redArm.rotation);
  }

  update(delta) {
    const deltaSeconds = delta / 1000;

    this.redArm.update(delta);
    this.blueArm.update(delta);
    
    if (this.spinning) {
      const rotationDelta = (config.shipSpinSpeed * deltaSeconds) * (this.antiClockwise ? -1 : 1);
      this.rotation = this.rotation + rotationDelta

      if (!this.antiClockwise && this.rotation >= this.stopAngle ||
          this.antiClockwise && this.rotation <= this.stopAngle) {
        
        this.rotation = Math.abs(this.stopAngle) % (Math.PI * 2);
        this.spinning = false;
      }
    }

    if (this.inWarp) {
      const fuelBurn = deltaSeconds * config.fuelRate;

      if(this.redArm.fuel >= fuelBurn && this.blueArm.fuel >= fuelBurn) {
        this.redArm.defuel(fuelBurn);
        this.blueArm.defuel(fuelBurn);
      }
      else {
        this.game.warp();
      }
    }
  }

  render(context) {
    const body = this.getBodyCoords();

    // Set Rotation / Translate
    helpers.setMatrix(context, this.x, this.y, 1, this.rotation);
    
    context.fillStyle = colors.shipGray;
    helpers.drawPylon(context, body)

    this.redArm.render(context);
    this.blueArm.render(context);
    
    // Undo Rotation / Translate
    helpers.setMatrix(context, 0, 0, 1, 0);
  }

  getBodyCoords() {
    return {
      top: {
        x: 0,
        y: -config.shipHeight/2
      },
      bottom: {
        x: 0,
        y: config.shipHeight/2
      },
      left: {
        x: -(config.shipWidth * 1.5),
        y: 0
      },
      right: {
        x: config.shipWidth * 1.5,
        y: 0
      }
    };
  }
}

export default Ship;