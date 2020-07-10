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

    this.fireProjectile = this.fireProjectile.bind(this);
  }

  hitBox() {
    return [this.x, this.x + this.width, this.y + this.height, this.y];
  }

  moveHorizontally(speed) {
    // console.log(this.x);
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
    // console.log("MADE PROJECTILE")

    // projectile.draw();
    return projectile;
  }

  draw() {
    // debugger
    this.x += this.dx;
    this.y += this.dy;
    // this.fireProjectile();
    this.ctx.drawImage(this.playerImg, this.x, this.y, this.width, this.height);
    // requestAnimationFrame(this.draw);
  }
}

export default Player;
