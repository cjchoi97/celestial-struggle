class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.backgroundImg = new Image();
    this.backgroundImg.src = './src/assets/space-background.jpg';
    this.y = 0;

    this.draw = this.draw.bind(this);
  }

  draw() {
    // debugger
    this.y += 0.5;
    this.ctx.drawImage(this.backgroundImg, 0, this.y);
    this.ctx.drawImage(this.backgroundImg, 0, this.y - 1600);
    if (this.y === 1600) this.y = 0;
    // requestAnimationFrame(this.draw); 
  }
}

export default Background;