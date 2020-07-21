[Celestial Struggle Live Link](https://cjchoi97.github.io/celestial-struggle/ "Celestial Struggle Live Link")

![Celestial Struggle Logo][logo]

[logo]: https://github.com/cjchoi97/celestial-struggle/blob/master/src/assets/Celestial-Struggle-Logo.png "Celestial Struggle Logo"

Celestial Struggle is a chaotic spin of the classic space shooter Galaga. The goal is to conquer space while struggling to get through the multitude of enemies. 

## Controls

* W: move up
* A: move left
* S: move down
* D: move right

# Feature Highlights
## Firing Projectiles
![Fire](https://github.com/cjchoi97/celestial-struggle/blob/master/src/assets/Celestial-struggle-projectiles.gif "Fire")

Whether it's the enemy or you, the player, every ship shown on the screen will fire projectiles at a certain frequency and with a certain projectile velocity.


Figuring out the timing for bullets to fire withing the animation frame was definitely challenging. 


```javascript
addProjectile(newTime) {
  const newPlayerShot = this.player.fireProjectile();
  this.playerProjectiles.push(newPlayerShot);
  return newTime;
}

addEnemyProjectile(newTime, i) {
  const newEnemyShot = this.enemies[i].fireProjectile();
  this.enemies[i].projectiles.push(newEnemyShot);
  return newTime;
}
```

There are two separate arrays used to keep track of every projectile whether it belongs to an enemy or a player. Every ship has a "fireProjectile()" function, which just creates a new projectile object and stores it in it's respective array.

```javascript
draw(timestamp) {

  //====== Player firing Rate ======//
  this.startTime =
      (timestamp - this.startTime > 300) //every 300 miliseconds
      ? this.addProjectile(timestamp)
      : this.startTime;

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.renderBackground();
  this.player.draw(); //draw the player on every frame

  //====== Drawing Enemies ======//
  for (let i = 0; i < this.enemies.length; i++) {
    if (this.enemies[i]) {
      this.enemies[i].draw(timestamp);
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

  //====== Checking for remaining enemies ======//
  if (!this.enemiesLeft()) {
    this.gameOnGoing = false;
    this.gameOver();
    return;
  }

  this.animationLoop = requestAnimationFrame(this.draw);
}
```
This is the general game loop and as you can see, a timer was set up using the "timestamp" parameter that is made available with the animation frame. You can see where the player projectiles are drawn, but the enemy projectiles are drawn within their own "draw" function.

As you can see, projectiles are added to their respective arrays at certain time intervals, and that's when they are drawn onto the screen.

## Architecture and Technology
* JavaScript for game logic
* CanvasHTML for rendering game 
* CSS3 for styling
* Webpack for bundling files
