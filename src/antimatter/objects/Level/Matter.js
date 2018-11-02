import * as colors from '../../lib/colors';
import * as helpers from '../../lib/helpers';
import config from '../../config';

class Matter {

  constructor(color, x, y, r) {
    this.speed = 200;
    this.x = x;
    this.y = y;
    this.r = r;
    this.type = 'matter';

    this.color = color;
  }

  update(delta) {
    const deltaSeconds = delta / 1000;

    if (this.movingToward) {
      const point = this.movingToward.globalCoords();
      const toX = point.x - this.x;
      const toY = point.y - this.y;
      const length = Math.sqrt(toX * toX + toY * toY);

      // Move towards the point
      this.x += toX / length * (this.speed * deltaSeconds);
      this.y += toY / length * (this.speed * deltaSeconds);
    }
    else {
      this.y += (this.speed * deltaSeconds);  
    }
    

    if (this.y - this.r > config.levelHeight || this.r === 0) {
      this.explode();
    }

    if (this.defueling) {
      const fuelDelta = deltaSeconds * config.fuelRate;
      this.r = Math.max(this.r - fuelDelta, 0);
    }
  }

  moveTo(point) {
    this.movingToward = point;
    this.speed = 500;
  }

  defuel() {
    this.defueling = true;
  }

  explode() {
    this.exploded = true;
  }

  get fuelMass() {
    return this.r;
  }

  inView() {
    return ((this.x + this.r) > 0 && (this.x - this.r) < config.levelWidth) &&
           ((this.y + this.r) > 0 && (this.y - this.r) < config.levelHeight);
  }

  collidable() {
    return this.inView() && !this.defueling
  }

  render(context) {
    if (this.inView()) {
      context.fillStyle = this.color;
      helpers.drawArc(context, this.getCoords(), true);
    }
  }

  getCoords() {
    return {
      x: this.x,
      y: this.y,
      r: this.r
    };
  }
}

export default Matter;