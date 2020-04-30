import Projectile from "./projectile";

class Enemy {
  constructor(ctx, props) {
    this.ctx = ctx;
    this.enemyImg = new Image();
    this.enemyImg.src = "./src/assets/enemy-ship.png";
    this.height = 70;
    this.width = 70;
    this.enemyImg.onload = () => this.draw();
    this.x = this.ctx.canvas.width / 2.2;
    this.y = -70;
    this.draw = this.draw.bind(this);
    this.dy = 1;
    this.fireProjectile = this.fireProjectile.bind(this);

    // this.hitBox = [this.x, this.x + this.width, this.y + this.height, this.y];
  }

  hitBox() {
    return [this.x, this.x + this.width, this.y + this.height, this.y];
  }

  // detectHit() {

  // }


  fireProjectile() {
    debugger
    const projectile = new Projectile({
      x: this.x + 30,
      y: this.y + 70,
      dy: 5,
      ctx: this.ctx,
      img: './src/assets/enemy-projectile.png',
      type: "enemy"
    })

    projectile.draw();
  }

  draw() {
    this.y += this.dy;
    this.ctx.drawImage(this.enemyImg, this.x, this.y, this.width, this.height);
    if (this.y === 550) delete this;
  }
}

export default Enemy;