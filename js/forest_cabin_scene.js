/**
 * Moss Trail — Forest Cabin Scene
 * Drawn as a full background; main game overlays characters + exit pad.
 *
 * API:
 *   ForestCabinScene.draw(ctx, canvas)
 *   ForestCabinScene.getMeta()
 */
(function (global) {
  'use strict';

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    let r = (n >> 16) + amt;
    let g = ((n >> 8) & 0xff) + amt;
    let b = (n & 0xff) + amt;
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function drawTree(ctx, x, baseY, h) {
    ctx.fillStyle = '#2a1a10';
    ctx.fillRect(x - 7, baseY - h * 0.32, 14, h * 0.32);
    ctx.fillStyle = '#1a3a28';
    ctx.beginPath();
    ctx.moveTo(x, baseY - h);
    ctx.lineTo(x + h * 0.26, baseY - h * 0.32);
    ctx.lineTo(x - h * 0.26, baseY - h * 0.32);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#245038';
    ctx.beginPath();
    ctx.moveTo(x, baseY - h * 0.82);
    ctx.lineTo(x + h * 0.2, baseY - h * 0.38);
    ctx.lineTo(x - h * 0.2, baseY - h * 0.38);
    ctx.closePath();
    ctx.fill();
  }

  function drawCabin(ctx, x, groundY, w, h) {
    // Shadow pad
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(x + w * 0.5, groundY + 4, w * 0.48, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Walls
    ctx.fillStyle = '#6b4a2e';
    ctx.fillRect(x, groundY - h, w, h);
    ctx.fillStyle = shade('#6b4a2e', -20);
    ctx.fillRect(x, groundY - h, 8, h);
    ctx.fillRect(x + w - 8, groundY - h, 8, h);

    // Log lines
    ctx.strokeStyle = 'rgba(40,24,12,0.35)';
    ctx.lineWidth = 2;
    for (let ly = groundY - h + 18; ly < groundY - 10; ly += 16) {
      ctx.beginPath();
      ctx.moveTo(x + 10, ly);
      ctx.lineTo(x + w - 10, ly);
      ctx.stroke();
    }

    // Roof
    ctx.fillStyle = '#3a2a1a';
    ctx.beginPath();
    ctx.moveTo(x - 14, groundY - h + 8);
    ctx.lineTo(x + w * 0.5, groundY - h - 48);
    ctx.lineTo(x + w + 14, groundY - h + 8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#4a3422';
    ctx.beginPath();
    ctx.moveTo(x - 6, groundY - h + 4);
    ctx.lineTo(x + w * 0.5, groundY - h - 36);
    ctx.lineTo(x + w + 6, groundY - h + 4);
    ctx.closePath();
    ctx.fill();

    // Chimney + smoke
    ctx.fillStyle = '#4a4038';
    ctx.fillRect(x + w * 0.72, groundY - h - 55, 22, 48);
    ctx.fillStyle = 'rgba(200,200,200,0.25)';
    ctx.beginPath();
    ctx.ellipse(x + w * 0.72 + 11, groundY - h - 68, 12, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + w * 0.72 + 18, groundY - h - 82, 16, 10, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Door
    ctx.fillStyle = '#2a1a10';
    ctx.fillRect(x + w * 0.38, groundY - 72, 42, 72);
    ctx.strokeStyle = '#1a1008';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + w * 0.38, groundY - 72, 42, 72);
    ctx.fillStyle = '#c8a050';
    ctx.beginPath();
    ctx.arc(x + w * 0.38 + 32, groundY - 38, 3, 0, Math.PI * 2);
    ctx.fill();

    // Window glow
    ctx.fillStyle = '#e8c94a';
    ctx.fillRect(x + 18, groundY - 78, 28, 24);
    ctx.fillStyle = 'rgba(255, 220, 120, 0.35)';
    ctx.fillRect(x + 14, groundY - 82, 36, 32);
    ctx.strokeStyle = '#2a1a10';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 18, groundY - 78, 28, 24);
    ctx.beginPath();
    ctx.moveTo(x + 32, groundY - 78);
    ctx.lineTo(x + 32, groundY - 54);
    ctx.moveTo(x + 18, groundY - 66);
    ctx.lineTo(x + 46, groundY - 66);
    ctx.stroke();
  }

  function draw(ctx, canvas) {
    const W = canvas.width;
    const H = canvas.height;

    // Soft moss-trail sky / canopy light
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#3a5a48');
    sky.addColorStop(0.4, '#2a4a38');
    sky.addColorStop(1, '#1a3024');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Mossy ground
    ctx.fillStyle = '#2a4a32';
    ctx.fillRect(0, H * 0.58, W, H * 0.42);
    ctx.fillStyle = '#345a3c';
    for (let i = 0; i < 40; i++) {
      const gx = ((i * 73) % W);
      const gy = H * 0.6 + ((i * 41) % (H * 0.35));
      ctx.beginPath();
      ctx.ellipse(gx, gy, 18 + (i % 5) * 4, 8, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Moss trail path (winding toward cabin)
    ctx.fillStyle = '#4a5a38';
    ctx.beginPath();
    ctx.moveTo(W * 0.15, H);
    ctx.quadraticCurveTo(W * 0.28, H * 0.78, W * 0.42, H * 0.68);
    ctx.quadraticCurveTo(W * 0.55, H * 0.62, W * 0.62, H * 0.72);
    ctx.lineTo(W * 0.72, H * 0.72);
    ctx.quadraticCurveTo(W * 0.58, H * 0.6, W * 0.48, H * 0.66);
    ctx.quadraticCurveTo(W * 0.32, H * 0.76, W * 0.28, H);
    ctx.closePath();
    ctx.fill();

    // Path stones
    ctx.fillStyle = '#6a6a58';
    for (let i = 0; i < 14; i++) {
      const t = i / 13;
      const sx = W * (0.22 + t * 0.42);
      const sy = H * (0.95 - t * 0.28) + ((i % 3) - 1) * 6;
      ctx.beginPath();
      ctx.ellipse(sx, sy, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Trees around the clearing
    drawTree(ctx, 40, H * 0.72, 200);
    drawTree(ctx, 95, H * 0.76, 160);
    drawTree(ctx, 150, H * 0.7, 210);
    drawTree(ctx, 580, H * 0.74, 190);
    drawTree(ctx, 620, H * 0.78, 150);
    drawTree(ctx, 520, H * 0.58, 140);
    drawTree(ctx, 200, H * 0.55, 130);

    // Cabin
    drawCabin(ctx, 360, H * 0.72, 170, 110);

    // Soft glow / fireflies
    ctx.fillStyle = 'rgba(180,255,140,0.45)';
    for (let i = 0; i < 14; i++) {
      const fx = 30 + ((i * 89) % 580);
      const fy = 40 + ((i * 47) % 220);
      ctx.beginPath();
      ctx.arc(fx, fy, 2 + (i % 2), 0, Math.PI * 2);
      ctx.fill();
    }

    // Title
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(W / 2 - 130, 14, 260, 34);
    ctx.fillStyle = '#9dffc0';
    ctx.font = 'bold 15px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('Moss Trail — Cabin', W / 2, 36);
    ctx.textAlign = 'left';
  }

  function getMeta() {
    return {
      id: 'forest_cabin',
      name: 'Moss Trail — Cabin',
      roomKey: 'forestPath1'
    };
  }

  global.ForestCabinScene = {
    draw: draw,
    getMeta: getMeta
  };
})(typeof window !== 'undefined' ? window : globalThis);
