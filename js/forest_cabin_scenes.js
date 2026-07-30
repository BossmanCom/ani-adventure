/**
 * Second cabin/forest scene pack (from GitHub repo).
 * - drawForestPathway(ctx)  — winding dirt path through trees
 * - drawCabinClearing(ctx)  — open clearing with log cabin
 *
 * Compatible with Ani Adventure: uses global drawShopDoor(x,y,color) if present.
 * Does NOT draw the crossroads exit pad (main game adds that).
 */
(function (global) {
  'use strict';

  // Deterministic pseudo-random (no per-frame flicker)
  function seedRand(n) {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  // ---- Simple pine-style tree ----
  function drawTree(ctx, x, groundY, size) {
    const trunkW = size * 0.15;
    const trunkH = size * 0.35;

    ctx.fillStyle = '#5a4028';
    ctx.fillRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);

    ctx.fillStyle = '#3f6b3a';
    const layers = 3;
    for (let i = 0; i < layers; i++) {
      const layerY = groundY - trunkH - (i * size * 0.28);
      const layerW = size * (1 - i * 0.22);
      ctx.beginPath();
      ctx.moveTo(x - layerW / 2, layerY);
      ctx.lineTo(x + layerW / 2, layerY);
      ctx.lineTo(x, layerY - size * 0.4);
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = '#4f7d48';
    ctx.beginPath();
    ctx.moveTo(x - size * 0.15, groundY - trunkH - layers * size * 0.28 + size * 0.1);
    ctx.lineTo(x + size * 0.1, groundY - trunkH - layers * size * 0.28 + size * 0.1);
    ctx.lineTo(x, groundY - trunkH - layers * size * 0.28 - size * 0.3);
    ctx.closePath();
    ctx.fill();
  }

  // ---- Wooden signpost ----
  function drawSignpost(ctx, x, groundY, text) {
    ctx.fillStyle = '#5a4028';
    ctx.fillRect(x - 4, groundY - 60, 8, 60);

    ctx.save();
    ctx.translate(x, groundY - 55);
    ctx.rotate(-0.05);
    ctx.fillStyle = '#8a6a4a';
    ctx.fillRect(-2, -14, 80, 24);
    ctx.strokeStyle = '#4a3520';
    ctx.lineWidth = 2;
    ctx.strokeRect(-2, -14, 80, 24);

    ctx.fillStyle = '#f2e6c9';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(text, 38, 2);
    ctx.textAlign = 'left';
    ctx.restore();
  }

  // Safe shop door (game global or simple fallback)
  function door(ctx, x, y, color) {
    if (typeof global.drawShopDoor === 'function') {
      // Game API: drawShopDoor(x, y, color) uses its own ctx
      global.drawShopDoor(x, y, color || '#3a2a1a');
    } else {
      ctx.fillStyle = color || '#3a2a1a';
      ctx.fillRect(x, y, 50, 70);
      ctx.fillStyle = '#2a1a10';
      ctx.fillRect(x + 4, y + 4, 42, 62);
      ctx.fillStyle = '#e8d97a';
      ctx.beginPath();
      ctx.arc(x + 38, y + 35, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ---- Cabin exterior ----
  function drawCabin(ctx, x, groundY, w, h) {
    const y = groundY - h;

    ctx.fillStyle = '#8a6a4a';
    ctx.fillRect(x, y, w, h * 0.75);

    ctx.strokeStyle = '#6a4f32';
    ctx.lineWidth = 2;
    for (let ly = y + 12; ly < y + h * 0.75; ly += 16) {
      ctx.beginPath();
      ctx.moveTo(x, ly);
      ctx.lineTo(x + w, ly);
      ctx.stroke();
    }

    ctx.fillStyle = '#4a3520';
    ctx.beginPath();
    ctx.moveTo(x - 15, y);
    ctx.lineTo(x + w / 2, y - h * 0.3);
    ctx.lineTo(x + w + 15, y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#3a2a18';
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y - h * 0.3);
    ctx.lineTo(x + w + 15, y);
    ctx.lineTo(x + w - 10, y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#7a6a5a';
    ctx.fillRect(x + w * 0.7, y - h * 0.22, 22, h * 0.25);
    ctx.fillStyle = '#5a4a3a';
    ctx.fillRect(x + w * 0.7 - 3, y - h * 0.22 - 4, 28, 6);

    ctx.fillStyle = 'rgba(220,220,220,0.5)';
    ctx.beginPath();
    ctx.arc(x + w * 0.7 + 11, y - h * 0.3, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w * 0.7 + 16, y - h * 0.38, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f2c14a';
    ctx.fillRect(x + w * 0.15, y + h * 0.2, 30, 30);
    ctx.strokeStyle = '#4a3520';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + w * 0.15, y + h * 0.2, 30, 30);
    ctx.beginPath();
    ctx.moveTo(x + w * 0.15 + 15, y + h * 0.2);
    ctx.lineTo(x + w * 0.15 + 15, y + h * 0.2 + 30);
    ctx.moveTo(x + w * 0.15, y + h * 0.2 + 15);
    ctx.lineTo(x + w * 0.15 + 30, y + h * 0.2 + 15);
    ctx.stroke();

    door(ctx, x + w / 2 - 25, groundY - 70, '#3a2a1a');

    ctx.fillStyle = '#6a5a48';
    ctx.fillRect(x + w / 2 - 35, groundY, 70, 8);
  }

  // ============================================
  // SCENE — Forest Pathway
  // ============================================
  function drawForestPathway(ctx) {
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.45);
    sky.addColorStop(0, '#a8c9d9');
    sky.addColorStop(1, '#cde0c9');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.45);

    ctx.fillStyle = '#6a8a4a';
    ctx.fillRect(0, H * 0.45, W, H * 0.55);

    ctx.fillStyle = '#5a7a3e';
    for (let i = 0; i < 40; i++) {
      const gx = seedRand(i * 3.1) * W;
      const gy = H * 0.45 + seedRand(i * 7.7) * (H * 0.55);
      ctx.fillRect(gx, gy, 4, 4);
    }

    ctx.fillStyle = '#8a6a4a';
    ctx.beginPath();
    ctx.moveTo(W * 0.4, H * 0.45);
    ctx.lineTo(W * 0.6, H * 0.45);
    ctx.lineTo(W * 0.75, H * 0.7);
    ctx.lineTo(W * 0.85, H);
    ctx.lineTo(W * 0.55, H);
    ctx.lineTo(W * 0.35, H * 0.7);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#7a5a3a';
    for (let i = 0; i < 25; i++) {
      const t = seedRand(i * 11.3);
      const px = W * 0.4 + t * (W * 0.15) + (seedRand(i * 5.5) * 20 - 10);
      const py = H * 0.45 + t * (H * 0.55);
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#5a4530';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W * 0.4, H * 0.45);
    ctx.lineTo(W * 0.35, H * 0.7);
    ctx.lineTo(W * 0.55, H);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(W * 0.6, H * 0.45);
    ctx.lineTo(W * 0.75, H * 0.7);
    ctx.lineTo(W * 0.85, H);
    ctx.stroke();

    drawTree(ctx, 60, H * 0.5, 70);
    drawTree(ctx, 150, H * 0.42, 90);
    drawTree(ctx, 250, H * 0.55, 60);
    drawTree(ctx, W - 90, H * 0.48, 80);
    drawTree(ctx, W - 190, H * 0.4, 70);
    drawTree(ctx, W - 280, H * 0.58, 65);
    drawTree(ctx, 340, H * 0.38, 55);
    drawTree(ctx, W - 340, H * 0.36, 60);

    drawSignpost(ctx, W * 0.5, H * 0.68, 'CABIN ►');

    // Title
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(W / 2 - 110, 14, 220, 32);
    ctx.fillStyle = '#c8e0a0';
    ctx.font = 'bold 14px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('Ancient Grove Path', W / 2, 36);
    ctx.textAlign = 'left';
  }

  // ============================================
  // SCENE — Cabin Clearing
  // ============================================
  function drawCabinClearing(ctx) {
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.45);
    sky.addColorStop(0, '#a8c9d9');
    sky.addColorStop(1, '#cde0c9');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.45);

    ctx.fillStyle = '#7a9a54';
    ctx.fillRect(0, H * 0.45, W, H * 0.55);

    ctx.fillStyle = '#6a8a48';
    for (let i = 0; i < 35; i++) {
      const gx = seedRand(i * 4.2 + 1) * W;
      const gy = H * 0.45 + seedRand(i * 9.1 + 2) * (H * 0.55);
      ctx.fillRect(gx, gy, 4, 4);
    }

    ctx.fillStyle = '#8a6a4a';
    ctx.beginPath();
    ctx.moveTo(0, H * 0.62);
    ctx.lineTo(W * 0.35, H * 0.62);
    ctx.lineTo(W * 0.4, H * 0.9);
    ctx.lineTo(0, H * 0.9);
    ctx.closePath();
    ctx.fill();

    drawTree(ctx, 40, H * 0.5, 75);
    drawTree(ctx, W - 60, H * 0.48, 80);
    drawTree(ctx, W - 150, H * 0.4, 65);
    drawTree(ctx, 120, H * 0.4, 60);

    drawCabin(ctx, W * 0.42, H * 0.85, 260, H * 0.4);

    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(W / 2 - 120, 14, 240, 32);
    ctx.fillStyle = '#c8e0a0';
    ctx.font = 'bold 14px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('Ancient Grove — Cabin', W / 2, 36);
    ctx.textAlign = 'left';
  }

  // Public API
  global.drawForestPathway = drawForestPathway;
  global.drawCabinClearing = drawCabinClearing;
  global.ForestCabinScenes = {
    drawPathway: drawForestPathway,
    drawCabinClearing: drawCabinClearing
  };
})(typeof window !== 'undefined' ? window : globalThis);
