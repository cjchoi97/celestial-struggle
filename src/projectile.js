class Projectile {
  constructor(props) {
    this.projectileImg = new Image();
    this.projectileImg.src = './src/assets/basic-projectile.png';
    this.x = props.x;
    this.y = props.y;
    this.width = 20;
    this.height = 10;
    this.dx = 0;
    this.dy = -10;
    this.ctx = props.ctx;
    this.draw = this.draw.bind(this);
  }

  draw() {
    // console.log("fired");
    // debugger
    this.y += this.dy;
    this.ctx.drawImage(this.projectileImg, this.x, this.y, this.height, this.width);
    if (this.y === 0) {
      delete this;
      // console.log(this.y);
    }
    // setTimeout(() => requestAnimationFrame(this.draw), 1000/20);
    requestAnimationFrame(this.draw);
  }
}

export default Projectile;