// ============================================
// SCENE — Forest Pathway
// ============================================
function drawForestPathway(ctx) {
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    // --- Sky ---
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.45);
    sky.addColorStop(0, '#a8c9d9');
    sky.addColorStop(1, '#cde0c9');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.45);

    // --- Ground (grass) ---
    ctx.fillStyle = '#6a8a4a';
    ctx.fillRect(0, H * 0.45, W, H * 0.55);

    // Grass texture patches
    ctx.fillStyle = '#5a7a3e';
    for (let i = 0; i < 40; i++) {
        const gx = Math.random() * W;
        const gy = H * 0.45 + Math.random() * (H * 0.55);
        ctx.fillRect(gx, gy, 4, 4);
    }

    // --- Dirt path winding through the middle ---
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

    // Path texture (small stones/dirt spots)
    ctx.fillStyle = '#7a5a3a';
    for (let i = 0; i < 25; i++) {
        const t = Math.random();
        const px = W * 0.4 + t * (W * 0.15) + Math.random() * 20 - 10;
        const py = H * 0.45 + t * (H * 0.55);
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    // Path edge shading
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

    // --- Trees scattered on both sides ---
    drawTree(ctx, 60, H * 0.5, 70);
    drawTree(ctx, 150, H * 0.42, 90);
    drawTree(ctx, 250, H * 0.55, 60);
    drawTree(ctx, W - 90, H * 0.48, 80);
    drawTree(ctx, W - 190, H * 0.4, 70);
    drawTree(ctx, W - 280, H * 0.58, 65);
    drawTree(ctx, 340, H * 0.38, 55);
    drawTree(ctx, W - 340, H * 0.36, 60);

    // --- Signpost pointing to the other side ---
    drawSignpost(ctx, W * 0.5, H * 0.68, 'CABIN ►');

    // --- Door back to the previous area (left edge) ---
    drawShopDoor(ctx, 20, H * 0.45 - 20, '#3a2a1a');
    ctx.fillStyle = '#2a2a26';
    ctx.font = '12px monospace';
    ctx.fillText('◄ Back', 5, H * 0.45 - 28);
}

// ---- Simple pine-style tree ----
function drawTree(ctx, x, groundY, size) {
    const trunkW = size * 0.15;
    const trunkH = size * 0.35;

    // Trunk
    ctx.fillStyle = '#5a4028';
    ctx.fillRect(x - trunkW / 2, groundY - trunkH, trunkW, trunkH);

    // Foliage (layered triangles for a simple pine look)
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

    // Slight highlight on top layer
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
    // Post
    ctx.fillStyle = '#5a4028';
    ctx.fillRect(x - 4, groundY - 60, 8, 60);

    // Sign board (angled slightly)
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

// ============================================
// SCENE — Cabin Clearing
// ============================================
function drawCabinClearing(ctx) {
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    // --- Sky ---
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.45);
    sky.addColorStop(0, '#a8c9d9');
    sky.addColorStop(1, '#cde0c9');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.45);

    // --- Ground (grass clearing) ---
    ctx.fillStyle = '#7a9a54';
    ctx.fillRect(0, H * 0.45, W, H * 0.55);

    ctx.fillStyle = '#6a8a48';
    for (let i = 0; i < 35; i++) {
        const gx = Math.random() * W;
        const gy = H * 0.45 + Math.random() * (H * 0.55);
        ctx.fillRect(gx, gy, 4, 4);
    }

    // --- Dirt path leading in from the left (continues from forest) ---
    ctx.fillStyle = '#8a6a4a';
    ctx.beginPath();
    ctx.moveTo(0, H * 0.62);
    ctx.lineTo(W * 0.35, H * 0.62);
    ctx.lineTo(W * 0.4, H * 0.9);
    ctx.lineTo(0, H * 0.9);
    ctx.closePath();
    ctx.fill();

    // --- Trees framing the clearing (fewer, pushed to edges) ---
    drawTree(ctx, 40, H * 0.5, 75);
    drawTree(ctx, W - 60, H * 0.48, 80);
    drawTree(ctx, W - 150, H * 0.4, 65);
    drawTree(ctx, 120, H * 0.4, 60);

    // --- Cabin (center-right of clearing) ---
    drawCabin(ctx, W * 0.42, H * 0.85, 260, H * 0.4);

    // --- Door back to forest path (left edge) ---
    drawShopDoor(ctx, 10, H * 0.62 - 20, '#3a2a1a');
    ctx.fillStyle = '#2a2a26';
    ctx.font = '12px monospace';
    ctx.fillText('◄ Forest', 0, H * 0.62 - 28);
}

// ---- Cabin exterior ----
function drawCabin(ctx, x, groundY, w, h) {
    const y = groundY - h;

    // Log wall (horizontal plank look)
    ctx.fillStyle = '#8a6a4a';
    ctx.fillRect(x, y, w, h * 0.75);

    // Log plank lines
    ctx.strokeStyle = '#6a4f32';
    ctx.lineWidth = 2;
    for (let ly = y + 12; ly < y + h * 0.75; ly += 16) {
        ctx.beginPath();
        ctx.moveTo(x, ly);
        ctx.lineTo(x + w, ly);
        ctx.stroke();
    }

    // Peaked roof
    ctx.fillStyle = '#4a3520';
    ctx.beginPath();
    ctx.moveTo(x - 15, y);
    ctx.lineTo(x + w / 2, y - h * 0.3);
    ctx.lineTo(x + w + 15, y);
    ctx.closePath();
    ctx.fill();

    // Roof shading
    ctx.fillStyle = '#3a2a18';
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y - h * 0.3);
    ctx.lineTo(x + w + 15, y);
    ctx.lineTo(x + w - 10, y);
    ctx.closePath();
    ctx.fill();

    // Chimney
    ctx.fillStyle = '#7a6a5a';
    ctx.fillRect(x + w * 0.7, y - h * 0.22, 22, h * 0.25);
    ctx.fillStyle = '#5a4a3a';
    ctx.fillRect(x + w * 0.7 - 3, y - h * 0.22 - 4, 28, 6);

    // Small smoke puffs
    ctx.fillStyle = 'rgba(220,220,220,0.5)';
    ctx.beginPath();
    ctx.arc(x + w * 0.7 + 11, y - h * 0.3, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w * 0.7 + 16, y - h * 0.38, 8, 0, Math.PI * 2);
    ctx.fill();

    // Window with warm glow
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

    // Front door (normal door, leads inside)
    drawShopDoor(ctx, x + w / 2 - 25, groundY - 70, '#3a2a1a');

    // Small porch step
    ctx.fillStyle = '#6a5a48';
    ctx.fillRect(x + w / 2 - 35, groundY, 70, 8);
}
