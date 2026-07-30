/**
 * Open Grassland Scene
 * Completely open field with a dirt trail down the center.
 *
 * API:
 *   GrasslandScene.draw(ctx, canvas)
 *   GrasslandScene.getMeta()
 */
(function (global) {
  'use strict';

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {HTMLCanvasElement} canvas
   * @param {{ title?: string, skyTop?: string, skyBot?: string, grassTop?: string, grassBot?: string, mushrooms?: boolean }} [opts]
   */
  function draw(ctx, canvas, opts) {
    opts = opts || {};
    const W = canvas.width;
    const H = canvas.height;
    const title = opts.title || 'Open Grassland';
    const skyTop = opts.skyTop || '#7eb6e8';
    const skyBot = opts.skyBot || '#d4e8c8';
    const grassTop = opts.grassTop || '#6db85a';
    const grassBot = opts.grassBot || '#4a9840';
    const mushrooms = !!opts.mushrooms;

    // Wide open sky
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.55);
    sky.addColorStop(0, skyTop);
    sky.addColorStop(0.55, opts.skyMid || '#b8d4f0');
    sky.addColorStop(1, skyBot);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.55);

    // Soft clouds
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    function cloud(cx, cy, s) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, 28 * s, 14 * s, 0, 0, Math.PI * 2);
      ctx.ellipse(cx + 22 * s, cy + 2, 22 * s, 12 * s, 0, 0, Math.PI * 2);
      ctx.ellipse(cx - 18 * s, cy + 4, 18 * s, 10 * s, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    cloud(100, 60, 1.2);
    cloud(320, 45, 0.9);
    cloud(500, 70, 1.1);

    // Distant soft hills (very low, keep field open)
    ctx.fillStyle = '#6aaa58';
    ctx.beginPath();
    ctx.moveTo(0, H * 0.55);
    ctx.quadraticCurveTo(W * 0.2, H * 0.48, W * 0.4, H * 0.54);
    ctx.quadraticCurveTo(W * 0.65, H * 0.46, W, H * 0.52);
    ctx.lineTo(W, H * 0.55);
    ctx.closePath();
    ctx.fill();

    // Grassland floor — open, no trees
    const grass = ctx.createLinearGradient(0, H * 0.52, 0, H);
    grass.addColorStop(0, grassTop);
    grass.addColorStop(0.5, opts.grassMid || '#5aa848');
    grass.addColorStop(1, grassBot);
    ctx.fillStyle = grass;
    ctx.fillRect(0, H * 0.52, W, H * 0.48);

    // Grass blade tufts (sparse so it stays open)
    ctx.strokeStyle = 'rgba(40,100,30,0.35)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 80; i++) {
      const gx = ((i * 79) % W);
      const gy = H * 0.56 + ((i * 37) % (H * 0.4));
      // Keep center trail clearer
      if (Math.abs(gx - W / 2) < 42) continue;
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx - 2, gy - 8 - (i % 4));
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx + 2, gy - 7 - (i % 3));
      ctx.stroke();
    }

    // Dirt trail down the center (perspective: wider at bottom)
    const trailTopW = 36;
    const trailBotW = 110;
    const trailTopY = H * 0.52;
    const trailBotY = H;
    ctx.fillStyle = '#9a7a50';
    ctx.beginPath();
    ctx.moveTo(W / 2 - trailBotW / 2, trailBotY);
    ctx.lineTo(W / 2 - trailTopW / 2, trailTopY);
    ctx.lineTo(W / 2 + trailTopW / 2, trailTopY);
    ctx.lineTo(W / 2 + trailBotW / 2, trailBotY);
    ctx.closePath();
    ctx.fill();

    // Dirt texture
    ctx.fillStyle = '#8a6a42';
    for (let i = 0; i < 50; i++) {
      const t = (i % 20) / 19;
      const halfW = trailTopW / 2 + (trailBotW / 2 - trailTopW / 2) * t;
      const ty = trailTopY + (trailBotY - trailTopY) * t;
      const tx = W / 2 + (((i * 17) % 21) - 10) * (halfW / 14);
      ctx.fillRect(tx, ty, 3, 2);
    }

    // Lighter wheel ruts
    ctx.strokeStyle = 'rgba(60,40,20,0.25)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 18, trailBotY);
    ctx.lineTo(W / 2 - 8, trailTopY);
    ctx.moveTo(W / 2 + 18, trailBotY);
    ctx.lineTo(W / 2 + 8, trailTopY);
    ctx.stroke();

    // A few wildflowers off the path
    for (let i = 0; i < 16; i++) {
      const fx = 30 + ((i * 91) % (W - 60));
      if (Math.abs(fx - W / 2) < 55) continue;
      const fy = H * 0.62 + ((i * 53) % (H * 0.3));
      ctx.fillStyle = i % 3 === 0 ? '#e8c94a' : (i % 3 === 1 ? '#e88' : '#fff');
      ctx.beginPath();
      ctx.arc(fx, fy, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#3a7a30';
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx, fy + 6);
      ctx.stroke();
    }

    // Optional mushroom hollow accents (same dirt trail)
    if (mushrooms) {
      for (let i = 0; i < 10; i++) {
        const mx = 40 + ((i * 107) % (W - 80));
        if (Math.abs(mx - W / 2) < 58) continue;
        const my = H * 0.65 + ((i * 59) % (H * 0.28));
        // stem
        ctx.fillStyle = '#e8e0d0';
        ctx.fillRect(mx - 3, my - 8, 6, 10);
        // cap
        ctx.fillStyle = i % 2 === 0 ? '#c060a0' : '#e8a040';
        ctx.beginPath();
        ctx.ellipse(mx, my - 10, 12, 7, 0, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.beginPath();
        ctx.arc(mx - 3, my - 12, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Title
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(W / 2 - 130, 14, 260, 34);
    ctx.fillStyle = mushrooms ? '#e0c0ff' : '#e8f5c8';
    ctx.font = 'bold 15px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(title, W / 2, 36);
    ctx.textAlign = 'left';
  }

  function getMeta() {
    return {
      id: 'grassland',
      name: 'Open Grassland',
      roomKey: 'forestPath2'
    };
  }

  global.GrasslandScene = {
    draw: draw,
    getMeta: getMeta
  };
})(typeof window !== 'undefined' ? window : globalThis);
