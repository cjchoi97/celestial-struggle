import { game } from './index';

function keyDownHandler(e) {
  if (game.player) {
    if (e.key === "ArrowRight") {
      game.player.moveHorizontally(20);
    } else if (e.key === "ArrowLeft") {
      game.player.moveHorizontally(-20);
    } else if (e.key === "ArrowUp") {
      game.player.moveVertically(-20);
    } else if (e.key === "ArrowDown") {
      game.player.moveVertically(20);
    }
  }
  //test code for configuring vertical movement

  // if(e.key == 87) { //W
  //   game.player.moveVertically(-20);
  // } else if(e.key == 83) { //S
  //   game.player.moveVertically(20);
  // }
}

function keyUpHandler(e) {
  if (game.player) {
    if(e.key == "ArrowRight" && game.player.vx > 0) {
      game.player.moveHorizontally(0);
    } else if(e.key == "ArrowLeft" && game.player.vx < 0) {
      game.player.moveHorizontally(0);
    }

    if (e.key == 32) { //SPACE
      game.player.toggleReload();
    }
  }
  // test code for configuring vertical movement

  // if(e.key == 87 && game.player.vy < 0) {
  //   game.player.moveVertically(0);
  // } else if(e.key == 83 && game.player.vy > 0) {
  //   game.player.moveVertically(0);
  // }
}


// export const setupControls = () => {
//   addEventListener(document, 'keydown', keyDownHandler);
//   window.document.on('keyup', keyUpHandler);
// };

document.addEventListener("keydown", event => keyDownHandler(event));
document.addEventListener("keyup", event => keyUpHandler(event));

// export const removeControls = () => {
//   window.document.off('keydown', keyDownHandler);
//   window.document.off('keyup', keyUpHandler);
// };