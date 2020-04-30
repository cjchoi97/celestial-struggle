import Player from './player';
import Background from './background';
import Controls from './controls';
import Enemy from './enemy';

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.background = new Background(this.ctx);
    // this.player = null;
    this.player = new Player(this.ctx);
    this.enemy = new Enemy(this.ctx);

    this.draw = this.draw.bind(this);

    this.setupControls();
    // this.startTime = null;

  }

  renderBackground() {
    this.background.draw();
  }

  setupControls() {
    new Controls(this.ctx);
  }

  draw(timestamp) {
    // console.log(timestamp);
    // this.startTime = this.startTime || timestamp;
    // console.log(timestamp - this.startTime);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderBackground();
    this.player.draw();
    if (this.enemy) {
      this.enemy.draw();
      // console.log(this.enemy.y);
    }
    requestAnimationFrame(this.draw); 
  }

  start() {
    requestAnimationFrame(this.draw);
    this.playerShot = setInterval(this.player.fireProjectile, 1000/1);
    if (this.enemy) {
      this.enemyShot = setInterval(this.enemy.fireProjectile, 1000/1);
    }
  // setInterval(this.draw(), 10);
  }
}

export default Game;