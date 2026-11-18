import React from 'react';
import { Download, MoreVertical, PlusSquare, Share, Smartphone, X } from 'lucide-react';
import { TranslationPack } from '../i18n/translations';

interface PWAInstallBannerProps {
  t: TranslationPack;
  visible: boolean;
  onDownloadClick: () => void;
  onContinueWeb: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({
  t,
  visible,
  onDownloadClick,
  onContinueWeb,
}) => {
  if (!visible) return null;

  return (
    <aside
      aria-label={t.pwaDownloadBtn}
      className="fixed bottom-[64px] md:bottom-5 left-3 right-3 md:left-auto md:right-5 md:max-w-md z-40 pointer-events-auto"
    >
      <div className="rounded-2xl bg-gradient-to-br from-[#2a090d]/95 via-[#180b13]/95 to-[#100914]/95 border border-amber-400/50 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-md p-3.5 sm:p-4">
        <div className="flex items-start gap-3">
          <img
            src="/icon.svg"
            alt={t.appName}
            className="w-11 h-11 rounded-xl border border-amber-300/60 shrink-0 shadow-md"
          />
          <div className="flex-1 min-w-0 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs sm:text-sm font-semibold text-amber-50 leading-snug">
                {t.pwaPromptTitle}
              </p>
              <button
                type="button"
                onClick={onContinueWeb}
                aria-label={t.closeBtn}
                className="p-1 -mt-1 -mr-1 rounded-lg text-amber-100/50 hover:text-amber-100 hover:bg-white/10 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onDownloadClick}
                className="flex-1 min-w-[140px] min-h-[40px] px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 hover:brightness-105 text-stone-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/25 border border-amber-200/70 transition-all active:scale-[0.98]"
              >
                <span>{t.pwaDownloadBtn}</span>
              </button>
              <button
                type="button"
                onClick={onContinueWeb}
                className="min-h-[40px] px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-200/20 text-amber-100/85 font-semibold text-xs whitespace-nowrap transition-colors"
              >
                {t.pwaContinueWebBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

interface PWAInstallGuideModalProps {
  t: TranslationPack;
  isOpen: boolean;
  isIOS: boolean;
  onClose: () => void;
}

export const PWAInstallGuideModal: React.FC<PWAInstallGuideModalProps> = ({
  t,
  isOpen,
  isIOS,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isIOS ? t.pwaIosGuideTitle : t.pwaBrowserGuideTitle}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-[#2b090e] via-[#170c14] to-[#110a15] border border-amber-400/45 p-5 sm:p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src="/icon.svg"
              alt={t.appName}
              className="w-10 h-10 rounded-xl border border-amber-300/60 shrink-0"
            />
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-amber-100 leading-tight">
                {isIOS ? t.pwaIosGuideTitle : t.pwaBrowserGuideTitle}
              </h3>
              <p className="text-[11px] text-amber-200/70">{t.appName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeBtn}
            className="min-w-[36px] min-h-[36px] rounded-xl bg-white/10 hover:bg-white/20 text-amber-100 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Step 1 */}
          <div className="rounded-xl bg-[#0e0912]/90 border border-amber-300/25 p-3.5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
              {isIOS ? <Share className="w-5 h-5" /> : <MoreVertical className="w-5 h-5" />}
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-bold text-amber-100">
                {isIOS ? t.pwaIosStep1Title : t.pwaBrowserStep1Title}
              </p>
              <p className="text-xs text-amber-100/75 leading-relaxed">
                {isIOS ? t.pwaIosStep1Desc : t.pwaBrowserStep1Desc}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl bg-[#0e0912]/90 border border-emerald-400/30 p-3.5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
              {isIOS ? <PlusSquare className="w-5 h-5" /> : <Download className="w-5 h-5" />}
            </div>
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-bold text-emerald-200">
                {isIOS ? t.pwaIosStep2Title : t.pwaBrowserStep2Title}
              </p>
              <p className="text-xs text-amber-100/75 leading-relaxed">
                {isIOS ? t.pwaIosStep2Desc : t.pwaBrowserStep2Desc}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 hover:brightness-105 text-stone-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
        >
          <Smartphone className="w-4 h-4" />
          <span>{t.closeBtn}</span>
        </button>
      </div>
    </div>
  );
};

interface OfflineIndicatorProps {
  t: TranslationPack;
  isOnline: boolean;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ t, isOnline }) => {
  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-16 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-stone-950 shadow-lg border border-amber-200/70"
    >
      <span className="h-2 w-2 rounded-full bg-red-900 animate-pulse shrink-0" />
      <span>{t.pwaOfflineBadge}</span>
    </div>
  );
};
