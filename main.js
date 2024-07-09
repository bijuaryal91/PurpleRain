// Get the canvas element and its drawing context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the initial canvas width and height to the window's dimensions
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Function to generate a random number between min and max
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to map a value from one range to another
function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

// Array to store the raindrops
const drops = [];

// Initialize 500 raindrops with random properties
for (let i = 0; i < 500; i++) {
  drops.push({
    x: random(0, width),      // X-coordinate of the drop
    y: random(-500, -50),     // Initial Y-coordinate of the drop
    z: random(0, 20),         // Z-coordinate for depth effect
    len: 0,                   // Length of the drop
    yspeed: 0,                // Falling speed of the drop
    init() {                  // Initialize drop properties based on depth
      this.len = map(this.z, 0, 20, 10, 20);
      this.yspeed = map(this.z, 0, 20, 1, 20);
    },
  });
  drops[i].init();
}

// Function to update the position of a drop
function fall(drop) {
  drop.y += drop.yspeed;      // Move the drop down by its speed
  const grav = map(drop.z, 0, 20, 0, 0.2);  // Gravity effect based on depth
  drop.yspeed += grav;        // Increase speed by gravity

  // Reset drop if it goes off screen
  if (drop.y > height) {
    drop.y = random(-200, -100);  // Start the drop from a new random position above the canvas
    drop.yspeed = map(drop.z, 0, 20, 4, 10); // Reset speed based on depth
  }
}

// Function to draw a drop on the canvas
function show(drop) {
  const thick = map(drop.z, 0, 20, 1, 3);  // Thickness of the drop based on depth
  ctx.lineWidth = thick;
  ctx.strokeStyle = "rgb(138, 43, 226)";  // Color of the drop
  ctx.beginPath();
  ctx.moveTo(drop.x, drop.y);             // Start point of the drop
  ctx.lineTo(drop.x, drop.y + drop.len);  // End point of the drop
  ctx.stroke();
}

// Function to animate the drops
function animate() {
  ctx.clearRect(0, 0, width, height);  // Clear the canvas
  for (let i = 0; i < drops.length; i++) {
    fall(drops[i]);                    // Update drop position
    show(drops[i]);                    // Draw drop
  }
  requestAnimationFrame(animate);      // Request the next frame
}

animate();  // Start the animation

// Event listener to handle window resize
window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  drops.length = 0;  // Clear the existing drops
  for (let i = 0; i < 500; i++) {  // Reinitialize drops for new canvas size
    drops.push({
      x: random(0, width),
      y: random(-500, -50),
      z: random(0, 20),
      len: 0,
      yspeed: 0,
      init() {
        this.len = map(this.z, 0, 20, 10, 20);
        this.yspeed = map(this.z, 0, 20, 1, 20);
      },
    });
    drops[i].init();
  }
});
