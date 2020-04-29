import Projectile from "./projectile";

class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.playerImg = new Image();
    this.playerImg.src = './src/assets/spaceship.png';
    this.height = 50;
    this.width = 50;
    this.playerImg.onload = () => this.draw();
    this.x = this.ctx.canvas.width/2.1;
    this.y = 500;
    this.draw = this.draw.bind(this);
    this.dx = 0;
    this.dy = 0;

    this.fireProjectile = this.fireProjectile.bind(this);
    // this.fire = this.fire.bind(this);
  }

  moveHorizontally(speed) {
    // console.log(this.x);
    this.dx = speed;
  }

  moveVertically(speed) {
    this.dy = speed;
  }

  // fire() {
  //   setInterval(this.fireProjectile, 1000);
  // }

  fireProjectile() {

    // console.log("im here");
    const projectile = new Projectile({
      x: this.x + 21,
      y: this.y,
      ctx: this.ctx
    })
    // console.log("MADE PROJECTILE")

    projectile.draw();
  }

  draw() {
    // debugger
    this.x += this.dx;
    this.y += this.dy;
    // this.fireProjectile();
    this.ctx.drawImage(this.playerImg, this.x, this.y, this.height, this.width);
    // requestAnimationFrame(this.draw); 
  }
}

export default Player;