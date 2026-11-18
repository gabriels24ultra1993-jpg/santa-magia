import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Home,
  Images,
  Lock,
  PhoneCall,
  ScrollText,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ChristmasElfNoteModal } from './components/ChristmasElfNote';
import { LetterGenerator } from './components/LetterGenerator';
import { PhotoWallSection, VideoParadeOverlay } from './components/PhotoWallAndParade';
import {
  OfflineIndicator,
  PWAInstallBanner,
  PWAInstallGuideModal,
} from './components/PWAInstallBanner';
import { CallPhase, SantaCallSimulator } from './components/SantaCallSimulator';
import { MagicPassModal, PrivacyPolicyModal, ShareModal } from './components/ShareAndPassModals';
import { SleighAdGateModal, SleighArcadeGame } from './components/SleighArcadeGame';
import { SnowAndLights } from './components/SnowAndLights';
import { TrendsIntelligenceModal } from './components/TrendsIntelligenceModal';
import { WinnerHeroCover } from './components/WinnerHeroCover';
import { usePWAInstall } from './hooks/usePWAInstall';
import {
  detectBrowserLanguage,
  LANGUAGE_OPTIONS,
  TRANSLATIONS,
} from './i18n/translations';
import {
  ActiveTab,
  AnonymousTrendRecord,
  LanguageCode,
  LetterData,
  ParchmentTheme,
  WallPhoto,
} from './types';
import { audioEngine } from './utils/audioEngine';
import {
  fetchCarouselPhotos,
  reportPhotoInCloud,
  seedInitialCloudWallIfEmpty,
  sortPhotosByLikes,
  subscribePodiumTop3,
  toggleLikeInCloud,
  uploadPhotoToCloudCarousel,
} from './utils/cloudPhotoWall';
import { getParadeScheduleState } from './utils/paradeSchedule';
import { getSampleIllustrationDataUrl } from './utils/sampleIllustrations';
import {
  getUploadRateLimitState,
  isValidPhotoUrlOrData,
  recordSuccessfulUpload,
  sanitizeFinalText,
} from './utils/security';
import { loadAnonymousTrends } from './utils/trendAnalytics';

const INITIAL_SAMPLE_LIKES = [42, 35, 29, 21];

const ADSTERRA_BANNER_SRCDOC = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>html,body{margin:0;padding:0;overflow:hidden;background:transparent;}</style>
  </head>
  <body>
    <script>
      atOptions = {
        'key' : '28a701f5606fc6c4953aae6c4f8f1cb9',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    </script>
    <script src="https://bicea.org/22/28a701f5606fc6c4953aae6c4f8f1cb9"></script>
  </body>
</html>`;

const STORAGE_KEYS = {
  lang: 'santa_magia_lang_v1',
  points: 'santa_magia_points_v1',
  unlocked: 'santa_magia_unlocked_v1',
  pass: 'santa_magia_pass_v1',
  liked: 'santa_magia_liked_v1',
  reportedIds: 'santa_magia_reported_v1',
};

function generateOfficialCode(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `NP-2026-${num}`;
}

export default function App() {
  const [lang, setLang] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.lang) as LanguageCode | null;
      if (saved && TRANSLATIONS[saved]) return saved;
    } catch {
      // ignore storage errors
    }
    return detectBrowserLanguage();
  });

  const t = TRANSLATIONS[lang];

  // Kept strictly in memory (never persisted to localStorage for child/parent privacy)
  const [whatsappCode, setWhatsappCode] = useState<string>('1');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');

  const [magicPoints, setMagicPoints] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.points);
      if (raw !== null) return Math.max(0, Number(raw) || 0);
    } catch {
      // ignore
    }
    return 50;
  });

  const [unlockedThemes, setUnlockedThemes] = useState<ParchmentTheme[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.unlocked);
      if (raw) return JSON.parse(raw) as ParchmentTheme[];
    } catch {
      // ignore
    }
    return ['classic'];
  });

  const [hasMagicPass, setHasMagicPass] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.pass) === 'true';
    } catch {
      return false;
    }
  });

  const [likedPhotoIds, setLikedPhotoIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.liked);
      if (raw) return JSON.parse(raw) as string[];
    } catch {
      // ignore
    }
    return [];
  });

  const [podiumPhotos, setPodiumPhotos] = useState<WallPhoto[]>(() =>
    t.samplePhotos.slice(0, 3).map((sp, idx) => ({
      id: sp.id,
      title: sp.title,
      author: sp.author,
      imageUrl: getSampleIllustrationDataUrl(idx),
      likes: INITIAL_SAMPLE_LIKES[idx],
      createdAt: 1700000000000 - idx * 100000,
      isSample: true,
      reported: false,
    }))
  );

  const [carouselPhotos, setCarouselPhotos] = useState<WallPhoto[]>(() =>
    t.samplePhotos.map((sp, idx) => ({
      id: sp.id,
      title: sp.title,
      author: sp.author,
      imageUrl: getSampleIllustrationDataUrl(idx),
      likes: INITIAL_SAMPLE_LIKES[idx],
      createdAt: 1700000000000 - idx * 100000,
      isSample: true,
      reported: false,
    }))
  );

  const [reportedIds, setReportedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.reportedIds);
      if (raw) return JSON.parse(raw) as string[];
    } catch {
      // ignore
    }
    return [];
  });

  const [letter, setLetter] = useState<LetterData>(() => ({
    children: [
      {
        id: 'child-1',
        name: '',
        age: '',
        gift: '',
      },
    ],
    city: '',
    behavior: 'super',
    sender: 'santa',
    theme: 'classic',
    officialCode: generateOfficialCode(),
  }));

  const [activeWindow, setActiveWindow] = useState<'cover' | 'letterFlow' | 'sleighGame'>('cover');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [callLaunchMode, setCallLaunchMode] = useState<'countdown' | 'ringing'>('ringing');
  const [callPhase, setCallPhase] = useState<CallPhase | 'closed'>('closed');
  const [letterRevealed, setLetterRevealed] = useState(false);
  const [isParadeOpen, setIsParadeOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMagicPassOpen, setIsMagicPassOpen] = useState(false);
  const [isSleighAdOpen, setIsSleighAdOpen] = useState(false);
  const [pendingSleighEntry, setPendingSleighEntry] = useState(false);
  const [isElfNoteOpen, setIsElfNoteOpen] = useState(false);
  const [isTrendsOpen, setIsTrendsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [trendsNeedPin, setTrendsNeedPin] = useState(false);
  const [simulatedDec25, setSimulatedDec25] = useState(false);
  const [simulatedMidnight, setSimulatedMidnight] = useState(false);
  const [nowTick, setNowTick] = useState(() => new Date());
  const [trends, setTrends] = useState<AnonymousTrendRecord[]>(() => loadAnonymousTrends());
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);

  const {
    isInstallable,
    isInstalled,
    isIOS,
    shouldShowFloatingBanner,
    isOnline,
    install: triggerPWAInstall,
    dismissForSession: dismissPWABanner,
  } = usePWAInstall();

  const handleDownloadAppClick = async () => {
    audioEngine.playSleighBells('soft');
    if (isInstallable) {
      await triggerPWAInstall();
      return;
    }
    setIsInstallGuideOpen(true);
  };

  const titleTapRef = useRef<{ count: number; lastTap: number }>({ count: 0, lastTap: 0 });
  const keySequenceRef = useRef<string>('');
  const audioUnlockedRef = useRef(false);
  const midnightShownRef = useRef(false);

  // Live 1-second clock for Christmas Countdown & Dec 25 Midnight Elf Popup trigger
  useEffect(() => {
    const timer = window.setInterval(() => {
      setNowTick(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const paradeSchedule = useMemo(
    () => getParadeScheduleState(simulatedDec25 || simulatedMidnight, nowTick),
    [simulatedDec25, simulatedMidnight, nowTick]
  );

  // Reveal the Elf's heartfelt "Merry Christmas!" modal ONLY at 00:00:00 on Dec 25 (and during Dec 25)
  useEffect(() => {
    const isRealDec25 = nowTick.getMonth() === 11 && nowTick.getDate() === 25;
    if (isRealDec25 && !midnightShownRef.current) {
      midnightShownRef.current = true;
      setIsElfNoteOpen(true);
    }
  }, [nowTick]);

  // Cloud Sync: Real-time listener for Top 3 Podium + 60s polled 25-photo FIFO Carousel
  useEffect(() => {
    let active = true;

    const unsubscribePodium = subscribePodiumTop3((cloudPodium) => {
      if (active && cloudPodium.length > 0) {
        setPodiumPhotos(cloudPodium);
      }
    });

    const initCloud = async () => {
      try {
        const seeded = await seedInitialCloudWallIfEmpty(TRANSLATIONS.en.samplePhotos);
        if (!active) return;
        if (seeded.podium.length > 0) setPodiumPhotos(seeded.podium);
        if (seeded.carousel.length > 0) setCarouselPhotos(seeded.carousel);
      } catch {
        // Keep starter fallback gracefully if network offline
      }
    };

    void initCloud();

    // Sync carousel from cloud every 60 seconds to conserve free Firestore read quota
    const syncTimer = window.setInterval(() => {
      void fetchCarouselPhotos()
        .then((list) => {
          if (active && list.length > 0) setCarouselPhotos(list);
        })
        .catch(() => {});
    }, 60000);

    return () => {
      active = false;
      unsubscribePodium();
      clearInterval(syncTimer);
    };
  }, []);

  // Ensure legacy PII keys (if any existed previously) are wiped on mount
  useEffect(() => {
    try {
      localStorage.removeItem('santa_magia_wa_code_v1');
      localStorage.removeItem('santa_magia_wa_number_v1');
    } catch {
      // ignore
    }
  }, []);

  // Secret keyboard sequence "2512" outside form fields opens the Market Intelligence Panel
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (/^\d$/.test(e.key)) {
        keySequenceRef.current = `${keySequenceRef.current}${e.key}`.slice(-4);
        if (keySequenceRef.current === '2512') {
          keySequenceRef.current = '';
          audioEngine.playMagicChime();
          setTrendsNeedPin(false);
          setIsTrendsOpen(true);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Unlock and start gentle ambient Christmas music on first user gesture if enabled
  useEffect(() => {
    const unlockOnGesture = () => {
      audioUnlockedRef.current = true;
      if (
        isMusicEnabled &&
        !isMuted &&
        !isParadeOpen &&
        callPhase !== 'ringing' &&
        callPhase !== 'connected'
      ) {
        audioEngine.startAmbientMusic();
      }
      window.removeEventListener('pointerdown', unlockOnGesture);
    };
    window.addEventListener('pointerdown', unlockOnGesture, { passive: true });
    return () => window.removeEventListener('pointerdown', unlockOnGesture);
  }, [isMusicEnabled, isMuted, isParadeOpen, callPhase]);

  // Automatically pause background music when incoming ring or live call voice is active (or parade plays)
  useEffect(() => {
    const shouldPauseForCallOrParade =
      isParadeOpen || callPhase === 'ringing' || callPhase === 'connected';
    if (!isMusicEnabled || isMuted || shouldPauseForCallOrParade) {
      audioEngine.stopAmbientMusic();
    } else if (audioUnlockedRef.current) {
      audioEngine.startAmbientMusic();
    }
  }, [isMusicEnabled, isMuted, isParadeOpen, callPhase]);

  // Persist language & RTL direction
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.lang, lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    } catch {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.points, String(magicPoints));
    } catch {
      // ignore
    }
  }, [magicPoints]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.unlocked, JSON.stringify(unlockedThemes));
    } catch {
      // ignore
    }
  }, [unlockedThemes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.pass, String(hasMagicPass));
    } catch {
      // ignore
    }
  }, [hasMagicPass]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.liked, JSON.stringify(likedPhotoIds));
    } catch {
      // ignore
    }
  }, [likedPhotoIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.reportedIds, JSON.stringify(reportedIds));
    } catch {
      // ignore
    }
  }, [reportedIds]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((curr) => (curr === msg ? null : curr));
    }, 3400);
  };

  const awardPoints = (pts: number) => {
    setMagicPoints((prev) => prev + pts);
    audioEngine.playMagicChime();
    showToast(t.toastPointsEarned(pts));
  };

  // Visible Podium & Carousel filtered by local safety report state
  const visiblePodium = useMemo(() => {
    return sortPhotosByLikes(podiumPhotos.filter((p) => !reportedIds.includes(p.id))).slice(0, 3);
  }, [podiumPhotos, reportedIds]);

  const visibleCarousel = useMemo(() => {
    return carouselPhotos.filter((p) => !reportedIds.includes(p.id));
  }, [carouselPhotos, reportedIds]);

  const paradePhotos = useMemo(() => {
    return sortPhotosByLikes([...visiblePodium, ...visibleCarousel]);
  }, [visiblePodium, visibleCarousel]);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    audioEngine.setMuted(next);
    if (!next) {
      audioEngine.playSleighBells('soft');
    }
  };

  const handleToggleLike = async (targetPhoto: WallPhoto) => {
    // Anti-spam: strictly 1 vote per photo per device
    if (likedPhotoIds.includes(targetPhoto.id)) {
      showToast(t.wallAlreadyVotedNotice);
      return;
    }

    setLikedPhotoIds((prev) => [...prev, targetPhoto.id]);

    // Optimistic +1 UI update
    const nextLikes = Math.max(0, targetPhoto.likes + 1);
    const optimisticCarousel = carouselPhotos.map((p) =>
      p.id === targetPhoto.id ? { ...p, likes: nextLikes } : p
    );
    const optimisticPodium = podiumPhotos.map((p) =>
      p.id === targetPhoto.id ? { ...p, likes: nextLikes } : p
    );
    setCarouselPhotos(optimisticCarousel);
    setPodiumPhotos(sortPhotosByLikes([...optimisticPodium, ...optimisticCarousel]).slice(0, 3));

    setMagicPoints((prev) => prev + 10);
    showToast(t.toastPointsEarned(10));

    try {
      const synced = await toggleLikeInCloud(targetPhoto, podiumPhotos, carouselPhotos);
      setPodiumPhotos(synced.podium);
      setCarouselPhotos(synced.carousel);
    } catch {
      // Optimistic state already updated if offline
    }
  };

  const handleUploadPhoto = async (title: string, author: string, webpDataUrl: string) => {
    // Anti-spam rate limit: max 1 upload every 2 minutes
    const rate = getUploadRateLimitState();
    if (!rate.allowed) {
      showToast(t.wallUploadRateLimitError(rate.remainingSeconds));
      return;
    }

    if (!isValidPhotoUrlOrData(webpDataUrl)) {
      showToast(t.wallInvalidFileError);
      return;
    }

    const cleanTitle = sanitizeFinalText(title, 80) || sanitizeFinalText(t.heroWinnerTitle, 80);
    const cleanAuthor = sanitizeFinalText(author, 50) || sanitizeFinalText(t.heroByLabel, 50);

    const newPhoto: WallPhoto = {
      id: `user-${Date.now()}`,
      title: cleanTitle,
      author: cleanAuthor,
      imageUrl: webpDataUrl,
      likes: 1,
      createdAt: Date.now(),
      isSample: false,
      reported: false,
    };

    recordSuccessfulUpload();

    // Optimistic FIFO 25-photo cap locally while pushing to cloud
    setCarouselPhotos((prev) => [newPhoto, ...prev].slice(0, 25));
    setLikedPhotoIds((prev) => [...prev, newPhoto.id]);
    setMagicPoints((prev) => prev + 20);
    showToast(t.toastPhotoUploaded);

    try {
      const updatedCarousel = await uploadPhotoToCloudCarousel(newPhoto, podiumPhotos);
      setCarouselPhotos(updatedCarousel);
    } catch {
      // Keep local preview if offline
    }
  };

  const handleReportPhoto = async (id: string) => {
    setReportedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    showToast(t.toastReported);
    try {
      const synced = await reportPhotoInCloud(id, podiumPhotos, carouselPhotos);
      setPodiumPhotos(synced.podium);
      setCarouselPhotos(synced.carousel);
    } catch {
      // Local reportedIds hides it immediately
    }
  };

  const handleUnlockTheme = (theme: ParchmentTheme, cost: number) => {
    setMagicPoints((prev) => Math.max(0, prev - cost));
    setUnlockedThemes((prev) => (prev.includes(theme) ? prev : [...prev, theme]));
    audioEngine.playMagicChime();
  };

  const handleActivateMagicPass = () => {
    setHasMagicPass(true);
    setUnlockedThemes(['classic', 'royal', 'aurora', 'certificate']);
    setMagicPoints((prev) => prev + 500);
    setIsMagicPassOpen(false);
    showToast(t.magicPassUnlocked);
    if (pendingSleighEntry) {
      setPendingSleighEntry(false);
      setActiveWindow('sleighGame');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenSleighGame = () => {
    if (hasMagicPass) {
      setActiveWindow('sleighGame');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsSleighAdOpen(true);
    }
  };

  const handleUniversalShare = async () => {
    const shareText = t.shareTextTemplate(letter.children);
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: t.appName,
          text: shareText,
          url: window.location.href,
        });
        awardPoints(50);
        return;
      } catch (err) {
        // If user cancelled native share, don't force fallback; if unsupported in iframe, fall through
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }
    setIsShareOpen(true);
  };

  const navigateToSection = (tab: ActiveTab) => {
    audioEngine.playSleighBells('soft');
    setActiveTab(tab);
    const targetWindow: 'cover' | 'letterFlow' =
      tab === 'letter' || tab === 'call' ? 'letterFlow' : 'cover';
    setActiveWindow(targetWindow);

    const idMap: Record<ActiveTab, string> = {
      home: 'section-home',
      letter: 'section-letter',
      call: 'section-call',
      wall: 'section-wall',
    };

    window.requestAnimationFrame(() => {
      if (tab === 'home' || tab === 'letter') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(idMap[tab]);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleBrandTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const now = Date.now();
    if (now - titleTapRef.current.lastTap > 3000) {
      titleTapRef.current = { count: 1, lastTap: now };
    } else {
      titleTapRef.current = {
        count: titleTapRef.current.count + 1,
        lastTap: now,
      };
    }

    if (titleTapRef.current.count >= 5) {
      titleTapRef.current = { count: 0, lastTap: 0 };
      audioEngine.playMagicChime();
      setTrendsNeedPin(false);
      setIsTrendsOpen(true);
      return;
    }

    navigateToSection('home');
  };

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="relative min-h-[100dvh] bg-[#0b0910] text-amber-50 flex flex-col"
    >
      {activeWindow !== 'sleighGame' && <SnowAndLights />}

      {/* Compact Sticky Top Bar (hidden during fullscreen minigame) */}
      {activeWindow !== 'sleighGame' && (
      <header className="sticky top-0 z-30 bg-[#0e0b14]/90 backdrop-blur-md border-b border-amber-200/15">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6">
          <div className="h-12 sm:h-14 flex items-center justify-between gap-2 sm:gap-4">
            {/* Zone 1: Brand Wordmark (5 taps opens Secret Market Intelligence Panel) */}
            <a
              href="#section-home"
              onClick={handleBrandTitleClick}
              className="font-display text-base sm:text-xl font-bold tracking-tight text-amber-300 whitespace-nowrap shrink-0 select-none"
            >
              {t.appName}
            </a>

            {/* Zone 2: Desktop Single-Line Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-amber-100/80">
              {(
                [
                  { id: 'home', label: t.navHome },
                  { id: 'letter', label: t.navLetter },
                  { id: 'call', label: t.navCall },
                  { id: 'wall', label: t.navWall },
                ] as Array<{ id: ActiveTab; label: string }>
              ).map((item) => (
                <a
                  key={item.id}
                  href={`#section-${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection(item.id);
                  }}
                  className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-300 ${
                    activeTab === item.id
                      ? 'text-amber-300 underline underline-offset-4'
                      : ''
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Magic Points, Language, Music, Sound & Discrete Golden VIP Zone Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div
                className="flex items-center gap-1 text-[11px] sm:text-sm font-semibold text-amber-300 whitespace-nowrap"
                aria-label={t.magicPointsLabel}
              >
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400 shrink-0" />
                <span className="hidden xl:inline">{t.magicPointsLabel}:</span>
                <span className="font-mono-num tabular-nums">{magicPoints}</span>
              </div>

              <label className="sr-only" htmlFor="lang-select">
                Language
              </label>
              <select
                id="lang-select"
                value={lang}
                onChange={(e) => {
                  audioEngine.playSleighBells('soft');
                  setLang(e.target.value as LanguageCode);
                }}
                className="min-h-[34px] sm:min-h-[36px] px-1.5 sm:px-2 py-1 rounded-lg bg-[#191324] border border-amber-200/20 text-[11px] sm:text-xs font-bold text-amber-100 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  audioUnlockedRef.current = true;
                  if (isMusicEnabled) {
                    setIsMusicEnabled(false);
                    audioEngine.stopAmbientMusic();
                  } else {
                    if (isMuted) {
                      setIsMuted(false);
                      audioEngine.setMuted(false);
                    }
                    setIsMusicEnabled(true);
                    audioEngine.playSleighBells('soft');
                    if (callPhase !== 'ringing' && callPhase !== 'connected' && !isParadeOpen) {
                      audioEngine.startAmbientMusic();
                    }
                  }
                }}
                aria-pressed={isMusicEnabled && !isMuted}
                className={`min-h-[34px] sm:min-h-[36px] px-2 sm:px-2.5 py-1 rounded-lg border text-[10px] sm:text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
                  isMusicEnabled && !isMuted
                    ? 'bg-emerald-700/45 border-emerald-400/50 text-emerald-100 hover:bg-emerald-700/65'
                    : 'bg-[#191324] border-amber-200/20 text-amber-100/70 hover:text-white'
                }`}
              >
                {isMusicEnabled && !isMuted ? t.musicOnBtn : t.musicOffBtn}
              </button>

              <button
                type="button"
                onClick={handleToggleMute}
                aria-label={isMuted ? t.soundOff : t.soundOn}
                title={isMuted ? t.soundOff : t.soundOn}
                className="min-w-[34px] min-h-[34px] sm:min-w-[36px] sm:min-h-[36px] rounded-lg bg-[#191324] border border-amber-200/20 flex items-center justify-center text-amber-200 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  audioEngine.playSleighBells('soft');
                  setIsMagicPassOpen(true);
                }}
                className="hidden sm:inline-flex min-h-[36px] px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-105 text-stone-950 text-xs font-extrabold items-center justify-center whitespace-nowrap shrink-0 shadow-md shadow-amber-500/20 border border-amber-200/60 transition-all"
              >
                <span>{hasMagicPass ? t.magicPassActiveBadge : t.vipZoneTopBtn}</span>
              </button>
            </div>
          </div>

          {/* Mobile compact rounded-square VIP button inside top bar */}
          <div className="sm:hidden pb-2 flex justify-end">
            <button
              type="button"
              onClick={() => {
                audioEngine.playSleighBells('soft');
                setIsMagicPassOpen(true);
              }}
              className="w-full min-h-[34px] px-3 py-1 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-105 text-stone-950 text-[11px] font-extrabold flex items-center justify-center whitespace-nowrap shadow-md shadow-amber-500/20 border border-amber-200/60 transition-all"
            >
              <span>{hasMagicPass ? t.magicPassActiveBadge : t.vipZoneTopBtn}</span>
            </button>
          </div>
        </div>
      </header>
      )}

      {/* Top Adsterra 320x50 Slot (Hidden in Fullscreen Game & VIP Zone) */}
      {activeWindow !== 'sleighGame' && !hasMagicPass && (
        <div className="relative z-10 w-full flex justify-center px-2 pt-3">
          <div
            id="ad-banner-top"
            data-ad-slot="banner-top"
            data-ad-network="adsterra"
            className="w-[320px] h-[50px] mx-auto flex items-center justify-center overflow-hidden rounded-lg"
          >
            <iframe
              title="Adsterra Top Banner"
              srcDoc={ADSTERRA_BANNER_SRCDOC}
              width={320}
              height={50}
              scrolling="no"
              className="w-[320px] h-[50px] border-0 overflow-hidden block"
            />
          </div>
        </div>
      )}

      {/* Main Scrollable Content: Clean 2-Window Architecture + Fullscreen Arcade */}
      {activeWindow === 'sleighGame' ? (
        <SleighArcadeGame
          t={t}
          onBackToCover={() => navigateToSection('home')}
          onBeatRecord={() => {
            awardPoints(20);
          }}
        />
      ) : (
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5 sm:pt-8 pb-24 md:pb-14">
        {activeWindow === 'cover' ? (
          /* WINDOW 1: Main Cover (Live Christmas Clock + Primary Write Letter CTA + Top 3 Podium + 25-Photo Carousel) */
          <div className="space-y-12 sm:space-y-16">
            <div id="section-home" className="scroll-mt-20">
              <WinnerHeroCover
                t={t}
                podiumPhotos={visiblePodium}
                likedPhotoIds={likedPhotoIds}
                paradeSchedule={paradeSchedule}
                onToggleLike={handleToggleLike}
                onGoToLetter={() => navigateToSection('letter')}
                onOpenParade={() => setIsParadeOpen(true)}
                onPlaySleigh={handleOpenSleighGame}
              />
            </div>

            <div id="section-wall" className="scroll-mt-20">
              <PhotoWallSection
                t={t}
                podiumPhotos={visiblePodium}
                carouselPhotos={visibleCarousel}
                likedPhotoIds={likedPhotoIds}
                paradeSchedule={paradeSchedule}
                onToggleLike={handleToggleLike}
                onUploadPhoto={handleUploadPhoto}
                onReportPhoto={handleReportPhoto}
                onOpenParade={() => setIsParadeOpen(true)}
                onNotify={showToast}
              />
            </div>
          </div>
        ) : (
          /* WINDOW 2: Dedicated Write Letter, 30s Countdown, Santa Call & Signed HD Parchment Flow */
          <div className="space-y-10 sm:space-y-14">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigateToSection('home')}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#191324] hover:bg-[#261d36] border border-amber-300/35 text-amber-200 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors shadow"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>{t.backToCoverBtn}</span>
              </button>
            </div>

            <div id="section-letter" className="scroll-mt-20">
              <LetterGenerator
                t={t}
                lang={lang}
                letter={letter}
                onChangeLetter={setLetter}
                whatsappCode={whatsappCode}
                whatsappNumber={whatsappNumber}
                onChangeWhatsappCode={setWhatsappCode}
                onChangeWhatsappNumber={setWhatsappNumber}
                letterRevealed={letterRevealed}
                onAfterSendStartCall={() => {
                  setLetterRevealed(false);
                  setCallLaunchMode('countdown');
                  setIsCallOpen(true);
                }}
                onRecordTrends={() => setTrends(loadAnonymousTrends())}
                magicPoints={magicPoints}
                unlockedThemes={unlockedThemes}
                hasMagicPass={hasMagicPass}
                onUnlockTheme={handleUnlockTheme}
                onShare={handleUniversalShare}
                onTriggerCall={() => {
                  setCallLaunchMode('ringing');
                  setIsCallOpen(true);
                }}
                onNotify={showToast}
              />
            </div>

            <div id="section-call" className="scroll-mt-20">
              <SantaCallSimulator
                t={t}
                letter={letter}
                onChangeLetter={setLetter}
                isOpen={isCallOpen}
                initialMode={callLaunchMode}
                onPhaseChange={setCallPhase}
                onOpenCall={() => {
                  setCallLaunchMode('ringing');
                  setIsCallOpen(true);
                }}
                onCloseCall={() => {
                  setIsCallOpen(false);
                  setLetterRevealed(true);
                  audioEngine.playMagicChime();
                }}
              />
            </div>
          </div>
        )}
      </main>
      )}

      {/* Bottom Adsterra 320x50 Slot (Hidden in Fullscreen Game & VIP Zone) */}
      {activeWindow !== 'sleighGame' && !hasMagicPass && (
        <div className="relative z-10 w-full flex justify-center px-2 pb-4">
          <div
            id="ad-banner-bottom"
            data-ad-slot="banner-bottom"
            data-ad-network="adsterra"
            className="w-[320px] h-[50px] mx-auto flex items-center justify-center overflow-hidden rounded-lg"
          >
            <iframe
              title="Adsterra Bottom Banner"
              srcDoc={ADSTERRA_BANNER_SRCDOC}
              width={320}
              height={50}
              scrolling="no"
              className="w-[320px] h-[50px] border-0 overflow-hidden block"
            />
          </div>
        </div>
      )}

      {/* Quiet Footer + Legal Child Privacy Notice & Privacy Policy Modal Link */}
      {activeWindow !== 'sleighGame' && (
      <footer className="relative z-10 border-t border-amber-200/10 py-6 pb-20 md:pb-8 text-center text-xs text-amber-100/55">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              {t.appName} · {t.appTagline}
            </span>
            {hasMagicPass && (
              <span className="text-amber-300 font-semibold">{t.magicPassActiveBadge}</span>
            )}
          </div>

          <div className="pt-2 border-t border-amber-200/10 flex flex-wrap items-center justify-center gap-3 text-[11px] text-amber-100/60">
            <span>{t.privacyNoticeText}</span>
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-4 transition-colors"
            >
              {t.privacyPolicyLinkLabel}
            </button>
            {!isInstalled && (
              <button
                type="button"
                onClick={() => {
                  void handleDownloadAppClick();
                }}
                className="px-2.5 py-1 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/35 text-amber-200 font-semibold transition-colors"
              >
                {t.pwaFooterInstallBtn}
              </button>
            )}
            <button
              type="button"
              aria-label="Analytics Access"
              onClick={() => {
                setTrendsNeedPin(true);
                setIsTrendsOpen(true);
              }}
              className="p-1 rounded text-amber-100/30 hover:text-amber-300 transition-colors"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>
      )}

      {/* Mobile Fixed Thumb-Zone Bottom Tab Bar (56px height, hidden in fullscreen game) */}
      {activeWindow !== 'sleighGame' && (
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-14 pb-safe bg-[#0e0b14]/95 backdrop-blur-md border-t border-amber-200/15 grid grid-cols-4 items-center"
      >
        {(
          [
            { id: 'home', label: t.navHome, icon: Home },
            { id: 'letter', label: t.navLetter, icon: ScrollText },
            { id: 'call', label: t.navCall, icon: PhoneCall },
            { id: 'wall', label: t.navWall, icon: Images },
          ] as Array<{ id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }>
        ).map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => navigateToSection(tab.id)}
              className={`h-full flex flex-col items-center justify-center gap-0.5 transition-colors ${
                active ? 'text-amber-300' : 'text-amber-100/60 hover:text-amber-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold tracking-tight whitespace-nowrap truncate max-w-[78px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
      )}

      {/* Fullscreen Video Parade Overlay (Dec 25-26 Exclusive Premiere) */}
      <VideoParadeOverlay
        t={t}
        photos={paradePhotos}
        isOpen={isParadeOpen}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onClose={() => setIsParadeOpen(false)}
      />

      {/* Universal Share Fallback Modal */}
      <ShareModal
        t={t}
        isOpen={isShareOpen}
        shareText={t.shareTextTemplate(letter.children)}
        onClose={() => setIsShareOpen(false)}
        onCompleteShare={() => {
          awardPoints(50);
        }}
      />

      {/* Magic Pass $2.99 USD Demo Modal */}
      <MagicPassModal
        t={t}
        isOpen={isMagicPassOpen}
        hasMagicPass={hasMagicPass}
        onClose={() => {
          setIsMagicPassOpen(false);
          setPendingSleighEntry(false);
        }}
        onActivatePass={handleActivateMagicPass}
      />

      {/* Rewarded Ad-Gate Modal for Free Users entering Sleigh Arcade */}
      <SleighAdGateModal
        t={t}
        isOpen={isSleighAdOpen}
        onClose={() => setIsSleighAdOpen(false)}
        onAdCompleted={() => {
          setIsSleighAdOpen(false);
          setActiveWindow('sleighGame');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVipZone={() => {
          setPendingSleighEntry(true);
          setIsMagicPassOpen(true);
        }}
      />

      {/* Heartfelt Merry Christmas Elf Letter Modal (Hidden until 00:00:00 Dec 25 or Midnight simulation) */}
      <ChristmasElfNoteModal
        t={t}
        isOpen={isElfNoteOpen}
        onClose={() => {
          setIsElfNoteOpen(false);
          if (simulatedMidnight) setSimulatedMidnight(false);
        }}
      />

      {/* Secret Market Intelligence Modal (5 taps on title or code 2512) */}
      <TrendsIntelligenceModal
        t={t}
        isOpen={isTrendsOpen}
        showPinPrompt={trendsNeedPin}
        trends={trends}
        simulatedDec25={simulatedDec25}
        onToggleSimulatedDec25={() => setSimulatedDec25((prev) => !prev)}
        simulatedMidnight={simulatedMidnight}
        onSimulateMidnight={() => {
          setSimulatedMidnight(true);
          setIsTrendsOpen(false);
          setIsElfNoteOpen(true);
        }}
        onUnlockWithPin={() => setTrendsNeedPin(false)}
        onClose={() => setIsTrendsOpen(false)}
      />

      {/* Legal Privacy Policy & Terms Modal */}
      <PrivacyPolicyModal
        t={t}
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* PWA Offline Indicator, Bottom Mobile Floating Prompt & 2-Step Install Guide */}
      <OfflineIndicator t={t} isOnline={isOnline} />
      <PWAInstallBanner
        t={t}
        visible={
          shouldShowFloatingBanner &&
          activeWindow !== 'sleighGame' &&
          !isCallOpen &&
          !isParadeOpen
        }
        onDownloadClick={() => {
          void handleDownloadAppClick();
        }}
        onContinueWeb={dismissPWABanner}
      />
      <PWAInstallGuideModal
        t={t}
        isOpen={isInstallGuideOpen}
        isIOS={isIOS}
        onClose={() => setIsInstallGuideOpen(false)}
      />

      {/* Non-intrusive Toast Notification */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-2xl max-w-[90vw] text-center"
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
