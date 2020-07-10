import { game } from "./index";

class Projectile {
  constructor(props) {
    this.projectileImg = new Image();
    this.projectileImg.src = props.img;
    this.x = props.x;
    this.y = props.y;
    this.width = 10;
    this.height = 20;
    this.dx = 0;
    this.dy = props.dy; // speed of projectile
    this.ctx = props.ctx;
    this.draw = this.draw.bind(this);
    this.detectHit = this.detectHit.bind(this);
    this.type = props.type;
  }

  detectHit() {
    this.hitbox = [this.x, this.x + this.width, this.y + this.height, this.y];

    if (this.type === "player") {
      // console.log("player");
      if (game.enemies) {
        for (let i = 0; i < game.enemies.length; i++) {
          if (game.enemies[i]) {
            const enemyHitBox = game.enemies[i].hitBox();
            if (
              this.y < enemyHitBox[2] &&
              this.x >= enemyHitBox[0] &&
              this.hitbox[1] <= enemyHitBox[1] &&
              !(this.hitbox[2] < enemyHitBox[3])
            ) {
              console.log("enemy hit by player bullet");
              // clearInterval(game.enemyShot);
              game.removeEnemy(i);
              this.y = 551;
              //increment score
            }
          }
        }
      }
    } else if (this.type === "enemy") {
      if (game.player) {
        const enemyHitBox = game.player.hitBox();
        if (
          this.hitbox[2] > enemyHitBox[3] &&
          this.hitbox[0] >= enemyHitBox[0] &&
          this.hitbox[1] <= enemyHitBox[1] &&
          !(this.hitbox[3] > enemyHitBox[2])
        ) {
          // clearInterval(game.playerShot);
          game.playerProjectiles = [];
          delete this;
          console.log("player hit by enemy bullet");
        }
      }
    }
  }

  draw() {
    this.y += this.dy;
    this.ctx.drawImage(
      this.projectileImg,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.detectHit();
    // setTimeout(() => requestAnimationFrame(this.draw), 1000/20);
    // console.log("fire");
    if (this.y > 550) return;
    // requestAnimationFrame(this.draw);
  }
}

export default Projectile;
