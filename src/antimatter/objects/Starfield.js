import * as colors from '../lib/colors'

class Starfield {

  constructor(context) {
    this.context = context;
    this.clientHeight = this.context.canvas.clientHeight;
    this.clientWidth = this.context.canvas.clientWidth;

    this.stars = this.generateStars(this.clientWidth, this.clientHeight, 0.75);
    
    this.speed = 15; // Pixels per second
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
      x: this.rand(0, boundX),
      y: this.rand(0, boundY),
      r: this.rand(1, 3)
    };
  }

  rand(start, end) {
    return Math.floor((Math.random() * end) + start);
  }

  render() {
    this.stars.forEach(star => {
      this.context.beginPath();
      this.context.arc(star.x, star.y, star.r, 0, 2 * Math.PI, false);
      this.context.fillStyle = colors.starBright;
      this.context.fill();
    });
    
  }

  update(delta) {
    this.stars.forEach(star => {
      // Reset star to top of field
      if (star.y > (this.clientHeight + star.r)) {
        star.x = this.rand(0, this.clientWidth);
        star.y = Math.floor(star.y % this.clientHeight);
      }
      else {
        star.y += ((this.speed * star.r) * delta / 1000);
      }
    });
  }
}

export default Starfield;