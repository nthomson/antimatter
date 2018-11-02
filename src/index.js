import Game from './antimatter/Game';

let game = new Game();
game.run();

const handleKeyDown = (e) => {
  // e.preventDefault();

  switch(e.code) {
    case 'ArrowLeft':
      game.spin(true);
      break;
    case 'ArrowRight':
      game.spin();
      break;
    case 'Escape':
      game.paused ? game.resume() : game.pause();
      break;
    case 'Space':
      game.warp();
      break;
  }
}

const handleKeyUp = (e) => {
  // e.preventDefault();

  switch(e.code) {
    case 'ArrowLeft':
      game.stopSpin();
      break;
    case 'ArrowRight':
      game.stopSpin();
      break;
  }
}

window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false);
