import Game from './antimatter/Game';

let game = new Game();
game.run();

const handleKeyDown = (e) => {
  // e.preventDefault();

  switch(e.code) {
    case 'ArrowLeft':
      game.flip(true);
      break;
    case 'ArrowRight':
      game.flip();
      break;
    case 'Escape':
      game.paused ? game.resume() : game.pause();
      break;
    case 'Space':
      game.warp();
      break;
  }
}

window.addEventListener('keydown', handleKeyDown, false);
