/**
 * Extra forest branch scenes for Ani Adventure.
 * Exports global drawers used by index.html.
 */
(function (global) {
  'use strict';

  function seedRand(n) {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  function pine(ctx, x, baseY, size) {
    const trunkW = size * 0.14;
    const trunkH = size * 0.32;
    ctx.fillStyle = '#3a2818';
    ctx.fillRect(x - trunkW / 2, baseY - trunkH, trunkW, trunkH);
    ctx.fillStyle = '#1a3a24';
    for (let i = 0; i < 3; i++) {
      const layerY = baseY - trunkH - i * size * 0.26;
      const layerW = size * (1 - i * 0.2);
      ctx.beginPath();
      ctx.moveTo(x - layerW / 2, layerY);
      ctx.lineTo(x + layerW / 2, layerY);
      ctx.lineTo(x, layerY - size * 0.38);
      ctx.closePath();
      ctx.fill();
    }
  }

  // ---- Deep Thicket: dense trees, thin path ----
  function drawDeepThicket(ctx, canvas) {
    const W = canvas.width, H = canvas.height;
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#0c1810');
    sky.addColorStop(0.5, '#142818');
    sky.addColorStop(1, '#0a140c');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Dense tree wall left & right — leave a thin corridor
    for (let i = 0; i < 12; i++) {
      pine(ctx, 20 + i * 18, H * 0.85, 140 + (i % 4) * 30);
      pine(ctx, W - 20 - i * 18, H * 0.88, 150 + (i % 3) * 25);
    }
    // Mid-ground trees tight around path
    for (let i = 0; i < 8; i++) {
      pine(ctx, 80 + i * 12, H * 0.7, 100 + i * 8);
      pine(ctx, W - 90 - i * 12, H * 0.72, 110 + i * 6);
    }

    // Thin dirt path down the middle
    ctx.fillStyle = '#4a3a28';
    ctx.beginPath();
    ctx.moveTo(W / 2 - 22, H);
    ctx.lineTo(W / 2 - 12, H * 0.35);
    ctx.lineTo(W / 2 + 12, H * 0.35);
    ctx.lineTo(W / 2 + 22, H);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#5a4a32';
    for (let i = 0; i < 20; i++) {
      const t = i / 19;
      ctx.fillRect(W / 2 - 4 + ((i * 3) % 7) - 3, H * 0.38 + t * H * 0.55, 3, 2);
    }

    // Cave mouth ahead (top of path)
    const cx = W / 2, cy = H * 0.32;
    ctx.fillStyle = '#1a1510';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 10, 48, 55, 0, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#0a0806';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 14, 34, 42, 0, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = 'rgba(125,255,176,0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(cx - 50, cy - 50, 100, 90);
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(W / 2 - 110, 10, 220, 32);
    ctx.fillStyle = '#7dffb0';
    ctx.font = 'bold 14px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('Deep Thicket', W / 2, 32);
    ctx.fillStyle = 'rgba(232,201,74,0.85)';
    ctx.font = '11px Courier New';
    ctx.fillText('cave ahead →', W / 2, cy - 58);
    ctx.textAlign = 'left';
  }

  // ---- Forest cave (empty hermit hideout) ----
  function drawForestCave(ctx, canvas) {
    const W = canvas.width, H = canvas.height;

    // Rock walls
    const wall = ctx.createLinearGradient(0, 0, 0, H);
    wall.addColorStop(0, '#2a2420');
    wall.addColorStop(0.5, '#1a1814');
    wall.addColorStop(1, '#12100e');
    ctx.fillStyle = wall;
    ctx.fillRect(0, 0, W, H);

    // Cave mouth light from entrance (left)
    const light = ctx.createRadialGradient(40, H * 0.55, 10, 120, H * 0.55, 200);
    light.addColorStop(0, 'rgba(80,100,70,0.35)');
    light.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, W * 0.55, H);

    // Floor
    ctx.fillStyle = '#2a2622';
    ctx.fillRect(0, H * 0.7, W, H * 0.3);
    ctx.fillStyle = '#1e1c18';
    for (let i = 0; i < 30; i++) {
      ctx.fillRect(seedRand(i * 3) * W, H * 0.72 + seedRand(i * 5) * H * 0.25, 6, 4);
    }

    // Stalactites
    ctx.fillStyle = '#3a342e';
    for (let i = 0; i < 10; i++) {
      const sx = 80 + i * 55;
      const sh = 20 + (i % 4) * 12;
      ctx.beginPath();
      ctx.moveTo(sx - 8, 0);
      ctx.lineTo(sx + 8, 0);
      ctx.lineTo(sx, sh);
      ctx.closePath();
      ctx.fill();
    }

    // Empty campfire ring (placeholder for hermit later)
    ctx.strokeStyle = '#4a4038';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(W * 0.55, H * 0.78, 28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#2a2218';
    ctx.beginPath();
    ctx.arc(W * 0.55, H * 0.78, 18, 0, Math.PI * 2);
    ctx.fill();

    // Dim glow far back
    ctx.fillStyle = 'rgba(100,80,40,0.08)';
    ctx.beginPath();
    ctx.ellipse(W * 0.75, H * 0.5, 80, 100, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(W / 2 - 130, 12, 260, 36);
    ctx.fillStyle = '#c0b8a8';
    ctx.font = 'bold 15px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('Forest Cave', W / 2, 30);
    ctx.font = '11px Courier New';
    ctx.fillStyle = '#888';
    ctx.fillText('(empty — hermit hideout later)', W / 2, 46);
    ctx.textAlign = 'left';
  }

  // ---- Giant mushroom pond ----
  function drawMushroomPond(ctx, canvas) {
    const W = canvas.width, H = canvas.height;

    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5);
    sky.addColorStop(0, '#4a3a68');
    sky.addColorStop(1, '#6a5a80');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.5);

    // Soft ground
    ctx.fillStyle = '#3a4a38';
    ctx.fillRect(0, H * 0.48, W, H * 0.52);

    // Giant mushrooms (tree-sized)
    function giantShroom(x, baseY, scale, capColor) {
      const stemH = 90 * scale;
      const stemW = 28 * scale;
      ctx.fillStyle = '#d8d0c0';
      ctx.fillRect(x - stemW / 2, baseY - stemH, stemW, stemH);
      ctx.fillStyle = '#c8c0b0';
      ctx.fillRect(x - stemW / 2 + 4, baseY - stemH, stemW * 0.35, stemH);
      // Cap
      ctx.fillStyle = capColor;
      ctx.beginPath();
      ctx.ellipse(x, baseY - stemH, 55 * scale, 32 * scale, 0, Math.PI, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x, baseY - stemH + 4, 55 * scale, 18 * scale, 0, 0, Math.PI);
      ctx.fill();
      // Spots
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath();
      ctx.arc(x - 18 * scale, baseY - stemH - 8 * scale, 6 * scale, 0, Math.PI * 2);
      ctx.arc(x + 12 * scale, baseY - stemH - 4 * scale, 5 * scale, 0, Math.PI * 2);
      ctx.arc(x + 22 * scale, baseY - stemH - 14 * scale, 4 * scale, 0, Math.PI * 2);
      ctx.fill();
    }

    giantShroom(70, H * 0.85, 1.6, '#c04080');
    giantShroom(160, H * 0.9, 1.2, '#a050c0');
    giantShroom(520, H * 0.88, 1.5, '#e07040');
    giantShroom(600, H * 0.82, 1.8, '#8040a0');
    giantShroom(280, H * 0.78, 1.1, '#d06090');
    giantShroom(400, H * 0.8, 1.35, '#9060c8');

    // Pond in center
    const pond = ctx.createRadialGradient(W / 2, H * 0.72, 20, W / 2, H * 0.72, 110);
    pond.addColorStop(0, '#4a80a8');
    pond.addColorStop(0.5, '#306888');
    pond.addColorStop(1, '#1a4058');
    ctx.fillStyle = pond;
    ctx.beginPath();
    ctx.ellipse(W / 2, H * 0.72, 120, 48, 0, 0, Math.PI * 2);
    ctx.fill();
    // Highlight
    ctx.fillStyle = 'rgba(180,220,255,0.25)';
    ctx.beginPath();
    ctx.ellipse(W / 2 - 30, H * 0.7, 40, 12, -0.3, 0, Math.PI * 2);
    ctx.fill();
    // Shore
    ctx.strokeStyle = '#5a4a38';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(W / 2, H * 0.72, 122, 50, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Path from bottom to pond
    ctx.fillStyle = '#6a5a40';
    ctx.beginPath();
    ctx.moveTo(W / 2 - 40, H);
    ctx.lineTo(W / 2 - 20, H * 0.82);
    ctx.lineTo(W / 2 + 20, H * 0.82);
    ctx.lineTo(W / 2 + 40, H);
    ctx.closePath();
    ctx.fill();

    // Spores / glow
    ctx.fillStyle = 'rgba(200,140,255,0.4)';
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(40 + ((i * 83) % 560), 40 + ((i * 47) % 200), 2 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(W / 2 - 140, 12, 280, 34);
    ctx.fillStyle = '#e0c0ff';
    ctx.font = 'bold 15px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('Giant Mushroom Pond', W / 2, 36);
    ctx.textAlign = 'left';
  }

  // ---- Road fork ----
  function drawRoadFork(ctx, canvas) {
    const W = canvas.width, H = canvas.height;

    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5);
    sky.addColorStop(0, '#78b0e0');
    sky.addColorStop(1, '#c8dcb0');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.5);

    ctx.fillStyle = '#5aaa50';
    ctx.fillRect(0, H * 0.48, W, H * 0.52);

    // Main dirt trail from bottom center
    ctx.fillStyle = '#9a7a50';
    ctx.beginPath();
    ctx.moveTo(W / 2 - 50, H);
    ctx.lineTo(W / 2 - 22, H * 0.58);
    ctx.lineTo(W / 2 + 22, H * 0.58);
    ctx.lineTo(W / 2 + 50, H);
    ctx.closePath();
    ctx.fill();

    // Left fork
    ctx.beginPath();
    ctx.moveTo(W / 2 - 22, H * 0.58);
    ctx.lineTo(W * 0.15, H * 0.35);
    ctx.lineTo(W * 0.28, H * 0.32);
    ctx.lineTo(W / 2 + 4, H * 0.56);
    ctx.closePath();
    ctx.fill();

    // Right fork
    ctx.beginPath();
    ctx.moveTo(W / 2 + 22, H * 0.58);
    ctx.lineTo(W * 0.85, H * 0.35);
    ctx.lineTo(W * 0.72, H * 0.32);
    ctx.lineTo(W / 2 - 4, H * 0.56);
    ctx.closePath();
    ctx.fill();

    // Fork signs
    function pathPad(x, y, w, h, label, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = 'rgba(232,201,74,0.85)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      ctx.strokeRect(x + 2, y + 2, w - 4, h - 4);
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(x + 6, y + 8, w - 12, 36);
      ctx.fillStyle = '#eee';
      ctx.font = 'bold 12px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + w / 2, y + 24);
      ctx.fillStyle = 'rgba(232,201,74,0.9)';
      ctx.font = '10px Courier New';
      ctx.fillText('enter →', x + w / 2, y + 40);
      ctx.textAlign = 'left';
    }
    pathPad(40, 100, 130, 90, '◄ Camp', '#3a5a38');
    pathPad(470, 100, 130, 90, 'Fort ►', '#5a3a2a');

    // Sparse trees at edges only
    pine(ctx, 30, H * 0.75, 90);
    pine(ctx, 610, H * 0.78, 100);

    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(W / 2 - 100, 12, 200, 32);
    ctx.fillStyle = '#e8f5c8';
    ctx.font = 'bold 15px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('Road Fork', W / 2, 34);
    ctx.textAlign = 'left';
  }

  // ---- Wooded camp ----
  function drawForestCamp(ctx, canvas) {
    const W = canvas.width, H = canvas.height;

    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5);
    sky.addColorStop(0, '#5a7a90');
    sky.addColorStop(1, '#8aaa70');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.5);

    ctx.fillStyle = '#4a7a40';
    ctx.fillRect(0, H * 0.48, W, H * 0.52);

    // Trees around the camp ring
    for (let i = 0; i < 10; i++) {
      const ang = (i / 10) * Math.PI * 2;
      const tx = W / 2 + Math.cos(ang) * 220;
      const ty = H * 0.72 + Math.sin(ang) * 50;
      pine(ctx, tx, ty, 100 + (i % 3) * 20);
    }

    // Camp clearing dirt
    ctx.fillStyle = '#7a6a48';
    ctx.beginPath();
    ctx.ellipse(W / 2, H * 0.72, 140, 55, 0, 0, Math.PI * 2);
    ctx.fill();

    // Fire ring
    ctx.fillStyle = '#3a3028';
    ctx.beginPath();
    ctx.arc(W / 2, H * 0.7, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e08030';
    ctx.beginPath();
    ctx.moveTo(W / 2, H * 0.7 - 28);
    ctx.lineTo(W / 2 + 12, H * 0.7);
    ctx.lineTo(W / 2 - 12, H * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f0c040';
    ctx.beginPath();
    ctx.moveTo(W / 2, H * 0.7 - 18);
    ctx.lineTo(W / 2 + 7, H * 0.7 - 2);
    ctx.lineTo(W / 2 - 7, H * 0.7 - 2);
    ctx.closePath();
    ctx.fill();

    // Tents
    function tent(x, y, w) {
      ctx.fillStyle = '#6a5040';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + w / 2, y - 50);
      ctx.lineTo(x + w, y);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#4a3828';
      ctx.beginPath();
      ctx.moveTo(x + w * 0.35, y);
      ctx.lineTo(x + w / 2, y - 50);
      ctx.lineTo(x + w * 0.65, y);
      ctx.closePath();
      ctx.fill();
    }
    tent(W / 2 - 130, H * 0.78, 70);
    tent(W / 2 + 50, H * 0.8, 75);

    // Logs as seats
    ctx.fillStyle = '#5a4030';
    ctx.fillRect(W / 2 - 70, H * 0.76, 50, 12);
    ctx.fillRect(W / 2 + 20, H * 0.77, 50, 12);

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(W / 2 - 100, 12, 200, 32);
    ctx.fillStyle = '#c8e0a0';
    ctx.font = 'bold 15px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('Wooded Camp', W / 2, 34);
    ctx.textAlign = 'left';
  }

  // ---- Bandit fort ----
  function drawBanditFort(ctx, canvas) {
    const W = canvas.width, H = canvas.height;

    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5);
    sky.addColorStop(0, '#6a7a88');
    sky.addColorStop(1, '#8a9a78');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.5);

    ctx.fillStyle = '#5a7048';
    ctx.fillRect(0, H * 0.48, W, H * 0.52);

    // Dirt approach
    ctx.fillStyle = '#8a7048';
    ctx.beginPath();
    ctx.moveTo(W / 2 - 60, H);
    ctx.lineTo(W / 2 - 40, H * 0.65);
    ctx.lineTo(W / 2 + 40, H * 0.65);
    ctx.lineTo(W / 2 + 60, H);
    ctx.closePath();
    ctx.fill();

    // Fort walls
    const fx = W * 0.28, fy = H * 0.38, fw = W * 0.5, fh = H * 0.42;
    ctx.fillStyle = '#6a5038';
    ctx.fillRect(fx, fy, fw, fh);
    // Planks
    ctx.strokeStyle = 'rgba(40,28,16,0.4)';
    ctx.lineWidth = 2;
    for (let x = fx; x < fx + fw; x += 18) {
      ctx.beginPath();
      ctx.moveTo(x, fy);
      ctx.lineTo(x, fy + fh);
      ctx.stroke();
    }
    // Battlements
    ctx.fillStyle = '#5a4028';
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(fx + i * (fw / 8) + 4, fy - 16, fw / 8 - 8, 18);
    }
    // Gate
    ctx.fillStyle = '#2a1a10';
    ctx.fillRect(fx + fw / 2 - 28, fy + fh - 80, 56, 80);
    ctx.strokeStyle = '#1a1008';
    ctx.strokeRect(fx + fw / 2 - 28, fy + fh - 80, 56, 80);
    // Spike tips
    ctx.fillStyle = '#3a2a18';
    for (let i = 0; i < 8; i++) {
      const sx = fx + i * (fw / 8) + fw / 16;
      ctx.beginPath();
      ctx.moveTo(sx - 5, fy - 16);
      ctx.lineTo(sx + 5, fy - 16);
      ctx.lineTo(sx, fy - 28);
      ctx.closePath();
      ctx.fill();
    }

    // Wagon to the side
    const wx = 70, wy = H * 0.78;
    ctx.fillStyle = '#6a4a30';
    ctx.fillRect(wx, wy - 35, 90, 30);
    ctx.fillStyle = '#5a3a22';
    ctx.fillRect(wx + 5, wy - 50, 70, 18);
    // Wheels
    ctx.fillStyle = '#2a2a26';
    ctx.beginPath();
    ctx.arc(wx + 20, wy, 14, 0, Math.PI * 2);
    ctx.arc(wx + 70, wy, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8a8a80';
    ctx.beginPath();
    ctx.arc(wx + 20, wy, 5, 0, Math.PI * 2);
    ctx.arc(wx + 70, wy, 5, 0, Math.PI * 2);
    ctx.fill();
    // Canvas cover
    ctx.fillStyle = '#8a7a60';
    ctx.beginPath();
    ctx.moveTo(wx + 8, wy - 50);
    ctx.quadraticCurveTo(wx + 45, wy - 70, wx + 80, wy - 50);
    ctx.lineTo(wx + 80, wy - 35);
    ctx.lineTo(wx + 8, wy - 35);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(W / 2 - 120, 12, 240, 32);
    ctx.fillStyle = '#e8c8a0';
    ctx.font = 'bold 15px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('Bandit Fort', W / 2, 34);
    ctx.textAlign = 'left';
  }

  // ---- Moss cabin interior (empty cozy hermit-ready room) ----
  function drawCabinInterior(ctx, canvas) {
    const W = canvas.width, H = canvas.height;

    // Wooden walls
    ctx.fillStyle = '#5a4030';
    ctx.fillRect(0, 0, W, H * 0.7);
    ctx.strokeStyle = 'rgba(30,18,10,0.35)';
    ctx.lineWidth = 2;
    for (let y = 20; y < H * 0.7; y += 22) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Floor
    ctx.fillStyle = '#3a2a1a';
    ctx.fillRect(0, H * 0.7, W, H * 0.3);
    ctx.strokeStyle = 'rgba(20,12,6,0.4)';
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, H * 0.7);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    // Fireplace
    ctx.fillStyle = '#2a2218';
    ctx.fillRect(W / 2 - 50, H * 0.35, 100, H * 0.35);
    ctx.fillStyle = '#e08030';
    ctx.beginPath();
    ctx.moveTo(W / 2, H * 0.55);
    ctx.lineTo(W / 2 + 18, H * 0.68);
    ctx.lineTo(W / 2 - 18, H * 0.68);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f0c040';
    ctx.beginPath();
    ctx.moveTo(W / 2, H * 0.58);
    ctx.lineTo(W / 2 + 10, H * 0.67);
    ctx.lineTo(W / 2 - 10, H * 0.67);
    ctx.closePath();
    ctx.fill();

    // Window light
    ctx.fillStyle = 'rgba(180,200,120,0.2)';
    ctx.fillRect(40, 60, 70, 50);
    ctx.strokeStyle = '#2a1a10';
    ctx.strokeRect(40, 60, 70, 50);

    // Simple table & bed shapes (empty hideout feel)
    ctx.fillStyle = '#4a3424';
    ctx.fillRect(80, H * 0.72, 100, 14);
    ctx.fillRect(90, H * 0.72 + 14, 8, 30);
    ctx.fillRect(160, H * 0.72 + 14, 8, 30);
    // Bed
    ctx.fillStyle = '#5a4030';
    ctx.fillRect(W - 180, H * 0.68, 130, 50);
    ctx.fillStyle = '#6a5a70';
    ctx.fillRect(W - 170, H * 0.66, 50, 20);

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(W / 2 - 120, 12, 240, 34);
    ctx.fillStyle = '#e8c94a';
    ctx.font = 'bold 15px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('Moss Cabin — Interior', W / 2, 36);
    ctx.textAlign = 'left';
  }

  global.ForestBranches = {
    drawDeepThicket: drawDeepThicket,
    drawForestCave: drawForestCave,
    drawMushroomPond: drawMushroomPond,
    drawRoadFork: drawRoadFork,
    drawForestCamp: drawForestCamp,
    drawBanditFort: drawBanditFort,
    drawCabinInterior: drawCabinInterior
  };
})(typeof window !== 'undefined' ? window : globalThis);
