import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Film,
  Flag,
  Heart,
  ImagePlus,
  Pause,
  Play,
  ShieldAlert,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { TranslationPack } from '../i18n/translations';
import { WallPhoto } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { checkImageFamilySafety, compressImageToWebP } from '../utils/imageSafety';
import { ParadeScheduleState } from '../utils/paradeSchedule';
import { handleWallImageError, resolveWallImageUrl } from '../utils/sampleIllustrations';
import {
  getUploadRateLimitState,
  sanitizeFinalText,
  sanitizeInputLive,
  validateUploadedImageFile,
} from '../utils/security';

interface PhotoWallProps {
  t: TranslationPack;
  podiumPhotos: WallPhoto[];
  carouselPhotos: WallPhoto[];
  likedPhotoIds: string[];
  paradeSchedule: ParadeScheduleState;
  onToggleLike: (photo: WallPhoto) => void;
  onUploadPhoto: (title: string, author: string, webpDataUrl: string) => Promise<void> | void;
  onReportPhoto: (id: string) => void;
  onOpenParade: () => void;
  onNotify: (msg: string) => void;
}

export const PhotoWallSection: React.FC<PhotoWallProps> = ({
  t,
  podiumPhotos,
  carouselPhotos,
  likedPhotoIds,
  paradeSchedule,
  onToggleLike,
  onUploadPhoto,
  onReportPhoto,
  onOpenParade,
  onNotify,
}) => {
  const [sortBy, setSortBy] = useState<'recent' | 'top'>('recent');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [previewKb, setPreviewKb] = useState<number | null>(null);
  const [checkingSafety, setCheckingSafety] = useState(false);
  const [safetyRejectedMsg, setSafetyRejectedMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Visual 15-second rotation offset across the 25-photo FIFO carousel
  const [rotationOffset, setRotationOffset] = useState(0);

  const basePhotos = useMemo(() => {
    const filtered = carouselPhotos.filter((p) => !p.reported);
    if (sortBy === 'top') {
      return [...filtered].sort((a, b) => b.likes - a.likes || b.createdAt - a.createdAt);
    }
    return [...filtered].sort((a, b) => b.createdAt - a.createdAt);
  }, [carouselPhotos, sortBy]);

  // Rotate showcase cards visually every 15 seconds
  useEffect(() => {
    if (basePhotos.length <= 1) return;
    const timer = window.setInterval(() => {
      setRotationOffset((prev) => (prev + 3) % basePhotos.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [basePhotos.length]);

  const rotatedPhotos = useMemo(() => {
    if (basePhotos.length <= 1) return basePhotos;
    const shift = rotationOffset % basePhotos.length;
    return [...basePhotos.slice(shift), ...basePhotos.slice(0, shift)];
  }, [basePhotos, rotationOffset]);

  // Global rank map combining podium + carousel so #1/#2/#3 badges reflect true cloud standings
  const rankMap = useMemo(() => {
    const merged = new Map<string, WallPhoto>();
    for (const p of [...podiumPhotos, ...carouselPhotos]) {
      if (!p.reported) {
        const prev = merged.get(p.id);
        if (!prev || p.likes > prev.likes) merged.set(p.id, p);
      }
    }
    const sorted = Array.from(merged.values()).sort(
      (a, b) => b.likes - a.likes || b.createdAt - a.createdAt
    );
    const map = new Map<string, number>();
    sorted.forEach((p, idx) => map.set(p.id, idx + 1));
    return map;
  }, [podiumPhotos, carouselPhotos]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSafetyRejectedMsg(null);

    // Rate-limit check (1 upload every 2 minutes)
    const rate = getUploadRateLimitState();
    if (!rate.allowed) {
      const msg = t.wallUploadRateLimitError(rate.remainingSeconds);
      setSafetyRejectedMsg(msg);
      onNotify(msg);
      e.target.value = '';
      return;
    }

    // Strict pre-processing check: JPEG / PNG / WebP, < 5 MB, verified binary magic bytes
    const fileCheck = await validateUploadedImageFile(file);
    if (!fileCheck.valid) {
      setPreviewDataUrl(null);
      setPreviewKb(null);
      setSafetyRejectedMsg(t.wallInvalidFileError);
      onNotify(t.wallInvalidFileError);
      e.target.value = '';
      return;
    }

    setCheckingSafety(true);
    try {
      const { dataUrl, approxKb, imgElement } = await compressImageToWebP(file);
      const safety = await checkImageFamilySafety(imgElement);
      if (!safety.safe) {
        setPreviewDataUrl(null);
        setPreviewKb(null);
        setSafetyRejectedMsg(t.wallNsfwRejected);
        onNotify(t.wallNsfwRejected);
        return;
      }
      setPreviewDataUrl(dataUrl);
      setPreviewKb(approxKb);
      audioEngine.playSleighBells('soft');
    } catch {
      setPreviewDataUrl(null);
      setSafetyRejectedMsg(t.wallInvalidFileError);
      onNotify(t.wallInvalidFileError);
    } finally {
      setCheckingSafety(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewDataUrl || submitting || checkingSafety) return;

    const rate = getUploadRateLimitState();
    if (!rate.allowed) {
      const msg = t.wallUploadRateLimitError(rate.remainingSeconds);
      setSafetyRejectedMsg(msg);
      onNotify(msg);
      return;
    }

    const cleanTitle = sanitizeFinalText(title, 64) || sanitizeFinalText(t.heroWinnerTitle, 64);
    const cleanAuthor = sanitizeFinalText(author, 40) || sanitizeFinalText(t.heroByLabel, 40);

    setSubmitting(true);
    try {
      audioEngine.playMagicChime();
      await onUploadPhoto(cleanTitle, cleanAuthor, previewDataUrl);
      setTitle('');
      setAuthor('');
      setPreviewDataUrl(null);
      setPreviewKb(null);
      setRotationOffset(0);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-300 bg-red-950/60 border border-red-400/35 px-2.5 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span>{t.carouselLiveBadge}</span>
            </span>
            <span className="text-[11px] font-medium text-amber-200/70">
              {t.carouselWebpHint}
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-amber-100 [text-wrap:balance]">
            {t.carouselTitle}
          </h2>
          <p className="text-sm sm:text-base text-amber-100/75 leading-relaxed">
            {t.wallSectionSubtitle}
          </p>
        </div>

        {/* Dec 25-26 Exclusive Video Parade Action / Countdown */}
        {paradeSchedule.status === 'live' ? (
          <button
            type="button"
            onClick={() => {
              audioEngine.playSleighBells('bright');
              onOpenParade();
            }}
            className="min-h-[50px] px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 text-stone-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 shrink-0 transition-all"
          >
            <Film className="w-4 h-4 shrink-0" />
            <span>{t.paradeLivePremiereBtn}</span>
          </button>
        ) : paradeSchedule.status === 'countdown' ? (
          <div className="rounded-xl bg-amber-500/10 border border-amber-400/35 px-4 py-2.5 flex items-center gap-2.5 text-xs text-amber-100 shrink-0">
            <Clock className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-mono-num font-bold text-amber-300">
              25 DEC ·{' '}
              {t.paradeCountdownTime(
                paradeSchedule.days,
                paradeSchedule.hours,
                paradeSchedule.minutes
              )}
            </span>
          </div>
        ) : (
          <div className="rounded-xl bg-amber-950/35 border border-amber-300/25 px-4 py-2.5 flex items-center gap-2 text-xs text-amber-200 shrink-0">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{t.paradeEndedBanner}</span>
          </div>
        )}
      </div>

      {/* Upload Card (WebP ~30KB + nsfwjs family safety check) */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#17121f]/95 border border-amber-200/15 rounded-2xl p-5 sm:p-6 space-y-4"
      >
        <h3 className="font-display text-lg font-bold text-amber-200">
          {t.wallUploadTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4 space-y-1.5">
            <label htmlFor="wall-title" className="block text-xs font-semibold text-amber-200/80">
              {t.wallPhotoTitleLabel}
            </label>
            <input
              id="wall-title"
              type="text"
              maxLength={64}
              value={title}
              onChange={(e) => setTitle(sanitizeInputLive(e.target.value, 64))}
              placeholder={t.wallPhotoTitlePlaceholder}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#0f0b15] border border-amber-200/20 text-amber-50 placeholder:text-amber-100/35 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <label htmlFor="wall-author" className="block text-xs font-semibold text-amber-200/80">
              {t.wallAuthorLabel}
            </label>
            <input
              id="wall-author"
              type="text"
              maxLength={40}
              value={author}
              onChange={(e) => setAuthor(sanitizeInputLive(e.target.value, 40))}
              placeholder={t.wallAuthorPlaceholder}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#0f0b15] border border-amber-200/20 text-amber-50 placeholder:text-amber-100/35 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row gap-2.5">
            <label className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#0f0b15] hover:bg-[#1e172a] border border-dashed border-amber-300/40 text-amber-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <ImagePlus className="w-4 h-4 shrink-0" />
              <span className="truncate">
                {checkingSafety
                  ? t.wallNsfwChecking
                  : previewDataUrl
                  ? `✓ WebP ${previewKb ?? 30}KB`
                  : t.wallChooseFile}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>

            <button
              type="submit"
              disabled={!previewDataUrl || checkingSafety || submitting}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors"
            >
              {t.wallSubmitPhoto}
            </button>
          </div>
        </div>

        {safetyRejectedMsg && (
          <div className="rounded-xl bg-red-950/60 border border-red-500/40 px-3.5 py-2.5 flex items-center gap-2 text-xs text-red-200 font-semibold">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{safetyRejectedMsg}</span>
          </div>
        )}

        {previewDataUrl && (
          <div className="flex items-center gap-3 pt-1">
            <img
              src={previewDataUrl}
              alt={title || t.wallPhotoTitleLabel}
              onError={(e) => handleWallImageError(e, 'preview')}
              className="w-20 h-16 object-cover rounded-lg border border-amber-300/40"
            />
            <button
              type="button"
              onClick={() => {
                setPreviewDataUrl(null);
                setPreviewKb(null);
              }}
              className="text-xs text-amber-200/70 hover:text-white underline"
            >
              {t.closeBtn}
            </button>
          </div>
        )}
      </form>

      {/* Sort Filter Tabs + Manual Rotation Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1 p-1 bg-[#17121f] border border-amber-200/15 rounded-xl">
          <button
            type="button"
            onClick={() => {
              audioEngine.playSleighBells('soft');
              setSortBy('recent');
              setRotationOffset(0);
            }}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              sortBy === 'recent'
                ? 'bg-amber-400 text-stone-950'
                : 'text-amber-100/75 hover:text-white'
            }`}
          >
            {t.wallSortRecent}
          </button>
          <button
            type="button"
            onClick={() => {
              audioEngine.playSleighBells('soft');
              setSortBy('top');
              setRotationOffset(0);
            }}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              sortBy === 'top'
                ? 'bg-amber-400 text-stone-950'
                : 'text-amber-100/75 hover:text-white'
            }`}
          >
            {t.wallSortTop}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-amber-100/60 font-mono-num">
            {rotatedPhotos.length} / 25
          </span>
          {rotatedPhotos.length > 1 && (
            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  setRotationOffset(
                    (prev) => (prev - 3 + basePhotos.length) % basePhotos.length
                  )
                }
                aria-label="Previous rotation"
                className="min-w-[34px] min-h-[34px] rounded-lg bg-[#17121f] border border-amber-200/15 text-amber-200 hover:text-white flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setRotationOffset((prev) => (prev + 3) % basePhotos.length)
                }
                aria-label="Next rotation"
                className="min-w-[34px] min-h-[34px] rounded-lg bg-[#17121f] border border-amber-200/15 text-amber-200 hover:text-white flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 25-Photo Live Rotating Carousel Grid */}
      {rotatedPhotos.length === 0 ? (
        <div className="rounded-2xl border border-amber-200/15 bg-[#17121f]/80 p-10 text-center text-sm text-amber-100/70">
          {t.wallEmpty}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rotatedPhotos.map((photo) => {
            const rank = rankMap.get(photo.id) || 1;
            const liked = likedPhotoIds.includes(photo.id);
            const isLeader = rank <= 3;

            return (
              <article
                key={photo.id}
                className={`group rounded-2xl overflow-hidden bg-[#17121f] border transition-all duration-500 flex flex-col ${
                  isLeader ? 'border-amber-400/70' : 'border-amber-200/15'
                }`}
              >
                <div className="relative aspect-[4/3] bg-[#0f0b15] overflow-hidden">
                  <img
                    src={resolveWallImageUrl(photo.imageUrl, photo.id)}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleWallImageError(e, photo.id)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white/95">
                    <span className="font-mono-num font-bold tracking-wide">
                      #{rank} {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : ''}
                    </span>
                    <span className="truncate max-w-[75%] text-white/85">{photo.author}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <h4 className="font-display text-base font-bold text-amber-50 leading-snug line-clamp-2">
                    {photo.title}
                  </h4>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-amber-200/10">
                    <button
                      type="button"
                      onClick={() => {
                        audioEngine.playSleighBells(liked ? 'soft' : 'bright');
                        onToggleLike(photo);
                      }}
                      className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                        liked
                          ? 'bg-red-600 text-white'
                          : 'bg-[#0f0b15] hover:bg-red-950/60 border border-amber-200/15 text-amber-100'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                      <span className="font-mono-num tabular-nums">{photo.likes}</span>
                      <span>{liked ? t.wallLikedBtn : t.wallLikeBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onReportPhoto(photo.id)}
                      className="min-h-[44px] px-2.5 py-2 rounded-xl text-[11px] font-medium text-amber-100/50 hover:text-amber-100/90 hover:bg-white/5 flex items-center gap-1 transition-colors"
                      title={t.wallReportBtn}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{t.wallReportBtn.replace('🚩 ', '')}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

/* Fireworks & Snow overlay canvas exclusively for the Grand Christmas Video Parade */
export const FireworksAndSnowCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      radius: number;
    }

    const palette = ['#fde047', '#f87171', '#34d399', '#fbbf24', '#f472b6', '#ffffff'];
    const sparks: Spark[] = [];

    const spawnBurst = () => {
      const cx = canvas.width * (0.15 + Math.random() * 0.7);
      const cy = canvas.height * (0.12 + Math.random() * 0.4);
      const color = palette[Math.floor(Math.random() * palette.length)];
      const count = 28;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.2 - 0.1);
        const speed = 1.6 + Math.random() * 3.4;
        sparks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          radius: 1.5 + Math.random() * 1.8,
        });
      }
    };

    const flakes = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1.2 + Math.random() * 2.2,
      vy: 0.7 + Math.random() * 1.4,
      vx: -0.3 + Math.random() * 0.6,
    }));

    let frame = 0;
    spawnBurst();

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += 1;
      if (frame % 75 === 0) {
        spawnBurst();
      }

      // Snow
      ctx.fillStyle = 'rgba(255, 250, 240, 0.75)';
      for (const f of flakes) {
        f.y += f.vy;
        f.x += f.vx;
        if (f.y > canvas.height) {
          f.y = -4;
          f.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Fireworks sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.035;
        s.alpha -= 0.014;
        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 w-full h-full"
    />
  );
};

interface VideoParadeOverlayProps {
  t: TranslationPack;
  photos: WallPhoto[];
  isOpen: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onClose: () => void;
}

const HEART_LANES = [8, 18, 29, 41, 53, 64, 76, 88, 93];

export const VideoParadeOverlay: React.FC<VideoParadeOverlayProps> = ({
  t,
  photos,
  isOpen,
  isMuted,
  onToggleMute,
  onClose,
}) => {
  const orderedPhotos = useMemo(() => {
    const map = new Map<string, WallPhoto>();
    for (const p of photos) {
      if (!p.reported) {
        const prev = map.get(p.id);
        if (!prev || p.likes > prev.likes) map.set(p.id, p);
      }
    }
    return Array.from(map.values()).sort(
      (a, b) => b.likes - a.likes || b.createdAt - a.createdAt
    );
  }, [photos]);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      audioEngine.stopParadeMusic();
      setIndex(0);
      setPlaying(true);
      return;
    }

    if (!isMuted && playing) {
      audioEngine.startParadeMusic();
    } else {
      audioEngine.stopParadeMusic();
    }

    return () => {
      audioEngine.stopParadeMusic();
    };
  }, [isOpen, isMuted, playing]);

  useEffect(() => {
    if (!isOpen || !playing || orderedPhotos.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % orderedPhotos.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [isOpen, playing, orderedPhotos.length]);

  if (!isOpen || orderedPhotos.length === 0) return null;

  const safeIdx = index % orderedPhotos.length;
  const current = orderedPhotos[safeIdx];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.paradeLivePremiereBtn}
      className="fixed inset-0 z-50 h-[100dvh] w-full bg-[#07050a] text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Ken Burns Photo */}
      <div key={current.id} className="absolute inset-0 overflow-hidden">
        <img
          src={resolveWallImageUrl(current.imageUrl, current.id)}
          alt={current.title}
          referrerPolicy="no-referrer"
          onError={(e) => handleWallImageError(e, current.id)}
          className="w-full h-full object-cover animate-ken-burns opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/70" />
      </div>

      {/* Fireworks + Falling Snow */}
      <FireworksAndSnowCanvas />

      {/* Continuous Rising Floating Hearts */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {HEART_LANES.map((leftPct, i) => (
          <span
            key={i}
            className="animate-float-heart absolute -bottom-10 text-2xl sm:text-3xl text-red-500/90 drop-shadow"
            style={{
              left: `${leftPct}%`,
              ['--float-duration' as string]: `${4.2 + (i % 4) * 0.9}s`,
              animationDelay: `${i * 0.55}s`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Top Controls & Progress */}
      <div className="relative z-20 p-4 sm:p-6 space-y-3">
        <div className="flex gap-1.5">
          {orderedPhotos.map((p, idx) => (
            <div key={p.id} className="h-1 flex-1 rounded-full bg-white/25 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  idx <= safeIdx ? 'bg-amber-400 w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-200">
            <span>{isMuted ? t.soundOff : t.paradePlayingMusic}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? t.soundOn : t.soundOff}
              className="min-w-[44px] min-h-[44px] rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center hover:bg-white/15"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={() => {
                audioEngine.stopParadeMusic();
                onClose();
              }}
              aria-label={t.paradeCloseBtn}
              className="min-h-[44px] px-4 rounded-full bg-black/55 backdrop-blur-md border border-white/15 text-xs font-semibold flex items-center gap-1.5 hover:bg-white/15"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">{t.paradeCloseBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Rank, Title, Likes & Playback Controls */}
      <div className="relative z-20 p-5 sm:p-8 space-y-5">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-3 text-sm font-bold text-amber-300">
            <span className="font-mono-num text-xl sm:text-2xl">
              {t.paradeRankPrefix} #{safeIdx + 1} / {orderedPhotos.length}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5 text-red-400 font-mono-num">
              <Heart className="w-4 h-4 fill-current" />
              <span>
                {current.likes} {t.heroLikesLabel}
              </span>
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight [text-wrap:balance]">
            {current.title}
          </h3>
          <p className="text-sm text-amber-100/80">{current.author}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setIndex((prev) => (prev - 1 + orderedPhotos.length) % orderedPhotos.length)
            }
            aria-label="Previous"
            className="min-w-[48px] min-h-[48px] rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause' : 'Play'}
            className="min-w-[52px] min-h-[52px] rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 flex items-center justify-center shadow-lg"
          >
            {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % orderedPhotos.length)}
            aria-label="Next"
            className="min-w-[48px] min-h-[48px] rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25 flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
