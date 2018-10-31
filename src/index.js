import Game from './antimatter/Game';

let game = new Game();
game.run();

let pause = document.getElementById('pause');


// document.addEventListener('visibilitychange', () => document.hidden && game.pause(), false);

const handlePause = () => {
  game.paused ? game.resume() : game.pause();

  pause.innerHTML = game.paused ? 'Resume' : 'Pause';
};

pause.addEventListener('click', handlePause, false);