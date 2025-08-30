const galaxy = document.getElementById("galaxyCanvas");
const g = galaxy.getContext("2d", { alpha: true });

function resizeCanvases() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  galaxy.width = Math.floor(innerWidth * dpr);
  galaxy.height = Math.floor(innerHeight * dpr);
  galaxy.style.width = innerWidth + "px";
  galaxy.style.height = innerHeight + "px";
  g.setTransform(dpr, 0, 0, dpr, 0, 0);

  bubble.width = Math.floor(innerWidth * dpr);
  bubble.height = Math.floor(innerHeight * dpr);
  bubble.style.width = innerWidth + "px";
  bubble.style.height = innerHeight + "px";
  b.setTransform(dpr, 0, 0, dpr, 0, 0);
}

const stars = [];
function initStars() {
  stars.length = 0;
  const count = Math.round((innerWidth * innerHeight) / 12000) + 120;
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.5 + 0.2,
      vy: Math.random() * 0.25 + 0.05,
      tw: Math.random() * Math.PI * 2
    });
  }
}

function drawStars() {
  // deep space gradient
  const grad = g.createRadialGradient(
    innerWidth * 0.7, innerHeight * 0.2, 0,
    innerWidth * 0.7, innerHeight * 0.2, Math.max(innerWidth, innerHeight)
  );
  grad.addColorStop(0, "#040610");
  grad.addColorStop(1, "#000000");
  g.fillStyle = grad;
  g.fillRect(0, 0, innerWidth, innerHeight);

  // subtle nebula
  const neb = g.createRadialGradient(
    innerWidth * 0.2, innerHeight * 0.8, 0,
    innerWidth * 0.2, innerHeight * 0.8, Math.max(innerWidth, innerHeight) * 0.6
  );
  neb.addColorStop(0, "rgba(14,165,233,0.08)");
  neb.addColorStop(1, "rgba(14,165,233,0)");
  g.fillStyle = neb;
  g.fillRect(0, 0, innerWidth, innerHeight);

  // stars (with tiny twinkle)
  stars.forEach(s => {
    s.y += s.vy;
    if (s.y > innerHeight) {
      s.y = -2;
      s.x = Math.random() * innerWidth;
    }
    s.tw += 0.03;
    const a = 0.6 + Math.sin(s.tw) * 0.3;
    g.fillStyle = `rgba(255,255,255,${a})`;
    g.beginPath();
    g.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    g.fill();
  });
}


const bubble = document.getElementById("bubbleCanvas");
const b = bubble.getContext("2d", { alpha: true });

const bubbles = [];
function initBubbles() {
  bubbles.length = 0;
  const count = Math.round((innerWidth * innerHeight) / 60000) + 40;
  for (let i = 0; i < count; i++) {
    const r = Math.random() * 16 + 6;
    bubbles.push({
      x: Math.random() * innerWidth,
      y: innerHeight + Math.random() * innerHeight * 0.5,
      r,
      vy: Math.random() * 0.6 + 0.35,
      drift: Math.random() * 0.6 + 0.2,
      t: Math.random() * Math.PI * 2
    });
  }
}

function drawBubbles() {
  b.clearRect(0, 0, innerWidth, innerHeight);
  bubbles.forEach(p => {
    p.t += 0.01;
    p.y -= p.vy;
    p.x += Math.sin(p.t) * p.drift;

    // wrap to bottom when out of view
    if (p.y + p.r < -5) {
      p.y = innerHeight + p.r + Math.random() * 60;
      p.x = Math.random() * innerWidth;
    }

    // glassy bubble with inner highlight
    const grad = b.createRadialGradient(p.x - p.r * 0.4, p.y - p.r * 0.4, 1, p.x, p.y, p.r);
    grad.addColorStop(0, "rgba(255,255,255,0.25)");
    grad.addColorStop(0.4, "rgba(173,216,230,0.35)");
    grad.addColorStop(1, "rgba(173,216,230,0.0)");

    b.fillStyle = grad;
    b.beginPath();
    b.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    b.fill();

    b.strokeStyle = "rgba(255,255,255,0.15)";
    b.lineWidth = 1;
    b.stroke();
  });
}

/* ---------- Animate ---------- */
function loop() {
  drawStars();
  drawBubbles();
  requestAnimationFrame(loop);
}

/* ---------- Init & Resize ---------- */
resizeCanvases();
initStars();
initBubbles();
loop();

addEventListener("resize", () => {
  resizeCanvases();
  initStars();
  initBubbles();
});
