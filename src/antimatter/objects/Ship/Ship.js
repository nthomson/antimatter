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

    this.redFuel = 55;
    this.blueFuel = 45;

    this.redArm = new ShipCollector(colors.redMatter, Math.PI);
    this.blueArm = new ShipCollector(colors.blueMatter);
  }

  warp() {
    this.inWarp = !this.inWarp;
  }

  flip(antiClockwise) {
    if (!this.flipping) {
      this.flipping = true;
      this.antiClockwise = antiClockwise;
      this.stopAngle = this.rotation + (Math.PI * (antiClockwise ? -1 : 1));
    }
  }

  update(delta) {
    const deltaSeconds = delta / 1000;

    this.redArm.update(delta);
    this.blueArm.update(delta);
    
    if (this.flipping) {
      const rotationDelta = (config.shipSpinSpeed * deltaSeconds) * (this.antiClockwise ? -1 : 1);
      this.rotation = this.rotation + rotationDelta

      if (!this.antiClockwise && this.rotation >= this.stopAngle ||
          this.antiClockwise && this.rotation <= this.stopAngle) {
        
        this.rotation = Math.abs(this.stopAngle) % (Math.PI * 2);
        this.flipping = false;
      }
    }

    if (this.inWarp) {
      const fuelBurn = deltaSeconds * config.fuelRate;

      if(this.redFuel >= fuelBurn && this.blueFuel >= fuelBurn) {
        this.redFuel -= fuelBurn;
        this.blueFuel -= fuelBurn;  
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

    this.redArm.render(context, this.redFuel);
    this.blueArm.render(context, this.blueFuel);
    
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