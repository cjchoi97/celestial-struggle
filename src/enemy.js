import Projectile from "./projectile";
import { game } from "./index";

class Enemy {
  constructor(props) {
    // this.ctx = game.ctx;
    this.enemyImg = new Image();
    this.enemyImg.src = "./src/assets/enemy-ship.png";
    
    this.height = props.height;
    this.width = props.width;
    // this.x = this.ctx.canvas.width / 2.2;
    this.x = props.x;
    // this.y = -70;
    this.y = props.y;
    this.dy = props.dy;

    this.enemyImg.onload = () => this.draw();
    this.draw = this.draw.bind(this);
    this.fireProjectile = this.fireProjectile.bind(this);
  }

  hitBox() {
    return [this.x, this.x + this.width, this.y + this.height, this.y];
  }
 
  detectCollision() {
    //              left 0       right  1               bottom  2      top 3
    // this.hitbox = [this.x, this.x + this.width, this.y + this.height, this.y];
    const left = this.x;
    const right = this.x + this.width;
    const bottom = this.y + this.height;
    const top = this.y;

    const enemyHitBox = game.player.hitBox();
    const eLeft = enemyHitBox[0];
    const eRight = enemyHitBox[1];
    const eBottom = enemyHitBox[2];
    const eTop = enemyHitBox[3];

    if ( 
      (bottom > eTop && 
        ((eLeft > left && eLeft < right) || (eRight < right && eRight > left))
      ) &&
      (top < eBottom &&
        ((eLeft > left && eLeft < right) || (eRight < right && eRight > left))
      )
    ) {
      clearInterval(game.playerShot);
      clearInterval(game.enemyShot);

      console.log("player and enemy collide");
      delete game.enemy;
      /* kill player too */
    }
  }

  fireProjectile() {
    // debugger
    const projectile = new Projectile({
      x: this.x + 30,
      y: this.y + 70,
      dy: 5,
      ctx: game.ctx,
      img: './src/assets/enemy-projectile.png',
      type: "enemy"
    })

    projectile.draw();
  }

  draw() {
    this.y += this.dy;
    game.ctx.drawImage(this.enemyImg, this.x, this.y, this.width, this.height);
    this.detectCollision();
    // console.log("here");
    if (this.y === 550) delete this;
  }
}

export default Enemy;