import * as colors from '../lib/colors';
import * as helpers from '../lib/helpers';
import config from '../config';

class Starfield {

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.stars = this.generateStars(width, height, 0.75);
    
    this.warpFactor = 1;
    this.inWarp = false;
  }

  generateStars(boundX, boundY, density) {
    const starDensity = density || 1;
    const numStars = Math.floor(100 * starDensity);
    const stars = [];

    for(let i = 0; i < numStars; i++) {
      stars.push(this.generateStar(boundX, boundY));
    }

    return stars;
  }

  generateStar(boundX, boundY) {
    return {
      x: helpers.rand(0, boundX),
      y: helpers.rand(0, boundY),
      r: helpers.rand(1, 3)
    };
  }

  warp() {
    this.inWarp = !this.inWarp;
  }

  render(context) {
    this.stars.forEach(star => {
      context.beginPath();
      context.arc(star.x, star.y, star.r, 0, 2 * Math.PI, false);
      context.fillStyle = colors.starBright;
      context.fill();
    });
    
  }

  update(delta) {
    this.warpFactor = this.inWarp ? Math.min(20, this.warpFactor + (delta / 100)) : 1;
    
    this.stars.forEach(star => {
      // Reset star to top of field
      star.y += ((config.starSpeed * star.r * this.warpFactor) * delta / 1000);
      star.y %= this.height;
    });
  }
}

export default Starfield;