import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { TranslationPack } from '../i18n/translations';
import { audioEngine } from '../utils/audioEngine';
import { FireworksAndSnowCanvas } from './PhotoWallAndParade';

/**
 * Illustrated SVG icon of Santa's cheerful Christmas Elf helper
 * wearing a red & green pointed hat with white pom-pom and golden jingle bell.
 */
export const ElfHelperIcon: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16 sm:w-20 sm:h-20 shrink-0',
}) => (
  <svg
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="48" cy="52" r="40" fill="#fde68a" fillOpacity="0.14" />
    <path
      d="M24 85C27 73 36 69 48 69C60 69 69 73 72 85H24Z"
      fill="#15803d"
      stroke="#14532d"
      strokeWidth="2"
    />
    <path
      d="M31 72L38 79L44 72L48 79L52 72L58 79L65 72"
      fill="#dc2626"
      stroke="#facc15"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M27 50C20 48 16 44 17 40C18 37 24 41 29 44"
      fill="#fed7aa"
      stroke="#c2410c"
      strokeOpacity="0.35"
      strokeWidth="1.5"
    />
    <path
      d="M69 50C76 48 80 44 79 40C78 37 72 41 67 44"
      fill="#fed7aa"
      stroke="#c2410c"
      strokeOpacity="0.35"
      strokeWidth="1.5"
    />
    <circle cx="48" cy="51" r="20" fill="#ffedd5" stroke="#fdba74" strokeWidth="1.5" />
    <path
      d="M30 44C33 36 42 34 48 37C54 34 63 36 66 44C62 40 57 41 53 43C49 39 45 40 41 43C37 40 33 41 30 44Z"
      fill="#78350f"
    />
    <circle cx="40.5" cy="50" r="2.6" fill="#1c1917" />
    <circle cx="55.5" cy="50" r="2.6" fill="#1c1917" />
    <circle cx="41.4" cy="49.1" r="0.9" fill="#ffffff" />
    <circle cx="56.4" cy="49.1" r="0.9" fill="#ffffff" />
    <ellipse cx="35.5" cy="55.5" rx="3.4" ry="2.1" fill="#fb7185" fillOpacity="0.45" />
    <ellipse cx="60.5" cy="55.5" rx="3.4" ry="2.1" fill="#fb7185" fillOpacity="0.45" />
    <circle cx="48" cy="53.5" r="2.2" fill="#f97316" fillOpacity="0.55" />
    <path
      d="M41.5 58.5C43.5 62 52.5 62 54.5 58.5"
      stroke="#9a3412"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M27 40C29 22 42 11 58 11C69 11 77 17 80 24C72 22 65 24 62 29C64 33 67 36 69 40H27Z"
      fill="#dc2626"
      stroke="#991b1b"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M36 33C39 22 47 16 58 16"
      stroke="#fca5a5"
      strokeOpacity="0.65"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M25 40C25 36.5 28 34 32 34H64C68 34 71 36.5 71 40L66 43L60 39.5L54 43L48 39.5L42 43L36 39.5L30 43L25 40Z"
      fill="#16a34a"
      stroke="#14532d"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="80" cy="24" r="6.2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
    <line x1="77" y1="29" x2="77" y2="34" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
    <circle cx="77" cy="39" r="5.5" fill="#facc15" stroke="#b45309" strokeWidth="1.6" />
    <circle cx="75.2" cy="37.2" r="1.4" fill="#fef9c3" />
    <path
      d="M74 40.5H80M77 40.5V43.5"
      stroke="#78350f"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="77" cy="43.5" r="1" fill="#78350f" />
  </svg>
);

interface ChristmasElfNoteCardProps {
  t: TranslationPack;
}

export const ChristmasElfNoteCard: React.FC<ChristmasElfNoteCardProps> = ({ t }) => {
  return (
    <article className="rounded-3xl bg-gradient-to-br from-[#fdf6e2] via-[#f7e9c6] to-[#eed7a4] text-[#2c1810] border-2 border-amber-400 shadow-2xl p-5 sm:p-8">
      <div className="rounded-2xl border border-amber-800/25 p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-3 border-b border-amber-800/15 pb-3 pr-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-red-800 [text-wrap:balance]">
            {t.elfNoteTitle}
          </h2>
        </div>

        <p className="font-display text-base sm:text-lg leading-relaxed text-[#2c1810]">
          {t.elfNoteBody}
        </p>

        <div className="rounded-xl bg-amber-900/10 border border-amber-800/20 px-4 py-3">
          <p className="font-display text-sm sm:text-base font-semibold text-[#3f1d0b] leading-relaxed">
            {t.elfNotePs}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-800/15">
          <p className="font-display italic text-base sm:text-lg font-bold text-red-800 leading-snug text-center sm:text-left">
            {t.elfNoteSignature}
          </p>
          <div className="rounded-2xl bg-gradient-to-br from-red-700/10 via-emerald-700/10 to-amber-500/15 border border-amber-700/25 p-2 shadow-inner shrink-0">
            <ElfHelperIcon />
          </div>
        </div>
      </div>
    </article>
  );
};

interface ChristmasElfNoteModalProps {
  t: TranslationPack;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Midnight Christmas Elf Modal:
 * Only triggered at 00:00:00 on December 25 (or via Midnight simulation in panel 2512).
 * Plays festive chime, triggers celebration vibration, and displays fireworks & snow behind the parchment.
 */
export const ChristmasElfNoteModal: React.FC<ChristmasElfNoteModalProps> = ({
  t,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    audioEngine.playMagicChime();
    audioEngine.playSleighBells('bright');
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate([260, 120, 260, 120, 420]);
      }
    } catch {
      // ignore if vibration unsupported
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.elfNoteTitle}
      className="fixed inset-0 z-50 h-[100dvh] w-full bg-[#090510]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-hidden"
    >
      {/* Celebratory Midnight Fireworks & Falling Snow */}
      <FireworksAndSnowCanvas />

      <div className="relative z-20 w-full sm:max-w-xl max-h-[90dvh] overflow-y-auto rounded-3xl p-2 sm:p-3 bg-[#171022]/90 border-2 border-amber-300/60 shadow-2xl shadow-amber-500/25">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.closeBtn}
          className="absolute top-4 right-4 z-30 min-w-[40px] min-h-[40px] rounded-full bg-red-800 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <ChristmasElfNoteCard t={t} />
      </div>
    </div>
  );
};
