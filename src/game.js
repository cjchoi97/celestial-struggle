import Player from './player';
import Background from './background';

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.background = new Background(this.ctx);
    // this.player = null;
    this.player = new Player(this.ctx);

    this.draw = this.draw.bind(this);

  }

  renderBackground() {
    this.background.draw();
  }

  draw() {
    this.renderBackground();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw();
    // window.requestAnimationFrame(this.draw); 
  }

  start() {
    setInterval(this.draw(), 10);
  }
}

export default Game;