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

    // if (this.y > 0 && this.y < 1) {
    //   console.log("here");
    //   this.timerInterval = setInterval(this.selfTimer, 1000/1);
    // } 
  }

  selfTimer() {
    this.time++;
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
      clearInterval(this.firingRate);
      // clearInterval(game.enemyShot);

      console.log("player and enemy collide");

      game.removeEnemy(this.id);
      /* kill player too */
    }
  }

  fireProjectile() {
    // debugger
    this.projectile = new Projectile({
      x: this.x + 30,
      y: this.y + 70,
      dy: 5,
      ctx: this.ctx,
      img: './src/assets/enemy-projectile.png',
      type: "enemy"
    })
    // console.log("fired");
    this.projectile.draw();  
    // console.log(this.projectile.y);
  }
  
  draw() {
    this.y += this.dy;
    // this.startTime = this.startTime || timestamp;
    // const seconds = ((timestamp - this.startTime) / 1000).toFixed(2);
    // this.time += .01;
    // console.log(this.time);
    
    // if (seconds % 1.00 === 0) {
    //   // this.time += 1;
    //   console.log("this.time");
    // }
    this.ctx.drawImage(this.enemyImg, this.x, this.y, this.width, this.height);
    this.detectCollision();
    if (this.y > 0 && this.y < 1) {
      // this.time = 0;
      this.firingRate = setInterval(this.fireProjectile, 1000 / 1);
    }
    // if (this.y > 0 && this.time % 1.00 === 0) {
    //   // this.fireProjectile();
    //   // this.time = 0;
    // }
    if (this.y > 550) {
      clearInterval(this.firingRate);
      delete this.projectile;
    }
  }
}

export default Enemy;