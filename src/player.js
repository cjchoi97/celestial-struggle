class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.playerImg = new Image();
    this.playerImg.src = './src/assets/spaceship.png';

    this.playerImg.onload = () => this.draw();

    this.draw = this.draw.bind(this);
  }

  draw() {
    // debugger
    const x = this.ctx.canvas.width/2.1;
    // const y = this.ctx.canvas.height;
    this.ctx.drawImage(this.playerImg, x, 500, 50, 50);
    window.requestAnimationFrame(this.draw); 
  }
}

export default Player;