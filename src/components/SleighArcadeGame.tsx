import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Crown, RotateCcw, Trophy, X } from 'lucide-react';
import { TranslationPack } from '../i18n/translations';
import { audioEngine } from '../utils/audioEngine';

const BEST_SCORE_KEY = 'santa_magia_sleigh_best_v1';

interface SleighAdGateModalProps {
  t: TranslationPack;
  isOpen: boolean;
  onClose: () => void;
  onAdCompleted: () => void;
  onOpenVipZone: () => void;
}

export const SleighAdGateModal: React.FC<SleighAdGateModalProps> = ({
  t,
  isOpen,
  onClose,
  onAdCompleted,
  onOpenVipZone,
}) => {
  const [watchingAd, setWatchingAd] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);

  const onAdCompletedRef = useRef(onAdCompleted);
  onAdCompletedRef.current = onAdCompleted;
  const completedGuardRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      setWatchingAd(false);
      setSecondsLeft(5);
      completedGuardRef.current = false;
    }
  }, [isOpen]);

  // Wall-clock 5s -> 0s countdown (immune to StrictMode double-mount & parent 1s ticks)
  useEffect(() => {
    if (!isOpen || !watchingAd) return;

    completedGuardRef.current = false;
    const endTime = Date.now() + 5000;
    setSecondsLeft(5);

    const tickCountdown = () => {
      const remainingMs = endTime - Date.now();
      const nextSec = Math.max(0, Math.ceil(remainingMs / 1000));
      setSecondsLeft(nextSec);

      if (remainingMs <= 0 && !completedGuardRef.current) {
        completedGuardRef.current = true;
        window.clearInterval(intervalId);
        audioEngine.playMagicChime();
        onAdCompletedRef.current();
      }
    };

    const intervalId = window.setInterval(tickCountdown, 200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isOpen, watchingAd]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.adGateTitle}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="w-full sm:max-w-md bg-gradient-to-b from-[#231520] to-[#130d18] border border-amber-400/45 rounded-t-3xl sm:rounded-2xl p-6 space-y-5 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-amber-300">
            {t.adGateTitle}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeBtn}
            className="min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center text-amber-100/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!watchingAd ? (
          <>
            <p className="text-sm sm:text-base text-amber-50/90 leading-relaxed">
              {t.adGatePrompt}
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSleighBells('soft');
                  setSecondsLeft(5);
                  setWatchingAd(true);
                }}
                className="w-full min-h-[52px] px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-colors"
              >
                <span>{t.adGateWatchBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  audioEngine.playSleighBells('soft');
                  onClose();
                  onOpenVipZone();
                }}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400/20 via-yellow-300/15 to-amber-500/20 hover:from-amber-400/30 hover:to-amber-500/30 border border-amber-300/45 text-amber-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Crown className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{t.adGateVipBtn}</span>
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {/* AdSense / AdMob / Monetag Ready Rewarded Ad Slot */}
            <div
              id="ad-rewarded-sleigh"
              data-ad-slot="rewarded-sleigh"
              data-ad-network="adsense-monetag-ready"
              className="rounded-2xl bg-[#0b0912] border border-amber-300/35 p-6 text-center space-y-3"
            >
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-amber-300/80">
                {t.adGateSimulatedSlot}
              </span>
              <div className="font-mono-num text-4xl font-extrabold text-amber-300 tabular-nums">
                {secondsLeft}s
              </div>
              <p className="text-xs text-amber-100/85 font-medium">
                {t.adGateCountdown(secondsLeft)}
              </p>
              <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-amber-300 transition-all duration-200"
                  style={{ width: `${((5 - secondsLeft) / 5) * 100}%` }}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (completedGuardRef.current) return;
                  completedGuardRef.current = true;
                  audioEngine.playMagicChime();
                  onAdCompletedRef.current();
                }}
                className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 text-xs font-bold transition-colors"
              >
                {t.adGateSkipTestBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface SleighArcadeGameProps {
  t: TranslationPack;
  onBackToCover: () => void;
  onBeatRecord: (newRecord: number) => void;
}

interface FallingGift {
  x: number;
  y: number;
  vy: number;
  size: number;
  color: string;
  ribbon: string;
  swayPhase: number;
}

interface GiantSnowflake {
  x: number;
  y: number;
  vy: number;
  radius: number;
  rot: number;
  rotSpeed: number;
}

interface MagicShot {
  x: number;
  y: number;
  vy: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface FloatingScore {
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
}

interface StarDot {
  rx: number;
  ry: number;
  r: number;
  twinkle: number;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function loadBestScore(): number {
  try {
    const raw = localStorage.getItem(BEST_SCORE_KEY);
    return raw ? Math.max(0, Number(raw) || 0) : 0;
  } catch {
    return 0;
  }
}

function saveBestScore(score: number): void {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch {
    // ignore storage errors
  }
}

export const SleighArcadeGame: React.FC<SleighArcadeGameProps> = ({
  t,
  onBackToCover,
  onBeatRecord,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number>(() => loadBestScore());
  const [lives, setLives] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [beatRecordThisRun, setBeatRecordThisRun] = useState(false);
  const [runId, setRunId] = useState(1);

  const isPausedRef = useRef(false);
  const isGameOverRef = useRef(false);
  const worldSizeRef = useRef<{ w: number; h: number }>({
    w: typeof window !== 'undefined' ? window.innerWidth : 480,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  });
  const targetXRef = useRef(worldSizeRef.current.w / 2);
  const keysRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const bestAtRunStartRef = useRef(bestScore);
  const rewardedThisRunRef = useRef(false);

  // Keep latest callbacks in refs so parent 1s clock ticks never interrupt the 60 FPS loop
  const onBeatRecordRef = useRef(onBeatRecord);
  onBeatRecordRef.current = onBeatRecord;

  isPausedRef.current = isPaused;
  isGameOverRef.current = isGameOver;

  const handleRestart = useCallback(() => {
    audioEngine.playSleighBells('bright');
    const currentBest = loadBestScore();
    bestAtRunStartRef.current = currentBest;
    rewardedThisRunRef.current = false;
    setBestScore(currentBest);
    setScore(0);
    setLives(3);
    setIsPaused(false);
    setIsGameOver(false);
    setBeatRecordThisRun(false);
    targetXRef.current = worldSizeRef.current.w / 2;
    setRunId((prev) => prev + 1);
  }, []);

  // Lock page scroll while fullscreen minigame is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Keyboard arrow / A-D / Escape support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = true;
      if (e.key === 'Escape' && !isGameOverRef.current) {
        setIsPaused((prev) => !prev);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // Fullscreen 100% Viewport 60 FPS Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const syncViewportDimensions = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container?.getBoundingClientRect();
      const cssW = Math.max(320, rect && rect.width > 0 ? rect.width : window.innerWidth);
      const cssH = Math.max(420, rect && rect.height > 0 ? rect.height : window.innerHeight);

      worldSizeRef.current = { w: cssW, h: cssH };
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      targetXRef.current = Math.max(38, Math.min(cssW - 38, targetXRef.current));
    };

    syncViewportDimensions();
    targetXRef.current = worldSizeRef.current.w / 2;

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && container) {
      resizeObserver = new ResizeObserver(syncViewportDimensions);
      resizeObserver.observe(container);
    }
    window.addEventListener('resize', syncViewportDimensions);

    let animId = 0;
    let lastTs = performance.now();

    let sleighX = worldSizeRef.current.w / 2;
    let sleighVx = 0;
    let invulnTimer = 0;
    let shakeTimer = 0;

    let localScore = 0;
    let localLives = 3;
    let shootTimer = 0;
    let giftSpawnTimer = 0.25;
    let snowSpawnTimer = 0.65;
    let elapsed = 0;

    const gifts: FallingGift[] = [];
    const flakes: GiantSnowflake[] = [];
    const shots: MagicShot[] = [];
    const sparks: SparkParticle[] = [];
    const floaters: FloatingScore[] = [];

    const stars: StarDot[] = Array.from({ length: 85 }, () => ({
      rx: Math.random(),
      ry: Math.random() * 0.88,
      r: 0.7 + Math.random() * 1.9,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const giftPalettes = [
      { color: '#dc2626', ribbon: '#fde047' },
      { color: '#16a34a', ribbon: '#fef08a' },
      { color: '#2563eb', ribbon: '#facc15' },
      { color: '#db2777', ribbon: '#ffffff' },
    ];

    const spawnBurst = (x: number, y: number, color: string, count = 14) => {
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count + Math.random() * 0.35;
        const spd = 70 + Math.random() * 160;
        sparks.push({
          x,
          y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          alpha: 1,
          color,
          size: 2 + Math.random() * 2.6,
        });
      }
    };

    const addPoints = (pts: number, x: number, y: number, color: string) => {
      localScore += pts;
      setScore(localScore);
      floaters.push({ x, y, text: `+${pts}`, color, alpha: 1 });

      if (localScore > bestAtRunStartRef.current) {
        saveBestScore(localScore);
        setBestScore(localScore);
        if (!rewardedThisRunRef.current && localScore >= 20) {
          rewardedThisRunRef.current = true;
          setBeatRecordThisRun(true);
          onBeatRecordRef.current(localScore);
        }
      }
    };

    const drawSnowflake = (f: GiantSnowflake) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rot);
      ctx.strokeStyle = '#bae6fd';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((Math.PI / 3) * i);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -f.radius);
        ctx.moveTo(0, -f.radius * 0.52);
        ctx.lineTo(-f.radius * 0.28, -f.radius * 0.72);
        ctx.moveTo(0, -f.radius * 0.52);
        ctx.lineTo(f.radius * 0.28, -f.radius * 0.72);
        ctx.stroke();
        ctx.restore();
      }
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawGift = (g: FallingGift) => {
      ctx.save();
      ctx.translate(g.x, g.y);
      const half = g.size / 2;
      ctx.fillStyle = g.color;
      ctx.strokeStyle = 'rgba(255,255,255,0.45)';
      ctx.lineWidth = 1.6;
      drawRoundedRect(ctx, -half, -half, g.size, g.size, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = g.ribbon;
      ctx.fillRect(-3.5, -half, 7, g.size);
      ctx.fillRect(-half, -3.5, g.size, 7);

      ctx.beginPath();
      ctx.ellipse(-5.5, -half - 3.5, 5.5, 3.2, -0.4, 0, Math.PI * 2);
      ctx.ellipse(5.5, -half - 3.5, 5.5, 3.2, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawSleighAndReindeer = (x: number, y: number, tilt: number) => {
      if (invulnTimer > 0 && Math.floor(invulnTimer * 14) % 2 === 0) {
        return;
      }
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(tilt);

      // Reindeer flying ahead
      ctx.save();
      ctx.translate(0, -36);
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.72)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-12, 28);
      ctx.lineTo(-5, 6);
      ctx.moveTo(12, 28);
      ctx.lineTo(5, 6);
      ctx.stroke();

      ctx.fillStyle = '#92400e';
      ctx.beginPath();
      ctx.ellipse(0, 2, 10.5, 14.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fde68a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-4, -9);
      ctx.lineTo(-10, -17);
      ctx.moveTo(4, -9);
      ctx.lineTo(10, -17);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(0, -13, 3.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Golden Runners
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(-27, 23);
      ctx.lineTo(-27, -8);
      ctx.moveTo(27, 23);
      ctx.lineTo(27, -8);
      ctx.stroke();

      // Crimson Sleigh Body
      ctx.fillStyle = '#b91c1c';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2.4;
      drawRoundedRect(ctx, -25, -10, 50, 31, 10);
      ctx.fill();
      ctx.stroke();

      // Gift Sack
      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(0, 10, 12.5, 0, Math.PI * 2);
      ctx.fill();

      // Santa Claus
      ctx.fillStyle = '#ffedd5';
      ctx.beginPath();
      ctx.arc(0, -2, 8.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 4, 7.8, 0, Math.PI);
      ctx.fill();
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(-9, -4);
      ctx.lineTo(0, -17.5);
      ctx.lineTo(9, -4);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-9.5, -5, 19, 3.2);
      ctx.beginPath();
      ctx.arc(0, -18.5, 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTs) / 1000));
      lastTs = now;

      const worldW = worldSizeRef.current.w;
      const worldH = worldSizeRef.current.h;
      const sleighY = worldH - Math.max(76, Math.min(115, worldH * 0.12));

      if (!isPausedRef.current && !isGameOverRef.current) {
        elapsed += dt;
        const speedMult = 1 + Math.floor(localScore / 100) * 0.18;
        const widthDensityFactor = Math.max(1, worldW / 480);
        const heightSpeedFactor = Math.max(0.95, worldH / 720);

        const moveSpeed = Math.max(420, worldW * 0.72);
        if (keysRef.current.left) targetXRef.current -= moveSpeed * dt;
        if (keysRef.current.right) targetXRef.current += moveSpeed * dt;
        targetXRef.current = Math.max(38, Math.min(worldW - 38, targetXRef.current));

        const prevX = sleighX;
        sleighX = Math.max(38, Math.min(worldW - 38, sleighX));
        sleighX += (targetXRef.current - sleighX) * Math.min(1, dt * 16);
        sleighVx = (sleighX - prevX) / dt;

        if (invulnTimer > 0) invulnTimer = Math.max(0, invulnTimer - dt);
        if (shakeTimer > 0) shakeTimer = Math.max(0, shakeTimer - dt);

        shootTimer -= dt;
        if (shootTimer <= 0) {
          shots.push({ x: sleighX, y: sleighY - 32, vy: -Math.max(540, worldH * 0.85) });
          shootTimer = Math.max(0.14, 0.24 - Math.floor(localScore / 100) * 0.012);
        }

        giftSpawnTimer -= dt;
        if (giftSpawnTimer <= 0) {
          const pal = giftPalettes[Math.floor(Math.random() * giftPalettes.length)];
          gifts.push({
            x: 36 + Math.random() * Math.max(1, worldW - 72),
            y: -28,
            vy: (155 + Math.random() * 60) * speedMult * heightSpeedFactor,
            size: 30,
            color: pal.color,
            ribbon: pal.ribbon,
            swayPhase: Math.random() * Math.PI * 2,
          });
          giftSpawnTimer = Math.max(0.32, 0.98 / (Math.sqrt(speedMult) * Math.sqrt(widthDensityFactor)));
        }

        snowSpawnTimer -= dt;
        if (snowSpawnTimer <= 0) {
          flakes.push({
            x: 38 + Math.random() * Math.max(1, worldW - 76),
            y: -36,
            vy: (165 + Math.random() * 68) * speedMult * heightSpeedFactor,
            radius: 21 + Math.random() * 8,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 1.4),
          });
          snowSpawnTimer = Math.max(0.32, 1.05 / (Math.sqrt(speedMult) * Math.sqrt(widthDensityFactor)));
        }

        for (let i = shots.length - 1; i >= 0; i--) {
          shots[i].y += shots[i].vy * dt;
          if (shots[i].y < -25) shots.splice(i, 1);
        }

        for (let i = gifts.length - 1; i >= 0; i--) {
          const g = gifts[i];
          g.y += g.vy * dt;
          g.x += Math.sin(elapsed * 2.5 + g.swayPhase) * 28 * dt;

          const dx = Math.abs(g.x - sleighX);
          const dy = Math.abs(g.y - sleighY);
          if (dx < 38 && dy < 34) {
            gifts.splice(i, 1);
            audioEngine.playSleighBells('bright');
            spawnBurst(g.x, g.y, '#fde047', 12);
            addPoints(10, g.x, g.y - 12, '#fde047');
            continue;
          }
          if (g.y > worldH + 40) gifts.splice(i, 1);
        }

        for (let i = flakes.length - 1; i >= 0; i--) {
          const f = flakes[i];
          f.y += f.vy * dt;
          f.rot += f.rotSpeed * dt;

          let destroyed = false;
          for (let j = shots.length - 1; j >= 0; j--) {
            const s = shots[j];
            const dist = Math.hypot(s.x - f.x, s.y - f.y);
            if (dist < f.radius + 9) {
              shots.splice(j, 1);
              flakes.splice(i, 1);
              audioEngine.playCrystalBreak();
              spawnBurst(f.x, f.y, '#7dd3fc', 16);
              addPoints(15, f.x, f.y - 10, '#7dd3fc');
              destroyed = true;
              break;
            }
          }
          if (destroyed) continue;

          if (invulnTimer <= 0) {
            const hitDist = Math.hypot(f.x - sleighX, f.y - sleighY);
            if (hitDist < f.radius + 23) {
              flakes.splice(i, 1);
              audioEngine.playSnowHit();
              spawnBurst(sleighX, sleighY, '#f87171', 18);
              shakeTimer = 0.28;
              invulnTimer = 1.3;
              try {
                if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                  navigator.vibrate(140);
                }
              } catch {
                // ignore
              }
              localLives -= 1;
              setLives(localLives);
              if (localLives <= 0) {
                if (localScore > bestAtRunStartRef.current && !rewardedThisRunRef.current && localScore > 0) {
                  rewardedThisRunRef.current = true;
                  saveBestScore(localScore);
                  setBestScore(localScore);
                  setBeatRecordThisRun(true);
                  onBeatRecordRef.current(localScore);
                }
                setIsGameOver(true);
              }
              continue;
            }
          }

          if (f.y > worldH + 44) flakes.splice(i, 1);
        }

        for (let i = sparks.length - 1; i >= 0; i--) {
          const p = sparks[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= dt * 2.1;
          if (p.alpha <= 0) sparks.splice(i, 1);
        }

        for (let i = floaters.length - 1; i >= 0; i--) {
          const fl = floaters[i];
          fl.y -= 44 * dt;
          fl.alpha -= dt * 1.4;
          if (fl.alpha <= 0) floaters.splice(i, 1);
        }
      }

      // Render 1:1 in CSS viewport pixels scaled cleanly by DPR
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (shakeTimer > 0) {
        ctx.translate((Math.random() - 0.5) * 9, (Math.random() - 0.5) * 9);
      }

      const sky = ctx.createLinearGradient(0, 0, 0, worldH);
      sky.addColorStop(0, '#020617');
      sky.addColorStop(0.55, '#0b1530');
      sky.addColorStop(1, '#141e3a');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, worldW, worldH);

      // Northern Lights Aurora
      for (let band = 0; band < 2; band++) {
        ctx.save();
        ctx.globalAlpha = band === 0 ? 0.22 : 0.16;
        const grad = ctx.createLinearGradient(0, 70 + band * 55, worldW, 210 + band * 50);
        grad.addColorStop(0, band === 0 ? '#10b981' : '#38bdf8');
        grad.addColorStop(0.5, '#34d399');
        grad.addColorStop(1, '#a855f7');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, 140 + band * 50);
        for (let x = 0; x <= worldW + 24; x += 24) {
          const wave = Math.sin(x * 0.012 + elapsed * (0.9 + band * 0.4)) * 24;
          ctx.lineTo(x, 120 + band * 50 + wave);
        }
        ctx.lineTo(worldW, 240 + band * 50);
        ctx.lineTo(0, 240 + band * 50);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Twinkling Stars across full viewport
      for (const st of stars) {
        const alpha = 0.38 + 0.58 * Math.sin(elapsed * 2.2 + st.twinkle);
        ctx.fillStyle = `rgba(255, 250, 230, ${alpha})`;
        ctx.beginPath();
        ctx.arc(st.rx * worldW, st.ry * worldH, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Snowy Horizon Silhouette
      ctx.fillStyle = '#0c1a2e';
      ctx.beginPath();
      ctx.moveTo(0, worldH);
      ctx.lineTo(0, worldH - 36);
      ctx.quadraticCurveTo(worldW * 0.3, worldH - 68, worldW * 0.6, worldH - 42);
      ctx.quadraticCurveTo(worldW * 0.85, worldH - 22, worldW, worldH - 50);
      ctx.lineTo(worldW, worldH);
      ctx.closePath();
      ctx.fill();

      for (const s of shots) {
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 4.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const g of gifts) drawGift(g);
      for (const f of flakes) drawSnowflake(f);

      const tilt = Math.max(-0.22, Math.min(0.22, sleighVx * 0.00042));
      drawSleighAndReindeer(sleighX, sleighY, tilt);

      for (const p of sparks) {
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.font = 'bold 17px sans-serif';
      ctx.textAlign = 'center';
      for (const fl of floaters) {
        ctx.globalAlpha = Math.max(0, fl.alpha);
        ctx.fillStyle = fl.color;
        ctx.fillText(fl.text, fl.x, fl.y);
      }
      ctx.globalAlpha = 1;

      ctx.restore();
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', syncViewportDimensions);
    };
  }, [runId]);

  const updatePointerX = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0) return;
    const worldW = worldSizeRef.current.w;
    const relX = ((clientX - rect.left) / rect.width) * worldW;
    targetXRef.current = Math.max(38, Math.min(worldW - 38, relX));
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-[100dvh] z-50 overflow-hidden bg-slate-950 select-none"
    >
      {/* Fullscreen 60 FPS Night Sky Canvas */}
      <canvas
        ref={canvasRef}
        width={typeof window !== 'undefined' ? window.innerWidth : 480}
        height={typeof window !== 'undefined' ? window.innerHeight : 800}
        style={{ touchAction: 'none' }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          updatePointerX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons > 0 || e.pointerType === 'mouse' || e.pointerType === 'touch') {
            updatePointerX(e.clientX);
          }
        }}
        className="block w-full h-full touch-none select-none cursor-crosshair"
      />

      {/* ONLY Floating Top Controls: Top-Left Exit | Top-Center Score & Lives | Top-Right Pause */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none px-3 sm:px-5 pt-[max(0.75rem,env(safe-area-inset-top))] flex items-center justify-between gap-2">
        {/* Top-Left: Translucent Exit Button */}
        <button
          type="button"
          onClick={() => {
            audioEngine.playSleighBells('soft');
            onBackToCover();
          }}
          className="pointer-events-auto min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900/55 hover:bg-slate-900/80 backdrop-blur-md border border-white/15 text-amber-100 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-lg transition-colors"
        >
          <span>{t.gameExitShortBtn}</span>
        </button>

        {/* Top-Center: Discreet Score & Lives HUD */}
        <div
          aria-live="polite"
          className="pointer-events-none rounded-xl bg-slate-900/55 backdrop-blur-md border border-amber-300/25 px-3 sm:px-4 py-1.5 inline-flex items-center justify-center gap-3 shadow-lg"
        >
          <span className="font-mono-num text-sm sm:text-base font-extrabold text-amber-300 tabular-nums">
            {score} <span className="text-[11px] font-semibold text-amber-100/75">{t.gameScoreLabel}</span>
          </span>
          <span aria-label={t.gameLivesLabel} className="text-xs sm:text-sm leading-none tracking-tight">
            {'❤️'.repeat(Math.max(0, lives)) + '🖤'.repeat(Math.max(0, 3 - lives))}
          </span>
        </div>

        {/* Top-Right: Translucent Pause Button */}
        <button
          type="button"
          disabled={isGameOver}
          onClick={() => setIsPaused((prev) => !prev)}
          className="pointer-events-auto min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900/55 hover:bg-slate-900/80 backdrop-blur-md border border-white/15 text-amber-100 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-lg transition-colors disabled:opacity-40"
        >
          <span>{isPaused ? `▶️ ${t.gameResumeBtn}` : `⏸️ ${t.gamePauseBtn}`}</span>
        </button>
      </div>

      {/* Simple Pause Menu Overlay */}
      {isPaused && !isGameOver && (
        <div className="absolute inset-0 z-30 bg-slate-950/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
          <div className="w-full max-w-xs rounded-2xl bg-[#141022]/95 border border-amber-300/35 p-6 space-y-4 shadow-2xl">
            <p className="font-display text-2xl font-bold text-amber-200">{t.gamePauseBtn}</p>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setIsPaused(false)}
                className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>▶️ {t.gameResumeBtn}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  audioEngine.playSleighBells('soft');
                  onBackToCover();
                }}
                className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-amber-100 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>{t.gamePauseExitBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {isGameOver && (
        <div className="absolute inset-0 z-30 bg-slate-950/82 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
          <Trophy className="w-12 h-12 text-amber-300" />
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-amber-100">
            {t.gameOverTitle}
          </h3>

          {beatRecordThisRun && (
            <div className="rounded-xl bg-emerald-600/30 border border-emerald-400/60 px-4 py-2 text-xs sm:text-sm font-extrabold text-emerald-200">
              {t.gameNewRecordBadge}
            </div>
          )}

          <div className="flex items-center justify-center gap-8 py-2">
            <div>
              <span className="block text-xs text-amber-100/70">{t.gameScoreLabel}</span>
              <span className="font-mono-num text-3xl font-extrabold text-amber-300">{score}</span>
            </div>
            <div>
              <span className="block text-xs text-amber-100/70">{t.gameBestLabel}</span>
              <span className="font-mono-num text-3xl font-extrabold text-yellow-300">{bestScore}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <button
              type="button"
              onClick={handleRestart}
              className="flex-1 min-h-[48px] px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 hover:brightness-105 text-stone-950 font-extrabold text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.gamePlayAgainBtn}</span>
            </button>
            <button
              type="button"
              onClick={onBackToCover}
              className="min-h-[48px] px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-amber-100 font-bold text-sm"
            >
              {t.gameExitShortBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
