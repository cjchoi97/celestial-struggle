import Player from "./player";
import Background from "./background";
import Controls from "./controls";
import Enemy from "./enemy";
import level1 from "./scripts/levels/level1";
import { game } from ".";

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.background = new Background(this.ctx);
    // this.player = null;
    this.player = new Player(this.ctx);
    // this.enemy = new Enemy(this.ctx);
    this.playerProjectiles = [];
    this.enemyProjectiles = [];
    this.draw = this.draw.bind(this);

    this.setupControls();

    this.levels = [level1];
    this.levelidx = 0;
    this.startTime = 0;
    this.stunTime = 0;
    this.gameOnGoing = false;
    this.gameFinished = false;
    this.setupLevel();
  }

  reset() {
    this.background = new Background(this.ctx);
    // this.player = null;
    this.player = new Player(this.ctx);
    // this.enemy = new Enemy(this.ctx);
    this.playerProjectiles = [];
    this.draw = this.draw.bind(this);

    this.setupControls();

    for (let i = 0; i < this.enemies.lengthl; i++) {
      delete this.enemies[i];
    }

    this.enemies = [];
    this.levels = [level1];
    this.levelidx = 0;
    this.startTime = 0;
    this.gameOnGoing = false;
    this.setupLevel();

  }

  enemiesLeft() {
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i]) {
        return true;
      }
    }

    return false;
  }

  removeEnemy(id) {
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i]) {
        if (this.enemies[i].id === id) {
          // clearInterval(this.enemies[i].firingRate);
          this.enemies[i].projectiles = [];
          delete this.enemies[i];
        }
      }
    }
  }

  setupLevel() {
    this.enemies = this.levels[this.levelidx](this.ctx).enemies;
    this.levelidx++;
  }

  renderBackground() {
    this.background.draw();
  }

  setupControls() {
    new Controls(this.ctx);
  }

  addProjectile(newTime) {
    const newPlayerShot = this.player.fireProjectile();
    this.playerProjectiles.push(newPlayerShot);
    return newTime;
  }

  addEnemyProjectile(newTime, i) {
    const newEnemyShot = this.enemies[i].fireProjectile();
    this.enemies[i].projectiles.push(newEnemyShot);
    // this.enemyProjectiles.push(newEnemyShot);
    return newTime;
  }
  
  gameOver() {
    document.getElementById("end-modal").style.display = "block";
    console.log("We here");
  }

  startStun() {
    this.stunTime = 10;
  }
  
  draw(timestamp) {

    //====== Player firing Rate ======//
    this.startTime =
      (timestamp - this.startTime > 300) //every 300 miliseconds
        ? this.addProjectile(timestamp)
        : this.startTime;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderBackground();
    // if (!this.stunTime) {
      this.player.draw(); //draw the player on every frame
    // } else if (timestamp - this.startTime < 100) {
    //   this.stunTime--;
    //   console.log("INVISIBLE");
    //   if (this.stunTime <= 0) {
    //     this.player.recenter();
    //     this.stunTime = 0;
    //   }
    // }

    //====== Drawing Enemies ======//
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i]) {
        this.enemies[i].draw(timestamp);
        
        // this.enemies[i].projectiles.map((projectile) => projectile.draw());
        if (this.enemies[i] && this.enemies[i].y > 0 ) {
          //====== Enemy Projectiles ======//
          this.enemies[i].time = 
            timestamp - this.enemies[i].time > 3000 //every 3 seconds
            ? this.addEnemyProjectile(timestamp, i) 
            : this.enemies[i].time;
        }
      }
    }

    //====== Drawing Projectiles ======//
    this.playerProjectiles.map((projectile) => projectile.draw());
    // this.enemyProjectiles.map((projectile) => projectile.draw());

    //====== Checking for remaining enemies ======//
    if (!this.enemiesLeft()) {
      this.gameOnGoing = false;
      this.gameOver();
      return;
    }

    this.animationLoop = requestAnimationFrame(this.draw);
  }

  start() {
    this.gameOnGoing = true;
    this.animationLoop = requestAnimationFrame(this.draw);

    // if (!this.enemiesLeft()) {

    //   console.log("Game Over");
    //   return;
    //   // this.enemies.forEach(enemy => {
    //     // console.log(enemy.y);
    //     // if (enemy.y === 0) {
    //       // this.enemyShot = setInterval(enemy.fireProjectile, 1000/1);
    //     // }
    //   // })
    // }
    // setInterval(this.draw(), 10);
  }

  pause() {

    if (this.animationLoop) {
      console.log("GAME SHOULD PAUSE")
      cancelAnimationFrame(this.animationLoop);
    }
  }

}

export default Game;
