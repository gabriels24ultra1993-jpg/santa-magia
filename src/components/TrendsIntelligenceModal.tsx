import React, { useMemo, useState } from 'react';
import { BarChart3, Calendar, Download, Lock, Sparkles, X } from 'lucide-react';
import { LANGUAGE_OPTIONS, TranslationPack } from '../i18n/translations';
import { AgeRangeBucket, AnonymousTrendRecord } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { exportTrendsToCsv, getTopGifts } from '../utils/trendAnalytics';

interface TrendsIntelligenceModalProps {
  t: TranslationPack;
  isOpen: boolean;
  showPinPrompt: boolean;
  trends: AnonymousTrendRecord[];
  simulatedDec25: boolean;
  onToggleSimulatedDec25: () => void;
  simulatedMidnight: boolean;
  onSimulateMidnight: () => void;
  onUnlockWithPin: () => void;
  onClose: () => void;
}

const AGE_RANGE_OPTIONS: AgeRangeBucket[] = ['0-3', '4-6', '7-9', '10-12', '13+'];

export const TrendsIntelligenceModal: React.FC<TrendsIntelligenceModalProps> = ({
  t,
  isOpen,
  showPinPrompt,
  trends,
  simulatedDec25,
  onToggleSimulatedDec25,
  simulatedMidnight,
  onSimulateMidnight,
  onUnlockWithPin,
  onClose,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [ageRangeFilter, setAgeRangeFilter] = useState<string>('all');

  const uniqueCountries = useMemo(() => {
    const set = new Set<string>();
    for (const item of trends) {
      if (item.countryOrCity && item.countryOrCity !== 'Unspecified') {
        set.add(item.countryOrCity);
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [trends]);

  const filteredTrends = useMemo(() => {
    return trends.filter((item) => {
      if (countryFilter !== 'all' && item.countryOrCity !== countryFilter) return false;
      if (languageFilter !== 'all' && item.language !== languageFilter) return false;
      if (ageRangeFilter !== 'all' && item.ageRange !== ageRangeFilter) return false;
      return true;
    });
  }, [trends, countryFilter, languageFilter, ageRangeFilter]);

  const topGifts = useMemo(() => getTopGifts(filteredTrends, 10), [filteredTrends]);

  const uniqueGiftsCount = useMemo(() => {
    return new Set(filteredTrends.map((r) => r.giftNormalized)).size;
  }, [filteredTrends]);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '2512') {
      audioEngine.playMagicChime();
      setPinError(false);
      setPinInput('');
      onUnlockWithPin();
    } else {
      setPinError(true);
    }
  };

  const handleExportCsv = () => {
    audioEngine.playSleighBells('bright');
    exportTrendsToCsv(filteredTrends);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={showPinPrompt ? t.trendsPinTitle : t.trendsModalTitle}
      className="fixed inset-0 z-50 h-[100dvh] w-full bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      {showPinPrompt ? (
        <div className="relative w-full max-w-sm rounded-2xl bg-[#17121f] border border-amber-300/35 p-6 space-y-5 shadow-2xl">
          <button
            type="button"
            onClick={() => {
              setPinError(false);
              setPinInput('');
              onClose();
            }}
            aria-label={t.closeBtn}
            className="absolute top-3.5 right-3.5 min-w-[38px] min-h-[38px] rounded-xl bg-white/10 hover:bg-white/20 text-amber-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 text-amber-300">
            <Lock className="w-5 h-5 shrink-0" />
            <h3 className="font-display text-lg font-bold text-amber-100">
              {t.trendsPinTitle}
            </h3>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-3">
            <input
              type="password"
              inputMode="numeric"
              autoFocus
              maxLength={8}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                if (pinError) setPinError(false);
              }}
              placeholder={t.trendsPinPlaceholder}
              className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#0f0b15] border border-amber-200/25 text-amber-50 text-center tracking-[0.35em] font-mono-num text-base focus:outline-none focus:border-amber-400"
            />
            {pinError && (
              <p className="text-xs font-semibold text-red-400 text-center">
                {t.trendsPinError}
              </p>
            )}
            <button
              type="submit"
              className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-colors"
            >
              {t.trendsPinUnlockBtn}
            </button>
          </form>
        </div>
      ) : (
        <div className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto rounded-2xl bg-[#15101c] border border-amber-300/35 p-5 sm:p-6 space-y-5 shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeBtn}
            className="sticky top-0 float-right min-w-[40px] min-h-[40px] rounded-xl bg-white/10 hover:bg-white/20 text-amber-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-1.5 pr-12">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>SANTA MAGIA · BI</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-amber-100 [text-wrap:balance]">
              {t.trendsModalTitle}
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/70">
              {t.trendsModalSubtitle}
            </p>
          </div>

          {/* Dec 25 Premiere & Christmas Midnight Preview Toggles */}
          <div className="rounded-xl bg-amber-400/10 border border-amber-400/35 p-3.5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-100">
                <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{t.paradeLivePremiereBtn}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  audioEngine.playMagicChime();
                  onToggleSimulatedDec25();
                }}
                className={`min-h-[42px] px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors ${
                  simulatedDec25
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                    : 'bg-amber-400 hover:bg-amber-300 text-stone-950'
                }`}
              >
                {simulatedDec25 ? t.trendsSimulateDec25Active : t.trendsSimulateDec25Btn}
              </button>
            </div>

            <div className="pt-2.5 border-t border-amber-300/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-100">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{t.elfNoteTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  audioEngine.playMagicChime();
                  onSimulateMidnight();
                }}
                className={`min-h-[42px] px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors ${
                  simulatedMidnight
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                    : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                {simulatedMidnight
                  ? t.trendsSimulateMidnightActive
                  : t.trendsSimulateMidnightBtn}
              </button>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#0f0b15] border border-amber-200/15 p-3.5">
              <span className="block text-[11px] font-medium text-amber-200/70">
                {t.trendsTotalCountLabel}
              </span>
              <span className="mt-1 block text-2xl font-bold text-amber-300 font-mono-num tabular-nums">
                {filteredTrends.length}
              </span>
            </div>
            <div className="rounded-xl bg-[#0f0b15] border border-amber-200/15 p-3.5">
              <span className="block text-[11px] font-medium text-amber-200/70">
                {t.trendsUniqueGiftsLabel}
              </span>
              <span className="mt-1 block text-2xl font-bold text-emerald-300 font-mono-num tabular-nums">
                {uniqueGiftsCount}
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="space-y-1">
              <label
                htmlFor="filter-country"
                className="block text-[11px] font-semibold text-amber-200/75"
              >
                {t.trendsFilterCountry}
              </label>
              <select
                id="filter-country"
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-[#0f0b15] border border-amber-200/20 text-xs sm:text-sm text-amber-50 focus:outline-none focus:border-amber-400"
              >
                <option value="all">{t.trendsAllOption}</option>
                {uniqueCountries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="filter-language"
                className="block text-[11px] font-semibold text-amber-200/75"
              >
                {t.trendsFilterLanguage}
              </label>
              <select
                id="filter-language"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-[#0f0b15] border border-amber-200/20 text-xs sm:text-sm text-amber-50 focus:outline-none focus:border-amber-400"
              >
                <option value="all">{t.trendsAllOption}</option>
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="filter-age-range"
                className="block text-[11px] font-semibold text-amber-200/75"
              >
                {t.trendsFilterAgeRange}
              </label>
              <select
                id="filter-age-range"
                value={ageRangeFilter}
                onChange={(e) => setAgeRangeFilter(e.target.value)}
                className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-[#0f0b15] border border-amber-200/20 text-xs sm:text-sm text-amber-50 focus:outline-none focus:border-amber-400"
              >
                <option value="all">{t.trendsAllOption}</option>
                {AGE_RANGE_OPTIONS.map((bucket) => (
                  <option key={bucket} value={bucket}>
                    {bucket}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Top 10 Requested Gifts */}
          <div className="rounded-xl bg-[#0f0b15] border border-amber-200/15 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{t.trendsTopGiftsTitle}</span>
              </h4>
            </div>

            {topGifts.length === 0 ? (
              <p className="text-xs sm:text-sm text-amber-100/60 py-6 text-center">
                {t.trendsNoData}
              </p>
            ) : (
              <ul className="space-y-2.5">
                {topGifts.map((stat, idx) => (
                  <li key={stat.gift} className="space-y-1">
                    <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 text-amber-300 font-mono-num font-bold tabular-nums shrink-0">
                          #{idx + 1}
                        </span>
                        <span className="text-amber-50 font-medium capitalize truncate">
                          {stat.gift}
                        </span>
                      </div>
                      <span className="font-mono-num tabular-nums text-xs text-amber-200/90 shrink-0">
                        {stat.count} ({stat.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-red-600 to-amber-400 transition-all"
                        style={{ width: `${Math.min(100, Math.max(6, stat.percentage))}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Export Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              disabled={filteredTrends.length === 0}
              onClick={handleExportCsv}
              className="flex-1 min-h-[48px] px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>{t.trendsExportCsvBtn}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="min-h-[48px] px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-amber-100 font-semibold text-sm transition-colors"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
