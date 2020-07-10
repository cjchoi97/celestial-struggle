import Level from '../../level';
import Enemy from '../../enemy';

function level1(ctx) {
  const enemies = [];
  const width = ctx.canvas.width;
  const height = -100;

  const generateHorizontal = () => {
    return Math.floor(Math.random() * Math.floor(width - 70));
  }

  const generateVertical = () => {
    return Math.random() * ((height-300) - height) + height;
  }

  for (let i = 0; i < 20; i++) {
    const enemy = new Enemy(ctx, {
      img: "./src/assets/enemy-ship.png",
      height: 70,
      width: 70,
      x: generateHorizontal(),
      y: generateVertical(),
      dy: 1,
      id: i
    });

    enemies.push(enemy);
  }

  return new Level(enemies);
}

export default level1;