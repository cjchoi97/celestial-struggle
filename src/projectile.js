import { game } from './index';

class Projectile {
  constructor(props) {
    this.projectileImg = new Image();
    this.projectileImg.src = props.img;
    this.x = props.x;
    this.y = props.y;
    this.width = 10;
    this.height = 20;
    this.dx = 0;
    this.dy = props.dy;
    this.ctx = props.ctx;
    this.draw = this.draw.bind(this);
    this.detectHit = this.detectHit.bind(this);
    this.type = props.type;
  }


  detectHit() {
    this.hitbox = [this.x, this.x + this.width, this.y + this.height, this.y];
    
    if (this.type === "player") {
      // console.log("player");
      if (game.enemy) {
        const enemyHitBox = game.enemy.hitBox();
        if (this.y < enemyHitBox[2] && 
            this.x >= enemyHitBox[0] &&
            this.hitbox[1] <= enemyHitBox[1] &&
            !(this.hitbox[2] < enemyHitBox[3])
          ) {
          console.log("enemy hit by player bullet");
          clearInterval(game.enemyShot);
          delete game.enemy;
          delete this;
          //increment score
        }
      }
    } else if (this.type === "enemy") {
      // console.log("enemy");
      // debugger
      if (game.player) {
        const enemyHitBox = game.player.hitBox();
        if (this.hitbox[2] > enemyHitBox[3] &&
            this.hitbox[0] >= enemyHitBox[0] &&
            this.hitbox[1] <= enemyHitBox[1] &&
            !(this.hitbox[3] > enemyHitBox[2])
          ) {
          clearInterval(game.playerShot);
          delete this;
          console.log("player hit by enemy bullet");
          // delete game.player;
        }
      }
    }
  } 

  draw() {
    // console.log("fired");
    // debugger
    this.y += this.dy;
    // console.log(game.enemy.y);
    this.ctx.drawImage(this.projectileImg, this.x, this.y, this.width, this.height);
    this.detectHit();
    if (this.y === 0) {
      delete this;
      // console.log(this.y);
    } else if (this.y === 550) {
      delete this;
    }
    // setTimeout(() => requestAnimationFrame(this.draw), 1000/20);
    requestAnimationFrame(this.draw);
  }
}

export default Projectile;