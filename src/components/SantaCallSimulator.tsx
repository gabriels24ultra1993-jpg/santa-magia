import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Loader2,
  Phone,
  PhoneMissed,
  PhoneOff,
  RotateCcw,
  Sparkles,
  Volume2,
  X,
  Zap,
} from 'lucide-react';
import { TranslationPack } from '../i18n/translations';
import { BehaviorType, LanguageCode, LetterData } from '../types';
import santaCallImg from '../assets/images/santa-call.jpg';
import { audioEngine } from '../utils/audioEngine';

const COUNTDOWN_SECONDS = 30;
const RING_TIMEOUT_MS = 15000;

export type CallPhase = 'countdown' | 'ringing' | 'connected' | 'missed';

interface SantaCallSimulatorProps {
  t: TranslationPack;
  lang: LanguageCode;
  letter: LetterData;
  onChangeLetter: (updated: LetterData) => void;
  isOpen: boolean;
  initialMode: 'countdown' | 'ringing';
  onPhaseChange?: (phase: CallPhase | 'closed') => void;
  onOpenCall: () => void;
  onCloseCall: () => void;
}

function triggerCallVibration(): void {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate([500, 300, 500, 300, 500]);
    } catch {
      // ignore if browser blocks vibrate
    }
  }
}

function stopVibration(): void {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(0);
    } catch {
      // ignore
    }
  }
}

export const SantaCallSimulator: React.FC<SantaCallSimulatorProps> = ({
  t,
  lang,
  letter,
  onChangeLetter,
  isOpen,
  initialMode,
  onPhaseChange,
  onOpenCall,
  onCloseCall,
}) => {
  const [callState, setCallState] = useState<CallPhase>(initialMode);
  const [countdownSec, setCountdownSec] = useState<number>(COUNTDOWN_SECONDS);
  const [seconds, setSeconds] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [loadingVoice, setLoadingVoice] = useState(false);
  const [voiceError, setVoiceError] = useState(false);

  const callTimerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const ringTimeoutRef = useRef<number | null>(null);
  const vibrateIntervalRef = useRef<number | null>(null);
  const inFlightPregenRef = useRef<{
    key: string;
    controller: AbortController;
    promise: Promise<Blob>;
  } | null>(null);
  const ttsCacheRef = useRef<{ key: string; blob: Blob } | null>(null);

  const scriptText = t.buildSantaCallScript({
    children: letter.children,
  });
  const cacheKey = `${lang}::${scriptText}`;

  const clearAllTimers = useCallback(() => {
    if (callTimerRef.current !== null) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    if (countdownIntervalRef.current !== null) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (ringTimeoutRef.current !== null) {
      clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = null;
    }
    if (vibrateIntervalRef.current !== null) {
      clearInterval(vibrateIntervalRef.current);
      vibrateIntervalRef.current = null;
    }
  }, []);

  const abortPregen = useCallback(() => {
    if (inFlightPregenRef.current) {
      inFlightPregenRef.current.controller.abort();
      inFlightPregenRef.current = null;
    }
  }, []);

  const stopVoicePlayback = useCallback(() => {
    abortPregen();
    audioEngine.stopSantaTtsAudio();
    setLoadingVoice(false);
    setSpeaking(false);
  }, [abortPregen]);

  const ensureSantaVoiceBlob = useCallback(
    (forceRefresh = false): Promise<Blob> => {
      if (!forceRefresh && ttsCacheRef.current?.key === cacheKey) {
        return Promise.resolve(ttsCacheRef.current.blob);
      }

      if (!forceRefresh && inFlightPregenRef.current?.key === cacheKey) {
        return inFlightPregenRef.current.promise;
      }

      abortPregen();

      const controller = new AbortController();
      const requestPromise = (async () => {
        const response = await fetch('/api/santa-tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ script: scriptText, lang }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errPayload = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(errPayload?.error || `TTS HTTP ${response.status}`);
        }

        const data = (await response.json()) as { audioBase64?: string; mimeType?: string };
        if (!data.audioBase64) {
          throw new Error('No audio returned by server');
        }

        const wavBlob = audioEngine.createSantaWavBlob(data.audioBase64, data.mimeType || 'audio/wav');
        if (!controller.signal.aborted) {
          ttsCacheRef.current = { key: cacheKey, blob: wavBlob };
        }
        return wavBlob;
      })().finally(() => {
        if (inFlightPregenRef.current?.controller === controller) {
          inFlightPregenRef.current = null;
        }
      });

      inFlightPregenRef.current = {
        key: cacheKey,
        controller,
        promise: requestPromise,
      };

      return requestPromise;
    },
    [abortPregen, cacheKey, lang, scriptText]
  );

  const playReadyWavBlob = useCallback((wavBlob: Blob) => {
    setLoadingVoice(false);
    setVoiceError(false);
    audioEngine.playSantaTtsBlob(wavBlob, {
      onStart: () => {
        setSpeaking(true);
        setVoiceError(false);
      },
      onEnd: () => {
        setSpeaking(false);
      },
      onError: () => {
        setSpeaking(false);
        setVoiceError(true);
      },
    });
  }, []);

  const playSantaVoice = useCallback(
    async (forceRefresh = false) => {
      setVoiceError(false);

      if (!forceRefresh && ttsCacheRef.current?.key === cacheKey) {
        playReadyWavBlob(ttsCacheRef.current.blob);
        return;
      }

      setLoadingVoice(true);
      try {
        const wavBlob = await ensureSantaVoiceBlob(forceRefresh);
        playReadyWavBlob(wavBlob);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          setLoadingVoice(false);
          return;
        }
        setLoadingVoice(false);
        setSpeaking(false);
        setVoiceError(true);
      }
    },
    [cacheKey, ensureSantaVoiceBlob, playReadyWavBlob]
  );

  // Stop any pending TTS request/playback immediately when global lifecycle triggers stopAll()
  useEffect(() => {
    return audioEngine.subscribeStopAll(() => {
      abortPregen();
      setLoadingVoice(false);
      setSpeaking(false);
    });
  }, [abortPregen]);

  // Notify parent whenever call phase changes (so ambient music pauses during ringing/connected)
  useEffect(() => {
    onPhaseChange?.(isOpen ? callState : 'closed');
  }, [isOpen, callState, onPhaseChange]);

  // Reset state when overlay opens/closes
  useEffect(() => {
    if (!isOpen) {
      audioEngine.stopRingtone();
      stopVibration();
      clearAllTimers();
      stopVoicePlayback();
      setVoiceError(false);
      setSeconds(0);
      setCountdownSec(COUNTDOWN_SECONDS);
      setCallState(initialMode);
      return;
    }

    setSeconds(0);
    setSpeaking(false);
    setLoadingVoice(false);
    setVoiceError(false);
    setCountdownSec(COUNTDOWN_SECONDS);
    setCallState(initialMode);

    return () => {
      audioEngine.stopRingtone();
      stopVibration();
      clearAllTimers();
      stopVoicePlayback();
    };
  }, [isOpen, initialMode, clearAllTimers, stopVoicePlayback]);

  // Drive Countdown (30s -> 0s) and Ringing (vibration + ringtone + TTS pre-generation + 15s missed call timeout)
  useEffect(() => {
    if (!isOpen) return;

    if (callState === 'countdown') {
      audioEngine.stopRingtone();
      stopVibration();
      countdownIntervalRef.current = window.setInterval(() => {
        setCountdownSec((prev) => {
          if (prev <= 1) {
            if (countdownIntervalRef.current !== null) {
              clearInterval(countdownIntervalRef.current);
              countdownIntervalRef.current = null;
            }
            setCallState('ringing');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (countdownIntervalRef.current !== null) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
      };
    }

    if (callState === 'ringing') {
      audioEngine.startRingtone();
      triggerCallVibration();
      vibrateIntervalRef.current = window.setInterval(() => {
        triggerCallVibration();
      }, 2400);

      // Pre-generate Santa's Gemini TTS voice in the background as soon as ringing starts
      void ensureSantaVoiceBlob(false).catch(() => {});

      ringTimeoutRef.current = window.setTimeout(() => {
        audioEngine.stopRingtone();
        stopVibration();
        abortPregen();
        if (vibrateIntervalRef.current !== null) {
          clearInterval(vibrateIntervalRef.current);
          vibrateIntervalRef.current = null;
        }
        setCallState('missed');
      }, RING_TIMEOUT_MS);

      return () => {
        audioEngine.stopRingtone();
        stopVibration();
        if (vibrateIntervalRef.current !== null) {
          clearInterval(vibrateIntervalRef.current);
          vibrateIntervalRef.current = null;
        }
        if (ringTimeoutRef.current !== null) {
          clearTimeout(ringTimeoutRef.current);
          ringTimeoutRef.current = null;
        }
      };
    }
  }, [isOpen, callState, abortPregen, ensureSantaVoiceBlob]);

  const handleCallNow = () => {
    audioEngine.playSleighBells('soft');
    if (countdownIntervalRef.current !== null) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdownSec(0);
    setCallState('ringing');
  };

  const handleAnswer = () => {
    if (ringTimeoutRef.current !== null) {
      clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = null;
    }
    if (vibrateIntervalRef.current !== null) {
      clearInterval(vibrateIntervalRef.current);
      vibrateIntervalRef.current = null;
    }
    audioEngine.stopRingtone();
    stopVibration();
    setCallState('connected');
    audioEngine.playSleighBells('soft');
    callTimerRef.current = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    void playSantaVoice(false);
  };

  const handleRetryCountdown = () => {
    audioEngine.playSleighBells('bright');
    setCountdownSec(COUNTDOWN_SECONDS);
    setCallState('countdown');
  };

  const handleHangup = () => {
    audioEngine.stopRingtone();
    stopVibration();
    clearAllTimers();
    stopVoicePlayback();
    audioEngine.playSleighBells('soft');
    onCloseCall();
  };

  const formatDuration = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const primaryChild = letter.children[0];
  const countdownProgress = Math.max(0, Math.min(100, (countdownSec / COUNTDOWN_SECONDS) * 100));

  return (
    <>
      <section className="space-y-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-amber-100 [text-wrap:balance]">
            {t.callSectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-amber-100/75 leading-relaxed">
            {t.callSectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Santa Preview Card */}
          <div className="lg:col-span-5 bg-[#17121f]/95 border border-amber-200/15 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-amber-400/70 shadow-xl bg-red-950 flex items-center justify-center">
              <img
                src={santaCallImg}
                alt={t.callCallerSanta}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-amber-50">
                {t.callCallerSanta}
              </h3>
              <p className="text-xs text-amber-200/70">{t.callCallerLocation}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                audioEngine.playSleighBells('bright');
                onOpenCall();
              }}
              className="w-full min-h-[52px] px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/40 transition-colors"
            >
              <Phone className="w-5 h-5 shrink-0" />
              <span>{t.callTriggerBtn}</span>
            </button>
            <p className="text-xs text-amber-100/60 leading-relaxed max-w-xs">
              {t.callRecordHint}
            </p>
          </div>

          {/* Quick Call Controls (NO written script revealed on screen) */}
          <div className="lg:col-span-7 bg-[#17121f]/95 border border-amber-200/15 rounded-2xl p-5 sm:p-6 space-y-5 flex flex-col justify-center">
            {letter.children.length <= 1 ? (
              <div className="space-y-1.5">
                <label htmlFor="call-name" className="block text-xs font-semibold text-amber-200/80">
                  {t.fieldChildName}
                </label>
                <input
                  id="call-name"
                  type="text"
                  value={primaryChild?.name || ''}
                  onChange={(e) => {
                    const next = letter.children.map((c, idx) =>
                      idx === 0 ? { ...c, name: e.target.value } : c
                    );
                    onChangeLetter({ ...letter, children: next });
                  }}
                  placeholder={t.fieldChildNamePlaceholder}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#0f0b15] border border-amber-200/20 text-amber-50 placeholder:text-amber-100/35 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <span className="block text-xs font-semibold text-amber-200/80">
                  {t.allSiblingsTab}
                </span>
                <p className="text-base font-display font-bold text-amber-200">
                  {t.formatDisplayNames(letter.children)}
                </p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-amber-200/80">
                {t.fieldBehavior}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(
                  [
                    { id: 'super', label: t.behaviorSuper },
                    { id: 'very', label: t.behaviorVery },
                    { id: 'trying', label: t.behaviorTrying },
                  ] as Array<{ id: BehaviorType; label: string }>
                ).map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      audioEngine.playSleighBells('soft');
                      onChangeLetter({ ...letter, behavior: b.id });
                    }}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      letter.behavior === b.id
                        ? 'bg-amber-400/20 border-amber-400 text-amber-100'
                        : 'bg-[#0f0b15] border-amber-200/15 text-amber-100/75 hover:border-amber-200/35'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-[#0f0b15] border border-amber-200/15 p-4 flex items-center gap-3 text-xs sm:text-sm text-amber-100/75">
              <Volume2 className="w-5 h-5 text-amber-300 shrink-0" />
              <span>{t.callRecordHint}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Overlay: 30s Countdown -> Ringing (Vibration + 15s Timeout) -> Connected / Missed */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.callCallerSanta}
          className="fixed inset-0 z-50 h-[100dvh] w-full bg-gradient-to-b from-[#160b10] via-[#0c0a14] to-[#050408] text-white flex flex-col items-center justify-between px-6 py-10 sm:py-12 overflow-hidden"
        >
          {callState === 'countdown' && (
            <>
              <button
                type="button"
                onClick={handleHangup}
                aria-label={t.closeBtn}
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 text-amber-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2 mt-6 max-w-md">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                  {t.callCallerLocation}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-amber-50 [text-wrap:balance]">
                  {t.callCountdownTitle(countdownSec)}
                </h2>
              </div>

              {/* Big Circular Countdown Clock */}
              <div className="relative flex flex-col items-center justify-center my-auto space-y-6">
                <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="rgba(253, 230, 138, 0.14)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={339.292}
                      strokeDashoffset={339.292 * (1 - countdownProgress / 100)}
                      className="transition-[stroke-dashoffset] duration-700 ease-linear"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono-num tabular-nums text-6xl sm:text-7xl font-bold text-amber-300">
                      {countdownSec}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-100/60 mt-1">
                      sec
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-amber-100/80 text-center max-w-sm leading-relaxed">
                  {t.callCountdownSubtitle}
                </p>
              </div>

              <div className="w-full max-w-sm mb-4">
                <button
                  type="button"
                  onClick={handleCallNow}
                  className="w-full min-h-[52px] px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-colors"
                >
                  <Zap className="w-5 h-5 shrink-0" />
                  <span>{t.callNowBtn}</span>
                </button>
              </div>
            </>
          )}

          {callState === 'missed' && (
            <>
              <button
                type="button"
                onClick={handleHangup}
                aria-label={t.closeBtn}
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 text-amber-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="my-auto flex flex-col items-center text-center max-w-md space-y-6">
                <div className="w-24 h-24 rounded-full bg-red-950/70 border-2 border-red-500/50 flex items-center justify-center text-red-400 shadow-2xl">
                  <PhoneMissed className="w-11 h-11" />
                </div>

                <div className="space-y-3">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-amber-100 [text-wrap:balance]">
                    {t.callMissedTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-amber-100/75 leading-relaxed">
                    {t.callMissedSubtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRetryCountdown}
                  className="w-full min-h-[54px] px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/60 transition-colors"
                >
                  <RotateCcw className="w-5 h-5 shrink-0" />
                  <span>{t.callRetryCountdownBtn}</span>
                </button>
              </div>
              <div />
            </>
          )}

          {(callState === 'ringing' || callState === 'connected') && (
            <>
              <div className="text-center space-y-2 mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">
                  {callState === 'ringing' ? t.callIncomingStatus : t.callConnectedStatus}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  {t.callCallerSanta}
                </h2>
                <p className="text-sm text-amber-100/70">
                  {callState === 'ringing' ? (
                    t.callCallerLocation
                  ) : (
                    <span className="font-mono-num text-emerald-300 font-semibold">
                      {formatDuration(seconds)}
                    </span>
                  )}
                </p>
              </div>

              <div className="relative flex flex-col items-center justify-center my-auto">
                <div className="relative flex items-center justify-center">
                  {callState === 'ringing' && (
                    <>
                      <span
                        aria-hidden="true"
                        className="animate-call-halo absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-emerald-400/50"
                      />
                      <span
                        aria-hidden="true"
                        className="animate-call-halo absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-amber-300/40"
                        style={{ animationDelay: '0.6s' }}
                      />
                    </>
                  )}
                  <div
                    className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 shadow-2xl bg-red-950 flex items-center justify-center transition-transform ${
                      speaking ? 'border-emerald-400 scale-[1.03]' : 'border-amber-300/80'
                    }`}
                  >
                    <img
                      src={santaCallImg}
                      alt={t.callCallerSanta}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {callState === 'connected' && (
                  <div className="mt-7 flex flex-col items-center gap-3 text-center max-w-xs">
                    {loadingVoice ? (
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-300">
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                        <span>{t.callVoiceLoadingNote}</span>
                      </div>
                    ) : voiceError ? (
                      <div className="text-xs sm:text-sm font-medium text-amber-200/90">
                        <span>{t.callVoiceErrorNote}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-300">
                        <Volume2 className={`w-4 h-4 ${speaking ? 'animate-pulse' : ''}`} />
                        <span>{t.callVoicePlayingNote}</span>
                      </div>
                    )}
                    <button
                      type="button"
                      disabled={loadingVoice}
                      onClick={() => {
                        audioEngine.playSleighBells('soft');
                        void playSantaVoice(false);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-200 hover:text-white disabled:opacity-50 px-4 py-2 rounded-xl bg-white/10 border border-white/15"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.callReplayVoiceBtn}</span>
                    </button>
                  </div>
                )}
              </div>

              {callState === 'ringing' ? (
                <div className="w-full max-w-sm flex items-center justify-around gap-6 mb-4">
                  <div className="flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={handleHangup}
                      aria-label={t.callDeclineBtn}
                      className="w-[68px] h-[68px] rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-900/50 transition-transform active:scale-95"
                    >
                      <PhoneOff className="w-7 h-7" />
                    </button>
                    <span className="text-xs font-medium text-amber-100/80">
                      {t.callDeclineBtn}
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAnswer}
                      aria-label={t.callAnswerBtn}
                      className="w-[74px] h-[74px] rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-900/50 transition-transform active:scale-95"
                    >
                      <Phone className="w-8 h-8" />
                    </button>
                    <span className="text-xs font-semibold text-emerald-300">
                      {t.callAnswerBtn}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-sm flex flex-col items-center gap-2 mb-4">
                  <button
                    type="button"
                    onClick={handleHangup}
                    className="min-h-[56px] px-8 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-red-900/50 transition-transform active:scale-95"
                  >
                    <PhoneOff className="w-5 h-5" />
                    <span>{t.callHangupBtn}</span>
                  </button>
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-200/60">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.appName}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
