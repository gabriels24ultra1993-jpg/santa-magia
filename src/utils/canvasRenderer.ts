import { TranslationPack } from '../i18n/translations';
import { ChildEntry, LanguageCode, LetterData } from '../types';

const SERIF_STACK = '"Playfair Display", "Noto Serif", "Noto Sans Arabic", "Noto Sans JP", "Noto Sans KR", Georgia, serif';
const SANS_STACK = '"Plus Jakarta Sans", "Noto Sans Arabic", "Noto Sans JP", "Noto Sans KR", sans-serif';

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

function drawCornerFiligree(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  flipX: number,
  flipY: number,
  goldColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(flipX, flipY);
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(0, 72);
  ctx.quadraticCurveTo(0, 0, 72, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(14, 58);
  ctx.quadraticCurveTo(14, 14, 58, 14);
  ctx.stroke();

  ctx.fillStyle = goldColor;
  ctx.beginPath();
  ctx.arc(24, 24, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawWaxSeal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  sealLabel: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  ctx.shadowColor = 'rgba(40, 12, 8, 0.35)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 8;

  ctx.fillStyle = '#991b1b';
  ctx.beginPath();
  const lobes = 18;
  for (let i = 0; i <= 360; i += 4) {
    const rad = (i * Math.PI) / 180;
    const r = 82 + Math.sin(rad * lobes) * 4.5;
    const px = Math.cos(rad) * r;
    const py = Math.sin(rad) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  ctx.shadowColor = 'transparent';

  const grad = ctx.createRadialGradient(-18, -18, 8, 0, 0, 72);
  grad.addColorStop(0, '#dc2626');
  grad.addColorStop(0.7, '#991b1b');
  grad.addColorStop(1, '#7f1d1d');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 68, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(253, 230, 138, 0.72)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, 56, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#fde68a';
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 - Math.PI / 2;
    const r = i % 2 === 0 ? 24 : 9;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r - 4;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fef3c7';
  ctx.font = `600 11px ${SANS_STACK}`;
  ctx.textAlign = 'center';
  ctx.fillText(sealLabel.slice(0, 22), 0, 34);

  ctx.restore();
}

export async function downloadLetterAsHDImage(
  letter: LetterData,
  t: TranslationPack,
  targetChildren?: ChildEntry[],
  lang: LanguageCode = 'en'
): Promise<void> {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const isRtl = lang === 'ar';
  const activeChildren =
    targetChildren && targetChildren.length > 0 ? targetChildren : letter.children;

  const width = 1200;
  const height = 1600;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.direction = isRtl ? 'rtl' : 'ltr';

  const isAurora = letter.theme === 'aurora';
  const isRoyal = letter.theme === 'royal';
  const isCert = letter.theme === 'certificate';

  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  if (isAurora) {
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(0.5, '#172554');
    bgGrad.addColorStop(1, '#0c1324');
  } else if (isRoyal) {
    bgGrad.addColorStop(0, '#fffaf0');
    bgGrad.addColorStop(0.5, '#f6e3ba');
    bgGrad.addColorStop(1, '#ebd09a');
  } else {
    bgGrad.addColorStop(0, '#fdf7e7');
    bgGrad.addColorStop(0.5, '#f7ebd0');
    bgGrad.addColorStop(1, '#eedab1');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 180; i++) {
    ctx.fillStyle = isAurora
      ? `rgba(253, 224, 71, ${0.08 + (i % 5) * 0.04})`
      : `rgba(146, 64, 14, ${0.02 + (i % 4) * 0.01})`;
    const sx = (i * 197) % width;
    const sy = (i * 313) % height;
    ctx.beginPath();
    ctx.arc(sx, sy, isAurora ? (i % 3) + 1 : 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  const goldPrimary = isAurora ? '#facc15' : isRoyal ? '#b45309' : '#b48328';
  const goldSecondary = isAurora ? 'rgba(250, 204, 21, 0.45)' : 'rgba(180, 131, 40, 0.45)';
  const inkPrimary = isAurora ? '#fefce8' : '#2c1810';
  const inkMuted = isAurora ? '#cbd5e1' : '#78350f';

  ctx.strokeStyle = goldPrimary;
  ctx.lineWidth = isRoyal ? 8 : 5;
  ctx.strokeRect(54, 54, width - 108, height - 108);

  ctx.strokeStyle = goldSecondary;
  ctx.lineWidth = 2;
  ctx.strokeRect(72, 72, width - 144, height - 144);

  drawCornerFiligree(ctx, 84, 84, 1, 1, goldPrimary);
  drawCornerFiligree(ctx, width - 84, 84, -1, 1, goldPrimary);
  drawCornerFiligree(ctx, 84, height - 84, 1, -1, goldPrimary);
  drawCornerFiligree(ctx, width - 84, height - 84, -1, -1, goldPrimary);

  ctx.textAlign = 'center';
  ctx.fillStyle = goldPrimary;
  ctx.font = `600 22px ${SANS_STACK}`;
  const headerBanner = isCert
    ? t.certificateSubtitle.toUpperCase()
    : letter.sender === 'kings'
    ? t.magiRoyalDispatch
    : t.northPoleDispatch;
  ctx.fillText(headerBanner, width / 2, 165);

  ctx.strokeStyle = goldSecondary;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(240, 196);
  ctx.lineTo(width - 240, 196);
  ctx.stroke();

  const displayNames = t.formatDisplayNames(activeChildren);

  if (isCert) {
    ctx.fillStyle = isAurora ? '#fde047' : '#991b1b';
    ctx.font = `700 46px ${SERIF_STACK}`;
    const nextY = wrapText(ctx, t.certificateTitle, width / 2, 290, 920, 62);

    ctx.fillStyle = inkMuted;
    ctx.font = `500 26px ${SANS_STACK}`;
    ctx.fillText(t.certificateAwardedTo, width / 2, nextY + 65);

    ctx.fillStyle = inkPrimary;
    ctx.font = `italic 700 58px ${SERIF_STACK}`;
    const nameEndY = wrapText(ctx, displayNames, width / 2, nextY + 155, 920, 72);

    ctx.strokeStyle = goldPrimary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(280, nameEndY + 14);
    ctx.lineTo(width - 280, nameEndY + 14);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = inkPrimary;
    ctx.font = `400 30px ${SERIF_STACK}`;
    const certBody = t.buildCertificateBody({
      children: activeChildren,
      city: letter.city,
      behavior: letter.behavior,
    });
    wrapText(ctx, certBody, width / 2, nameEndY + 100, 880, 52);

    ctx.fillStyle = goldPrimary;
    ctx.font = `600 22px ${SANS_STACK}`;
    ctx.fillText(t.certificateSealLabel, width / 2, 1180);
  } else {
    const startX = isRtl ? width - 135 : 135;
    ctx.textAlign = isRtl ? 'right' : 'left';
    ctx.fillStyle = isAurora ? '#fde047' : '#991b1b';
    ctx.font = `italic 700 46px ${SERIF_STACK}`;
    const salutation = t.buildSalutation(activeChildren);
    let cursorY = wrapText(ctx, salutation, startX, 290, width - 270, 60);
    cursorY += 36;

    const paragraphs = t.buildLetterParagraphs({
      children: activeChildren,
      sender: letter.sender,
    });

    ctx.fillStyle = inkPrimary;
    ctx.font = `400 30px ${SERIF_STACK}`;
    for (const p of paragraphs) {
      cursorY = wrapText(ctx, p, startX, cursorY, width - 270, 52);
      cursorY += 36;
    }

    ctx.fillStyle = isAurora ? '#fde047' : '#991b1b';
    ctx.font = `italic 600 36px ${SERIF_STACK}`;
    const sigText =
      letter.sender === 'kings' ? t.letterSignatureKings : t.letterSignatureSanta;
    wrapText(ctx, sigText, startX, Math.max(cursorY + 32, 1120), 660, 48);
  }

  ctx.direction = 'ltr';
  ctx.textAlign = 'left';
  ctx.fillStyle = inkMuted;
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText(`${t.officialCodeLabel}: ${letter.officialCode}`, 135, 1415);

  drawWaxSeal(ctx, width - 225, 1365, t.letterSealText);

  const dataUrl = canvas.toDataURL('image/png', 1.0);
  const link = document.createElement('a');
  const safeName = (displayNames || 'santa-magia')
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '') || 'santa-magia';
  link.download = `santa-magia-${safeName}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
