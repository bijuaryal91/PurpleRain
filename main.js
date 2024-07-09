const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}
const drops = [];
for (let i = 0; i < 500; i++) {
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

function fall(drop) {
  drop.y += drop.yspeed;
  const grav = map(drop.z, 0, 20, 0, 0.2);
  drop.yspeed += grav;

  if (drop.y > height) {
    drop.y = random(-200, -100);
    drop.yspeed = map(drop.z, 0, 20, 4, 10);
  }
}

function show(drop) {
  const thick = map(drop.z, 0, 20, 1, 3);
  ctx.lineWidth = thick;
  ctx.strokeStyle = "rgb(138, 43, 226)";
  ctx.beginPath();
  ctx.moveTo(drop.x, drop.y);
  ctx.lineTo(drop.x, drop.y + drop.len);
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < drops.length; i++) {
    fall(drops[i]);
    show(drops[i]);
  }
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  drops.length = 0;
  for (let i = 0; i < 500; i++) {
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
