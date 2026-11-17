import React from 'react';
import { Clock, Film, Heart, ScrollText, Sparkles } from 'lucide-react';
import { TranslationPack } from '../i18n/translations';
import { WallPhoto } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { ParadeScheduleState } from '../utils/paradeSchedule';
import { handleWallImageError, resolveWallImageUrl } from '../utils/sampleIllustrations';

interface WinnerHeroCoverProps {
  t: TranslationPack;
  podiumPhotos: WallPhoto[];
  likedPhotoIds: string[];
  paradeSchedule: ParadeScheduleState;
  onToggleLike: (photo: WallPhoto) => void;
  onGoToLetter: () => void;
  onOpenParade: () => void;
  onPlaySleigh: () => void;
}

function pad2(num: number): string {
  return String(Math.max(0, num)).padStart(2, '0');
}

export const WinnerHeroCover: React.FC<WinnerHeroCoverProps> = ({
  t,
  podiumPhotos,
  likedPhotoIds,
  paradeSchedule,
  onToggleLike,
  onGoToLetter,
  onOpenParade,
  onPlaySleigh,
}) => {
  const first = podiumPhotos[0] || null;
  const runnersUp = podiumPhotos.slice(1, 3);

  return (
    <section className="space-y-7">
      {/* Window 1 Top Showcase: Giant Golden Live Christmas Countdown Clock + Primary Letter CTA */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#231420] via-[#171120] to-[#110c19] border-2 border-amber-400/55 shadow-2xl shadow-amber-900/25 p-5 sm:p-8 text-center space-y-6">
        <div className="space-y-2 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-amber-300">
            {paradeSchedule.isChristmasDay ? t.christmasClockLiveTitle : t.christmasClockTitle}
          </p>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-amber-50 leading-tight [text-wrap:balance]">
            {t.heroWinnerTitle}
          </h1>
        </div>

        {/* Live 4-Unit Golden Countdown Clock (Days, Hours, Min, Sec) */}
        <div
          aria-live="off"
          className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: pad2(paradeSchedule.days), label: t.clockDays },
            { value: pad2(paradeSchedule.hours), label: t.clockHours },
            { value: pad2(paradeSchedule.minutes), label: t.clockMinutes },
            { value: pad2(paradeSchedule.seconds), label: t.clockSeconds },
          ].map((unit, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-gradient-to-b from-amber-400/20 via-amber-500/10 to-black/50 border border-amber-300/45 py-3 px-2 sm:py-4 sm:px-3 shadow-inner"
            >
              <span className="block font-mono-num tabular-nums text-2xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-yellow-300 to-amber-500 drop-shadow">
                {unit.value}
              </span>
              <span className="mt-1 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-200/85">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Giant Glowing Animated Primary CTA Button -> Opens Window 2 */}
        <div className="max-w-xl mx-auto space-y-3">
          <button
            type="button"
            onClick={() => {
              audioEngine.playSleighBells('bright');
              onGoToLetter();
            }}
            className="w-full min-h-[60px] sm:min-h-[66px] px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-105 text-stone-950 font-extrabold text-base sm:text-xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/35 border-2 border-amber-100/80 animate-pulse transition-all"
          >
            <ScrollText className="w-6 h-6 shrink-0" />
            <span>{t.writeSantaLetterHeroBtn}</span>
          </button>

          {/* Arcade Minigame CTA + VIP Free / Free with Ad Badge */}
          <button
            type="button"
            onClick={() => {
              audioEngine.playSleighBells('soft');
              onPlaySleigh();
            }}
            className="w-full min-h-[54px] px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 hover:brightness-110 text-white font-extrabold text-sm sm:text-base flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 shadow-xl shadow-emerald-950/45 border border-emerald-300/45 transition-all"
          >
            <span>{t.playSleighHeroBtn}</span>
            <span className="text-[11px] font-bold bg-black/30 border border-amber-300/40 text-amber-200 px-2.5 py-0.5 rounded-lg whitespace-nowrap">
              {t.playSleighAccessBadge}
            </span>
          </button>

          {/* Exclusive Dec 25 & 26 Grand Christmas Video Parade Gate */}
          {paradeSchedule.status === 'live' ? (
            <button
              type="button"
              onClick={() => {
                audioEngine.playSleighBells('bright');
                onOpenParade();
              }}
              className="w-full min-h-[52px] px-5 py-3 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-900/40 transition-all"
            >
              <Film className="w-5 h-5 shrink-0" />
              <span className="text-center leading-snug">{t.paradeLivePremiereBtn}</span>
            </button>
          ) : paradeSchedule.status === 'countdown' ? (
            <div className="rounded-xl bg-black/30 border border-amber-300/25 px-4 py-2.5 flex items-center justify-center gap-2 text-xs text-amber-100/85">
              <Clock className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{t.paradeCountdownBanner}</span>
            </div>
          ) : (
            <div className="rounded-xl bg-amber-950/35 border border-amber-300/30 px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{t.paradeEndedBanner}</span>
            </div>
          )}
        </div>
      </div>

      {/* Below: Permanent Cloud Top 3 Photo Podium */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
            {t.podiumTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* #1 Dominant Golden Frame */}
          <div className="lg:col-span-7 relative rounded-3xl p-[3px] bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 shadow-2xl shadow-amber-900/25">
            <div className="relative h-full min-h-[260px] sm:min-h-[330px] rounded-[21px] overflow-hidden bg-[#120d18]">
              {first ? (
                <img
                  src={resolveWallImageUrl(first.imageUrl, first.id)}
                  alt={first.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleWallImageError(e, first.id)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-amber-200/60">
                  {t.heroWinnerTitle}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/45 pointer-events-none" />

              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-stone-950 text-xs font-bold shadow-lg">
                  <span>{t.podiumFirstBadge}</span>
                </div>
              </div>

              {first && (
                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug [text-wrap:balance]">
                      {first.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-amber-100/85">
                      <span>{first.author}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 font-mono-num font-bold text-red-300">
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>
                          {first.likes} {t.heroLikesLabel}
                        </span>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const liked = likedPhotoIds.includes(first.id);
                      audioEngine.playSleighBells(liked ? 'soft' : 'bright');
                      onToggleLike(first);
                    }}
                    className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                      likedPhotoIds.includes(first.id)
                        ? 'bg-red-600 text-white'
                        : 'bg-white/15 hover:bg-white/25 backdrop-blur-md border border-amber-200/35 text-white'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${likedPhotoIds.includes(first.id) ? 'fill-current' : ''}`}
                    />
                    <span>{likedPhotoIds.includes(first.id) ? t.wallLikedBtn : t.wallLikeBtn}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* #2 & #3 Podium Cards */}
          {runnersUp.length > 0 && (
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              {runnersUp.map((photo, idx) => {
                const badge = idx === 0 ? t.podiumSecondBadge : t.podiumThirdBadge;
                const liked = likedPhotoIds.includes(photo.id);
                return (
                  <article
                    key={photo.id}
                    className="flex-1 rounded-2xl bg-[#17121f]/95 border border-amber-300/30 p-3.5 flex items-center gap-3.5"
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#0f0b15] shrink-0">
                      <img
                        src={resolveWallImageUrl(photo.imageUrl, photo.id)}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleWallImageError(e, photo.id)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <span className="block text-xs font-bold text-amber-300 truncate">
                        {badge}
                      </span>
                      <h4 className="font-display text-base sm:text-lg font-bold text-amber-50 truncate">
                        {photo.title}
                      </h4>
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-xs text-amber-100/70 truncate">
                          {photo.author}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            audioEngine.playSleighBells(liked ? 'soft' : 'bright');
                            onToggleLike(photo);
                          }}
                          className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-bold font-mono-num inline-flex items-center gap-1 shrink-0 transition-colors ${
                            liked
                              ? 'bg-red-600 text-white'
                              : 'bg-[#0f0b15] border border-amber-200/20 text-amber-100 hover:border-red-400/50'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                          <span>{photo.likes}</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
