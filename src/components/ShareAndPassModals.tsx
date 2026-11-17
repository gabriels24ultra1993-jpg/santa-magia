import React, { useState } from 'react';
import { Check, Copy, Crown, Share2, X } from 'lucide-react';
import { TranslationPack } from '../i18n/translations';
import { audioEngine } from '../utils/audioEngine';

interface ShareModalProps {
  t: TranslationPack;
  isOpen: boolean;
  shareText: string;
  onClose: () => void;
  onCompleteShare: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  t,
  isOpen,
  shareText,
  onClose,
  onCompleteShare,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://santamagia.app';
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(currentUrl);

  const channels = [
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'bg-sky-600 hover:bg-sky-500 text-white',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-600 text-white',
    },
    {
      name: 'X / Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-zinc-800 hover:bg-zinc-700 text-white border border-white/15',
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${currentUrl}`);
    } catch {
      // Fallback ignored if clipboard blocked
    }
    setCopied(true);
    onCompleteShare();
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="w-full sm:max-w-md bg-[#17121f] border border-amber-200/20 rounded-t-3xl sm:rounded-2xl p-6 space-y-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display text-xl font-bold text-amber-100 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-amber-400" />
              <span>{t.shareModalTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/75">
              {t.shareModalSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeBtn}
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-amber-100/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {channels.map((ch) => (
            <a
              key={ch.name}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                audioEngine.playMagicChime();
                onCompleteShare();
              }}
              className={`min-h-[48px] px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center transition-colors ${ch.color}`}
            >
              {ch.name}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? t.shareCopied : t.shareCopyLink}</span>
        </button>
      </div>
    </div>
  );
};

interface MagicPassModalProps {
  t: TranslationPack;
  isOpen: boolean;
  hasMagicPass: boolean;
  onClose: () => void;
  onActivatePass: () => void;
}

export const MagicPassModal: React.FC<MagicPassModalProps> = ({
  t,
  isOpen,
  hasMagicPass,
  onClose,
  onActivatePass,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="w-full sm:max-w-md bg-gradient-to-b from-[#231520] to-[#130d18] border border-amber-400/40 rounded-t-3xl sm:rounded-2xl p-6 space-y-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-amber-300">
              {t.magicPassTitle}
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/80">
              {t.magicPassSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeBtn}
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-amber-100/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul className="space-y-3 text-sm text-amber-50/95">
          {[t.magicPassPerk1, t.magicPassPerk2, t.magicPassPerk3].map((perk, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2.5 rounded-xl bg-white/5 border border-amber-300/15 px-3.5 py-2.5"
            >
              <span className="font-medium leading-snug">{perk}</span>
            </li>
          ))}
        </ul>

        {!hasMagicPass && (
          <div className="rounded-xl bg-gradient-to-r from-amber-400/15 via-yellow-300/10 to-amber-500/15 border border-amber-300/35 px-4 py-3 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-amber-100/85">{t.magicPassTitle}</span>
            <span className="font-mono-num text-lg font-extrabold text-amber-300">
              {t.magicPassPriceLabel}
            </span>
          </div>
        )}

        <div className="rounded-xl bg-black/30 border border-amber-300/20 p-3.5 text-xs text-amber-200/80 leading-relaxed">
          {t.magicPassDemoNote}
        </div>

        {hasMagicPass ? (
          <div className="min-h-[48px] px-4 py-3 rounded-xl bg-emerald-600/25 border border-emerald-400/50 text-emerald-200 font-bold text-sm flex items-center justify-center gap-2">
            <Crown className="w-4 h-4" />
            <span>{t.magicPassActiveBadge}</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              audioEngine.playMagicChime();
              onActivatePass();
            }}
            className="w-full min-h-[50px] px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:brightness-105 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all"
          >
            <Crown className="w-4 h-4 shrink-0" />
            <span>{t.magicPassConfirm}</span>
          </button>
        )}
      </div>
    </div>
  );
};

interface PrivacyPolicyModalProps {
  t: TranslationPack;
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  t,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.privacyPolicyModalTitle}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="w-full sm:max-w-lg max-h-[88dvh] flex flex-col bg-[#17121f] border border-amber-300/35 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-amber-200/15 flex items-center justify-between gap-3 shrink-0">
          <h3 className="font-display text-lg sm:text-xl font-bold text-amber-300">
            {t.privacyPolicyModalTitle}
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

        <div className="p-6 overflow-y-auto space-y-4">
          {t.privacyPolicySections.map((sec, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[#0f0b15] border border-amber-200/15 p-4 space-y-1.5"
            >
              <h4 className="text-sm font-bold text-amber-200">{sec.title}</h4>
              <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-amber-200/15 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[46px] px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-colors"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

