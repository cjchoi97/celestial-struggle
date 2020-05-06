class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.backgroundImg = new Image();
    this.backgroundImg.src = './src/assets/space-background.png';
    this.canvasHeight = ctx.canvas.height;
    this.canvasWidth = ctx.canvas.width;
    this.y = 0;

    this.draw = this.draw.bind(this);
  }

  draw() {
    // debugger
    this.y += 0.5;
    this.ctx.drawImage(this.backgroundImg, 0, this.y);
    this.ctx.drawImage(this.backgroundImg, 0, this.y - this.canvasHeight);
    if (this.y === this.canvasHeight) this.y = 0;
    // requestAnimationFrame(this.draw); 
  }
}

export default Background;