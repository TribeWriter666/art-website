const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const amplitudeX = centerX * 0.8;
const amplitudeY = centerY * 0.8;

const frequencyX = 5;
const frequencyY = 7;
const phaseX = Math.PI / 4;
const phaseY = Math.PI / 3;

function lissajous(t, freqX, freqY, phaseX, phaseY, ampX, ampY) {
  const x = centerX + Math.sin(freqX * t + phaseX) * ampX;
  const y = centerY + Math.sin(freqY * t + phaseY) * ampY;
  return { x, y };
}

function draw() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const time = Date.now() * 0.001;

  ctx.beginPath();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.lineWidth = 2;

  let prevPoint = lissajous(time, frequencyX, frequencyY, phaseX, phaseY, amplitudeX, amplitudeY);
  ctx.moveTo(prevPoint.x, prevPoint.y);

  for (let i = 1; i <= 1000; i++) {
    const t = time + i * 0.001;
    const point = lissajous(t, frequencyX, frequencyY, phaseX, phaseY, amplitudeX, amplitudeY);
    ctx.lineTo(point.x, point.y);
  }

  ctx.stroke();
  requestAnimationFrame(draw);
}

draw();

