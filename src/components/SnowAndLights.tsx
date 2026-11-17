import React, { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  r: number;
  speedY: number;
  driftX: number;
  opacity: number;
}

const BULB_COLORS = ['#fbbf24', '#ef4444', '#22c55e', '#fde68a', '#f87171'];

export const SnowAndLights: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const flakeCount = width < 640 ? 38 : 68;
    const flakes: Snowflake[] = Array.from({ length: flakeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.2 + Math.random() * 2.4,
      speedY: 0.45 + Math.random() * 1.1,
      driftX: (Math.random() - 0.5) * 0.45,
      opacity: 0.25 + Math.random() * 0.55,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const f of flakes) {
        f.y += f.speedY;
        f.x += f.driftX + Math.sin(f.y * 0.015) * 0.25;
        if (f.y > height + 8) {
          f.y = -8;
          f.x = Math.random() * width;
        }
        if (f.x > width + 8) f.x = -8;
        if (f.x < -8) f.x = width + 8;

        ctx.fillStyle = `rgba(255, 250, 240, ${f.opacity})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Warm nocturnal firelight ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(185, 28, 28, 0.16), transparent 68%), radial-gradient(ellipse 65% 40% at 80% 15%, rgba(245, 158, 11, 0.08), transparent 60%)',
        }}
      />

      {/* Twinkling top garland bulbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 z-20 flex justify-between px-3 overflow-hidden opacity-85"
      >
        {Array.from({ length: 18 }).map((_, idx) => {
          const color = BULB_COLORS[idx % BULB_COLORS.length];
          const duration = `${1.9 + (idx % 4) * 0.45}s`;
          return (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-px h-2 bg-amber-900/60" />
              <span
                className="animate-bulb block w-2 h-2.5 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}`,
                  ['--bulb-duration' as string]: duration,
                  animationDelay: `${idx * 0.18}s`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Falling Snow Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10"
      />
    </>
  );
};
