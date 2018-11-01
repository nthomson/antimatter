import Ship from './objects/Ship';
import Starfield from './objects/Starfield';

class Game {
  constructor() {
    let canvas = document.getElementById('antimatter');
    
    this.context = canvas.getContext('2d');
    this.clientHeight = this.context.canvas.clientHeight;
    this.clientWidth = this.context.canvas.clientWidth;

    this.ship = new Ship(this, this.clientWidth/2, this.clientHeight - 75);
    this.starfield = new Starfield(this.clientHeight, this.clientHeight);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    this.startTime = 0;
    this.run(0);
  }

  warp() {
    this.starfield.warp();
    this.ship.warp();
  }

  flip(antiClockwise) {
    this.ship.flip(antiClockwise);
  }

  run(timestamp = 0) {
    if(!this.startTime) {
      this.startTime = timestamp;
    }

    const delta = timestamp - this.startTime;

    this.update(delta);
    this.render(this.context);

    this.startTime = timestamp;
    
    if (!this.paused) {
      requestAnimationFrame(this.run.bind(this));
    }
  }

  render(context) {
    context.clearRect(0, 0, this.clientWidth, this.clientHeight);
    
    context.fillStyle = 'white';
    context.font = '18px sans-serif';
    context.fillText(this.fps, 5, 20);

    this.starfield.render(context);
    this.ship.render(context);
  }
  
  update(delta) {
    this.starfield.update(delta);
    this.ship.update(delta);

    this.fps = Math.floor(1000 / delta);
  }
}

export default Game;