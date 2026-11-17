const cachedDataUrls: Record<number, string> = {};

function encodeSvgFallback(titleEmoji: string, bgTop: string, bgBottom: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${bgTop}"/><stop offset="100%" stop-color="${bgBottom}"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><circle cx="400" cy="270" r="150" fill="rgba(251,191,36,0.16)"/><text x="400" y="310" font-size="140" text-anchor="middle">${titleEmoji}</text></svg>`;
  try {
    const bytes = new TextEncoder().encode(svg);
    let bin = '';
    bytes.forEach((b) => {
      bin += String.fromCharCode(b);
    });
    return `data:image/svg+xml;base64,${btoa(bin)}`;
  } catch {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  points = 5
): void {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawBokehLights(ctx: CanvasRenderingContext2D, seedBase: number, count: number): void {
  const colors = [
    'rgba(253, 224, 71, 0.24)',
    'rgba(251, 146, 60, 0.20)',
    'rgba(248, 113, 113, 0.18)',
    'rgba(52, 211, 153, 0.16)',
  ];
  for (let i = 0; i < count; i++) {
    const s1 = Math.sin(seedBase + i * 12.9898) * 43758.5453;
    const s2 = Math.sin(seedBase + i * 78.233) * 43758.5453;
    const x = (s1 - Math.floor(s1)) * 800;
    const y = (s2 - Math.floor(s2)) * 460;
    const r = 10 + (i % 5) * 8;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, colors[i % colors.length]);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawWrappedGift(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  boxColor: string,
  ribbonColor: string
): void {
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(x + 4, y + h - 4, w, 8);

  ctx.fillStyle = boxColor;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fillRect(x, y, w, 10);

  ctx.fillStyle = ribbonColor;
  ctx.fillRect(x + w / 2 - 6, y, 12, h);
  ctx.fillRect(x, y + h / 2 - 5, w, 10);

  // Bow loops
  ctx.beginPath();
  ctx.ellipse(x + w / 2 - 11, y - 4, 11, 6, -0.35, 0, Math.PI * 2);
  ctx.ellipse(x + w / 2 + 11, y - 4, 11, 6, 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** 0: Glowing Christmas Tree with Gifts */
function paintTreeScene(ctx: CanvasRenderingContext2D): void {
  const bg = ctx.createLinearGradient(0, 0, 0, 600);
  bg.addColorStop(0, '#160d18');
  bg.addColorStop(0.65, '#2b1620');
  bg.addColorStop(1, '#1c1010');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 800, 600);

  // Warm fireplace floor
  const floor = ctx.createLinearGradient(0, 470, 0, 600);
  floor.addColorStop(0, '#3e2315');
  floor.addColorStop(1, '#1e1009');
  ctx.fillStyle = floor;
  ctx.fillRect(0, 470, 800, 130);

  // Frosted winter window on left
  ctx.fillStyle = '#0b1834';
  ctx.fillRect(55, 85, 165, 225);
  ctx.strokeStyle = '#6b4226';
  ctx.lineWidth = 10;
  ctx.strokeRect(55, 85, 165, 225);
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(137, 85);
  ctx.lineTo(137, 310);
  ctx.moveTo(55, 195);
  ctx.lineTo(220, 195);
  ctx.stroke();

  // Snowflakes outside window
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  for (let i = 0; i < 24; i++) {
    const sx = 68 + ((i * 37) % 140);
    const sy = 100 + ((i * 53) % 195);
    ctx.beginPath();
    ctx.arc(sx, sy, 2 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }

  // Golden tree aura
  const aura = ctx.createRadialGradient(435, 275, 20, 435, 275, 290);
  aura.addColorStop(0, 'rgba(253, 224, 71, 0.30)');
  aura.addColorStop(0.55, 'rgba(234, 88, 12, 0.12)');
  aura.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = aura;
  ctx.fillRect(100, 0, 680, 560);

  drawBokehLights(ctx, 1, 18);

  // Trunk
  ctx.fillStyle = '#4a2815';
  ctx.fillRect(410, 430, 50, 65);

  // Layered pine tiers
  const tiers = [
    { topY: 110, botY: 225, halfW: 90, col: '#14532d' },
    { topY: 175, botY: 315, halfW: 138, col: '#166534' },
    { topY: 255, botY: 400, halfW: 185, col: '#15803d' },
    { topY: 340, botY: 455, halfW: 215, col: '#166534' },
  ];
  for (const t of tiers) {
    const grad = ctx.createLinearGradient(435 - t.halfW, t.topY, 435 + t.halfW, t.botY);
    grad.addColorStop(0, '#0f3d23');
    grad.addColorStop(0.5, t.col);
    grad.addColorStop(1, '#092b18');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(435, t.topY);
    ctx.lineTo(435 + t.halfW, t.botY);
    ctx.quadraticCurveTo(435, t.botY + 18, 435 - t.halfW, t.botY);
    ctx.closePath();
    ctx.fill();
  }

  // Golden garland & twinkling string lights
  ctx.strokeStyle = 'rgba(253, 224, 71, 0.65)';
  ctx.lineWidth = 4;
  const garlands = [
    [365, 200, 435, 225, 505, 195],
    [320, 290, 435, 325, 550, 280],
    [275, 385, 435, 425, 595, 375],
  ];
  for (const [x1, y1, cx, cy, x2, y2] of garlands) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cx, cy, x2, y2);
    ctx.stroke();
  }

  // Glowing ornaments
  const ornaments = [
    [435, 175, '#ef4444'],
    [395, 215, '#fbbf24'],
    [475, 220, '#38bdf8'],
    [360, 275, '#facc15'],
    [435, 285, '#dc2626'],
    [510, 280, '#a855f7'],
    [325, 355, '#ef4444'],
    [395, 365, '#fde047'],
    [475, 358, '#22c55e'],
    [545, 365, '#f97316'],
    [295, 420, '#fde047'],
    [375, 430, '#ec4899'],
    [455, 425, '#dc2626'],
    [535, 428, '#38bdf8'],
    [585, 422, '#facc15'],
  ] as const;

  for (const [ox, oy, col] of ornaments) {
    const glow = ctx.createRadialGradient(ox, oy, 2, ox, oy, 22);
    glow.addColorStop(0, 'rgba(255,250,210,0.65)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(ox, oy, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(ox, oy, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.beginPath();
    ctx.arc(ox - 3, oy - 3, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Topper Star
  const starGlow = ctx.createRadialGradient(435, 95, 4, 435, 95, 58);
  starGlow.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
  starGlow.addColorStop(1, 'rgba(254, 240, 138, 0)');
  ctx.fillStyle = starGlow;
  ctx.beginPath();
  ctx.arc(435, 95, 58, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fde047';
  drawStar(ctx, 435, 95, 26, 11, 5);
  ctx.fill();

  // Gifts under the tree
  drawWrappedGift(ctx, 250, 465, 86, 68, '#dc2626', '#fde047');
  drawWrappedGift(ctx, 355, 480, 74, 58, '#16a34a', '#ffffff');
  drawWrappedGift(ctx, 455, 472, 92, 64, '#2563eb', '#facc15');
  drawWrappedGift(ctx, 565, 486, 70, 52, '#db2777', '#fef08a');
}

/** 1: Gingerbread Cookies & Warm Milk */
function paintCookiesScene(ctx: CanvasRenderingContext2D): void {
  const bg = ctx.createLinearGradient(0, 0, 0, 600);
  bg.addColorStop(0, '#1e0f18');
  bg.addColorStop(0.55, '#3b191c');
  bg.addColorStop(1, '#24120c');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 800, 600);

  drawBokehLights(ctx, 7, 26);

  // Warm wooden table
  const table = ctx.createLinearGradient(0, 390, 0, 600);
  table.addColorStop(0, '#6b3a1e');
  table.addColorStop(0.35, '#4b2713');
  table.addColorStop(1, '#291308');
  ctx.fillStyle = table;
  ctx.fillRect(0, 390, 800, 210);

  // Candlelight glow
  const candleAura = ctx.createRadialGradient(145, 235, 10, 145, 235, 180);
  candleAura.addColorStop(0, 'rgba(253, 224, 71, 0.55)');
  candleAura.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = candleAura;
  ctx.fillRect(0, 40, 350, 380);

  // Candle
  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(120, 275, 50, 130);
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(145, 250, 10, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fef9c3';
  ctx.beginPath();
  ctx.ellipse(145, 254, 5, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Glass of warm milk on right
  ctx.save();
  ctx.fillStyle = 'rgba(226, 232, 240, 0.25)';
  ctx.strokeStyle = 'rgba(255,255,255,0.65)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(575, 215);
  ctx.lineTo(685, 215);
  ctx.lineTo(670, 430);
  ctx.lineTo(590, 430);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Milk inside
  const milkGrad = ctx.createLinearGradient(580, 255, 680, 425);
  milkGrad.addColorStop(0, '#ffffff');
  milkGrad.addColorStop(1, '#e2e8f0');
  ctx.fillStyle = milkGrad;
  ctx.beginPath();
  ctx.moveTo(582, 260);
  ctx.lineTo(678, 260);
  ctx.lineTo(666, 425);
  ctx.lineTo(594, 425);
  ctx.closePath();
  ctx.fill();

  // Candy cane beside glass
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(710, 415);
  ctx.lineTo(710, 250);
  ctx.arc(730, 250, 20, Math.PI, 0, false);
  ctx.stroke();
  ctx.strokeStyle = '#ffffff';
  ctx.setLineDash([12, 12]);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // Ceramic plate
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(370, 480, 195, 58, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(365, 465, 190, 56, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.ellipse(365, 465, 165, 45, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Gingerbread cookie man in center
  const drawGingerbreadMan = (cx: number, cy: number, scale: number, rot: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.scale(scale, scale);
    ctx.fillStyle = '#b45309';
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;

    // Body + arms + legs
    ctx.beginPath();
    ctx.arc(0, -45, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.lineCap = 'round';
    ctx.lineWidth = 22;
    ctx.strokeStyle = '#b45309';
    ctx.beginPath();
    ctx.moveTo(-42, -8);
    ctx.lineTo(42, -8);
    ctx.moveTo(0, -22);
    ctx.lineTo(0, 24);
    ctx.moveTo(-14, 24);
    ctx.lineTo(-24, 58);
    ctx.moveTo(14, 24);
    ctx.lineTo(24, 58);
    ctx.stroke();

    // Icing smile, eyes, buttons
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-8, -50, 3.5, 0, Math.PI * 2);
    ctx.arc(8, -50, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, -42, 10, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, -8, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(0, 10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawGingerbreadMan(320, 445, 1.05, -0.18);
  drawGingerbreadMan(430, 455, 0.95, 0.22);

  // Gingerbread Star Cookie
  ctx.save();
  ctx.fillStyle = '#d97706';
  ctx.strokeStyle = '#fef3c7';
  ctx.lineWidth = 4;
  drawStar(ctx, 375, 490, 34, 16, 5);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

/** 2: Snowy Alpine Cabin with Twinkling Lights */
function paintCabinScene(ctx: CanvasRenderingContext2D): void {
  const sky = ctx.createLinearGradient(0, 0, 0, 450);
  sky.addColorStop(0, '#040b1e');
  sky.addColorStop(0.55, '#0c2147');
  sky.addColorStop(1, '#1e3a5f');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 800, 600);

  // Aurora ribbon
  ctx.save();
  ctx.globalAlpha = 0.34;
  const aurora = ctx.createLinearGradient(80, 40, 720, 190);
  aurora.addColorStop(0, '#10b981');
  aurora.addColorStop(0.5, '#38bdf8');
  aurora.addColorStop(1, '#a855f7');
  ctx.fillStyle = aurora;
  ctx.beginPath();
  ctx.moveTo(0, 150);
  ctx.bezierCurveTo(220, 30, 480, 210, 800, 90);
  ctx.lineTo(800, 220);
  ctx.bezierCurveTo(500, 290, 240, 130, 0, 230);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Twinkling stars
  ctx.fillStyle = '#fef9c3';
  for (let i = 0; i < 65; i++) {
    const sx = (i * 137) % 800;
    const sy = (i * 89) % 300;
    ctx.beginPath();
    ctx.arc(sx, sy, 1 + (i % 2.5), 0, Math.PI * 2);
    ctx.fill();
  }

  // Moon
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(670, 95, 34, 0, Math.PI * 2);
  ctx.fill();

  // Snowy pines in background
  const drawSnowyPine = (px: number, py: number, scale: number) => {
    ctx.save();
    ctx.translate(px, py);
    ctx.scale(scale, scale);
    ctx.fillStyle = '#0f3f2c';
    ctx.beginPath();
    ctx.moveTo(0, -130);
    ctx.lineTo(55, 0);
    ctx.lineTo(-55, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(0, -130);
    ctx.lineTo(26, -65);
    ctx.lineTo(0, -76);
    ctx.lineTo(-26, -65);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  drawSnowyPine(95, 430, 1.35);
  drawSnowyPine(185, 420, 1.05);
  drawSnowyPine(640, 425, 1.25);
  drawSnowyPine(730, 440, 1.4);

  // Rolling snow hill
  const snowHill = ctx.createLinearGradient(0, 390, 0, 600);
  snowHill.addColorStop(0, '#f1f5f9');
  snowHill.addColorStop(1, '#cbd5e1');
  ctx.fillStyle = snowHill;
  ctx.beginPath();
  ctx.moveTo(0, 445);
  ctx.quadraticCurveTo(250, 395, 520, 435);
  ctx.quadraticCurveTo(680, 455, 800, 415);
  ctx.lineTo(800, 600);
  ctx.lineTo(0, 600);
  ctx.closePath();
  ctx.fill();

  // Chimney + warm smoke
  ctx.fillStyle = '#64748b';
  ctx.fillRect(495, 195, 40, 95);
  ctx.fillStyle = 'rgba(226, 232, 240, 0.5)';
  ctx.beginPath();
  ctx.arc(518, 172, 16, 0, Math.PI * 2);
  ctx.arc(532, 145, 22, 0, Math.PI * 2);
  ctx.arc(552, 112, 26, 0, Math.PI * 2);
  ctx.fill();

  // Log cabin body
  ctx.fillStyle = '#6b3e26';
  ctx.fillRect(255, 315, 290, 155);
  ctx.strokeStyle = '#4a2815';
  ctx.lineWidth = 4;
  for (let ly = 335; ly < 465; ly += 22) {
    ctx.beginPath();
    ctx.moveTo(255, ly);
    ctx.lineTo(545, ly);
    ctx.stroke();
  }

  // Snow-laden roof
  ctx.fillStyle = '#7c2d12';
  ctx.beginPath();
  ctx.moveTo(225, 325);
  ctx.lineTo(400, 210);
  ctx.lineTo(575, 325);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(220, 325);
  ctx.lineTo(400, 203);
  ctx.lineTo(580, 325);
  ctx.lineTo(560, 338);
  ctx.lineTo(400, 230);
  ctx.lineTo(240, 338);
  ctx.closePath();
  ctx.fill();

  // Warm glowing cabin windows & door
  const winGlow = ctx.createRadialGradient(400, 390, 20, 400, 400, 200);
  winGlow.addColorStop(0, 'rgba(253, 224, 71, 0.36)');
  winGlow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = winGlow;
  ctx.fillRect(200, 280, 400, 290);

  ctx.fillStyle = '#fde047';
  ctx.fillRect(285, 355, 62, 58);
  ctx.fillRect(453, 355, 62, 58);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(374, 365, 52, 105);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(386, 380, 28, 34);

  // String lights on roof eaves
  const lightCols = ['#fde047', '#ef4444', '#22c55e', '#38bdf8'];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const lx = 235 + t * 330;
    const ly = t <= 0.5 ? 326 - t * 2 * 108 : 218 + (t - 0.5) * 2 * 108;
    ctx.fillStyle = lightCols[i % lightCols.length];
    ctx.beginPath();
    ctx.arc(lx, ly + 8, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Gentle snow in foreground
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  for (let i = 0; i < 38; i++) {
    const fx = (i * 97 + 40) % 800;
    const fy = (i * 71 + 20) % 580;
    ctx.beginPath();
    ctx.arc(fx, fy, 2 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }
}

/** 3: Knit Stockings by the Cozy Fireplace */
function paintStockingsScene(ctx: CanvasRenderingContext2D): void {
  const bg = ctx.createLinearGradient(0, 0, 0, 600);
  bg.addColorStop(0, '#241118');
  bg.addColorStop(1, '#12090d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 800, 600);

  // Stone chimney frame
  ctx.fillStyle = '#3f3432';
  ctx.fillRect(110, 125, 580, 445);
  ctx.fillStyle = '#2a2120';
  ctx.fillRect(130, 145, 540, 425);

  // Hearth opening
  ctx.fillStyle = '#0f0908';
  ctx.beginPath();
  ctx.moveTo(220, 570);
  ctx.lineTo(220, 370);
  ctx.quadraticCurveTo(400, 290, 580, 370);
  ctx.lineTo(580, 570);
  ctx.closePath();
  ctx.fill();

  // Warm fire glow
  const fireGlow = ctx.createRadialGradient(400, 480, 20, 400, 450, 260);
  fireGlow.addColorStop(0, 'rgba(251, 146, 60, 0.72)');
  fireGlow.addColorStop(0.5, 'rgba(234, 88, 12, 0.26)');
  fireGlow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = fireGlow;
  ctx.fillRect(120, 220, 560, 380);

  // Firewood logs & dancing flames
  ctx.fillStyle = '#4a2511';
  ctx.fillRect(320, 515, 160, 24);
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(335, 520);
  ctx.quadraticCurveTo(370, 380, 400, 455);
  ctx.quadraticCurveTo(430, 375, 465, 520);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.moveTo(360, 520);
  ctx.quadraticCurveTo(400, 405, 440, 520);
  ctx.closePath();
  ctx.fill();

  // Wooden mantel shelf
  ctx.fillStyle = '#5c2e14';
  ctx.fillRect(85, 115, 630, 42);
  ctx.fillStyle = '#7c3f1d';
  ctx.fillRect(85, 115, 630, 12);

  // Pine garland & fairy lights across mantel
  ctx.strokeStyle = '#15803d';
  ctx.lineWidth = 22;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(110, 130);
  ctx.quadraticCurveTo(250, 165, 400, 135);
  ctx.quadraticCurveTo(550, 165, 690, 130);
  ctx.stroke();

  for (let i = 0; i < 16; i++) {
    const gx = 125 + i * 37;
    const gy = 136 + Math.sin(i * 0.8) * 14;
    ctx.fillStyle = i % 2 === 0 ? '#fde047' : '#ef4444';
    ctx.beginPath();
    ctx.arc(gx, gy, 5.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3 Hanging Christmas Stockings
  const addRoundedRect = (rx: number, ry: number, rw: number, rh: number, rr: number) => {
    const r = Math.min(rr, rw / 2, rh / 2);
    ctx.moveTo(rx + r, ry);
    ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, r);
    ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, r);
    ctx.arcTo(rx, ry + rh, rx, ry, r);
    ctx.arcTo(rx, ry, rx + rw, ry, r);
  };

  const drawStocking = (sx: number, sy: number, bodyColor: string, cuffColor: string) => {
    ctx.save();
    ctx.translate(sx, sy);

    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    addRoundedRect(-26, 0, 52, 110, 14);
    addRoundedRect(-26, 86, 84, 44, 22);
    ctx.fill();

    // Fluffy cuff
    ctx.fillStyle = cuffColor;
    ctx.beginPath();
    addRoundedRect(-32, -8, 64, 28, 10);
    ctx.fill();

    // Golden snowflake stitch
    ctx.fillStyle = '#fde047';
    drawStar(ctx, 0, 56, 11, 5, 6);
    ctx.fill();
    ctx.restore();
  };

  drawStocking(255, 165, '#dc2626', '#f8fafc');
  drawStocking(400, 165, '#15803d', '#fef3c7');
  drawStocking(545, 165, '#b91c1c', '#f8fafc');

  drawBokehLights(ctx, 21, 12);
}

const FALLBACK_META = [
  { emoji: '🎄', top: '#160d18', bot: '#14532d' },
  { emoji: '🍪', top: '#24120c', bot: '#4b2713' },
  { emoji: '🏔️', top: '#040b1e', bot: '#1e3a5f' },
  { emoji: '🧦', top: '#241118', bot: '#7c2d12' },
];

export function getSampleIllustrationDataUrl(index: number): string {
  const safeIdx = ((index % 4) + 4) % 4;
  if (cachedDataUrls[safeIdx]) {
    return cachedDataUrls[safeIdx];
  }

  if (typeof document !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (safeIdx === 0) paintTreeScene(ctx);
        else if (safeIdx === 1) paintCookiesScene(ctx);
        else if (safeIdx === 2) paintCabinScene(ctx);
        else paintStockingsScene(ctx);

        let url = canvas.toDataURL('image/webp', 0.85);
        if (!url.startsWith('data:image/webp')) {
          url = canvas.toDataURL('image/png');
        } else if (url.length > 95000) {
          url = canvas.toDataURL('image/webp', 0.65);
        }

        if (url && url.startsWith('data:image/')) {
          cachedDataUrls[safeIdx] = url;
          return url;
        }
      }
    } catch {
      // Fallback to encoded SVG below
    }
  }

  const meta = FALLBACK_META[safeIdx];
  const svgUrl = encodeSvgFallback(meta.emoji, meta.top, meta.bot);
  cachedDataUrls[safeIdx] = svgUrl;
  return svgUrl;
}

export function getSampleIllustrationUrls(): string[] {
  return [0, 1, 2, 3].map((idx) => getSampleIllustrationDataUrl(idx));
}

export function getFallbackChristmasIllustration(seedId?: string): string {
  if (!seedId) return getSampleIllustrationDataUrl(0);
  if (seedId.includes('sample-1') || seedId.includes('tree')) return getSampleIllustrationDataUrl(0);
  if (seedId.includes('sample-2') || seedId.includes('cookie')) return getSampleIllustrationDataUrl(1);
  if (seedId.includes('sample-3') || seedId.includes('cabin')) return getSampleIllustrationDataUrl(2);
  if (seedId.includes('sample-4') || seedId.includes('stocking')) return getSampleIllustrationDataUrl(3);

  let hash = 0;
  for (let i = 0; i < seedId.length; i++) {
    hash = (hash * 31 + seedId.charCodeAt(i)) >>> 0;
  }
  return getSampleIllustrationDataUrl(hash % 4);
}

/**
 * Replaces legacy dev-only /src/assets/images/... paths (including any persisted in Firestore)
 * with guaranteed self-contained WebP Data URL illustrations.
 */
export function resolveWallImageUrl(rawUrl: string, photoId?: string): string {
  if (typeof rawUrl === 'string' && rawUrl.startsWith('data:image/')) {
    return rawUrl;
  }
  if (typeof rawUrl === 'string' && rawUrl.includes('xmas_wall_')) {
    if (rawUrl.includes('tree_family')) return getSampleIllustrationDataUrl(0);
    if (rawUrl.includes('cookies_santa')) return getSampleIllustrationDataUrl(1);
    if (rawUrl.includes('snowy_cabin')) return getSampleIllustrationDataUrl(2);
    if (rawUrl.includes('stockings_hearth')) return getSampleIllustrationDataUrl(3);
  }
  if (photoId && photoId.startsWith('sample-')) {
    return getFallbackChristmasIllustration(photoId);
  }
  if (typeof rawUrl === 'string' && rawUrl.startsWith('http')) {
    return rawUrl;
  }
  return getFallbackChristmasIllustration(photoId);
}

export function handleWallImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  photoId?: string
): void {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === '1') return;
  img.dataset.fallbackApplied = '1';
  img.src = getFallbackChristmasIllustration(photoId);
}
