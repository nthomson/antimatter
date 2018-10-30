import Ship from './Ship';
import Starfield from './Starfield';

class Game {
  constructor() {
    let canvas = document.getElementById('antimatter');
    
    this.context = canvas.getContext('2d');
    this.clientHeight = this.context.canvas.clientHeight;
    this.clientWidth = this.context.canvas.clientWidth;

    this.ship = new Ship(this.context);
    this.starfield = new Starfield(this.context);
    this.startTime = null;
  }

  run(timestamp) {
    if(!this.startTime) this.startTime = timestamp;

    const delta = timestamp - this.startTime;

    this.update(delta);
    this.render();

    this.startTime = timestamp;
    // start the mainloop
    requestAnimationFrame(this.run.bind(this));
  }

  render() {
    this.context.clearRect(0, 0, this.clientWidth, this.clientHeight);
    
    this.starfield.render();
    this.ship.render();
  }
  
  update(delta) {
    this.starfield.update(delta);
    this.ship.update(delta);
  }
}

export default Game;