class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.canvasHeight = ctx.canvas.height;
    this.canvasWidth = ctx.canvas.width;
    this.stars = [];
    this.generateStars(150); // Create 150 stars
    
    this.draw = this.draw.bind(this);
  }
  
  generateStars(count) {
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.canvasWidth,
        y: Math.random() * this.canvasHeight,
        radius: Math.random() * 1.5 + 0.5, // Star size between 0.5 and 2
        speed: Math.random() * 0.3 + 0.1,  // Star speed
        brightness: Math.random() * 0.8 + 0.2, // Star brightness
        color: this.getStarColor()
      });
    }
  }
  
  getStarColor() {
    // Creates white, blue-ish, or yellow-ish stars
    const colors = [
      'rgba(255, 255, 255, 0.8)',  // White
      'rgba(210, 230, 255, 0.8)',  // Blue-ish
      'rgba(255, 255, 210, 0.8)'   // Yellow-ish
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    // Draw a dark blue/black gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
    gradient.addColorStop(0, '#000000');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // Draw and update stars
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      
      // Draw the star
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.fill();
      
      // Move the star down
      star.y += star.speed;
      
      // If star goes off bottom of screen, reset to top
      if (star.y > this.canvasHeight) {
        star.y = 0;
        star.x = Math.random() * this.canvasWidth;
      }
    }
    
    // Add optional distant nebulae
    this.drawNebula(100, 150, 200, 'rgba(70, 50, 120, 0.1)'); // Purple nebula
    this.drawNebula(400, 300, 250, 'rgba(50, 100, 120, 0.1)'); // Blue nebula
  }
  
  drawNebula(x, y, radius, color) {
    const grd = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
    grd.addColorStop(0, color);
    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = grd;
    this.ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
}

export default Background;