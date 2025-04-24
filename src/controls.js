import { game } from "./index";

class Controls {
  constructor(ctx) {
    // debugger
    this.ctx = ctx;
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keyup", this.keyUpHandler);
  }

  keyDownHandler(e) {
    if (game.player) {
      if (e.key === "d") {
        game.player.moveHorizontally(5);
      } else if (e.key === "a") {
        game.player.moveHorizontally(-5);
      } else if (e.key === "w") {
        game.player.moveVertically(-5);
      } else if (e.key === "s") {
        game.player.moveVertically(5);
      } else if (e.key === "p" && game.gameOnGoing === false) {
        document.getElementById("modal").style.display = "none";
        game.start();
      } else if (e.key === "r") {
        game.pause();
        game.reset();
        game.start();
        document.getElementById("end-modal").style.display = "none";
      }
    }
  }

  keyUpHandler(e) {
    clearInterval(this.keydown);
    if (game.player) {
      if (e.key == "d") {
        game.player.moveHorizontally(0);
      } else if (e.key == "a") {
        game.player.moveHorizontally(0);
      } else if (e.key === "w") {
        game.player.moveVertically(0);
      } else if (e.key === "s") {
        game.player.moveVertically(0);
      }
    }
  }
}

export default Controls;
