import Level from '../../level';
import Enemy from '../../enemy';

function level1() {
  const enemies = [];
  const width = game.ctx.canvas.width;
  const height = game.ctx.canvas.height + 100;

  const generateHorizontal = () => {
    return Math.floor(Math.random() * Math.floor(width));
  }

  const generateVertical = () => {
    return Math.random() * ((height+500) - height) + height;
  }

  for (let i = 0; i < 20; i++) {
    const enemy = new Enemy({
      img: "./src/assets/enemy-ship.png",
      height: 70,
      width: 70,
      x: generateHorizontal(),
      y: generateVertical(),
      dy: 5
    });

    enemies.push(enemy);
  }

  return new Level(enemies);
}

export default level1;