import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  Download,
  Mail,
  MessageCircle,
  PhoneCall,
  Plus,
  Send,
  Share2,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { THEME_COSTS, TranslationPack } from '../i18n/translations';
import { BehaviorType, ChildEntry, LanguageCode, LetterData, ParchmentTheme, SenderType } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { downloadLetterAsHDImage } from '../utils/canvasRenderer';
import { sanitizeFinalText, sanitizeInputLive } from '../utils/security';
import { saveAnonymousTrend } from '../utils/trendAnalytics';
import { WaxSeal } from './WaxSeal';

const COUNTRY_CODES = [
  { code: '1', label: '🇺🇸/🇨🇦 +1 US/CA' },
  { code: '34', label: '🇪🇸 +34 ES' },
  { code: '52', label: '🇲🇽 +52 MX' },
  { code: '54', label: '🇦🇷 +54 AR' },
  { code: '55', label: '🇧🇷 +55 BR' },
  { code: '44', label: '🇬🇧 +44 UK' },
  { code: '33', label: '🇫🇷 +33 FR' },
  { code: '49', label: '🇩🇪 +49 DE' },
  { code: '39', label: '🇮🇹 +39 IT' },
  { code: '57', label: '🇨🇴 +57 CO' },
  { code: '56', label: '🇨🇱 +56 CL' },
  { code: '51', label: '🇵🇪 +51 PE' },
  { code: '598', label: '🇺🇾 +598 UY' },
  { code: '593', label: '🇪🇨 +593 EC' },
  { code: '58', label: '🇻🇪 +58 VE' },
  { code: '591', label: '🇧🇴 +591 BO' },
  { code: '595', label: '🇵🇾 +595 PY' },
  { code: '506', label: '🇨🇷 +506 CR' },
  { code: '507', label: '🇵🇦 +507 PA' },
  { code: '502', label: '🇬🇹 +502 GT' },
  { code: '351', label: '🇵🇹 +351 PT' },
  { code: '81', label: '🇯🇵 +81 JP' },
  { code: '82', label: '🇰🇷 +82 KR' },
  { code: '7', label: '🇷🇺 +7 RU' },
  { code: '966', label: '🇸🇦 +966 SA' },
  { code: '971', label: '🇦🇪 +971 AE' },
  { code: '20', label: '🇪🇬 +20 EG' },
  { code: '91', label: '🇮🇳 +91 IN' },
  { code: '86', label: '🇨🇳 +86 CN' },
  { code: '61', label: '🇦🇺 +61 AU' },
];

interface LetterGeneratorProps {
  t: TranslationPack;
  lang: LanguageCode;
  letter: LetterData;
  onChangeLetter: (updated: LetterData) => void;
  whatsappCode: string;
  whatsappNumber: string;
  onChangeWhatsappCode: (code: string) => void;
  onChangeWhatsappNumber: (num: string) => void;
  letterRevealed: boolean;
  onAfterSendStartCall: () => void;
  onRecordTrends: () => void;
  magicPoints: number;
  unlockedThemes: ParchmentTheme[];
  hasMagicPass: boolean;
  onUnlockTheme: (theme: ParchmentTheme, cost: number) => void;
  onShare: () => void;
  onTriggerCall: () => void;
  onNotify: (msg: string) => void;
}

export const LetterGenerator: React.FC<LetterGeneratorProps> = ({
  t,
  lang,
  letter,
  onChangeLetter,
  whatsappCode,
  whatsappNumber,
  onChangeWhatsappCode,
  onChangeWhatsappNumber,
  letterRevealed,
  onAfterSendStartCall,
  onRecordTrends,
  magicPoints,
  unlockedThemes,
  hasMagicPass,
  onUnlockTheme,
  onShare,
  onTriggerCall,
  onNotify,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [isSendingAnim, setIsSendingAnim] = useState(false);
  const [previewScope, setPreviewScope] = useState<'all' | number>('all');
  const [customPrefix, setCustomPrefix] = useState('');
  const responseCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (letterRevealed) {
      responseCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [letterRevealed]);

  const isUnlocked = (theme: ParchmentTheme) =>
    hasMagicPass || unlockedThemes.includes(theme) || THEME_COSTS[theme] === 0;

  const activeTargetChildren: ChildEntry[] = useMemo(() => {
    if (previewScope === 'all' || letter.children.length <= 1) {
      return letter.children;
    }
    const chosen = letter.children[previewScope];
    return chosen ? [chosen] : letter.children;
  }, [previewScope, letter.children]);

  const effectiveDialCode = useMemo(() => {
    if (whatsappCode === 'other') {
      return customPrefix.replace(/\D/g, '');
    }
    return whatsappCode.replace(/\D/g, '');
  }, [whatsappCode, customPrefix]);

  const whatsappUrl = useMemo(() => {
    const numDigits = whatsappNumber.replace(/\D/g, '');
    const cleanDigits = `${effectiveDialCode}${numDigits}`;
    const message = t.buildParentWhatsappMessage({
      children: letter.children,
      city: letter.city,
      behavior: letter.behavior,
      sender: letter.sender,
      officialCode: letter.officialCode,
    });
    const encoded = encodeURIComponent(message);
    if (numDigits.length >= 5 && cleanDigits.length >= 6) {
      return `https://api.whatsapp.com/send?phone=${cleanDigits}&text=${encoded}`;
    }
    return `https://api.whatsapp.com/send?text=${encoded}`;
  }, [effectiveDialCode, whatsappNumber, letter, t]);

  const handleUpdateChild = (
    idx: number,
    field: keyof Omit<ChildEntry, 'id'>,
    value: string
  ) => {
    const maxLen = field === 'age' ? 12 : field === 'name' ? 40 : 90;
    const cleaned =
      field === 'age'
        ? value.replace(/[^\d\w\s\-]/g, '').slice(0, maxLen)
        : sanitizeInputLive(value, maxLen);
    const next = letter.children.map((c, i) =>
      i === idx ? { ...c, [field]: cleaned } : c
    );
    onChangeLetter({ ...letter, children: next });
  };

  const handleAddSibling = () => {
    if (letter.children.length >= 5) return;
    audioEngine.playSleighBells('soft');
    const newEntry: ChildEntry = {
      id: `child-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: '',
      age: '',
      gift: '',
    };
    onChangeLetter({
      ...letter,
      children: [...letter.children, newEntry],
    });
  };

  const handleRemoveSibling = (idx: number) => {
    if (letter.children.length <= 1) return;
    audioEngine.playSleighBells('soft');
    const next = letter.children.filter((_, i) => i !== idx);
    onChangeLetter({ ...letter, children: next });
    if (previewScope !== 'all' && previewScope >= next.length) {
      setPreviewScope('all');
    }
  };

  const handleSelectTheme = (theme: ParchmentTheme) => {
    audioEngine.playSleighBells('soft');
    if (isUnlocked(theme)) {
      onChangeLetter({ ...letter, theme });
      return;
    }
    const cost = THEME_COSTS[theme];
    if (magicPoints >= cost) {
      onUnlockTheme(theme, cost);
      onChangeLetter({ ...letter, theme });
    } else {
      onNotify(t.notEnoughPoints);
    }
  };

  const handleSendToNorthPole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSendingAnim) return;

    audioEngine.playSleighBells('bright');
    setIsSendingAnim(true);

    // Final XSS sanitization pass before sending/recording
    const sanitizedChildren = letter.children.map((c) => ({
      ...c,
      name: sanitizeFinalText(c.name, 40),
      age: sanitizeFinalText(c.age, 12),
      gift: sanitizeFinalText(c.gift, 90),
    }));
    const sanitizedCity = sanitizeFinalText(letter.city, 60);
    onChangeLetter({
      ...letter,
      children: sanitizedChildren,
      city: sanitizedCity,
    });

    // Strictly anonymous trend capture (never saves child names or phone numbers)
    for (const child of sanitizedChildren) {
      if (child.gift) {
        await saveAnonymousTrend({
          countryOrCity: sanitizedCity,
          language: lang,
          age: child.age,
          gift: child.gift,
        });
      }
    }
    onRecordTrends();

    // 1) 2.5s flying envelope animation -> 2) Send full list to WhatsApp -> 3) Open Santa Call (letter stays hidden until hangup!)
    window.setTimeout(() => {
      setIsSendingAnim(false);

      const numDigits = whatsappNumber.replace(/\D/g, '');
      const cleanDigits = `${effectiveDialCode}${numDigits}`;
      if (numDigits.length >= 5 && cleanDigits.length >= 6) {
        const anchor = document.createElement('a');
        anchor.href = whatsappUrl;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }

      onAfterSendStartCall();
    }, 2500);
  };

  const handleDownloadHD = async () => {
    audioEngine.playSleighBells('bright');
    setDownloading(true);
    try {
      await downloadLetterAsHDImage(letter, t, activeTargetChildren, lang);
      onNotify(t.toastHdDownloaded);
    } finally {
      setDownloading(false);
    }
  };

  const salutationText = t.buildSalutation(activeTargetChildren);

  const paragraphs = t.buildLetterParagraphs({
    children: activeTargetChildren,
    sender: letter.sender,
  });

  const certificateBody = t.buildCertificateBody({
    children: activeTargetChildren,
    city: letter.city,
    behavior: letter.behavior,
  });

  const displayNames = t.formatDisplayNames(activeTargetChildren);

  const themes: Array<{ id: ParchmentTheme; label: string; cost: number }> = [
    { id: 'classic', label: t.themeClassic, cost: 0 },
    { id: 'royal', label: t.themeRoyal, cost: THEME_COSTS.royal },
    { id: 'certificate', label: t.themeCertificate, cost: THEME_COSTS.certificate },
    { id: 'aurora', label: t.themeAurora, cost: THEME_COSTS.aurora },
  ];

  const isAurora = letter.theme === 'aurora';
  const isRoyal = letter.theme === 'royal';
  const isCert = letter.theme === 'certificate';

  return (
    <section className="space-y-6">
      <div className="space-y-2 max-w-2xl">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-amber-100 [text-wrap:balance]">
          {t.letterSectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-amber-100/75 leading-relaxed">
          {t.letterSectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Simple Multi-Sibling Form */}
        <form
          onSubmit={handleSendToNorthPole}
          className="lg:col-span-5 bg-[#17121f]/95 border border-amber-200/15 rounded-2xl p-5 sm:p-6 space-y-4"
        >
          {/* Sender Switch */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-amber-200/80">
              {t.fieldSender}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['santa', 'kings'] as SenderType[]).map((s) => {
                const active = letter.sender === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      audioEngine.playSleighBells('soft');
                      onChangeLetter({ ...letter, sender: s });
                    }}
                    className={`min-h-[44px] px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors text-left flex items-center gap-2 ${
                      active
                        ? 'bg-red-700/90 border-amber-300/60 text-white'
                        : 'bg-[#0f0b15] border-amber-200/15 text-amber-100/80 hover:border-amber-300/35'
                    }`}
                  >
                    <span className="truncate">
                      {s === 'santa' ? t.senderSanta : t.senderKings}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Siblings List (1 to 5 Children) */}
          <div className="space-y-3">
            {letter.children.map((child, idx) => (
              <div
                key={child.id}
                className="rounded-xl bg-[#0f0b15]/90 border border-amber-200/15 p-3.5 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-amber-300">
                    {t.childNumberLabel(idx + 1)}
                  </span>
                  {letter.children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSibling(idx)}
                      aria-label={t.removeSiblingAria}
                      className="min-w-[32px] min-h-[32px] rounded-lg text-amber-100/60 hover:text-white hover:bg-red-900/50 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2 space-y-1">
                    <label
                      htmlFor={`child-name-${idx}`}
                      className="block text-[11px] font-medium text-amber-200/75"
                    >
                      {t.fieldChildName}
                    </label>
                    <input
                      id={`child-name-${idx}`}
                      type="text"
                      value={child.name}
                      onChange={(e) => handleUpdateChild(idx, 'name', e.target.value)}
                      placeholder={t.fieldChildNamePlaceholder}
                      className="w-full min-h-[42px] px-3 py-2 rounded-lg bg-[#17121f] border border-amber-200/20 text-amber-50 placeholder:text-amber-100/35 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor={`child-age-${idx}`}
                      className="block text-[11px] font-medium text-amber-200/75"
                    >
                      {t.fieldAge}
                    </label>
                    <input
                      id={`child-age-${idx}`}
                      type="text"
                      value={child.age}
                      onChange={(e) => handleUpdateChild(idx, 'age', e.target.value)}
                      placeholder={t.fieldAgePlaceholder}
                      className="w-full min-h-[42px] px-3 py-2 rounded-lg bg-[#17121f] border border-amber-200/20 text-amber-50 placeholder:text-amber-100/35 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor={`child-gift-${idx}`}
                    className="block text-[11px] font-medium text-amber-200/75"
                  >
                    {t.fieldGift}
                  </label>
                  <input
                    id={`child-gift-${idx}`}
                    type="text"
                    value={child.gift}
                    onChange={(e) => handleUpdateChild(idx, 'gift', e.target.value)}
                    placeholder={t.fieldGiftPlaceholder}
                    className="w-full min-h-[42px] px-3 py-2 rounded-lg bg-[#17121f] border border-amber-200/20 text-amber-50 placeholder:text-amber-100/35 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            ))}

            {letter.children.length < 5 && (
              <button
                type="button"
                onClick={handleAddSibling}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-dashed border-amber-300/45 text-amber-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4 shrink-0" />
                <span>{t.addSiblingBtn.replace('➕ ', '')}</span>
              </button>
            )}
          </div>

          {/* Shared City */}
          <div className="space-y-1.5">
            <label htmlFor="child-city" className="block text-xs font-semibold text-amber-200/80">
              {t.fieldCity}
            </label>
            <input
              id="child-city"
              type="text"
              maxLength={60}
              value={letter.city}
              onChange={(e) =>
                onChangeLetter({ ...letter, city: sanitizeInputLive(e.target.value, 60) })
              }
              placeholder={t.fieldCityPlaceholder}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#0f0b15] border border-amber-200/20 text-amber-50 placeholder:text-amber-100/35 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Shared Behavior */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-amber-200/80">
              {t.fieldBehavior}
            </label>
            <div className="grid grid-cols-1 gap-2">
              {(
                [
                  { id: 'super', label: t.behaviorSuper },
                  { id: 'very', label: t.behaviorVery },
                  { id: 'trying', label: t.behaviorTrying },
                ] as Array<{ id: BehaviorType; label: string }>
              ).map((opt) => {
                const active = letter.behavior === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      audioEngine.playSleighBells('soft');
                      onChangeLetter({ ...letter, behavior: opt.id });
                    }}
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium border flex items-center justify-between transition-colors ${
                      active
                        ? 'bg-amber-500/20 border-amber-400 text-amber-100'
                        : 'bg-[#0f0b15] border-amber-200/15 text-amber-100/75 hover:border-amber-200/35'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {active && <Check className="w-4 h-4 text-amber-300 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Discreet Home Contact Phone (WhatsApp) */}
          <div className="space-y-1.5 pt-2 border-t border-amber-200/10">
            <label htmlFor="parent-whatsapp" className="block text-xs font-semibold text-amber-200/90">
              {t.fieldWhatsappLabel}
            </label>
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <select
                aria-label="Country code"
                value={whatsappCode}
                onChange={(e) => onChangeWhatsappCode(e.target.value)}
                className="min-h-[44px] max-w-[150px] px-2.5 py-2 rounded-xl bg-[#0f0b15] border border-amber-200/25 text-amber-50 text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-400 shrink-0"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
                <option value="other">{t.fieldWhatsappOtherOption}</option>
              </select>
              {whatsappCode === 'other' && (
                <input
                  type="text"
                  inputMode="tel"
                  aria-label={t.fieldWhatsappOtherOption}
                  value={customPrefix}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/[^\d+]/g, '').slice(0, 6);
                    setCustomPrefix(cleaned);
                  }}
                  placeholder={t.fieldWhatsappCustomPrefixPlaceholder}
                  className="w-20 min-h-[44px] px-2.5 py-2 rounded-xl bg-[#0f0b15] border border-amber-300/40 text-amber-50 placeholder:text-amber-100/35 text-sm font-mono-num focus:outline-none focus:border-amber-400 shrink-0"
                />
              )}
              <input
                id="parent-whatsapp"
                type="tel"
                inputMode="numeric"
                value={whatsappNumber}
                onChange={(e) => onChangeWhatsappNumber(e.target.value.replace(/[^\d\s-]/g, ''))}
                placeholder={t.fieldWhatsappPlaceholder}
                className="flex-1 min-w-[140px] min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#0f0b15] border border-amber-200/25 text-amber-50 placeholder:text-amber-100/35 text-sm font-mono-num focus:outline-none focus:border-amber-400"
              />
            </div>
            <p className="text-[11px] text-amber-100/60 leading-snug">
              {t.fieldWhatsappHint}
            </p>
          </div>

          {/* Parchment & VIP Certificate Selector */}
          <div className="space-y-2 pt-2 border-t border-amber-200/10">
            <label className="block text-xs font-semibold text-amber-200/80">
              {t.fieldTheme}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {themes.map((th) => {
                const unlocked = isUnlocked(th.id);
                const canRedeemWithPoints = !unlocked && magicPoints >= th.cost;
                const selected = letter.theme === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => handleSelectTheme(th.id)}
                    className={`min-h-[50px] px-3 py-2 rounded-xl border text-left transition-colors flex items-center justify-between gap-2 ${
                      selected
                        ? 'bg-amber-400/20 border-amber-300 text-amber-50'
                        : 'bg-[#0f0b15] border-amber-200/15 text-amber-100/80 hover:border-amber-200/35'
                    }`}
                  >
                    <span className="text-xs font-semibold leading-tight">{th.label}</span>
                    <span className="shrink-0 text-[10px] font-bold text-amber-300 text-right leading-tight max-w-[125px]">
                      {unlocked ? (
                        th.cost === 0 ? (
                          t.freeLabel
                        ) : (
                          t.vipExclusiveBadge
                        )
                      ) : canRedeemWithPoints ? (
                        t.redeemPointsBadge
                      ) : (
                        t.vipExclusiveBadge
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear Pre-Send Family Privacy Warning */}
          <div className="rounded-xl bg-emerald-950/35 border border-emerald-400/25 px-3.5 py-2.5 text-[11px] sm:text-xs text-emerald-100/90 leading-relaxed">
            {t.preSendPrivacyBanner}
          </div>

          {/* Primary Send Button */}
          <button
            type="submit"
            disabled={isSendingAnim}
            className="w-full min-h-[52px] px-5 py-3.5 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:brightness-110 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-red-950/50 transition-all disabled:opacity-60"
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>{t.sendToNorthPoleBtn}</span>
          </button>
        </form>

        {/* Right Column: Sealed Waiting Card until Call finishes, then Official Parchment */}
        <div ref={responseCardRef} className="lg:col-span-7 space-y-4">
          {!letterRevealed ? (
            <div className="rounded-2xl bg-[#17121f]/95 border border-amber-200/20 p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[420px] space-y-6">
              <div className="relative">
                <WaxSeal label={t.letterSealText} />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-amber-200 [text-wrap:balance]">
                  {t.sealedWaitingTitle}
                </h3>
                <p className="text-sm sm:text-base text-amber-100/75 leading-relaxed">
                  {t.sealedWaitingSubtitle}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-2xl bg-emerald-950/55 border border-emerald-400/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-200">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{t.responseReadyBanner}</span>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{t.openWhatsappFallback}</span>
                </a>
              </div>

              {/* Quick Sibling Tabs (Group vs Individual HD Letter) */}
              {letter.children.length > 1 && (
                <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#17121f] border border-amber-200/15 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      audioEngine.playSleighBells('soft');
                      setPreviewScope('all');
                    }}
                    className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                      previewScope === 'all'
                        ? 'bg-amber-400 text-stone-950'
                        : 'text-amber-100/80 hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.allSiblingsTab}</span>
                  </button>
                  {letter.children.map((c, idx) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        audioEngine.playSleighBells('soft');
                        setPreviewScope(idx);
                      }}
                      className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                        previewScope === idx
                          ? 'bg-amber-400 text-stone-950'
                          : 'text-amber-100/80 hover:text-white'
                      }`}
                    >
                      {c.name.trim() || t.childNumberLabel(idx + 1)}
                    </button>
                  ))}
                </div>
              )}

              <div
                className={`relative rounded-2xl p-5 sm:p-8 shadow-2xl transition-colors ${
                  isAurora
                    ? 'bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#0b132b] text-amber-50 border-2 border-amber-400/70'
                    : isRoyal
                    ? 'bg-gradient-to-br from-[#fffaf0] via-[#f6e3ba] to-[#ebd09a] text-[#2c1810] border-4 border-amber-600/80'
                    : 'bg-gradient-to-br from-[#fdf7e7] via-[#f7ebd0] to-[#eedab1] text-[#2c1810] border-2 border-amber-700/60'
                }`}
              >
                <div
                  className={`rounded-xl p-4 sm:p-7 border ${
                    isAurora ? 'border-amber-300/35' : 'border-amber-700/30'
                  }`}
                >
                  <div className="text-center pb-4 mb-5 border-b border-current/15">
                    <p
                      className={`text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase ${
                        isAurora ? 'text-amber-300' : 'text-amber-800'
                      }`}
                    >
                      {isCert
                        ? t.certificateSubtitle
                        : letter.sender === 'kings'
                        ? t.magiRoyalDispatch
                        : t.northPoleDispatch}
                    </p>
                  </div>

                  {isCert ? (
                    <div className="text-center space-y-5 py-2">
                      <h3
                        className={`font-display text-2xl sm:text-3xl font-bold [text-wrap:balance] ${
                          isAurora ? 'text-amber-200' : 'text-red-800'
                        }`}
                      >
                        {t.certificateTitle}
                      </h3>
                      <p className="text-xs sm:text-sm opacity-80">{t.certificateAwardedTo}</p>
                      <p className="font-display italic text-2xl sm:text-4xl font-bold border-b-2 border-amber-600/40 inline-block pb-2 px-6 [text-wrap:balance]">
                        {displayNames}
                      </p>
                      <p className="font-display text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                        {certificateBody}
                      </p>
                      <p
                        className={`text-xs font-semibold tracking-wider uppercase pt-2 ${
                          isAurora ? 'text-amber-300' : 'text-amber-800'
                        }`}
                      >
                        {t.certificateSealLabel}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3
                        className={`font-display italic text-2xl sm:text-3xl font-bold [text-wrap:balance] ${
                          isAurora ? 'text-amber-300' : 'text-red-800'
                        }`}
                      >
                        {salutationText}
                      </h3>
                      <div className="space-y-3.5 font-display text-[15px] sm:text-base leading-relaxed">
                        {paragraphs.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                      </div>
                      <p
                        className={`font-display italic text-lg sm:text-xl font-semibold pt-2 ${
                          isAurora ? 'text-amber-200' : 'text-red-800'
                        }`}
                      >
                        {letter.sender === 'kings'
                          ? t.letterSignatureKings
                          : t.letterSignatureSanta}
                      </p>
                    </div>
                  )}

                  <div className="mt-7 pt-4 border-t border-current/15 flex items-end justify-between gap-4">
                    <div className="space-y-1">
                      <span className="block text-[10px] font-semibold tracking-wider uppercase opacity-65">
                        {t.officialCodeLabel}
                      </span>
                      <span className="block font-mono-num text-xs sm:text-sm font-semibold">
                        {letter.officialCode}
                      </span>
                    </div>
                    <WaxSeal label={t.letterSealText} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={downloading}
                  onClick={handleDownloadHD}
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-500/15 disabled:opacity-60"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span className="truncate">{t.downloadHdBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playSleighBells('soft');
                    onShare();
                  }}
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors border border-amber-300/30"
                >
                  <Share2 className="w-4 h-4 shrink-0" />
                  <span className="truncate">{t.sharePointsBtn}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  audioEngine.playSleighBells('bright');
                  onTriggerCall();
                }}
                className="w-full min-h-[52px] px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/50 transition-colors"
              >
                <PhoneCall className="w-5 h-5 shrink-0" />
                <span>{t.callWithChildBtn}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* 2.5s Magical Flying Envelope Overlay */}
      {isSendingAnim && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 h-[100dvh] w-full bg-[#09060e]/92 backdrop-blur-md flex flex-col items-center justify-center px-6 text-center overflow-hidden"
        >
          <div className="relative w-full max-w-md h-44 flex items-center justify-center">
            <div className="animate-fly-envelope relative bg-gradient-to-br from-[#fdf5dc] to-[#ecd29e] border-2 border-amber-400 rounded-2xl w-36 h-24 shadow-2xl shadow-amber-500/30 flex items-center justify-center">
              <Mail className="w-10 h-10 text-red-700" />
              <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-red-700 border-2 border-amber-300 flex items-center justify-center text-xs shadow">
                ★
              </span>
            </div>
          </div>

          <div className="space-y-2 max-w-sm">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-amber-200">
              {t.sendingTitle}
            </h3>
            <p className="text-sm text-amber-100/75">{t.sendingSubtitle}</p>
          </div>
        </div>
      )}
    </section>
  );
};
