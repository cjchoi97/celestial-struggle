import Projectile from "./projectile";

class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.playerImg = new Image();
    this.playerImg.src = "./src/assets/spaceship.png";
    this.height = 50;
    this.width = 50;
    this.playerImg.onload = () => this.draw();
    this.x = this.ctx.canvas.width / 2.2;
    this.y = this.ctx.canvas.height - 50;
    this.draw = this.draw.bind(this);
    this.dx = 0;
    this.dy = 0;


    this.lives = 3;

    this.fireProjectile = this.fireProjectile.bind(this);
  }

  recenter() {
    this.x = this.ctx.canvas.width / 2.2;
    this.y = this.ctx.canvas.height - 50;
  }

  hitBox() {
    return [this.x, this.x + this.width, this.y + this.height, this.y];
  }

  moveHorizontally(speed) {
    this.dx = speed;
  }

  moveVertically(speed) {
    this.dy = speed;
  }

  fireProjectile() {
    const projectile = new Projectile({
      x: this.x + 21,
      y: this.y,
      dy: -5,
      ctx: this.ctx,
      img: "./src/assets/basic-projectile.png",
      type: "player",
    });
    return projectile;
  }

  draw() {
    // Calculate next position
    let nextX = this.x + this.dx;
    let nextY = this.y + this.dy;
  
    // Clamp the values so the player stays within bounds
    if (nextX < 0) nextX = 0;
    if (nextX > this.ctx.canvas.width - this.width) nextX = this.ctx.canvas.width - this.width;
    if (nextY < 0) nextY = 0;
    if (nextY > this.ctx.canvas.height - this.height) nextY = this.ctx.canvas.height - this.height;
  
    // Update position
    this.x = nextX;
    this.y = nextY;
  
    // Draw the player
    this.ctx.drawImage(this.playerImg, this.x, this.y, this.width, this.height);
  }

  updateLivesDisplay() {
    const livesDisplay = document.getElementById("lives-display")
    if (livesDisplay) {
      livesDisplay.textContent = `Lives: ${this.lives}`;
    }
  }
}

export default Player;
