const LAST_UPLOAD_TS_KEY = 'santa_magia_last_upload_ts_v1';
export const UPLOAD_COOLDOWN_MS = 2 * 60 * 1000; // 2 minutes
export const MAX_UPLOAD_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

let lastUploadMemoryTs = 0;

/**
 * Strips HTML tags, <script> payloads, angle brackets, dangerous URI schemes,
 * and inline event handlers while preserving live typing spaces and Unicode text.
 */
export function sanitizeInputLive(raw: string, maxLength = 120): string {
  if (typeof raw !== 'string') return '';

  let cleaned = raw
    // Remove script/style blocks if pasted
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    // Strip any HTML tags
    .replace(/<\/?[a-zA-Z][^>]*>/g, '')
    // Strip any remaining < or > characters
    .replace(/[<>]/g, '')
    // Strip dangerous URI schemes and inline event handlers
    .replace(/(?:javascript|vbscript|data\s*:\s*text\/html)\s*:/gi, '')
    .replace(/\bon[a-z]{2,18}\s*=/gi, '')
    // Remove invisible ASCII control chars except normal whitespace
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');

  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength);
  }
  return cleaned;
}

/**
 * Final XSS sanitization for submit / persistence / Firestore payloads.
 */
export function sanitizeFinalText(raw: string, maxLength = 120): string {
  return sanitizeInputLive(raw, maxLength)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Ensures image sources stored/rendered are strictly compressed base64 images or verified local assets.
 */
export function isValidPhotoUrlOrData(url: string): boolean {
  if (typeof url !== 'string' || url.length < 5 || url.length > 120000) return false;
  return (
    /^data:image\/(webp|jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(url) ||
    /^\/src\/assets\/images\/[a-zA-Z0-9_\-.]+\.jpg$/.test(url)
  );
}

/**
 * Verifies MIME type, < 5 MB file size, and binary magic bytes (JPEG, PNG, WebP)
 * BEFORE any FileReader / Canvas / TensorFlow processing runs.
 */
export async function validateUploadedImageFile(
  file: File
): Promise<{ valid: boolean; reason?: 'mime' | 'size' | 'corrupt' }> {
  if (!file) return { valid: false, reason: 'corrupt' };

  const mime = (file.type || '').toLowerCase();
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(mime as (typeof ALLOWED_IMAGE_MIME_TYPES)[number])) {
    return { valid: false, reason: 'mime' };
  }

  if (file.size <= 0 || file.size >= MAX_UPLOAD_FILE_BYTES) {
    return { valid: false, reason: 'size' };
  }

  try {
    const headerBuf = await file.slice(0, 12).arrayBuffer();
    const bytes = new Uint8Array(headerBuf);
    if (bytes.length < 12) return { valid: false, reason: 'corrupt' };

    const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    const isPng =
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a;
    const isWebp =
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50;

    if (!isJpeg && !isPng && !isWebp) {
      return { valid: false, reason: 'mime' };
    }

    return { valid: true };
  } catch {
    return { valid: false, reason: 'corrupt' };
  }
}

export function getUploadRateLimitState(now = Date.now()): {
  allowed: boolean;
  remainingSeconds: number;
} {
  let storedTs = 0;
  try {
    const raw = localStorage.getItem(LAST_UPLOAD_TS_KEY);
    if (raw) storedTs = Math.max(0, Number(raw) || 0);
  } catch {
    // ignore storage errors
  }

  const lastTs = Math.max(lastUploadMemoryTs, storedTs);
  if (lastTs <= 0) {
    return { allowed: true, remainingSeconds: 0 };
  }

  const elapsed = now - lastTs;
  if (elapsed >= UPLOAD_COOLDOWN_MS) {
    return { allowed: true, remainingSeconds: 0 };
  }

  return {
    allowed: false,
    remainingSeconds: Math.max(1, Math.ceil((UPLOAD_COOLDOWN_MS - elapsed) / 1000)),
  };
}

export function recordSuccessfulUpload(now = Date.now()): void {
  lastUploadMemoryTs = now;
  try {
    localStorage.setItem(LAST_UPLOAD_TS_KEY, String(now));
  } catch {
    // ignore storage errors
  }
}
