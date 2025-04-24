import Projectile from "./projectile";
import { game } from "./index";

class Enemy {
  constructor(ctx, props) {
    this.ctx = ctx;
    this.time = 0;
    this.enemyImg = new Image();
    this.enemyImg.src = props.img;

    this.id = props.id;
    this.height = props.height;
    this.width = props.width;
    this.x = props.x;
    this.y = props.y;
    this.dy = props.dy; // speed of descent

    this.enemyImg.onload = () => this.draw();
    this.draw = this.draw.bind(this);
    this.fireProjectile = this.fireProjectile.bind(this);
    this.selfTimer = this.selfTimer.bind(this);
    this.detectCollision = this.detectCollision.bind(this);

    this.projectiles = [];
  }

  selfTimer() {
    this.time++;
  }

  hitBox() {
    return [this.x, this.x + this.width, this.y + this.height, this.y];
  }
 
  detectCollision() {
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

      console.log("player and enemy collide");

      game.removeEnemy(this.id);
      game.player.lives--;
      game.player.updateLivesDisplay()
      if (game.player.lives === 0) {
        game.pause()
      }
      game.player.recenter();
      /* kill player too */
    }
  }

  fireProjectile() {
    // debugger
    const projectile = new Projectile({
      x: this.x + 30,
      y: this.y + 70,
      dy: 2,
      ctx: this.ctx,
      img: './src/assets/enemy-projectile.png',
      type: "enemy"
    })

    return projectile;
  }
  
  draw() {
    this.y += this.dy;
    this.ctx.drawImage(this.enemyImg, this.x, this.y, this.width, this.height);

    this.projectiles.map((projectile) => projectile.draw());

    this.detectCollision();
    if (this.y > 550) {
      game.removeEnemy(this.id)
    }
  }
}

export default Enemy;