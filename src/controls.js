import { game } from './index';

class Controls {
  constructor(ctx) {
    // debugger
    this.ctx = ctx;
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.ctx.canvas.addEventListener("keydown",this.keyDownHandler);
    this.ctx.canvas.addEventListener("keyup", this.keyUpHandler);
    // this.keydown = null;
  }

  keyDownHandler(e) {
    // console.log(this.keydown);
    // console.log("pressed");
    // this.keydown = true;
    if (game.player) {
      if (e.key === "ArrowRight") {
        game.player.moveHorizontally(5);
      } else if (e.key === "ArrowLeft") {
        game.player.moveHorizontally(-5);
      } else if (e.key === "ArrowUp") {
        game.player.moveVertically(-5);
      } else if (e.key === "ArrowDown") {
        game.player.moveVertically(5);
      } 
    }
  }

  keyUpHandler(e) {
    clearInterval(this.keydown);
    if (game.player) {
      if (e.key == "ArrowRight") {
        game.player.moveHorizontally(0);
      } else if (e.key == "ArrowLeft") {
        game.player.moveHorizontally(0);
      } else if (e.key === "ArrowUp") {
        game.player.moveVertically(0);
      } else if (e.key === "ArrowDown") {
        game.player.moveVertically(0);
      } 
    }
  }

}

export default Controls;