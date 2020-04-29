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
  }

  moveHorizontally(speed) {
    this.x += speed
  }

  moveVertically(speed) {
    this.y += speed
  }

  draw() {
    // debugger
    this.ctx.drawImage(this.playerImg, this.x, this.y, this.height, this.width);
    window.requestAnimationFrame(this.draw); 
  }
}

export default Player;