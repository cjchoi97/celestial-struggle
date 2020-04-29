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
  }

  moveHorizontally(speed) {
    // console.log(this.x);
    this.dx = speed;
  }

  moveVertically(speed) {
    this.dy = speed;
  }

  fireMissile() {

  }

  draw() {
    // debugger
    this.x += this.dx;
    this.y += this.dy;
    this.ctx.drawImage(this.playerImg, this.x, this.y, this.height, this.width);
    requestAnimationFrame(this.draw); 
  }
}

export default Player;