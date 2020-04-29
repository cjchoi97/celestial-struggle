import Player from './player';
import Background from './background';
import Controls from './controls';

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.background = new Background(this.ctx);
    // this.player = null;
    this.player = new Player(this.ctx);

    this.draw = this.draw.bind(this);

    this.setupControls();

  }

  renderBackground() {
    this.background.draw();
  }

  setupControls() {
    new Controls(this.ctx);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderBackground();
    this.player.draw();
    requestAnimationFrame(this.draw); 
  }

  start() {
  requestAnimationFrame(this.draw)
  setInterval(this.player.fireProjectile, 1000/1);
  // setInterval(this.draw(), 10);
  }
}

export default Game;