import Ship from './objects/Ship';
import Starfield from './objects/Starfield';
import Level from './objects/Level';

import * as colors from './lib/colors';
import config from './config';

class Game {
  constructor() {
    let canvas = document.getElementById('antimatter');
    
    this.context = canvas.getContext('2d');

    this.ship = new Ship(this, config.levelWidth/2, config.levelHeight - 75);
    this.starfield = new Starfield(config.levelWidth, config.levelHeight);
    this.level = new Level();
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

  spin(antiClockwise) {
    this.ship.spin(antiClockwise);
  }

  stopSpin() {
    // this.ship.stopSpin();
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
    context.clearRect(0, 0, config.levelWidth, config.levelHeight);
    
    context.fillStyle = 'white';
    context.font = '18px sans-serif';
    context.fillText(this.fps, 5, 20);

    this.starfield.render(context);
    this.level.render(context);
    this.ship.render(context);

    if (this.paused) {
      context.fillStyle = colors.overlay;
      context.rect(0, 0, config.levelWidth, config.levelHeight);
      context.fill();

      context.fillStyle = 'white';
      context.font = '26px monospace';
      context.textAlign = 'center';
      context.fillText('Paused', config.levelWidth/2, config.levelHeight/2)
    }
  }
  
  update(delta) {
    this.starfield.update(delta);
    this.ship.update(delta);
    this.level.update(delta);

    this.level.checkCollision(this.ship);

    this.fps = Math.floor(1000 / delta);
  }
}

export default Game;