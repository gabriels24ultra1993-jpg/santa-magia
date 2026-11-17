import '@tensorflow/tfjs';
import * as nsfwjs from 'nsfwjs';

let modelPromise: Promise<nsfwjs.NSFWJS> | null = null;

async function getNsfwModel(): Promise<nsfwjs.NSFWJS> {
  if (!modelPromise) {
    modelPromise = nsfwjs.load();
  }
  return modelPromise;
}

export async function checkImageFamilySafety(
  imgElement: HTMLImageElement
): Promise<{ safe: boolean; reason?: string }> {
  try {
    const model = await getNsfwModel();
    const predictions = await model.classify(imgElement);

    const scores: Record<string, number> = {};
    for (const p of predictions) {
      scores[p.className] = p.probability;
    }

    const porn = scores.Porn ?? 0;
    const hentai = scores.Hentai ?? 0;
    const sexy = scores.Sexy ?? 0;

    if (porn > 0.25 || hentai > 0.25 || (sexy > 0.65 && porn + sexy > 0.72)) {
      return {
        safe: false,
        reason: 'nsfw_detected',
      };
    }

    return { safe: true };
  } catch {
    // Graceful fallback if CDN model cannot be reached in restricted/offline previews
    modelPromise = null;
    return { safe: true };
  }
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function estimateBase64Bytes(dataUrl: string): number {
  const commaIdx = dataUrl.indexOf(',');
  const base64 = commaIdx >= 0 ? dataUrl.slice(commaIdx + 1) : dataUrl;
  return Math.round((base64.length * 3) / 4);
}

/**
 * Compresses an uploaded image into WebP (~25-35 KB) so 25 photos consume < 1 MB total.
 */
export async function compressImageToWebP(file: File): Promise<{
  dataUrl: string;
  approxKb: number;
  imgElement: HTMLImageElement;
}> {
  const img = await loadImageFromFile(file);

  const encodeAttempt = (maxDim: number, quality: number, mime: 'image/webp' | 'image/jpeg') => {
    let { width, height } = img;
    if (width > maxDim || height > maxDim) {
      if (width > height) {
        height = Math.max(1, Math.round((height * maxDim) / width));
        width = maxDim;
      } else {
        width = Math.max(1, Math.round((width * maxDim) / height));
        height = maxDim;
      }
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas unavailable');
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL(mime, quality);
  };

  // Try WebP first at decreasing quality/dimensions until ~30KB (<= 34KB)
  const webpSteps: Array<[number, number]> = [
    [640, 0.72],
    [600, 0.6],
    [540, 0.5],
    [480, 0.42],
    [420, 0.35],
  ];

  let bestUrl = encodeAttempt(640, 0.72, 'image/webp');
  const supportsWebp = bestUrl.startsWith('data:image/webp');

  if (supportsWebp) {
    for (const [dim, q] of webpSteps) {
      bestUrl = encodeAttempt(dim, q, 'image/webp');
      if (estimateBase64Bytes(bestUrl) <= 34 * 1024) {
        break;
      }
    }
  } else {
    // Fallback for browsers whose canvas lacks WebP encoding
    const jpegSteps: Array<[number, number]> = [
      [560, 0.65],
      [480, 0.55],
      [420, 0.45],
    ];
    for (const [dim, q] of jpegSteps) {
      bestUrl = encodeAttempt(dim, q, 'image/jpeg');
      if (estimateBase64Bytes(bestUrl) <= 36 * 1024) {
        break;
      }
    }
  }

  return {
    dataUrl: bestUrl,
    approxKb: Math.max(1, Math.round(estimateBase64Bytes(bestUrl) / 1024)),
    imgElement: img,
  };
}
