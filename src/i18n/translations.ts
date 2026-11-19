import { BehaviorType, ChildEntry, LanguageCode, ParchmentTheme, SenderType } from '../types';

export function formatChildNames(
  names: string[],
  conjunction: string,
  fallbackName: string,
  separator = ', '
): string {
  const cleaned = names.map((n) => n.trim()).filter(Boolean);
  if (cleaned.length === 0) return fallbackName;
  if (cleaned.length === 1) return cleaned[0];
  if (cleaned.length === 2) return `${cleaned[0]} ${conjunction} ${cleaned[1]}`;
  return `${cleaned.slice(0, -1).join(separator)} ${conjunction} ${cleaned[cleaned.length - 1]}`;
}

export interface TranslationPack {
  appName: string;
  appTagline: string;
  magicPointsLabel: string;
  soundOn: string;
  soundOff: string;
  musicOnBtn: string;
  musicOffBtn: string;
  navHome: string;
  navLetter: string;
  navCall: string;
  navWall: string;
  heroOfficialBadge: string;
  heroWinnerTitle: string;
  heroLikesLabel: string;
  heroByLabel: string;
  heroCallCta: string;
  heroLetterCta: string;
  heroParadeCta: string;
  heroQuickIntro: string;
  vipZoneTopBtn: string;
  vipExclusiveBadge: string;
  redeemPointsBadge: string;
  magicPassBtn: string;
  magicPassTitle: string;
  magicPassSubtitle: string;
  magicPassPerk1: string;
  magicPassPerk2: string;
  magicPassPerk3: string;
  magicPassPriceLabel: string;
  magicPassDemoNote: string;
  magicPassConfirm: string;
  magicPassUnlocked: string;
  magicPassActiveBadge: string;
  vipKofiNote: string;
  vipCodeLabel: string;
  vipCodePlaceholder: string;
  vipCodeSubmitBtn: string;
  vipCodeError: string;
  vipWelcomeMessage: string;
  adBannerLabel: string;
  adBannerText: string;
  adBannerRemove: string;
  privacyNoticeText: string;
  preSendPrivacyBanner: string;
  // Letter section
  letterSectionTitle: string;
  letterSectionSubtitle: string;
  childNumberLabel: (idx: number) => string;
  addSiblingBtn: string;
  removeSiblingAria: string;
  allSiblingsTab: string;
  fieldChildName: string;
  fieldChildNamePlaceholder: string;
  fieldAge: string;
  fieldAgePlaceholder: string;
  fieldCity: string;
  fieldCityPlaceholder: string;
  fieldBehavior: string;
  behaviorSuper: string;
  behaviorVery: string;
  behaviorTrying: string;
  fieldGift: string;
  fieldGiftPlaceholder: string;
  fieldSender: string;
  senderSanta: string;
  senderKings: string;
  fieldWhatsappLabel: string;
  fieldWhatsappOtherOption: string;
  fieldWhatsappCustomPrefixPlaceholder: string;
  fieldWhatsappPlaceholder: string;
  fieldWhatsappHint: string;
  sendToNorthPoleBtn: string;
  sendingTitle: string;
  sendingSubtitle: string;
  sealedWaitingTitle: string;
  sealedWaitingSubtitle: string;
  responseReadyBanner: string;
  openWhatsappFallback: string;
  fieldTheme: string;
  themeClassic: string;
  themeRoyal: string;
  themeAurora: string;
  themeCertificate: string;
  freeLabel: string;
  unlockWithPoints: string;
  unlockedLabel: string;
  notEnoughPoints: string;
  downloadHdBtn: string;
  sharePointsBtn: string;
  callWithChildBtn: string;
  // Parchment copy
  northPoleDispatch: string;
  magiRoyalDispatch: string;
  officialCodeLabel: string;
  buildSalutation: (children: ChildEntry[]) => string;
  letterSignatureSanta: string;
  letterSignatureKings: string;
  letterSealText: string;
  certificateTitle: string;
  certificateSubtitle: string;
  certificateAwardedTo: string;
  certificateSealLabel: string;
  // Call simulator
  callSectionTitle: string;
  callSectionSubtitle: string;
  callTriggerBtn: string;
  callIncomingStatus: string;
  callConnectedStatus: string;
  callVoicePlayingNote: string;
  callCallerSanta: string;
  callCallerLocation: string;
  callAnswerBtn: string;
  callDeclineBtn: string;
  callHangupBtn: string;
  callReplayVoiceBtn: string;
  callRecordHint: string;
  callVoiceLang: string;
  callCountdownTitle: (sec: number) => string;
  callCountdownSubtitle: string;
  callNowBtn: string;
  callMissedTitle: string;
  callMissedSubtitle: string;
  callRetryCountdownBtn: string;
  // Photo wall & Parade
  wallSectionTitle: string;
  wallSectionSubtitle: string;
  wallUploadTitle: string;
  wallPhotoTitleLabel: string;
  wallPhotoTitlePlaceholder: string;
  wallAuthorLabel: string;
  wallAuthorPlaceholder: string;
  wallChooseFile: string;
  wallSubmitPhoto: string;
  wallSortTop: string;
  wallSortRecent: string;
  wallLikeBtn: string;
  wallLikedBtn: string;
  wallReportBtn: string;
  wallReportDone: string;
  wallParadeBtn: string;
  wallEmpty: string;
  podiumTitle: string;
  podiumFirstBadge: string;
  podiumSecondBadge: string;
  podiumThirdBadge: string;
  carouselLiveBadge: string;
  carouselTitle: string;
  carouselWebpHint: string;
  wallNsfwChecking: string;
  wallNsfwRejected: string;
  paradeCountdownBanner: string;
  paradeCountdownTime: (days: number, hrs: number, mins: number) => string;
  paradeLivePremiereBtn: string;
  paradeEndedBanner: string;
  paradeRankPrefix: string;
  paradeCloseBtn: string;
  paradePlayingMusic: string;
  // Share modal & toasts
  shareModalTitle: string;
  shareModalSubtitle: string;
  shareCopyLink: string;
  shareCopied: string;
  shareTextTemplate: (children: ChildEntry[]) => string;
  buildParentWhatsappMessage: (params: {
    children: ChildEntry[];
    city: string;
    behavior: BehaviorType;
    sender: SenderType;
    officialCode: string;
  }) => string;
  toastPointsEarned: (pts: number) => string;
  toastPhotoUploaded: string;
  toastHdDownloaded: string;
  toastReported: string;
  closeBtn: string;
  elfNoteTitle: string;
  elfNoteBody: string;
  elfNotePs: string;
  elfNoteSignature: string;
  // Market intelligence panel
  trendsModalTitle: string;
  trendsModalSubtitle: string;
  trendsTopGiftsTitle: string;
  trendsFilterCountry: string;
  trendsFilterLanguage: string;
  trendsFilterAgeRange: string;
  trendsAllOption: string;
  trendsExportCsvBtn: string;
  trendsTotalCountLabel: string;
  trendsUniqueGiftsLabel: string;
  trendsNoData: string;
  trendsPinTitle: string;
  trendsPinPlaceholder: string;
  trendsPinUnlockBtn: string;
  trendsPinError: string;
  trendsSimulateDec25Btn: string;
  trendsSimulateDec25Active: string;
  trendsSimulateMidnightBtn: string;
  trendsSimulateMidnightActive: string;
  christmasClockTitle: string;
  christmasClockLiveTitle: string;
  clockDays: string;
  clockHours: string;
  clockMinutes: string;
  clockSeconds: string;
  writeSantaLetterHeroBtn: string;
  backToCoverBtn: string;
  playSleighHeroBtn: string;
  playSleighAccessBadge: string;
  adGateTitle: string;
  adGatePrompt: string;
  adGateWatchBtn: string;
  adGateVipBtn: string;
  adGateCountdown: (sec: number) => string;
  adGateSimulatedSlot: string;
  adGateSkipTestBtn: string;
  sleighGameTitle: string;
  sleighGameHint: string;
  gameScoreLabel: string;
  gameBestLabel: string;
  gameLevelLabel: string;
  gameLivesLabel: string;
  gamePauseBtn: string;
  gameResumeBtn: string;
  gameExitShortBtn: string;
  gamePauseExitBtn: string;
  gameOverTitle: string;
  gameNewRecordBadge: string;
  gamePlayAgainBtn: string;
  // Security, Rate Limiting, Ad Containers & Legal Privacy Policy
  wallInvalidFileError: string;
  wallUploadRateLimitError: (sec: number) => string;
  wallAlreadyVotedNotice: string;
  adSlotPlaceholder: string;
  privacyPolicyLinkLabel: string;
  privacyPolicyModalTitle: string;
  privacyPolicySections: Array<{ title: string; body: string }>;
  // PWA Install Prompt & Offline Indicator
  pwaPromptTitle: string;
  pwaDownloadBtn: string;
  pwaContinueWebBtn: string;
  pwaFooterInstallBtn: string;
  pwaIosGuideTitle: string;
  pwaIosStep1Title: string;
  pwaIosStep1Desc: string;
  pwaIosStep2Title: string;
  pwaIosStep2Desc: string;
  pwaBrowserGuideTitle: string;
  pwaBrowserStep1Title: string;
  pwaBrowserStep1Desc: string;
  pwaBrowserStep2Title: string;
  pwaBrowserStep2Desc: string;
  pwaOfflineBadge: string;
  // Letter body & call builders
  buildLetterParagraphs: (params: {
    children: ChildEntry[];
    sender: SenderType;
  }) => string[];
  buildCertificateBody: (params: {
    children: ChildEntry[];
    city: string;
    behavior: BehaviorType;
  }) => string;
  buildSantaCallScript: (params: {
    children: ChildEntry[];
  }) => string;
  formatDisplayNames: (children: ChildEntry[]) => string;
  samplePhotos: Array<{ id: string; title: string; author: string }>;
}

export const LANGUAGE_OPTIONS: Array<{ code: LanguageCode; label: string }> = [
  { code: 'en', label: '🇺🇸 EN' },
  { code: 'es', label: '🇪🇸 ES' },
  { code: 'pt', label: '🇧🇷 PT' },
  { code: 'fr', label: '🇫🇷 FR' },
  { code: 'de', label: '🇩🇪 DE' },
  { code: 'it', label: '🇮🇹 IT' },
  { code: 'ru', label: '🇷🇺 RU' },
  { code: 'ja', label: '🇯🇵 JA' },
  { code: 'ko', label: '🇰🇷 KO' },
  { code: 'ar', label: '🇸🇦 AR' },
];

export function detectBrowserLanguage(): LanguageCode {
  if (typeof navigator === 'undefined') return 'en';
  const raw = (navigator.language || 'en').slice(0, 2).toLowerCase();
  const supported: LanguageCode[] = ['en', 'es', 'pt', 'fr', 'de', 'it', 'ru', 'ja', 'ko', 'ar'];
  if ((supported as string[]).includes(raw)) {
    return raw as LanguageCode;
  }
  return 'en';
}

export const THEME_COSTS: Record<ParchmentTheme, number> = {
  classic: 0,
  royal: 100,
  certificate: 120,
  aurora: 150,
};

export const TRANSLATIONS: Record<LanguageCode, TranslationPack> = {
  en: {
    appName: 'SANTA MAGIA',
    appTagline: 'Santa Letter & Magic Call',
    magicPointsLabel: 'Magic Points',
    soundOn: 'Sound on',
    soundOff: 'Muted',
    musicOnBtn: '🎵 Music: ON',
    musicOffBtn: '🎵 Music: OFF',
    navHome: 'Cover',
    navLetter: 'HD Letter',
    navCall: 'Santa Call',
    navWall: 'Photo Wall',
    heroOfficialBadge: '👑 Official Christmas Cover (Most Voted)',
    heroWinnerTitle: 'North Pole Magic at Home',
    heroLikesLabel: 'Likes',
    heroByLabel: 'Family',
    heroCallCta: '📞 Santa is Calling!',
    heroLetterCta: '✉️ Send Letter to North Pole',
    heroParadeCta: '🎬 Watch Video Parade (Top Photos)',
    heroQuickIntro: 'Write letters for one or multiple siblings together, send them straight to the North Pole, answer Santa’s magic call, and unlock your sealed official letter.',
    vipZoneTopBtn: '👑 Ad-Free VIP Zone',
    vipExclusiveBadge: '👑 VIP',
    redeemPointsBadge: '⭐ Redeem with Magic Points',
    magicPassBtn: '👑 Ad-Free VIP Zone',
    magicPassTitle: '👑 Ad-Free VIP Zone',
    magicPassSubtitle: 'Unlock the complete VIP collection for your family',
    magicPassPerk1: '🚫 Zero Ads',
    magicPassPerk2: '📜 All Parchments & Certificates Unlocked',
    magicPassPerk3: '⚡ Instant Access',
    magicPassPriceLabel: '$2.99 USD',
    magicPassDemoNote: 'Demo Mode Active: Tap below to preview full VIP unlock immediately with zero real charge.',
    magicPassConfirm: 'Activate VIP Zone ($2.99 USD)',
    magicPassUnlocked: 'VIP Zone activated! Everything is unlocked.',
    magicPassActiveBadge: '👑 VIP Zone Active',
    vipKofiNote: 'Get your VIP Pass securely via Ko-fi and receive your instant unlock code.',
    vipCodeLabel: 'Already have your VIP activation code?',
    vipCodePlaceholder: 'Enter VIP code',
    vipCodeSubmitBtn: '🔓 Unlock',
    vipCodeError: 'Invalid VIP code. Please check and try again.',
    vipWelcomeMessage: '👑 Welcome to the Ad-Free VIP Zone! All ads are gone and everything is unlocked forever.',
    adBannerLabel: 'Family Space',
    adBannerText: 'Enjoy a magical holiday experience for the whole family.',
    adBannerRemove: '👑 Ad-Free VIP Zone',
    privacyNoticeText: '🔒 Child Privacy Protected: We never store names or phone numbers; only anonymous holiday trend statistics.',
    preSendPrivacyBanner: '🔒 Privacy Guaranteed: Your information and messages are only shared with the people you choose. This app does not store any personal data.',
    letterSectionTitle: 'Magic Letter to the North Pole',
    letterSectionSubtitle: 'Add up to 5 children in the same home. Send your letter to receive a live call from Santa Claus and reveal his signed parchment afterward.',
    childNumberLabel: (idx) => `Child #${idx}`,
    addSiblingBtn: '➕ Add another child',
    removeSiblingAria: 'Remove child',
    allSiblingsTab: 'All together',
    fieldChildName: 'Name',
    fieldChildNamePlaceholder: 'e.g. Emma, Oliver...',
    fieldAge: 'Age',
    fieldAgePlaceholder: 'e.g. 6',
    fieldCity: 'City / Country',
    fieldCityPlaceholder: 'e.g. New York, USA',
    fieldBehavior: 'Behavior this year',
    behaviorSuper: 'Super Good / Excellent',
    behaviorVery: 'Very Good',
    behaviorTrying: 'Trying really hard',
    fieldGift: 'Desired Gift',
    fieldGiftPlaceholder: 'e.g. Red bicycle, Space Lego...',
    fieldSender: 'Official Sender',
    senderSanta: '🎅 Santa Claus',
    senderKings: '👑 The Three Wise Men',
    fieldWhatsappLabel: '📱 Home contact phone (WhatsApp)',
    fieldWhatsappOtherOption: 'Other (+...)',
    fieldWhatsappCustomPrefixPlaceholder: '+...',
    fieldWhatsappPlaceholder: 'e.g. 5551234567',
    fieldWhatsappHint: 'So the North Pole elves can send the official arrival confirmation stamp.',
    sendToNorthPoleBtn: '✉️ Send Letter to the North Pole',
    sendingTitle: 'Flying toward the North Pole...',
    sendingSubtitle: 'The elves just received your magical envelope and are connecting Santa’s call.',
    sealedWaitingTitle: 'Sealed parchment waiting at the workshop',
    sealedWaitingSubtitle: 'Tap "Send Letter to the North Pole" first to answer Santa’s call and unlock his signed keepsake letter right here.',
    responseReadyBanner: '✨ Official signed letter from Santa unlocked!',
    openWhatsappFallback: '📲 Arrival confirmation stamp on WhatsApp',
    fieldTheme: 'Parchment / Certificate Style',
    themeClassic: 'Classic North Pole Parchment',
    themeRoyal: 'Royal Gold Velvet VIP',
    themeAurora: 'Polar Midnight VIP',
    themeCertificate: 'Official Nice List Certificate',
    freeLabel: 'Free',
    unlockWithPoints: 'Unlock',
    unlockedLabel: 'Unlocked',
    notEnoughPoints: 'Share with friends (+50 pts) or upload a photo to earn more Magic Points.',
    downloadHdBtn: '📥 Download HD Letter (Image)',
    sharePointsBtn: '📲 Share on Social (+50 Points)',
    callWithChildBtn: '📞 Santa is Calling!',
    northPoleDispatch: 'OFFICIAL NORTH POLE DISPATCH',
    magiRoyalDispatch: 'ROYAL ORIENT EXPRESS · THREE WISE MEN',
    officialCodeLabel: 'OFFICIAL CODE',
    letterSignatureSanta: 'With warmest holiday magic, Santa Claus',
    letterSignatureKings: 'Melchior, Caspar & Balthazar',
    letterSealText: 'NORTH POLE · OFFICIAL',
    certificateTitle: 'OFFICIAL NICE LIST CERTIFICATE',
    certificateSubtitle: 'Christmas Honor Registry 2026',
    certificateAwardedTo: 'Proudly Awarded To',
    certificateSealLabel: 'CERTIFIED BY THE GOLDEN LEDGER',
    callSectionTitle: 'Direct Call from the North Pole',
    callSectionSubtitle: 'Turn up the volume and ready your camera to capture priceless reactions when Santa speaks aloud.',
    callTriggerBtn: '📞 Santa is Calling!',
    callIncomingStatus: 'Magical incoming call...',
    callConnectedStatus: 'Live from the North Pole Workshop',
    callVoicePlayingNote: 'Listening to Santa Claus live...',
    callCallerSanta: 'Santa Claus',
    callCallerLocation: 'North Pole · Private Line',
    callAnswerBtn: 'Answer',
    callDeclineBtn: 'Decline',
    callHangupBtn: 'End Call',
    callReplayVoiceBtn: 'Listen again',
    callRecordHint: 'Tip: Hand the phone to the kids or start a second camera before tapping Answer.',
    callVoiceLang: 'en-US',
    callCountdownTitle: (sec) => `🎅 Santa Claus is reading your letter... calling in ${sec}s`,
    callCountdownSubtitle: 'Get ready and turn up your phone volume so everyone can hear him!',
    callNowBtn: '⚡ Call now',
    callMissedTitle: '📵 Oops! You didn’t answer in time',
    callMissedSubtitle: 'Santa’s workshop line stayed busy for 15 seconds. Try waiting one more moment!',
    callRetryCountdownBtn: '🔄 Wait for another call from Santa',
    wallSectionTitle: '📸 Christmas Photo Wall & Cover Contest',
    wallSectionSubtitle: 'Share a festive family snapshot and vote with Likes. The #1 top-voted photo becomes our Main Cover.',
    wallUploadTitle: 'Enter the Christmas Cover Contest',
    wallPhotoTitleLabel: 'Short photo title',
    wallPhotoTitlePlaceholder: 'e.g. Our glowing Christmas tree',
    wallAuthorLabel: 'Family / City',
    wallAuthorPlaceholder: 'e.g. The Miller Family · Austin',
    wallChooseFile: 'Choose Christmas photo',
    wallSubmitPhoto: 'Post to Wall (+20 Points)',
    wallSortTop: 'Most Voted',
    wallSortRecent: 'Most Recent',
    wallLikeBtn: 'Like',
    wallLikedBtn: 'Liked',
    wallReportBtn: '🚩 Report',
    wallReportDone: 'Reported',
    wallParadeBtn: '🎬 Watch Video Parade (Top Photos)',
    wallEmpty: 'No photos visible yet. Upload the very first holiday memory!',
    podiumTitle: '🏆 Official Cloud Podium (Top 3 Most Liked)',
    podiumFirstBadge: '🥇 #1 Main Cover',
    podiumSecondBadge: '🥈 2nd Place',
    podiumThirdBadge: '🥉 3rd Place',
    carouselLiveBadge: '🔴 LIVE • Updating showcase',
    carouselTitle: '✨ Live Rotating Showcase (25 Recent Photos)',
    carouselWebpHint: 'WebP ~30KB · Auto-FIFO · Family Safe',
    wallNsfwChecking: 'Checking family safety...',
    wallNsfwRejected: '⚠️ Photo blocked by our family safety filter. Please upload a festive family photo.',
    paradeCountdownBanner: '⏳ Grand Christmas Video Parade: Premieres December 25! Upload your photo and collect ❤️ Likes to appear in the video.',
    paradeCountdownTime: (d, h, m) => `${d}d ${h}h ${m}m`,
    paradeLivePremiereBtn: '🎬 LIVE PREMIERE! Watch Grand Christmas Video Parade (Top Photos)',
    paradeEndedBanner: '✨ Christmas Event Finished! See you at the Three Kings Special.',
    paradeRankPrefix: 'Rank',
    paradeCloseBtn: 'Exit Parade',
    paradePlayingMusic: 'Festive music playing',
    shareModalTitle: 'Share Christmas Magic',
    shareModalSubtitle: 'Share via WhatsApp or social media and instantly receive +50 Magic Points.',
    shareCopyLink: 'Copy Link',
    shareCopied: 'Link copied!',
    trendsModalTitle: 'Market Intelligence · Anonymous Gift Trends',
    trendsModalSubtitle: 'Strictly anonymous aggregate insights with zero personal identifiers.',
    trendsTopGiftsTitle: '🏆 Top 10 Most Requested Gifts',
    trendsFilterCountry: 'Country / City',
    trendsFilterLanguage: 'Language',
    trendsFilterAgeRange: 'Age Range',
    trendsAllOption: 'All',
    trendsExportCsvBtn: '📥 Export Full Report (.CSV for Excel)',
    trendsTotalCountLabel: 'Anonymous Wishes',
    trendsUniqueGiftsLabel: 'Unique Gifts',
    trendsNoData: 'No trend records match the selected filters.',
    trendsPinTitle: 'Enter Access Code',
    trendsPinPlaceholder: 'Code',
    trendsPinUnlockBtn: 'Unlock Panel',
    trendsPinError: 'Incorrect code',
    trendsSimulateDec25Btn: '👁️ Simulate December 25 Date',
    trendsSimulateDec25Active: '✅ Dec 25 Premiere Preview Active (Tap to disable)',
    trendsSimulateMidnightBtn: '🎆 Simulate Christmas Midnight',
    trendsSimulateMidnightActive: '🎆 Midnight Active',
    christmasClockTitle: '⏳ Countdown to Christmas',
    christmasClockLiveTitle: '🎄 Merry Christmas! It’s Midnight at the North Pole!',
    clockDays: 'Days',
    clockHours: 'Hours',
    clockMinutes: 'Min',
    clockSeconds: 'Sec',
    writeSantaLetterHeroBtn: '✉️ Write my Letter to Santa Claus',
    backToCoverBtn: '← Back to Cover',
    playSleighHeroBtn: '🎮 Play: Santa’s Sleigh',
    playSleighAccessBadge: '👑 Free for VIP / 🎬 Free with Ad',
    adGateTitle: '🛷 Magic Sleigh: Gift Mission',
    adGatePrompt: '🎬 Watch a short holiday ad to unlock your sleigh flight for free',
    adGateWatchBtn: '▶️ Watch Ad & Play',
    adGateVipBtn: '👑 Or enter ad-free with VIP Zone',
    adGateCountdown: (sec) => `🎄 Holiday ad... unlocking sleigh in ${sec}s`,
    adGateSimulatedSlot: 'AdSense / AdMob · Holiday Rewarded Ad',
    adGateSkipTestBtn: '⚡ Enter directly (Test)',
    sleighGameTitle: '🛷 Magic Sleigh: Gift Mission',
    sleighGameHint: 'Slide one finger or move mouse to steer · Auto-fires magic sparkles',
    gameScoreLabel: 'Score',
    gameBestLabel: '🏆 Best Record',
    gameLevelLabel: 'Level',
    gameLivesLabel: 'Lives',
    gamePauseBtn: 'Pause',
    gameResumeBtn: 'Resume',
    gameExitShortBtn: '← Exit',
    gamePauseExitBtn: '🚪 Exit',
    gameOverTitle: '🎄 Holiday Flight Complete!',
    gameNewRecordBadge: '🏆 New Record! +20 Magic Points',
    gamePlayAgainBtn: '🔄 Play Again',
    wallInvalidFileError: '❌ Only valid JPEG, PNG, or WebP images under 5 MB are allowed.',
    wallUploadRateLimitError: (sec) => `⏳ Anti-spam protection: please wait ${sec}s before uploading another photo.`,
    wallAlreadyVotedNotice: '❤️ You already voted for this photo from this device.',
    adSlotPlaceholder: 'AD SPACE · SANTA MAGIA',
    privacyPolicyLinkLabel: '📜 Privacy Policy & Terms',
    privacyPolicyModalTitle: '📜 Privacy Policy & Terms · SANTA MAGIA',
    privacyPolicySections: [
      {
        title: '1. Zero Storage of Personal or Children’s Data',
        body: 'SANTA MAGIA does not store children’s names, ages, gift wishlists, or WhatsApp phone numbers on our servers. All letter details exist solely in volatile memory during your visit and are sent only to the family recipient you choose.',
      },
      {
        title: '2. Family Photo Wall Security',
        body: 'Uploaded photos are compressed to WebP on your device, scanned by an automated family-safety filter, strictly limited to 1 upload every 2 minutes and 1 vote per photo per device, and automatically rotated in a 25-slot showcase.',
      },
      {
        title: '3. Advertising & Standard Cookies',
        body: 'SANTA MAGIA uses standard browser cookies and third-party ad networks (such as Google AdSense or Monetag) to keep free features accessible. Ad partners may use cookies to show relevant, family-friendly ads, or you can browse ad-free via the VIP Zone.',
      },
      {
        title: '4. Terms of Use',
        body: 'SANTA MAGIA is a festive entertainment experience for families. Automated spam, harmful content, or attempts to tamper with votes or cloud storage are strictly prohibited.',
      },
    ],
    pwaPromptTitle: 'Do you want to download SANTA MAGIA on your phone or continue in the browser?',
    pwaDownloadBtn: '📲 Download App',
    pwaContinueWebBtn: 'Continue on web',
    pwaFooterInstallBtn: '📲 Download App',
    pwaIosGuideTitle: 'Install SANTA MAGIA on iPhone / iPad',
    pwaIosStep1Title: '1. Tap the Share button',
    pwaIosStep1Desc: 'Look for the Share icon (square with an upward arrow) at the bottom bar of Safari.',
    pwaIosStep2Title: '2. Tap "Add to Home Screen"',
    pwaIosStep2Desc: 'Scroll down in the menu, tap "Add to Home Screen", then tap Add.',
    pwaBrowserGuideTitle: 'Install SANTA MAGIA on your phone',
    pwaBrowserStep1Title: '1. Open your browser menu',
    pwaBrowserStep1Desc: 'Tap the browser menu button (⋮ or settings) in the top corner.',
    pwaBrowserStep2Title: '2. Tap "Install app" or "Add to Home screen"',
    pwaBrowserStep2Desc: 'Confirm to place the red & gold SANTA MAGIA icon on your home screen.',
    pwaOfflineBadge: 'Offline Mode — Cached magic ready',
    formatDisplayNames: (children) => formatChildNames(children.map((c) => c.name), 'and', 'Oliver'),
    buildSalutation: (children) => `Dearest ${formatChildNames(children.map((c) => c.name), 'and', 'Oliver')},`,
    shareTextTemplate: (children) => {
      const names = formatChildNames(children.map((c) => c.name), 'and', 'the kids');
      return `🎄✨ Check out this Official Santa Letter & Magic Call for ${names} on SANTA MAGIA! 🎅📞`;
    },
    buildParentWhatsappMessage: ({ children, city, behavior, sender, officialCode }) => {
      const cityTxt = city.trim() || '-';
      const behaviorTxt = behavior === 'super' ? 'Super Good / Excellent' : behavior === 'very' ? 'Very Good' : 'Trying really hard';
      const senderTxt = sender === 'kings' ? 'The Three Wise Men' : 'Santa Claus';
      const lines = children.map((c, idx) => `${idx + 1}. *${c.name.trim() || `Child ${idx + 1}`}${c.age.trim() ? ` (${c.age.trim()})` : ''}:* ${c.gift.trim() || 'Surprise'}`).join('\n');
      return `🎄 *North Pole Arrival Stamp - SANTA MAGIA*\n\n🎁 *Wish List:*\n${lines}\n\n📍 *City:* ${cityTxt}\n⭐ *Behavior:* ${behaviorTxt}\n✉️ *Sender:* ${senderTxt}\n🔖 *Official Code:* ${officialCode}`;
    },
    toastPointsEarned: (pts) => `⭐ You earned +${pts} Magic Points!`,
    toastPhotoUploaded: '📸 Your holiday photo is now live in the Cover Contest!',
    toastHdDownloaded: '📥 HD parchment image downloaded!',
    toastReported: '🚩 Thank you. Content hidden for family safety.',
    closeBtn: 'Close',
    elfNoteTitle: '🎄 Merry Christmas!',
    elfNoteBody: 'Wishing you wonderful holidays surrounded by your loved ones. Always remember that you are never alone and that you are deeply loved. Thank you from the bottom of our hearts for using our app. See you in the New Year!',
    elfNotePs: '😄 P.S.: What did one present say to the other before hopping onto the sleigh? Bundle up, because tonight they’re going to unwrap us all!',
    elfNoteSignature: 'Signed: The Christmas Elf 🎄🧝‍♂️ (I wrote this myself because Santa Claus was super busy).',
    buildLetterParagraphs: ({ children, sender }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'and', 'Oliver');
      if (sender === 'kings') {
        return isPlural
          ? [
              `Dearest ${namesText}, what a joy it was to feel your excitement just now! We have safely tucked your wishes into our royal Eastern chest as we prepare our camels for the journey.`,
              `Remember that the brightest star guides us toward loving homes. Keep helping your family, sharing smiles, and sleeping early on that magical night.`,
              `See you soon beneath the starry winter sky!`,
            ]
          : [
              `Dearest ${namesText}, what a joy it was to feel your excitement just now! We have safely tucked your letter into our royal Eastern chest as we prepare our camels for the journey.`,
              `Remember that the brightest star guides us toward kind hearts. Keep helping your family and sleeping early on that magical night.`,
              `See you soon beneath the starry winter sky!`,
            ];
      }
      return isPlural
        ? [
            `Dearest ${namesText}, what a joy it was to speak with all of you on the phone just a moment ago! Your letters are now tucked safely inside my golden chest beside the workshop fireplace.`,
            `Rudolph and the elves are polishing the sleigh while we highlight your names in the Great Christmas Book. Keep caring for each other, helping at home, and filling your house with laughter.`,
            `Get ready for an unforgettable Christmas Eve!`,
          ]
        : [
            `Dearest ${namesText}, what a joy it was to speak with you on the phone just a moment ago! Your letter is now tucked safely inside my golden chest beside the workshop fireplace.`,
            `Rudolph and the elves are polishing the sleigh while we highlight your name in the Great Christmas Book. Keep caring for your loved ones, helping at home, and filling your house with laughter.`,
            `Get ready for an unforgettable Christmas Eve!`,
          ];
    },
    buildCertificateBody: ({ children, city, behavior }) => {
      const namesText = formatChildNames(children.map((c) => c.name), 'and', 'Oliver');
      const isPlural = children.filter((c) => c.name.trim()).length > 1;
      const cityTxt = city.trim() || 'their hometown';
      const qual = behavior === 'super' ? 'outstanding kindness and exemplary behavior' : behavior === 'very' ? 'very good behavior and cheerful spirit' : 'wonderful daily effort and generous heart';
      if (isPlural) return `By official decree, the North Pole Council certifies that ${namesText}, of ${cityTxt}, hold a place of honor on the 2026 Golden Nice List for ${qual}.`;
      const ageTxt = children[0]?.age.trim() ? `, age ${children[0].age.trim()},` : '';
      return `By official decree, the North Pole Council certifies that ${namesText}${ageTxt} of ${cityTxt}, holds a place of honor on the 2026 Golden Nice List for ${qual}.`;
    },
    buildSantaCallScript: ({ children }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'and', 'my friend');
      return isPlural
        ? `Ho, ho, ho! Hello ${namesText}, this is Santa Claus. I just received your letters right here at the North Pole! I am going to talk with your mom and dad to ask how you all behaved this year, and depending on your behavior I will bring you a very special surprise. I am also leaving a signed letter for you!`
        : `Ho, ho, ho! Hello ${namesText}, this is Santa Claus. I just received your letter right here at the North Pole! I am going to talk with your mom and dad to ask how you behaved this year, and depending on your behavior I will bring you a very special surprise. I am also leaving a signed letter for you!`;
    },
    samplePhotos: [
      { id: 'sample-1', title: 'Warm glowing tree waiting for Santa', author: 'The Carter Family · Boston' },
      { id: 'sample-2', title: 'Gingerbread stars and warm milk ready', author: 'Emma & Leo · Toronto' },
      { id: 'sample-3', title: 'Snowy alpine cabin under winter lights', author: 'The Weber Family · Aspen' },
      { id: 'sample-4', title: 'Cozy knit stockings by the fireplace', author: 'Clara & James · London' },
    ],
  },

  es: {
    appName: 'SANTA MAGIA',
    appTagline: 'Carta y Llamada de Papá Noel',
    magicPointsLabel: 'Puntos Mágicos',
    soundOn: 'Sonido activo',
    soundOff: 'Silenciado',
    musicOnBtn: '🎵 Música: ON',
    musicOffBtn: '🎵 Música: OFF',
    navHome: 'Portada',
    navLetter: 'Carta HD',
    navCall: 'Llamada',
    navWall: 'Muro 25 Dic',
    heroOfficialBadge: '👑 Portada Oficial de Navidad (Más Votada)',
    heroWinnerTitle: 'La Magia del Polo Norte en Casa',
    heroLikesLabel: 'Me Gusta',
    heroByLabel: 'Familia',
    heroCallCta: '📞 ¡Papá Noel está llamando!',
    heroLetterCta: '✉️ Escribir Carta al Polo Norte',
    heroParadeCta: '🎬 Ver Video Desfile (Top Fotos)',
    heroQuickIntro: 'Escribe la carta de uno o varios hermanos, envíala al Polo Norte, contesta la llamada mágica de Papá Noel y recibe su pergamino oficial sellado.',
    vipZoneTopBtn: '👑 Zona VIP Sin Anuncios',
    vipExclusiveBadge: '👑 VIP',
    redeemPointsBadge: '⭐ Canjear con Puntos Mágicos',
    magicPassBtn: '👑 Zona VIP Sin Anuncios',
    magicPassTitle: '👑 Zona VIP Sin Anuncios',
    magicPassSubtitle: 'Desbloquea al instante toda la colección VIP para tu familia',
    magicPassPerk1: '🚫 Cero Publicidad',
    magicPassPerk2: '📜 Todos los Pergaminos y Certificados Desbloqueados',
    magicPassPerk3: '⚡ Acceso Instantáneo',
    magicPassPriceLabel: '$2.99 USD',
    magicPassDemoNote: 'Modo Demo Activo: Pulsa el botón para probar el desbloqueo completo al instante sin cargos reales.',
    magicPassConfirm: 'Activar Zona VIP ($2.99 USD)',
    magicPassUnlocked: '¡Zona VIP activada! Todo ha sido desbloqueado.',
    magicPassActiveBadge: '👑 Zona VIP Activa',
    vipKofiNote: 'Compra tu Pase VIP de forma segura en Ko-fi y recibe tu código de activación al instante.',
    vipCodeLabel: '¿Ya tienes tu código de activación VIP?',
    vipCodePlaceholder: 'Ingresa tu código VIP',
    vipCodeSubmitBtn: '🔓 Activar',
    vipCodeError: 'Código VIP incorrecto. Verifica e intenta de nuevo.',
    vipWelcomeMessage: '👑 ¡Bienvenido/a a la Zona VIP Sin Anuncios! Publicidad eliminada y todo desbloqueado para siempre.',
    adBannerLabel: 'Espacio Familiar',
    adBannerText: 'Disfruta de la magia navideña en familia.',
    adBannerRemove: '👑 Zona VIP Sin Anuncios',
    privacyNoticeText: '🔒 Privacidad Infantil Protegida: No almacenamos nombres ni números telefónicos; solo estadísticas anónimas de tendencias navideñas.',
    preSendPrivacyBanner: '🔒 Privacidad Garantizada: Tus datos y mensajes solo se comparten con las personas que tú elijas. Esta aplicación no almacena ningún dato personal.',
    letterSectionTitle: 'Carta Mágica al Polo Norte',
    letterSectionSubtitle: 'Agrega hasta 5 niños de la misma casa. Al enviar la carta, Papá Noel llamará por teléfono y luego revelará su pergamino oficial sellado.',
    childNumberLabel: (idx) => `Niño/a #${idx}`,
    addSiblingBtn: '➕ Agregar otro niño/a',
    removeSiblingAria: 'Quitar niño/a',
    allSiblingsTab: 'Todos juntos',
    fieldChildName: 'Nombre',
    fieldChildNamePlaceholder: 'Ej. Mateo, Sofía...',
    fieldAge: 'Edad',
    fieldAgePlaceholder: 'Ej. 7',
    fieldCity: 'Ciudad y País',
    fieldCityPlaceholder: 'Ej. Madrid, España',
    fieldBehavior: 'Comportamiento este año',
    behaviorSuper: 'Súper Bien / Excelente',
    behaviorVery: 'Muy Bien',
    behaviorTrying: 'Esforzándose mucho',
    fieldGift: 'Regalo deseado',
    fieldGiftPlaceholder: 'Ej. Bicicleta roja, Lego...',
    fieldSender: 'Remitente Oficial',
    senderSanta: '🎅 Papá Noel / Santa Claus',
    senderKings: '👑 Los Tres Reyes Magos',
    fieldWhatsappLabel: '📱 Teléfono de contacto en casa (WhatsApp)',
    fieldWhatsappOtherOption: 'Otro (+...)',
    fieldWhatsappCustomPrefixPlaceholder: '+...',
    fieldWhatsappPlaceholder: 'Ej. 612345678',
    fieldWhatsappHint: 'Para que los duendes del Polo Norte envíen el sello de confirmación de llegada.',
    sendToNorthPoleBtn: '✉️ Enviar Carta al Polo Norte',
    sendingTitle: 'Volando hacia el Polo Norte...',
    sendingSubtitle: 'Los duendes acaban de recibir el sobre mágico y están conectando la llamada.',
    sealedWaitingTitle: 'Pergamino sellado en camino',
    sealedWaitingSubtitle: 'Pulsa "Enviar Carta al Polo Norte" para recibir primero la llamada de Papá Noel y revelar aquí tu carta oficial firmada.',
    responseReadyBanner: '✨ ¡Carta oficial de Papá Noel revelada y firmada!',
    openWhatsappFallback: '📲 Sello de confirmación por WhatsApp',
    fieldTheme: 'Estilo de Pergamino / Certificado',
    themeClassic: 'Pergamino Clásico Polo Norte',
    themeRoyal: 'Terciopelo Dorado VIP',
    themeAurora: 'Noche Polar VIP',
    themeCertificate: 'Certificado Oficial Niño Bueno',
    freeLabel: 'Gratis',
    unlockWithPoints: 'Canjear',
    unlockedLabel: 'Desbloqueado',
    notEnoughPoints: 'Comparte en redes (+50 pts) o sube fotos para ganar más Puntos Mágicos.',
    downloadHdBtn: '📥 Descargar Carta HD (Imagen)',
    sharePointsBtn: '📲 Compartir en Redes (+50 Puntos)',
    callWithChildBtn: '📞 ¡Papá Noel está llamando!',
    northPoleDispatch: 'DESPACHO OFICIAL DEL POLO NORTE',
    magiRoyalDispatch: 'CORREO REAL DE ORIENTE · LOS TRES REYES MAGOS',
    officialCodeLabel: 'CÓDIGO OFICIAL',
    letterSignatureSanta: 'Con todo cariño mágico, Papá Noel',
    letterSignatureKings: 'Melchor, Gaspar y Baltasar',
    letterSealText: 'POLO NORTE · OFICIAL',
    certificateTitle: 'CERTIFICADO OFICIAL DE NIÑO BUENO',
    certificateSubtitle: 'Registro Honorífico de Navidad 2026',
    certificateAwardedTo: 'Otorgado con orgullo a',
    certificateSealLabel: 'APROBADO POR EL GRAN LIBRO DORADO',
    callSectionTitle: 'Llamada Directa del Polo Norte',
    callSectionSubtitle: 'Sube el volumen y prepara tu cámara para grabar la reacción cuando suene el teléfono y Papá Noel hable en voz alta.',
    callTriggerBtn: '📞 ¡Papá Noel está llamando!',
    callIncomingStatus: 'Llamada entrante mágica...',
    callConnectedStatus: 'En línea con el Taller del Polo Norte',
    callVoicePlayingNote: 'Escuchando a Papá Noel en vivo...',
    callCallerSanta: 'Papá Noel (Santa Claus)',
    callCallerLocation: 'Polo Norte · Línea Privada',
    callAnswerBtn: 'Contestar',
    callDeclineBtn: 'Colgar',
    callHangupBtn: 'Finalizar Llamada',
    callReplayVoiceBtn: 'Volver a escuchar',
    callRecordHint: 'Consejo: Entrega el teléfono o ten otra cámara lista antes de pulsar Contestar.',
    callVoiceLang: 'es-ES',
    callCountdownTitle: (sec) => `🎅 Papá Noel está leyendo tu carta... te llamará en ${sec}s`,
    callCountdownSubtitle: '¡Preparen el celular con volumen alto para escuchar su llamada mágica!',
    callNowBtn: '⚡ Llamar ahora',
    callMissedTitle: '📵 ¡Ups! No llegaste a contestar a tiempo',
    callMissedSubtitle: 'El timbre sonó 15 segundos y Papá Noel volvió al taller. ¡Pueden pedir otra llamada!',
    callRetryCountdownBtn: '🔄 Esperar otra llamada de Papá Noel',
    wallSectionTitle: '📸 Muro Navideño y Concurso de Portada',
    wallSectionSubtitle: 'Sube tu foto navideña familiar y vota con Me Gusta. La foto #1 más votada aparece automáticamente en la Portada Principal.',
    wallUploadTitle: 'Participar en la Portada de Navidad',
    wallPhotoTitleLabel: 'Título corto de tu foto',
    wallPhotoTitlePlaceholder: 'Ej. Nuestro árbol encendido en familia',
    wallAuthorLabel: 'Familia / Ciudad',
    wallAuthorPlaceholder: 'Ej. Familia García · Bogotá',
    wallChooseFile: 'Elegir foto navideña',
    wallSubmitPhoto: 'Publicar en el Muro (+20 Puntos)',
    wallSortTop: 'Más Votadas',
    wallSortRecent: 'Más Recientes',
    wallLikeBtn: 'Me Gusta',
    wallLikedBtn: 'Te gusta',
    wallReportBtn: '🚩 Reportar',
    wallReportDone: 'Reportado',
    wallParadeBtn: '🎬 Ver Video Desfile (Top Fotos)',
    wallEmpty: 'Aún no hay fotos visibles. ¡Sube la primera foto navideña!',
    podiumTitle: '🏆 Podio Oficial en la Nube (Top 3 Más Votadas)',
    podiumFirstBadge: '🥇 1° Portada Principal',
    podiumSecondBadge: '🥈 2° Puesto',
    podiumThirdBadge: '🥉 3° Puesto',
    carouselLiveBadge: '🔴 EN VIVO • Actualizando vitrina',
    carouselTitle: '✨ Vitrina Rotativa en Vivo (25 Fotos Recientes)',
    carouselWebpHint: 'WebP ~30KB · Cola FIFO · Filtro Familiar',
    wallNsfwChecking: 'Verificando seguridad familiar...',
    wallNsfwRejected: '⚠️ Foto rechazada por el filtro de seguridad familiar. Elige una foto navideña.',
    paradeCountdownBanner: '⏳ Gran Video Desfile de Navidad: ¡Se estrena el 25 de Diciembre! Sube tu foto y junta ❤️ Likes para salir en el video.',
    paradeCountdownTime: (d, h, m) => `${d}d ${h}h ${m}m`,
    paradeLivePremiereBtn: '🎬 ¡ESTRENO EN VIVO! Ver Gran Video Desfile de Navidad (Top Fotos)',
    paradeEndedBanner: '✨ ¡Evento de Navidad finalizado! Nos vemos en el Especial de Reyes Magos.',
    paradeRankPrefix: 'Puesto',
    paradeCloseBtn: 'Salir del Desfile',
    paradePlayingMusic: 'Música navideña activa',
    shareModalTitle: 'Compartir Magia Navideña',
    shareModalSubtitle: 'Comparte en WhatsApp o cualquier red social y recibe +50 Puntos Mágicos al instante.',
    shareCopyLink: 'Copiar Enlace',
    shareCopied: '¡Enlace copiado!',
    trendsModalTitle: 'Inteligencia de Mercado · Tendencias Navideñas',
    trendsModalSubtitle: 'Estadísticas agregadas 100% anónimas sin ningún dato personal.',
    trendsTopGiftsTitle: '🏆 Top 10 Regalos Más Pedidos',
    trendsFilterCountry: 'País / Ciudad',
    trendsFilterLanguage: 'Idioma',
    trendsFilterAgeRange: 'Rango de Edad',
    trendsAllOption: 'Todos',
    trendsExportCsvBtn: '📥 Exportar Reporte Completo (.CSV para Excel)',
    trendsTotalCountLabel: 'Pedidos Anónimos',
    trendsUniqueGiftsLabel: 'Regalos Únicos',
    trendsNoData: 'No hay registros con los filtros seleccionados.',
    trendsPinTitle: 'Código de Acceso',
    trendsPinPlaceholder: 'Código',
    trendsPinUnlockBtn: 'Abrir Panel',
    trendsPinError: 'Código incorrecto',
    trendsSimulateDec25Btn: '👁️ Simular Fecha 25 de Diciembre',
    trendsSimulateDec25Active: '✅ Modo Preview 25 Dic Activo (Toca para desactivar)',
    trendsSimulateMidnightBtn: '🎆 Simular Medianoche de Navidad',
    trendsSimulateMidnightActive: '🎆 Medianoche Activa',
    christmasClockTitle: '⏳ Cuenta Regresiva para Navidad',
    christmasClockLiveTitle: '🎄 ¡Llegó la Navidad! ¡Medianoche en el Polo Norte!',
    clockDays: 'Días',
    clockHours: 'Horas',
    clockMinutes: 'Min',
    clockSeconds: 'Seg',
    writeSantaLetterHeroBtn: '✉️ Escribir mi Carta a Papá Noel',
    backToCoverBtn: '← Volver a Portada',
    playSleighHeroBtn: '🎮 Jugar: Trineo de Papá Noel',
    playSleighAccessBadge: '👑 VIP Libre / 🎬 Gratis con Anuncio',
    adGateTitle: '🛷 Trineo Mágico: Misión Regalos',
    adGatePrompt: '🎬 Mira un breve anuncio navideño para desbloquear tu vuelo en trineo gratis',
    adGateWatchBtn: '▶️ Ver Anuncio y Jugar',
    adGateVipBtn: '👑 O entra sin anuncios con Zona VIP',
    adGateCountdown: (sec) => `🎄 Anuncio navideño... desbloqueando vuelo en ${sec}s`,
    adGateSimulatedSlot: 'AdSense / AdMob · Anuncio Navideño Bonificado',
    adGateSkipTestBtn: '⚡ Entrar directo',
    sleighGameTitle: '🛷 Trineo Mágico: Misión Regalos',
    sleighGameHint: 'Desliza un dedo o mueve el mouse para volar · Disparo mágico automático',
    gameScoreLabel: 'Puntos',
    gameBestLabel: '🏆 Mejor Récord',
    gameLevelLabel: 'Nivel',
    gameLivesLabel: 'Vidas',
    gamePauseBtn: 'Pausa',
    gameResumeBtn: 'Continuar',
    gameExitShortBtn: '← Salir',
    gamePauseExitBtn: '🚪 Salir',
    gameOverTitle: '🎄 ¡Fin del Vuelo Navideño!',
    gameNewRecordBadge: '🏆 ¡Nuevo Récord! +20 Puntos Mágicos',
    gamePlayAgainBtn: '🔄 Jugar de Nuevo',
    wallInvalidFileError: '❌ Solo se permiten imágenes válidas (JPEG, PNG o WebP) menores a 5 MB.',
    wallUploadRateLimitError: (sec) => `⏳ Protección anti-spam: espera ${sec}s antes de subir otra foto.`,
    wallAlreadyVotedNotice: '❤️ Ya registraste tu voto para esta foto en este dispositivo.',
    adSlotPlaceholder: 'ESPACIO PUBLICITARIO · SANTA MAGIA',
    privacyPolicyLinkLabel: '📜 Política de Privacidad y Términos',
    privacyPolicyModalTitle: '📜 Política de Privacidad y Términos · SANTA MAGIA',
    privacyPolicySections: [
      {
        title: '1. Sin Almacenamiento de Datos Personales ni de Menores',
        body: 'SANTA MAGIA no guarda en sus servidores nombres de niños, edades, regalos solicitados ni números de teléfono WhatsApp. Todos los datos de la carta permanecen solo en memoria temporal y se envían únicamente al contacto familiar que tú elijas.',
      },
      {
        title: '2. Seguridad del Muro Familiar de Fotos',
        body: 'Las fotos subidas se comprimen a WebP en tu dispositivo, pasan por un filtro automático anti-contenido inapropiado y cuentan con límite anti-spam de 1 foto cada 2 minutos y 1 voto por foto por dispositivo.',
      },
      {
        title: '3. Publicidad y Cookies Estándar',
        body: 'SANTA MAGIA utiliza cookies estándar y redes de publicidad (como Google AdSense o Monetag) para mantener la aplicación gratuita, además de ofrecer acceso sin anuncios en la Zona VIP.',
      },
      {
        title: '4. Términos de Uso',
        body: 'SANTA MAGIA es una experiencia navideña de entretenimiento familiar. Queda prohibido el uso de scripts automatizados, spam, subida de material ajeno o manipulación de votos.',
      },
    ],
    pwaPromptTitle: '¿Quieres descargar SANTA MAGIA en tu celular o seguir en el navegador?',
    pwaDownloadBtn: '📲 Descargar App',
    pwaContinueWebBtn: 'Seguir en la web',
    pwaFooterInstallBtn: '📲 Descargar App',
    pwaIosGuideTitle: 'Instalar SANTA MAGIA en iPhone / Safari',
    pwaIosStep1Title: '1. Toca el botón Compartir',
    pwaIosStep1Desc: 'Pulsa el ícono de Compartir (cuadrado con flecha hacia arriba) en la barra inferior de Safari.',
    pwaIosStep2Title: '2. Pulsa "Agregar a inicio"',
    pwaIosStep2Desc: 'Desliza hacia abajo, elige "Agregar a la pantalla de inicio" y confirma en Agregar.',
    pwaBrowserGuideTitle: 'Instalar SANTA MAGIA en tu celular',
    pwaBrowserStep1Title: '1. Abre el menú del navegador',
    pwaBrowserStep1Desc: 'Toca los tres puntos (⋮) o el botón de opciones en la esquina superior de Chrome.',
    pwaBrowserStep2Title: '2. Toca "Instalar aplicación"',
    pwaBrowserStep2Desc: 'Elige "Instalar aplicación" o "Agregar a la pantalla principal" para tener el ícono rojo y dorado.',
    pwaOfflineBadge: 'Modo sin conexión — Datos guardados activos',
    formatDisplayNames: (children) => formatChildNames(children.map((c) => c.name), 'y', 'Mateo'),
    buildSalutation: (children) => {
      const activeNames = children.map((c) => c.name.trim()).filter(Boolean);
      const formatted = formatChildNames(children.map((c) => c.name), 'y', 'Mateo');
      return activeNames.length > 1 ? `Queridos ${formatted},` : `Querido/a ${formatted},`;
    },
    shareTextTemplate: (children) => {
      const names = formatChildNames(children.map((c) => c.name), 'y', 'los peques');
      return `🎄✨ ¡Mira la Carta Oficial y Llamada Mágica de Papá Noel para ${names} en SANTA MAGIA! 🎅📞`;
    },
    buildParentWhatsappMessage: ({ children, city, behavior, sender, officialCode }) => {
      const cityTxt = city.trim() || '-';
      const behaviorTxt = behavior === 'super' ? 'Súper Bien / Excelente' : behavior === 'very' ? 'Muy Bien' : 'Esforzándose mucho';
      const senderTxt = sender === 'kings' ? 'Los Tres Reyes Magos' : 'Papá Noel';
      const lines = children.map((c, idx) => `${idx + 1}. *${c.name.trim() || `Niño/a ${idx + 1}`}${c.age.trim() ? ` (${c.age.trim()})` : ''}:* ${c.gift.trim() || 'Sorpresa'}`).join('\n');
      return `🎄 *Sello de Llegada Polo Norte - SANTA MAGIA*\n\n🎁 *Lista de deseos recibida:*\n${lines}\n\n📍 *Ciudad:* ${cityTxt}\n⭐ *Comportamiento:* ${behaviorTxt}\n✉️ *Remitente:* ${senderTxt}\n🔖 *Código Oficial:* ${officialCode}`;
    },
    toastPointsEarned: (pts) => `⭐ ¡Has ganado +${pts} Puntos Mágicos!`,
    toastPhotoUploaded: '📸 ¡Tu foto navideña ya participa por la Portada Oficial!',
    toastHdDownloaded: '📥 ¡Carta HD descargada en alta resolución!',
    toastReported: '🚩 Gracias. Contenido revisado y ocultado para seguridad familiar.',
    closeBtn: 'Cerrar',
    elfNoteTitle: '🎄 ¡Feliz Navidad!',
    elfNoteBody: 'Que pases unas muy buenas fiestas junto a tus seres queridos. Recuerda siempre que nunca estás solo y que se te quiere mucho. Gracias de corazón por usar nuestra aplicación. ¡Nos vemos en Año Nuevo!',
    elfNotePs: '😄 P. D.: ¿Qué le dijo un regalo a otro antes de subir al trineo? ¡Abrígate que esta noche nos abren a todos!',
    elfNoteSignature: 'Firma: El Duende de Navidad 🎄🧝‍♂️ (escribí yo porque Papá Noel estaba muy ocupado).',
    buildLetterParagraphs: ({ children, sender }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'y', 'Mateo');
      if (sender === 'kings') {
        return isPlural
          ? [
              `Queridos ${namesText}, ¡qué alegría haber escuchado su ilusión hace un momento! Ya guardamos sus deseos en nuestro cofre real de Oriente mientras preparamos las alforjas de los camellos.`,
              `Recuerden que la estrella nos guía hacia los hogares llenos de cariño. Sigan ayudando en casa, compartiendo sonrisas y durmiendo temprano la noche mágica.`,
              `¡Nos vemos muy pronto bajo el cielo estrellado!`,
            ]
          : [
              `Querido/a ${namesText}, ¡qué alegría haber sentido tu ilusión hace un momento! Ya guardamos tu carta en nuestro cofre real de Oriente mientras preparamos las alforjas de los camellos.`,
              `Recuerda que la estrella guía nuestro camino hacia los corazones bondadosos. Sigue ayudando en casa y durmiendo temprano la noche mágica.`,
              `¡Nos vemos muy pronto bajo el cielo estrellado!`,
            ];
      }
      return isPlural
        ? [
            `Queridos ${namesText}, ¡qué alegría me dio hablar con ustedes hace un momento! Ya guardé sus cartas en mi gran cofre dorado junto a la chimenea del taller.`,
            `Rodolfo y los duendes me ayudan a pulir el trineo mientras anotamos sus nombres en el Gran Libro de la Navidad. Sigan cuidándose mucho, ayudando en casa y llenando su hogar de risas.`,
            `¡Prepárense para una Nochebuena inolvidable!`,
          ]
        : [
            `Querido/a ${namesText}, ¡qué alegría me dio hablar contigo hace un momento! Ya guardé tu carta en mi gran cofre dorado junto a la chimenea del taller.`,
            `Rodolfo y los duendes me ayudan a pulir el trineo mientras anotamos tu nombre en el Gran Libro de la Navidad. Sigue cuidando tu buen corazón, ayudando en casa y llenando tu hogar de risas.`,
            `¡Prepárate para una Nochebuena inolvidable!`,
          ];
    },
    buildCertificateBody: ({ children, city, behavior }) => {
      const namesText = formatChildNames(children.map((c) => c.name), 'y', 'Mateo');
      const isPlural = children.filter((c) => c.name.trim()).length > 1;
      const cityTxt = city.trim() || 'su ciudad';
      const qual = behavior === 'super' ? 'comportamiento ejemplar y corazón bondadoso' : behavior === 'very' ? 'muy buen comportamiento y alegría constante' : 'valioso esfuerzo diario y espíritu generoso';
      if (isPlural) return `Por medio del presente documento oficial, el Consejo del Polo Norte certifica que ${namesText}, residentes en ${cityTxt}, figuran en la Lista Dorada de Honor 2026 gracias a su ${qual}.`;
      const singleAge = children[0]?.age.trim() ? `, de ${children[0].age.trim()},` : '';
      return `Por medio del presente documento oficial, el Consejo del Polo Norte certifica que ${namesText}${singleAge} residente en ${cityTxt}, figura en la Lista Dorada de Honor 2026 gracias a su ${qual}.`;
    },
    buildSantaCallScript: ({ children }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'y', 'campeón');
      return isPlural
        ? `¡Jo, jo, jo! Hola ${namesText}, soy Papá Noel. ¡Acabo de recibir sus cartas aquí en el Polo Norte! Voy a conversar con su mamá y su papá para preguntarles cómo se portaron este año, y según su comportamiento les llevaré una sorpresa muy especial. ¡Les dejo también una carta firmada por mí!`
        : `¡Jo, jo, jo! Hola ${namesText}, soy Papá Noel. ¡Acabo de recibir tu carta aquí en el Polo Norte! Voy a conversar con tu mamá y tu papá para preguntarles cómo te portaste este año, y según tu comportamiento te llevaré una sorpresa muy especial. ¡Te dejo también una carta firmada por mí!`;
    },
    samplePhotos: [
      { id: 'sample-1', title: 'Árbol iluminado esperando a Papá Noel', author: 'Familia Morales · Madrid' },
      { id: 'sample-2', title: 'Galletas de jengibre y leche tibia para Santa', author: 'Sofía y Lucas · CDMX' },
      { id: 'sample-3', title: 'Cabaña nevada bajo las luces de Nochebuena', author: 'Familia Mendoza · Bariloche' },
      { id: 'sample-4', title: 'Calcetines listos junto a la chimenea', author: 'Clara & Mateo · Valencia' },
    ],
  },

  pt: {
    appName: 'SANTA MAGIA',
    appTagline: 'Carta e Chamada do Papai Noel',
    magicPointsLabel: 'Pontos Mágicos',
    soundOn: 'Som ligado',
    soundOff: 'Silenciado',
    musicOnBtn: '🎵 Música: ON',
    musicOffBtn: '🎵 Música: OFF',
    navHome: 'Capa',
    navLetter: 'Carta HD',
    navCall: 'Chamada',
    navWall: 'Mural Natal',
    heroOfficialBadge: '👑 Capa Oficial de Natal (Mais Votada)',
    heroWinnerTitle: 'A Magia do Polo Norte em Casa',
    heroLikesLabel: 'Curtidas',
    heroByLabel: 'Família',
    heroCallCta: '📞 Papai Noel está ligando!',
    heroLetterCta: '✉️ Enviar Carta ao Polo Norte',
    heroParadeCta: '🎬 Ver Vídeo Desfile (Top Fotos)',
    heroQuickIntro: 'Escreva a carta para um ou vários irmãos, envie para o Polo Norte, atenda a ligação mágica do Papai Noel e revele o pergaminho oficial.',
    vipZoneTopBtn: '👑 Zona VIP Sem Anúncios',
    vipExclusiveBadge: '👑 VIP',
    redeemPointsBadge: '⭐ Resgatar com Pontos Mágicos',
    magicPassBtn: '👑 Zona VIP Sem Anúncios',
    magicPassTitle: '👑 Zona VIP Sem Anúncios',
    magicPassSubtitle: 'Libere instantaneamente toda a coleção VIP para sua família',
    magicPassPerk1: '🚫 Zero Publicidade',
    magicPassPerk2: '📜 Todos os Pergaminhos e Certificados Liberados',
    magicPassPerk3: '⚡ Acesso Instantâneo',
    magicPassPriceLabel: '$2.99 USD',
    magicPassDemoNote: 'Modo Demo Ativo: Toque abaixo para testar o desbloqueio completo sem cobrança real.',
    magicPassConfirm: 'Ativar Zona VIP ($2.99 USD)',
    magicPassUnlocked: 'Zona VIP ativada! Tudo foi desbloqueado.',
    magicPassActiveBadge: '👑 Zona VIP Ativa',
    vipKofiNote: 'Adquira seu Passe VIP com segurança no Ko-fi e receba seu código de ativação na hora.',
    vipCodeLabel: 'Já tem seu código de ativação VIP?',
    vipCodePlaceholder: 'Digite o código VIP',
    vipCodeSubmitBtn: '🔓 Ativar',
    vipCodeError: 'Código VIP incorreto. Verifique e tente novamente.',
    vipWelcomeMessage: '👑 Bem-vindo(a) à Zona VIP Sem Anúncios! Todos os anúncios foram removidos para sempre.',
    adBannerLabel: 'Espaço Família',
    adBannerText: 'Curta a magia do Natal com toda a família.',
    adBannerRemove: '👑 Zona VIP Sem Anúncios',
    privacyNoticeText: '🔒 Privacidade Infantil Protegida: Não armazenamos nomes nem telefones; apenas estatísticas anônimas de tendências natalinas.',
    preSendPrivacyBanner: '🔒 Privacidade Garantida: Seus dados e mensagens só são compartilhados com as pessoas que você escolher. Este aplicativo não armazena nenhum dado pessoal.',
    letterSectionTitle: 'Carta Mágica ao Polo Norte',
    letterSectionSubtitle: 'Adicione até 5 crianças da mesma casa. Ao enviar a carta, o Papai Noel ligará primeiro e depois revelará sua carta oficial assinada.',
    childNumberLabel: (idx) => `Criança #${idx}`,
    addSiblingBtn: '➕ Adicionar outra criança',
    removeSiblingAria: 'Remover criança',
    allSiblingsTab: 'Todos juntos',
    fieldChildName: 'Nome',
    fieldChildNamePlaceholder: 'Ex. Gabriel, Helena...',
    fieldAge: 'Idade',
    fieldAgePlaceholder: 'Ex. 7',
    fieldCity: 'Cidade e País',
    fieldCityPlaceholder: 'Ex. São Paulo, Brasil',
    fieldBehavior: 'Comportamento neste ano',
    behaviorSuper: 'Super Bem / Excelente',
    behaviorVery: 'Muito Bem',
    behaviorTrying: 'Se esforçando muito',
    fieldGift: 'Presente desejado',
    fieldGiftPlaceholder: 'Ex. Bicicleta, Boneca...',
    fieldSender: 'Remetente Oficial',
    senderSanta: '🎅 Papai Noel',
    senderKings: '👑 Os Três Reis Magos',
    fieldWhatsappLabel: '📱 Telefone de contato em casa (WhatsApp)',
    fieldWhatsappOtherOption: 'Outro (+...)',
    fieldWhatsappCustomPrefixPlaceholder: '+...',
    fieldWhatsappPlaceholder: 'Ex. 11987654321',
    fieldWhatsappHint: 'Para que os duendes do Polo Norte enviem o selo de confirmação de chegada.',
    sendToNorthPoleBtn: '✉️ Enviar Carta ao Polo Norte',
    sendingTitle: 'Voando para o Polo Norte...',
    sendingSubtitle: 'Os duendes acabaram de receber o envelope e estão conectando a ligação do Papai Noel.',
    sealedWaitingTitle: 'Pergaminho selado a caminho',
    sealedWaitingSubtitle: 'Toque em "Enviar Carta ao Polo Norte" para atender primeiro a ligação do Papai Noel e revelar sua carta oficial assinada.',
    responseReadyBanner: '✨ Carta oficial do Papai Noel revelada e assinada!',
    openWhatsappFallback: '📲 Selo de confirmação no WhatsApp',
    fieldTheme: 'Estilo do Pergaminho / Certificado',
    themeClassic: 'Pergaminho Clássico Polo Norte',
    themeRoyal: 'Veludo Dourado VIP',
    themeAurora: 'Noite Polar VIP',
    themeCertificate: 'Certificado Oficial Criança Boazinha',
    freeLabel: 'Grátis',
    unlockWithPoints: 'Trocar',
    unlockedLabel: 'Liberado',
    notEnoughPoints: 'Compartilhe nas redes (+50 pts) ou envie fotos para ganhar Pontos Mágicos.',
    downloadHdBtn: '📥 Baixar Carta HD (Imagem)',
    sharePointsBtn: '📲 Compartilhar nas Redes (+50 Pontos)',
    callWithChildBtn: '📞 Papai Noel está ligando!',
    northPoleDispatch: 'CORREIO OFICIAL DO POLO NORTE',
    magiRoyalDispatch: 'CORREIO REAL DO ORIENTE · TRÊS REIS MAGOS',
    officialCodeLabel: 'CÓDIGO OFICIAL',
    letterSignatureSanta: 'Com todo carinho mágico, Papai Noel',
    letterSignatureKings: 'Belchior, Gaspar e Baltazar',
    letterSealText: 'POLO NORTE · OFICIAL',
    certificateTitle: 'CERTIFICADO OFICIAL DE CRIANÇA BOAZINHA',
    certificateSubtitle: 'Registro de Honra do Natal 2026',
    certificateAwardedTo: 'Concedido com orgulho a',
    certificateSealLabel: 'APROVADO PELO GRANDE LIVRO DOURADO',
    callSectionTitle: 'Chamada Direta do Polo Norte',
    callSectionSubtitle: 'Aumente o volume e prepare a câmera para gravar a reação quando o telefone tocar e o Papai Noel falar.',
    callTriggerBtn: '📞 Papai Noel está ligando!',
    callIncomingStatus: 'Chamada mágica recebida...',
    callConnectedStatus: 'Ao vivo da Oficina do Polo Norte',
    callVoicePlayingNote: 'Ouvindo o Papai Noel ao vivo...',
    callCallerSanta: 'Papai Noel',
    callCallerLocation: 'Polo Norte · Linha Privada',
    callAnswerBtn: 'Atender',
    callDeclineBtn: 'Recusar',
    callHangupBtn: 'Encerrar Chamada',
    callReplayVoiceBtn: 'Ouvir novamente',
    callRecordHint: 'Dica: Entregue o celular às crianças ou prepare outra câmera antes de tocar em Atender.',
    callVoiceLang: 'pt-BR',
    callCountdownTitle: (sec) => `🎅 O Papai Noel está lendo sua carta... ligará em ${sec}s`,
    callCountdownSubtitle: 'Deixe o volume alto para que todos ouçam a ligação mágica!',
    callNowBtn: '⚡ Ligar agora',
    callMissedTitle: '📵 Ops! Você não conseguiu atender a tempo',
    callMissedSubtitle: 'A ligação tocou por 15 segundos. Peça uma nova ligação do Polo Norte!',
    callRetryCountdownBtn: '🔄 Esperar outra ligação do Papai Noel',
    wallSectionTitle: '📸 Mural de Natal e Concurso da Capa',
    wallSectionSubtitle: 'Envie sua foto de Natal e vote com Curtidas. A foto #1 mais votada aparece na Capa Principal.',
    wallUploadTitle: 'Participar da Capa de Natal',
    wallPhotoTitleLabel: 'Título curto da foto',
    wallPhotoTitlePlaceholder: 'Ex. Nossa árvore iluminada em família',
    wallAuthorLabel: 'Família / Cidade',
    wallAuthorPlaceholder: 'Ex. Família Silva · Curitiba',
    wallChooseFile: 'Escolher foto de Natal',
    wallSubmitPhoto: 'Publicar no Mural (+20 Pontos)',
    wallSortTop: 'Mais Votadas',
    wallSortRecent: 'Mais Recentes',
    wallLikeBtn: 'Curtir',
    wallLikedBtn: 'Curtiu',
    wallReportBtn: '🚩 Denunciar',
    wallReportDone: 'Denunciado',
    wallParadeBtn: '🎬 Ver Vídeo Desfile (Top Fotos)',
    wallEmpty: 'Nenhuma foto visível ainda. Envie a primeira lembrança de Natal!',
    podiumTitle: '🏆 Pódio Oficial na Nuvem (Top 3 Mais Curtidas)',
    podiumFirstBadge: '🥇 1° Capa Principal',
    podiumSecondBadge: '🥈 2° Lugar',
    podiumThirdBadge: '🥉 3° Lugar',
    carouselLiveBadge: '🔴 AO VIVO • Atualizando vitrine',
    carouselTitle: '✨ Vitrine Rotativa ao Vivo (25 Fotos Recentes)',
    carouselWebpHint: 'WebP ~30KB · Fila FIFO · Filtro Familiar',
    wallNsfwChecking: 'Verificando segurança familiar...',
    wallNsfwRejected: '⚠️ Foto bloqueada pelo filtro de segurança familiar. Escolha uma foto de Natal.',
    paradeCountdownBanner: '⏳ Grande Vídeo Desfile de Natal: Estreia em 25 de Dezembro! Envie sua foto e junte ❤️ Curtidas para aparecer no vídeo.',
    paradeCountdownTime: (d, h, m) => `${d}d ${h}h ${m}m`,
    paradeLivePremiereBtn: '🎬 ESTREIA AO VIVO! Ver Grande Vídeo Desfile de Natal (Top Fotos)',
    paradeEndedBanner: '✨ Evento de Natal encerrado! Nos vemos no Especial de Reis Magos.',
    paradeRankPrefix: 'Lugar',
    paradeCloseBtn: 'Sair do Desfile',
    paradePlayingMusic: 'Música natalina tocando',
    shareModalTitle: 'Compartilhar Magia de Natal',
    shareModalSubtitle: 'Compartilhe no WhatsApp ou redes sociais e ganhe +50 Pontos Mágicos na hora.',
    shareCopyLink: 'Copiar Link',
    shareCopied: 'Link copiado!',
    trendsModalTitle: 'Inteligência de Mercado · Tendências de Natal',
    trendsModalSubtitle: 'Estatísticas agregadas 100% anônimas sem nenhum dado pessoal.',
    trendsTopGiftsTitle: '🏆 Top 10 Presentes Mais Pedidos',
    trendsFilterCountry: 'País / Cidade',
    trendsFilterLanguage: 'Idioma',
    trendsFilterAgeRange: 'Faixa Etária',
    trendsAllOption: 'Todos',
    trendsExportCsvBtn: '📥 Exportar Relatório Completo (.CSV para Excel)',
    trendsTotalCountLabel: 'Pedidos Anônimos',
    trendsUniqueGiftsLabel: 'Presentes Únicos',
    trendsNoData: 'Nenhum registro encontrado para esses filtros.',
    trendsPinTitle: 'Código de Acesso',
    trendsPinPlaceholder: 'Código',
    trendsPinUnlockBtn: 'Abrir Painel',
    trendsPinError: 'Código incorreto',
    trendsSimulateDec25Btn: '👁️ Simular Data 25 de Dezembro',
    trendsSimulateDec25Active: '✅ Prévia 25 de Dezembro Ativa (Toque para desativar)',
    trendsSimulateMidnightBtn: '🎆 Simular Meia-Noite de Natal',
    trendsSimulateMidnightActive: '🎆 Meia-Noite Ativa',
    christmasClockTitle: '⏳ Contagem Regressiva para o Natal',
    christmasClockLiveTitle: '🎄 Chegou o Natal! Meia-noite no Polo Norte!',
    clockDays: 'Dias',
    clockHours: 'Horas',
    clockMinutes: 'Min',
    clockSeconds: 'Seg',
    writeSantaLetterHeroBtn: '✉️ Escrever minha Carta ao Papai Noel',
    backToCoverBtn: '← Voltar para a Capa',
    playSleighHeroBtn: '🎮 Jogar: Trenó do Papai Noel',
    playSleighAccessBadge: '👑 VIP Livre / 🎬 Grátis com Anúncio',
    adGateTitle: '🛷 Trenó Mágico: Missão Presentes',
    adGatePrompt: '🎬 Assista a um breve anúncio de Natal para liberar seu voo de trenó grátis',
    adGateWatchBtn: '▶️ Ver Anúncio e Jogar',
    adGateVipBtn: '👑 Ou entre sem anúncios com Zona VIP',
    adGateCountdown: (sec) => `🎄 Anúncio natalino... liberando voo em ${sec}s`,
    adGateSimulatedSlot: 'AdSense / AdMob · Anúncio Premiado de Natal',
    adGateSkipTestBtn: '⚡ Entrar direto',
    sleighGameTitle: '🛷 Trenó Mágico: Missão Presentes',
    sleighGameHint: 'Deslize o dedo ou mova o mouse para pilotar · Disparo mágico automático',
    gameScoreLabel: 'Pontos',
    gameBestLabel: '🏆 Melhor Recorde',
    gameLevelLabel: 'Nível',
    gameLivesLabel: 'Vidas',
    gamePauseBtn: 'Pausar',
    gameResumeBtn: 'Continuar',
    gameExitShortBtn: '← Sair',
    gamePauseExitBtn: '🚪 Sair',
    gameOverTitle: '🎄 Fim do Voo de Natal!',
    gameNewRecordBadge: '🏆 Novo Recorde! +20 Pontos Mágicos',
    gamePlayAgainBtn: '🔄 Jogar Novamente',
    wallInvalidFileError: '❌ Apenas imagens válidas (JPEG, PNG ou WebP) menores que 5 MB são permitidas.',
    wallUploadRateLimitError: (sec) => `⏳ Proteção anti-spam: aguarde ${sec}s antes de enviar outra foto.`,
    wallAlreadyVotedNotice: '❤️ Você já votou nesta foto neste dispositivo.',
    adSlotPlaceholder: 'ESPAÇO PUBLICITÁRIO · SANTA MAGIA',
    privacyPolicyLinkLabel: '📜 Política de Privacidade e Termos',
    privacyPolicyModalTitle: '📜 Política de Privacidade e Termos · SANTA MAGIA',
    privacyPolicySections: [
      {
        title: '1. Sem Armazenamento de Dados Pessoais ou de Menores',
        body: 'O SANTA MAGIA não armazena nomes de crianças, idades, presentes desejados ou números de WhatsApp. Tudo fica apenas na memória temporária da sessão.',
      },
      {
        title: '2. Segurança do Mural de Fotos',
        body: 'As fotos são comprimidas em WebP, verificadas por filtro automático e protegidas com limite de 1 envio a cada 2 minutos e 1 voto por foto por dispositivo.',
      },
      {
        title: '3. Cookies e Anúncios Padrão',
        body: 'O SANTA MAGIA utiliza cookies padrão e parceiros de publicidade (como Google AdSense ou Monetag) para manter a plataforma gratuita, com opção sem anúncios na Zona VIP.',
      },
      {
        title: '4. Termos de Uso',
        body: 'Uso exclusivo para entretenimento natalino em família. Spam ou manipulação automatizada de votos são proibidos.',
      },
    ],
    pwaPromptTitle: 'Quer baixar o SANTA MAGIA no seu celular ou continuar no navegador?',
    pwaDownloadBtn: '📲 Baixar App',
    pwaContinueWebBtn: 'Continuar na web',
    pwaFooterInstallBtn: '📲 Baixar App',
    pwaIosGuideTitle: 'Instalar SANTA MAGIA no iPhone / Safari',
    pwaIosStep1Title: '1. Toque no botão Compartilhar',
    pwaIosStep1Desc: 'Toque no ícone de Compartilhar (quadrado com seta para cima) na barra inferior do Safari.',
    pwaIosStep2Title: '2. Toque em "Adicionar à Tela de Início"',
    pwaIosStep2Desc: 'Role para baixo, selecione "Adicionar à Tela de Início" e toque em Adicionar.',
    pwaBrowserGuideTitle: 'Instalar SANTA MAGIA no seu celular',
    pwaBrowserStep1Title: '1. Abra o menu do navegador',
    pwaBrowserStep1Desc: 'Toque no botão de menu (⋮) no canto superior do Chrome.',
    pwaBrowserStep2Title: '2. Toque em "Instalar aplicativo"',
    pwaBrowserStep2Desc: 'Confirme para adicionar o ícone vermelho e dourado do SANTA MAGIA à sua tela inicial.',
    pwaOfflineBadge: 'Modo offline — Conteúdo em cache ativo',
    formatDisplayNames: (children) => formatChildNames(children.map((c) => c.name), 'e', 'Gabriel'),
    buildSalutation: (children) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const formatted = formatChildNames(children.map((c) => c.name), 'e', 'Gabriel');
      return isPlural ? `Queridos ${formatted},` : `Querido(a) ${formatted},`;
    },
    shareTextTemplate: (children) => `🎄✨ Veja a Carta Oficial e a Ligação Mágica do Papai Noel para ${formatChildNames(children.map((c) => c.name), 'e', 'as crianças')} no SANTA MAGIA! 🎅📞`,
    buildParentWhatsappMessage: ({ children, city, behavior, sender, officialCode }) => {
      const cityTxt = city.trim() || '-';
      const behaviorTxt = behavior === 'super' ? 'Super Bem / Excelente' : behavior === 'very' ? 'Muito Bem' : 'Se esforçando muito';
      const senderTxt = sender === 'kings' ? 'Os Três Reis Magos' : 'Papai Noel';
      const lines = children.map((c, idx) => `${idx + 1}. *${c.name.trim() || `Criança ${idx + 1}`}${c.age.trim() ? ` (${c.age.trim()})` : ''}:* ${c.gift.trim() || 'Surpresa'}`).join('\n');
      return `🎄 *Selo de Chegada Polo Norte - SANTA MAGIA*\n\n🎁 *Lista de desejos recebida:*\n${lines}\n\n📍 *Cidade:* ${cityTxt}\n⭐ *Comportamento:* ${behaviorTxt}\n✉️ *Remetente:* ${senderTxt}\n🔖 *Código Oficial:* ${officialCode}`;
    },
    toastPointsEarned: (pts) => `⭐ Você ganhou +${pts} Pontos Mágicos!`,
    toastPhotoUploaded: '📸 Sua foto já está concorrendo à Capa Oficial de Natal!',
    toastHdDownloaded: '📥 Carta em HD baixada com sucesso!',
    toastReported: '🚩 Obrigado. Conteúdo ocultado para segurança da família.',
    closeBtn: 'Fechar',
    elfNoteTitle: '🎄 Feliz Natal!',
    elfNoteBody: 'Que você passe ótimas festas ao lado das pessoas que ama. Lembre-se sempre de que você nunca está sozinho e é muito querido. Muito obrigado de coração por usar nosso aplicativo. Nos vemos no Ano Novo!',
    elfNotePs: '😄 P.S.: O que um presente disse para o outro antes de subir no trenó? Se agasalha bem, porque hoje à noite vão abrir todos nós!',
    elfNoteSignature: 'Assinado: O Duende de Natal 🎄🧝‍♂️ (escrevi eu porque o Papai Noel estava muito ocupado).',
    buildLetterParagraphs: ({ children, sender }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'e', 'Gabriel');
      if (sender === 'kings') {
        return isPlural
          ? [`Queridos ${namesText}, que alegria sentir a empolgação de vocês agora há pouco! Já guardamos os seus pedidos no nosso baú real do Oriente enquanto preparamos os camelos.`, `Lembrem-se de que a estrela guia o nosso caminho até os lares cheios de carinho. Continuem ajudando em casa e dormindo cedo na noite mágica.`, `Nos vemos em breve sob o céu estrelado!`]
          : [`Querido(a) ${namesText}, que alegria sentir a sua empolgação agora há pouco! Já guardamos a sua carta no nosso baú real do Oriente enquanto preparamos os camelos.`, `Lembre-se de que a estrela guia o nosso caminho até os corações bondosos. Continue ajudando em casa e dormindo cedo na noite mágica.`, `Nos vemos em breve sob o céu estrelado!`];
      }
      return isPlural
        ? [`Queridos ${namesText}, que alegria foi falar com vocês por telefone agora há pouco! Já guardei as cartas de vocês no meu grande baú dourado perto da lareira da oficina.`, `O Rodolfo e os duendes estão polindo o trenó enquanto anotamos os nomes de vocês no Grande Livro do Natal. Continuem cuidando uns dos outros e enchendo a casa de sorrisos.`, `Preparem-se para uma noite de Natal inesquecível!`]
        : [`Querido(a) ${namesText}, que alegria foi falar com você por telefone agora há pouco! Já guardei a sua carta no meu grande baú dourado perto da lareira da oficina.`, `O Rodolfo e os duendes estão polindo o trenó enquanto anotamos o seu nome no Grande Livro do Natal. Continue cuidando da sua família e enchendo a casa de sorrisos.`, `Prepare-se para uma noite de Natal inesquecível!`];
    },
    buildCertificateBody: ({ children, city, behavior }) => {
      const namesText = formatChildNames(children.map((c) => c.name), 'e', 'Gabriel');
      const isPlural = children.filter((c) => c.name.trim()).length > 1;
      const cityTxt = city.trim() || 'sua cidade';
      const qual = behavior === 'super' ? 'comportamento exemplar e coração generoso' : behavior === 'very' ? 'muito bom comportamento e alegria contagiante' : 'lindo esforço diário e espírito bondoso';
      if (isPlural) return `Por meio deste documento oficial, o Conselho do Polo Norte certifica que ${namesText}, residentes em ${cityTxt}, integram a Lista Dourada de Honra 2026 pelo seu ${qual}.`;
      const ageTxt = children[0]?.age.trim() ? `, de ${children[0].age.trim()},` : '';
      return `Por meio deste documento oficial, o Conselho do Polo Norte certifica que ${namesText}${ageTxt} residente em ${cityTxt}, integra a Lista Dourada de Honra 2026 pelo seu ${qual}.`;
    },
    buildSantaCallScript: ({ children }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'e', 'campeão');
      return isPlural
        ? `Ho, ho, ho! Olá ${namesText}, aqui é o Papai Noel. Acabei de receber as cartas de vocês aqui no Polo Norte! Vou conversar com a mamãe e o papai para perguntar como vocês se comportaram neste ano e, segundo o comportamento de cada um, levarei uma surpresa muito especial. Também estou deixando uma carta assinada por mim!`
        : `Ho, ho, ho! Olá ${namesText}, aqui é o Papai Noel. Acabei de receber a sua carta aqui no Polo Norte! Vou conversar com a mamãe e o papai para perguntar como você se comportou neste ano e, segundo o seu comportamento, levarei uma surpresa muito especial. Também estou deixando uma carta assinada por mim!`;
    },
    samplePhotos: [
      { id: 'sample-1', title: 'Árvore iluminada esperando o Papai Noel', author: 'Família Souza · São Paulo' },
      { id: 'sample-2', title: 'Biscoitos de gengibre e leite para o Noel', author: 'Helena e Pedro · Lisboa' },
      { id: 'sample-3', title: 'Cabana nevada sob luzes de Natal', author: 'Família Costa · Gramado' },
      { id: 'sample-4', title: 'Meias prontas junto à lareira quentinha', author: 'Clara e Arthur · Porto' },
    ],
  },

  fr: {
    appName: 'SANTA MAGIA',
    appTagline: 'Lettre & Appel du Père Noël',
    magicPointsLabel: 'Points Magiques',
    soundOn: 'Son activé',
    soundOff: 'Muet',
    musicOnBtn: '🎵 Musique : ON',
    musicOffBtn: '🎵 Musique : OFF',
    navHome: 'Accueil',
    navLetter: 'Lettre HD',
    navCall: 'Appel',
    navWall: 'Mur Noël',
    heroOfficialBadge: '👑 Couverture Officielle de Noël (Plus Votée)',
    heroWinnerTitle: 'La Magie du Pôle Nord à la Maison',
    heroLikesLabel: "J'aime",
    heroByLabel: 'Famille',
    heroCallCta: '📞 Le Père Noël appelle !',
    heroLetterCta: '✉️ Envoyer la Lettre au Pôle Nord',
    heroParadeCta: '🎬 Voir le Défilé Vidéo (Top Photos)',
    heroQuickIntro: 'Écrivez la lettre pour un ou plusieurs enfants, envoyez-la au Pôle Nord, répondez à l’appel du Père Noël puis découvrez sa lettre signée.',
    vipZoneTopBtn: '👑 Zone VIP Sans Pub',
    vipExclusiveBadge: '👑 VIP',
    redeemPointsBadge: '⭐ Échanger avec des Points Magiques',
    magicPassBtn: '👑 Zone VIP Sans Pub',
    magicPassTitle: '👑 Zone VIP Sans Pub',
    magicPassSubtitle: 'Débloquez instantanément toute la collection VIP pour votre famille',
    magicPassPerk1: '🚫 Zéro Publicité',
    magicPassPerk2: '📜 Tous les Parchemins et Certificats Débloqués',
    magicPassPerk3: '⚡ Accès Instantané',
    magicPassPriceLabel: '$2.99 USD',
    magicPassDemoNote: 'Mode Démo Actif : Appuyez ci-dessous pour tester le déblocage VIP complet sans frais réels.',
    magicPassConfirm: 'Activer la Zone VIP ($2.99 USD)',
    magicPassUnlocked: 'Zone VIP activée ! Tout est désormais débloqué.',
    magicPassActiveBadge: '👑 Zone VIP Active',
    vipKofiNote: 'Obtenez votre Pass VIP en toute sécurité sur Ko-fi et recevez votre code d’activation.',
    vipCodeLabel: 'Vous avez déjà votre code d’activation VIP ?',
    vipCodePlaceholder: 'Entrez votre code VIP',
    vipCodeSubmitBtn: '🔓 Activer',
    vipCodeError: 'Code VIP invalide. Veuillez vérifier et réessayer.',
    vipWelcomeMessage: '👑 Bienvenue dans la Zone VIP Sans Pub ! Toutes les bannières sont supprimées à vie.',
    adBannerLabel: 'Espace Famille',
    adBannerText: 'Profitez pleinement de la magie de Noël en famille.',
    adBannerRemove: '👑 Zone VIP Sans Pub',
    privacyNoticeText: '🔒 Protection des Enfants : Nous ne conservons aucun nom ni numéro de téléphone ; uniquement des statistiques anonymes de tendances.',
    preSendPrivacyBanner: '🔒 Confidentialité Garantie : Vos données et messages ne sont partagés qu’avec les personnes de votre choix. Cette application ne stocke aucune donnée personnelle.',
    letterSectionTitle: 'Lettre Magique au Pôle Nord',
    letterSectionSubtitle: 'Ajoutez jusqu’à 5 enfants du même foyer. Envoyez la lettre pour recevoir d’abord l’appel du Père Noël, puis révéler votre parchemin officiel.',
    childNumberLabel: (idx) => `Enfant #${idx}`,
    addSiblingBtn: '➕ Ajouter un autre enfant',
    removeSiblingAria: 'Retirer cet enfant',
    allSiblingsTab: 'Tous ensemble',
    fieldChildName: 'Prénom',
    fieldChildNamePlaceholder: 'Ex. Léo, Camille...',
    fieldAge: 'Âge',
    fieldAgePlaceholder: 'Ex. 6',
    fieldCity: 'Ville / Pays',
    fieldCityPlaceholder: 'Ex. Lyon, France',
    fieldBehavior: 'Comportement cette année',
    behaviorSuper: 'Super Sage / Excellent',
    behaviorVery: 'Très Sage',
    behaviorTrying: 'Fait beaucoup d’efforts',
    fieldGift: 'Cadeau souhaité',
    fieldGiftPlaceholder: 'Ex. Vélo rouge, Lego...',
    fieldSender: 'Expéditeur Officiel',
    senderSanta: '🎅 Le Père Noël',
    senderKings: '👑 Les Trois Rois Mages',
    fieldWhatsappLabel: '📱 Téléphone de contact à la maison (WhatsApp)',
    fieldWhatsappOtherOption: 'Autre (+...)',
    fieldWhatsappCustomPrefixPlaceholder: '+...',
    fieldWhatsappPlaceholder: 'Ex. 612345678',
    fieldWhatsappHint: "Pour que les lutins du Pôle Nord envoient le tampon de confirmation d'arrivée.",
    sendToNorthPoleBtn: '✉️ Envoyer la Lettre au Pôle Nord',
    sendingTitle: 'Envol vers le Pôle Nord...',
    sendingSubtitle: 'Les lutins viennent de recevoir l’enveloppe magique et lancent l’appel du Père Noël.',
    sealedWaitingTitle: 'Parchemin scellé en route',
    sealedWaitingSubtitle: 'Appuyez sur « Envoyer la Lettre au Pôle Nord » pour recevoir l’appel du Père Noël et révéler ensuite sa lettre signée.',
    responseReadyBanner: '✨ Lettre officielle du Père Noël révélée et signée !',
    openWhatsappFallback: '📲 Tampon de confirmation sur WhatsApp',
    fieldTheme: 'Style de Parchemin / Certificat',
    themeClassic: 'Parchemin Classique Pôle Nord',
    themeRoyal: 'Velours Or Royal VIP',
    themeAurora: 'Nuit Polaire VIP',
    themeCertificate: 'Certificat Officiel Enfant Sage',
    freeLabel: 'Gratuit',
    unlockWithPoints: 'Échanger',
    unlockedLabel: 'Débloqué',
    notEnoughPoints: 'Partagez (+50 pts) ou publiez une photo pour gagner des Points Magiques.',
    downloadHdBtn: '📥 Télécharger la Lettre HD',
    sharePointsBtn: '📲 Partager (+50 Points)',
    callWithChildBtn: '📞 Le Père Noël appelle !',
    northPoleDispatch: 'COURRIER OFFICIEL DU PÔLE NORD',
    magiRoyalDispatch: 'COURRIER ROYAL D’ORIENT · ROIS MAGES',
    officialCodeLabel: 'CODE OFFICIEL',
    letterSignatureSanta: 'Avec toute la magie de Noël, Le Père Noël',
    letterSignatureKings: 'Melchior, Gaspard et Balthazar',
    letterSealText: 'PÔLE NORD · OFFICIEL',
    certificateTitle: 'CERTIFICAT OFFICIEL D’ENFANT SAGE',
    certificateSubtitle: 'Registre d’Honneur de Noël 2026',
    certificateAwardedTo: 'Décerné avec fierté à',
    certificateSealLabel: 'APPROUVÉ PAR LE GRAND LIVRE D’OR',
    callSectionTitle: 'Appel Direct du Pôle Nord',
    callSectionSubtitle: 'Montez le son et préparez votre caméra pour filmer la réaction lorsque le Père Noël parle à voix haute.',
    callTriggerBtn: '📞 Le Père Noël appelle !',
    callIncomingStatus: 'Appel magique entrant...',
    callConnectedStatus: 'En direct de l’Atelier du Pôle Nord',
    callVoicePlayingNote: 'Écoute du Père Noël en direct...',
    callCallerSanta: 'Père Noël',
    callCallerLocation: 'Pôle Nord · Ligne Privée',
    callAnswerBtn: 'Répondre',
    callDeclineBtn: 'Refuser',
    callHangupBtn: 'Raccrocher',
    callReplayVoiceBtn: 'Réécouter',
    callRecordHint: 'Astuce : Confiez le téléphone aux enfants ou lancez une seconde caméra avant de répondre.',
    callVoiceLang: 'fr-FR',
    callCountdownTitle: (sec) => `🎅 Le Père Noël lit votre lettre... appel dans ${sec}s`,
    callCountdownSubtitle: 'Montez le volume pour entendre son appel magique en direct !',
    callNowBtn: '⚡ Appeler maintenant',
    callMissedTitle: '📵 Oups ! Vous n’avez pas décroché à temps',
    callMissedSubtitle: 'Le téléphone a sonné 15 secondes. Demandez un nouvel appel du Pôle Nord !',
    callRetryCountdownBtn: '🔄 Attendre un autre appel du Père Noël',
    wallSectionTitle: '📸 Mur de Noël & Concours de Couverture',
    wallSectionSubtitle: "Partagez une photo de Noël et votez avec J'aime. La photo #1 devient la Couverture Officielle.",
    wallUploadTitle: 'Participer à la Couverture de Noël',
    wallPhotoTitleLabel: 'Titre court de la photo',
    wallPhotoTitlePlaceholder: 'Ex. Notre sapin illuminé en famille',
    wallAuthorLabel: 'Famille / Ville',
    wallAuthorPlaceholder: 'Ex. Famille Laurent · Paris',
    wallChooseFile: 'Choisir une photo de Noël',
    wallSubmitPhoto: 'Publier sur le Mur (+20 Points)',
    wallSortTop: 'Plus Votées',
    wallSortRecent: 'Plus Récentes',
    wallLikeBtn: "J'aime",
    wallLikedBtn: 'Aimé',
    wallReportBtn: '🚩 Signaler',
    wallReportDone: 'Signalé',
    wallParadeBtn: '🎬 Voir le Défilé Vidéo (Top Photos)',
    wallEmpty: 'Aucune photo visible pour le moment. Publiez le premier souvenir !',
    podiumTitle: '🏆 Podium Officiel Cloud (Top 3 des J’aime)',
    podiumFirstBadge: '🥇 1er Couverture Principale',
    podiumSecondBadge: '🥈 2e Place',
    podiumThirdBadge: '🥉 3e Place',
    carouselLiveBadge: '🔴 EN DIRECT • Mise à jour vitrine',
    carouselTitle: '✨ Vitrine Rotative en Direct (25 Photos Récentes)',
    carouselWebpHint: 'WebP ~30Ko · File FIFO · Filtre Familial',
    wallNsfwChecking: 'Vérification sécurité familiale...',
    wallNsfwRejected: '⚠️ Photo refusée par notre filtre de sécurité familiale.',
    paradeCountdownBanner: '⏳ Grand Défilé Vidéo de Noël : Sortie le 25 Décembre ! Publiez votre photo et récoltez des ❤️ J’aime pour apparaître.',
    paradeCountdownTime: (d, h, m) => `${d}j ${h}h ${m}m`,
    paradeLivePremiereBtn: '🎬 PREMIÈRE EN DIRECT ! Voir le Grand Défilé Vidéo de Noël (Top Photos)',
    paradeEndedBanner: '✨ Événement de Noël terminé ! À bientôt pour le Spécial Rois Mages.',
    paradeRankPrefix: 'Rang',
    paradeCloseBtn: 'Quitter le Défilé',
    paradePlayingMusic: 'Musique de Noël en cours',
    shareModalTitle: 'Partager la Magie de Noël',
    shareModalSubtitle: 'Partagez sur WhatsApp ou les réseaux et recevez +50 Points Magiques immédiatement.',
    shareCopyLink: 'Copier le lien',
    shareCopied: 'Lien copié !',
    trendsModalTitle: 'Intelligence Marché · Tendances Cadeaux',
    trendsModalSubtitle: 'Statistiques agrégées 100 % anonymes sans aucune donnée personnelle.',
    trendsTopGiftsTitle: '🏆 Top 10 des Cadeaux les Plus Demandés',
    trendsFilterCountry: 'Pays / Ville',
    trendsFilterLanguage: 'Langue',
    trendsFilterAgeRange: "Tranche d'âge",
    trendsAllOption: 'Tous',
    trendsExportCsvBtn: '📥 Exporter le Rapport Complet (.CSV Excel)',
    trendsTotalCountLabel: 'Demandes Anonymes',
    trendsUniqueGiftsLabel: 'Cadeaux Uniques',
    trendsNoData: 'Aucune donnée pour ces filtres.',
    trendsPinTitle: "Code d'Accès",
    trendsPinPlaceholder: 'Code',
    trendsPinUnlockBtn: 'Ouvrir le Panel',
    trendsPinError: 'Code incorrect',
    trendsSimulateDec25Btn: '👁️ Simuler la date du 25 Décembre',
    trendsSimulateDec25Active: '✅ Aperçu 25 Décembre actif (Appuyer pour couper)',
    trendsSimulateMidnightBtn: '🎆 Simuler Minuit de Noël',
    trendsSimulateMidnightActive: '🎆 Minuit Activé',
    christmasClockTitle: '⏳ Compte à rebours de Noël',
    christmasClockLiveTitle: '🎄 Joyeux Noël ! Minuit au Pôle Nord !',
    clockDays: 'Jours',
    clockHours: 'Heures',
    clockMinutes: 'Min',
    clockSeconds: 'Sec',
    writeSantaLetterHeroBtn: '✉️ Écrire ma Lettre au Père Noël',
    backToCoverBtn: '← Retour à l’Accueil',
    playSleighHeroBtn: '🎮 Jouer : Traîneau du Père Noël',
    playSleighAccessBadge: '👑 VIP Libre / 🎬 Gratuit avec Pub',
    adGateTitle: '🛷 Traîneau Magique : Mission Cadeaux',
    adGatePrompt: '🎬 Regardez une courte pub de Noël pour débloquer votre vol en traîneau gratuitement',
    adGateWatchBtn: '▶️ Voir la Pub et Jouer',
    adGateVipBtn: '👑 Ou entrez sans pub avec la Zone VIP',
    adGateCountdown: (sec) => `🎄 Publicité de Noël... déblocage dans ${sec}s`,
    adGateSimulatedSlot: 'AdSense / AdMob · Pub Récompensée de Noël',
    adGateSkipTestBtn: '⚡ Entrer directement',
    sleighGameTitle: '🛷 Traîneau Magique : Mission Cadeaux',
    sleighGameHint: 'Glissez un doigt ou bougez la souris pour piloter · Tir magique automatique',
    gameScoreLabel: 'Points',
    gameBestLabel: '🏆 Meilleur Record',
    gameLevelLabel: 'Niveau',
    gameLivesLabel: 'Vies',
    gamePauseBtn: 'Pause',
    gameResumeBtn: 'Reprendre',
    gameExitShortBtn: '← Quitter',
    gamePauseExitBtn: '🚪 Quitter',
    gameOverTitle: '🎄 Fin du Vol de Noël !',
    gameNewRecordBadge: '🏆 Nouveau Record ! +20 Points Magiques',
    gamePlayAgainBtn: '🔄 Rejouer',
    wallInvalidFileError: '❌ Seules les images JPEG, PNG ou WebP valides de moins de 5 Mo sont autorisées.',
    wallUploadRateLimitError: (sec) => `⏳ Anti-spam : veuillez patienter ${sec}s avant d’envoyer une autre photo.`,
    wallAlreadyVotedNotice: '❤️ Vous avez déjà voté pour cette photo sur cet appareil.',
    adSlotPlaceholder: 'ESPACE PUBLICITAIRE · SANTA MAGIA',
    privacyPolicyLinkLabel: '📜 Politique de Confidentialité et Conditions',
    privacyPolicyModalTitle: '📜 Politique de Confidentialité et Conditions · SANTA MAGIA',
    privacyPolicySections: [
      {
        title: '1. Aucune Donnée Personnelle ni sur les Mineurs',
        body: 'SANTA MAGIA ne conserve ni prénoms d’enfants, ni âges, ni listes de cadeaux, ni numéros WhatsApp sur ses serveurs.',
      },
      {
        title: '2. Sécurité du Mur Photo Familial',
        body: 'Chaque photo est compressée en WebP, filtrée automatiquement et limitée à 1 envoi toutes les 2 minutes et 1 vote par photo et par appareil.',
      },
      {
        title: '3. Cookies et Publicités Standard',
        body: 'SANTA MAGIA utilise des cookies standard et des régies publicitaires (Google AdSense ou Monetag) pour rester gratuit, avec une option sans pub dans la Zone VIP.',
      },
      {
        title: '4. Conditions d’Utilisation',
        body: 'Service réservé au divertissement familial de Noël. Tout spam ou tentative de fraude aux votes est interdit.',
      },
    ],
    pwaPromptTitle: 'Voulez-vous télécharger SANTA MAGIA sur votre téléphone ou continuer dans le navigateur ?',
    pwaDownloadBtn: '📲 Télécharger l’App',
    pwaContinueWebBtn: 'Continuer sur le web',
    pwaFooterInstallBtn: '📲 Télécharger l’App',
    pwaIosGuideTitle: 'Installer SANTA MAGIA sur iPhone / Safari',
    pwaIosStep1Title: '1. Touchez le bouton Partager',
    pwaIosStep1Desc: 'Appuyez sur l’icône Partager (carré avec flèche vers le haut) dans la barre Safari.',
    pwaIosStep2Title: '2. Touchez « Sur l’écran d’accueil »',
    pwaIosStep2Desc: 'Faites défiler vers le bas, choisissez « Sur l’écran d’accueil » puis Ajouter.',
    pwaBrowserGuideTitle: 'Installer SANTA MAGIA sur votre mobile',
    pwaBrowserStep1Title: '1. Ouvrez le menu du navigateur',
    pwaBrowserStep1Desc: 'Appuyez sur les trois points (⋮) en haut de votre navigateur Chrome.',
    pwaBrowserStep2Title: '2. Touchez « Installer l’application »',
    pwaBrowserStep2Desc: 'Confirmez pour ajouter l’icône rouge et or SANTA MAGIA sur votre écran d’accueil.',
    pwaOfflineBadge: 'Mode hors ligne — Données en cache actives',
    formatDisplayNames: (children) => formatChildNames(children.map((c) => c.name), 'et', 'Léo'),
    buildSalutation: (children) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const formatted = formatChildNames(children.map((c) => c.name), 'et', 'Léo');
      return isPlural ? `Chers ${formatted},` : `Cher / Chère ${formatted},`;
    },
    shareTextTemplate: (children) => `🎄✨ Découvre la Lettre Officielle et l'Appel Magique du Père Noël pour ${formatChildNames(children.map((c) => c.name), 'et', 'les enfants')} sur SANTA MAGIA ! 🎅📞`,
    buildParentWhatsappMessage: ({ children, city, behavior, sender, officialCode }) => {
      const cityTxt = city.trim() || '-';
      const behaviorTxt = behavior === 'super' ? 'Super Sage / Excellent' : behavior === 'very' ? 'Très Sage' : 'Fait beaucoup d’efforts';
      const senderTxt = sender === 'kings' ? 'Les Trois Rois Mages' : 'Le Père Noël';
      const lines = children.map((c, idx) => `${idx + 1}. *${c.name.trim() || `Enfant ${idx + 1}`}${c.age.trim() ? ` (${c.age.trim()})` : ''} :* ${c.gift.trim() || 'Surprise'}`).join('\n');
      return `🎄 *Tampon d’Arrivée Pôle Nord - SANTA MAGIA*\n\n🎁 *Souhaits reçus :*\n${lines}\n\n📍 *Ville :* ${cityTxt}\n⭐ *Comportement :* ${behaviorTxt}\n✉️ *Expéditeur :* ${senderTxt}\n🔖 *Code Officiel :* ${officialCode}`;
    },
    toastPointsEarned: (pts) => `⭐ Vous avez gagné +${pts} Points Magiques !`,
    toastPhotoUploaded: '📸 Votre photo participe maintenant au Concours de Couverture !',
    toastHdDownloaded: '📥 Image HD téléchargée avec succès !',
    toastReported: '🚩 Merci. Contenu masqué pour la sécurité familiale.',
    closeBtn: 'Fermer',
    elfNoteTitle: '🎄 Joyeux Noël !',
    elfNoteBody: 'Passez de merveilleuses fêtes entourés de vos proches. N’oubliez jamais que vous n’êtes jamais seul et qu’on vous aime très fort. Merci du fond du cœur d’utiliser notre application. À l’année prochaine !',
    elfNotePs: '😄 P.-S. : Qu’a dit un cadeau à un autre avant de monter dans le traîneau ? Couvre-toi bien, ce soir tout le monde va nous déballer !',
    elfNoteSignature: 'Signé : Le Lutin de Noël 🎄🧝‍♂️ (c’est moi qui ai écrit parce que le Père Noël était très occupé).',
    buildLetterParagraphs: ({ children, sender }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'et', 'Léo');
      if (sender === 'kings') {
        return isPlural
          ? [`Chers ${namesText}, quelle joie de ressentir votre enthousiasme à l’instant ! Nous avons rangé vos vœux dans notre coffre royal d’Orient pendant que nous préparons nos chameaux.`, `L’étoile guide toujours notre route vers les foyers remplis de tendresse. Continuez d’aider à la maison et de dormir tôt le soir venu.`, `À très bientôt sous le ciel étoilé !`]
          : [`Cher/Chère ${namesText}, quelle joie de ressentir ton enthousiasme à l’instant ! Nous avons rangé ta lettre dans notre coffre royal d’Orient pendant que nous préparons nos chameaux.`, `L’étoile guide toujours notre route vers les cœurs bienveillants. Continue d’aider à la maison et de dormir tôt le soir venu.`, `À très bientôt sous le ciel étoilé !`];
      }
      return isPlural
        ? [`Chers ${namesText}, quelle joie de vous avoir parlé au téléphone il y a un instant ! Vos lettres sont désormais rangées dans mon grand coffre doré près de la cheminée de l’atelier.`, `Rodolphe et les lutins préparent le traîneau pendant que nous soulignons vos prénoms dans le Grand Livre de Noël. Continuez à prendre soin les uns des autres et à remplir la maison de rires.`, `Préparez-vous pour un réveillon inoubliable !`]
        : [`Cher/Chère ${namesText}, quelle joie de t’avoir parlé au téléphone il y a un instant ! Ta lettre est désormais rangée dans mon grand coffre doré près de la cheminée de l’atelier.`, `Rodolphe et les lutins préparent le traîneau pendant que nous soulignons ton prénom dans le Grand Livre de Noël. Continue d’aider à la maison et de remplir le foyer de rires.`, `Prépare-toi pour un réveillon inoubliable !`];
    },
    buildCertificateBody: ({ children, city, behavior }) => {
      const namesText = formatChildNames(children.map((c) => c.name), 'et', 'Léo');
      const isPlural = children.filter((c) => c.name.trim()).length > 1;
      const cityTxt = city.trim() || 'sa ville';
      const qual = behavior === 'super' ? 'leur comportement exemplaire et leur grande gentillesse' : behavior === 'very' ? 'leur grande sagesse et leur joie de vivre' : 'leurs beaux efforts quotidiens et leur cœur généreux';
      if (isPlural) return `Par décret officiel, le Conseil du Pôle Nord certifie que ${namesText}, résidant à ${cityTxt}, figurent sur la Liste d’Or d’Honneur 2026 pour ${qual}.`;
      const ageTxt = children[0]?.age.trim() ? `, âgé(e) de ${children[0].age.trim()},` : '';
      return `Par décret officiel, le Conseil du Pôle Nord certifie que ${namesText}${ageTxt} résidant à ${cityTxt}, figure sur la Liste d’Or d’Honneur 2026 pour ${qual}.`;
    },
    buildSantaCallScript: ({ children }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'et', 'mon petit lutin');
      return isPlural
        ? `Ho, ho, ho ! Bonjour ${namesText}, c'est le Père Noël. Je viens tout juste de recevoir vos lettres ici au Pôle Nord ! Je vais parler avec votre maman et votre papa pour leur demander comment vous vous êtes comportés cette année, et selon votre comportement je vous apporterai une surprise très spéciale. Je vous laisse aussi une lettre signée de ma main !`
        : `Ho, ho, ho ! Bonjour ${namesText}, c'est le Père Noël. Je viens tout juste de recevoir ta lettre ici au Pôle Nord ! Je vais parler avec ta maman et ton papa pour leur demander comment tu t'es comporté cette année, et selon ton comportement je t'apporterai une surprise très spéciale. Je te laisse aussi une lettre signée de ma main !`;
    },
    samplePhotos: [
      { id: 'sample-1', title: 'Sapin illuminé en attendant le Père Noël', author: 'Famille Moreau · Lyon' },
      { id: 'sample-2', title: 'Biscuits étoilés et lait chaud pour Santa', author: 'Camille & Léo · Montréal' },
      { id: 'sample-3', title: 'Chalet enneigé sous les lumières d’hiver', author: 'Famille Blanc · Chamonix' },
      { id: 'sample-4', title: 'Chaussettes tricotées près de la cheminée', author: 'Clara & Arthur · Bordeaux' },
    ],
  },

  de: {
    appName: 'SANTA MAGIA',
    appTagline: 'Weihnachtsbrief & Anruf vom Weihnachtsmann',
    magicPointsLabel: 'Magiepunkte',
    soundOn: 'Ton an',
    soundOff: 'Stumm',
    musicOnBtn: '🎵 Musik: AN',
    musicOffBtn: '🎵 Musik: AUS',
    navHome: 'Titelseite',
    navLetter: 'HD Brief',
    navCall: 'Anruf',
    navWall: 'Fotowand',
    heroOfficialBadge: '👑 Offizielles Weihnachtscover (Meiste Stimmen)',
    heroWinnerTitle: 'Nordpol-Zauber für Zuhause',
    heroLikesLabel: 'Gefällt mir',
    heroByLabel: 'Familie',
    heroCallCta: '📞 Der Weihnachtsmann ruft an!',
    heroLetterCta: '✉️ Brief an den Nordpol senden',
    heroParadeCta: '🎬 Video-Parade ansehen (Top Fotos)',
    heroQuickIntro: 'Schreibt den Brief für ein oder mehrere Kinder, sendet ihn an den Nordpol, nehmt den Anruf vom Weihnachtsmann an und enthüllt danach seinen unterschriebenen Brief.',
    vipZoneTopBtn: '👑 VIP-Zone Werbefrei',
    vipExclusiveBadge: '👑 VIP',
    redeemPointsBadge: '⭐ Mit Magiepunkten einlösen',
    magicPassBtn: '👑 VIP-Zone Werbefrei',
    magicPassTitle: '👑 VIP-Zone Werbefrei',
    magicPassSubtitle: 'Schalte sofort alle VIP-Pergamente & Urkunden für deine Familie frei',
    magicPassPerk1: '🚫 Null Werbung',
    magicPassPerk2: '📜 Alle Pergamente & Urkunden Freigeschaltet',
    magicPassPerk3: '⚡ Sofortiger Zugang',
    magicPassPriceLabel: '$2.99 USD',
    magicPassDemoNote: 'Demo-Modus aktiv: Tippe unten, um das volle VIP-Paket ohne echte Kosten zu testen.',
    magicPassConfirm: 'VIP-Zone aktivieren ($2.99 USD)',
    magicPassUnlocked: 'VIP-Zone aktiviert! Alles ist freigeschaltet.',
    magicPassActiveBadge: '👑 VIP-Zone Aktiv',
    vipKofiNote: 'Hol dir deinen VIP-Pass sicher über Ko-fi und erhalte sofort deinen Freischaltcode.',
    vipCodeLabel: 'Hast du schon deinen VIP-Aktivierungscode?',
    vipCodePlaceholder: 'VIP-Code eingeben',
    vipCodeSubmitBtn: '🔓 Aktivieren',
    vipCodeError: 'Ungültiger VIP-Code. Bitte überprüfe deine Eingabe.',
    vipWelcomeMessage: '👑 Willkommen in der werbefreien VIP-Zone! Alle Anzeigen sind dauerhaft entfernt.',
    adBannerLabel: 'Familienbereich',
    adBannerText: 'Genieße den vollen Weihnachtszauber mit deiner Familie.',
    adBannerRemove: '👑 VIP-Zone Werbefrei',
    privacyNoticeText: '🔒 Datenschutz für Kinder: Wir speichern niemals Namen oder Telefonnummern; nur anonyme Weihnachtstrends.',
    preSendPrivacyBanner: '🔒 Datenschutz Garantiert: Deine Angaben und Nachrichten werden nur mit den von dir gewählten Personen geteilt. Diese App speichert keine personenbezogenen Daten.',
    letterSectionTitle: 'Magischer Brief an den Nordpol',
    letterSectionSubtitle: 'Füge bis zu 5 Kinder im selben Haushalt hinzu. Nach dem Senden ruft der Weihnachtsmann zuerst an und enthüllt anschließend seinen Brief.',
    childNumberLabel: (idx) => `Kind #${idx}`,
    addSiblingBtn: '➕ Weiteres Kind hinzufügen',
    removeSiblingAria: 'Kind entfernen',
    allSiblingsTab: 'Alle zusammen',
    fieldChildName: 'Name',
    fieldChildNamePlaceholder: 'z. B. Lukas, Mia...',
    fieldAge: 'Alter',
    fieldAgePlaceholder: 'z. B. 6',
    fieldCity: 'Stadt / Land',
    fieldCityPlaceholder: 'z. B. München, Deutschland',
    fieldBehavior: 'Verhalten in diesem Jahr',
    behaviorSuper: 'Super Brav / Ausgezeichnet',
    behaviorVery: 'Sehr Brav',
    behaviorTrying: 'Gibt sich viel Mühe',
    fieldGift: 'Wunschgeschenk',
    fieldGiftPlaceholder: 'z. B. Rotes Fahrrad, Lego...',
    fieldSender: 'Offizieller Absender',
    senderSanta: '🎅 Weihnachtsmann',
    senderKings: '👑 Die Heiligen Drei Könige',
    fieldWhatsappLabel: '📱 Kontakttelefon zu Hause (WhatsApp)',
    fieldWhatsappOtherOption: 'Andere (+...)',
    fieldWhatsappCustomPrefixPlaceholder: '+...',
    fieldWhatsappPlaceholder: 'z. B. 1701234567',
    fieldWhatsappHint: 'Damit die Nordpol-Wichtel den offiziellen Ankunftsstempel senden können.',
    sendToNorthPoleBtn: '✉️ Brief an den Nordpol senden',
    sendingTitle: 'Fliegt zum Nordpol...',
    sendingSubtitle: 'Die Wichtel haben den magischen Umschlag erhalten und verbinden jetzt den Anruf.',
    sealedWaitingTitle: 'Versiegeltes Pergament unterwegs',
    sealedWaitingSubtitle: 'Tippe auf „Brief an den Nordpol senden“, um zuerst den Anruf des Weihnachtsmanns anzunehmen und danach den Brief zu enthüllen.',
    responseReadyBanner: '✨ Offizieller Brief vom Weihnachtsmann enthüllt!',
    openWhatsappFallback: '📲 Ankunftsstempel per WhatsApp',
    fieldTheme: 'Pergament- / Urkunden-Stil',
    themeClassic: 'Klassisches Nordpol-Pergament',
    themeRoyal: 'Königsgold Samt VIP',
    themeAurora: 'Polarnacht VIP',
    themeCertificate: 'Offizielle Braven-Kind-Urkunde',
    freeLabel: 'Gratis',
    unlockWithPoints: 'Einlösen',
    unlockedLabel: 'Freigeschaltet',
    notEnoughPoints: 'Teile den Link (+50 Pkt.) oder lade ein Foto hoch, um mehr Magiepunkte zu sammeln.',
    downloadHdBtn: '📥 HD-Brief herunterladen (Bild)',
    sharePointsBtn: '📲 Teilen (+50 Punkte)',
    callWithChildBtn: '📞 Der Weihnachtsmann ruft an!',
    northPoleDispatch: 'OFFIZIELLE NORDPOL-POST',
    magiRoyalDispatch: 'KÖNIGLICHE MORGENLAND-POST · DREI KÖNIGE',
    officialCodeLabel: 'OFFIZIELLER CODE',
    letterSignatureSanta: 'Mit weihnachtlichen Grüßen, Dein Weihnachtsmann',
    letterSignatureKings: 'Caspar, Melchior & Balthasar',
    letterSealText: 'NORDPOL · OFFIZIELL',
    certificateTitle: 'OFFIZIELLE BRAVEN-KIND-URKUNDE',
    certificateSubtitle: 'Ehrenregister Weihnachten 2026',
    certificateAwardedTo: 'Stolz verliehen an',
    certificateSealLabel: 'BESTÄTIGT DURCH DAS GOLDENE BUCH',
    callSectionTitle: 'Direktleitung vom Nordpol',
    callSectionSubtitle: 'Dreh die Lautstärke auf und halte deine Kamera bereit, wenn der Weihnachtsmann persönlich spricht.',
    callTriggerBtn: '📞 Der Weihnachtsmann ruft an!',
    callIncomingStatus: 'Magischer eingehender Anruf...',
    callConnectedStatus: 'Live aus der Nordpol-Werkstatt',
    callVoicePlayingNote: 'Der Weihnachtsmann spricht live...',
    callCallerSanta: 'Weihnachtsmann',
    callCallerLocation: 'Nordpol · Privatleitung',
    callAnswerBtn: 'Annehmen',
    callDeclineBtn: 'Ablehnen',
    callHangupBtn: 'Auflegen',
    callReplayVoiceBtn: 'Noch einmal anhören',
    callRecordHint: 'Tipp: Gib das Handy den Kindern oder starte eine zweite Kamera vor dem Annehmen.',
    callVoiceLang: 'de-DE',
    callCountdownTitle: (sec) => `🎅 Der Weihnachtsmann liest deinen Brief... Anruf in ${sec}s`,
    callCountdownSubtitle: 'Stell die Lautstärke hoch, damit alle seinen Anruf hören können!',
    callNowBtn: '⚡ Jetzt anrufen',
    callMissedTitle: '📵 Ups! Du hast nicht rechtzeitig abgenommen',
    callMissedSubtitle: 'Es hat 15 Sekunden geklingelt. Starte einen neuen Anruf-Countdown!',
    callRetryCountdownBtn: '🔄 Auf weiteren Anruf warten',
    wallSectionTitle: '📸 Weihnachtsfoto-Wand & Cover-Wettbewerb',
    wallSectionSubtitle: 'Lade ein Weihnachtsfoto hoch und stimme ab. Foto #1 erscheint automatisch auf der Titelseite.',
    wallUploadTitle: 'Am Weihnachtscover teilnehmen',
    wallPhotoTitleLabel: 'Kurzer Fototitel',
    wallPhotoTitlePlaceholder: 'z. B. Unser leuchtender Weihnachtsbaum',
    wallAuthorLabel: 'Familie / Stadt',
    wallAuthorPlaceholder: 'z. B. Familie Becker · Hamburg',
    wallChooseFile: 'Weihnachtsfoto wählen',
    wallSubmitPhoto: 'An die Wand posten (+20 Punkte)',
    wallSortTop: 'Meiste Stimmen',
    wallSortRecent: 'Neueste',
    wallLikeBtn: 'Gefällt mir',
    wallLikedBtn: 'Gefällt dir',
    wallReportBtn: '🚩 Melden',
    wallReportDone: 'Gemeldet',
    wallParadeBtn: '🎬 Video-Parade ansehen (Top Fotos)',
    wallEmpty: 'Noch keine Fotos sichtbar. Teile die erste Weihnachtserinnerung!',
    podiumTitle: '🏆 Offizielles Cloud-Podium (Top 3 Meiste Likes)',
    podiumFirstBadge: '🥇 1. Haupttitelbild',
    podiumSecondBadge: '🥈 2. Platz',
    podiumThirdBadge: '🥉 3. Platz',
    carouselLiveBadge: '🔴 LIVE • Schaufenster aktualisiert',
    carouselTitle: '✨ Live-Karussell (25 Aktuelle Fotos)',
    carouselWebpHint: 'WebP ~30KB · FIFO-Warteschlange · Familienschutz',
    wallNsfwChecking: 'Familienschutz wird geprüft...',
    wallNsfwRejected: '⚠️ Foto vom Familienschutz-Filter abgelehnt.',
    paradeCountdownBanner: '⏳ Große Weihnachtsvideo-Parade: Premiere am 25. Dezember! Lade ein Foto hoch und sammle ❤️ Likes fürs Video.',
    paradeCountdownTime: (d, h, m) => `${d}T ${h}Std ${m}Min`,
    paradeLivePremiereBtn: '🎬 LIVE-PREMIERE! Große Weihnachtsvideo-Parade ansehen (Top Fotos)',
    paradeEndedBanner: '✨ Weihnachts-Event beendet! Bis zum Dreikönigs-Special.',
    paradeRankPrefix: 'Platz',
    paradeCloseBtn: 'Parade verlassen',
    paradePlayingMusic: 'Weihnachtsmusik läuft',
    shareModalTitle: 'Weihnachtszauber teilen',
    shareModalSubtitle: 'Teile per WhatsApp oder Social Media und erhalte sofort +50 Magiepunkte.',
    shareCopyLink: 'Link kopieren',
    shareCopied: 'Link kopiert!',
    trendsModalTitle: 'Marktanalyse · Anonyme Geschenketrends',
    trendsModalSubtitle: 'Vollständig anonyme Statistiken ohne persönliche Daten.',
    trendsTopGiftsTitle: '🏆 Top 10 der gefragtesten Geschenke',
    trendsFilterCountry: 'Land / Stadt',
    trendsFilterLanguage: 'Sprache',
    trendsFilterAgeRange: 'Altersgruppe',
    trendsAllOption: 'Alle',
    trendsExportCsvBtn: '📥 Bericht exportieren (.CSV für Excel)',
    trendsTotalCountLabel: 'Anonyme Wünsche',
    trendsUniqueGiftsLabel: 'Einzigartige Geschenke',
    trendsNoData: 'Keine Einträge für diese Filter.',
    trendsPinTitle: 'Zugangscode',
    trendsPinPlaceholder: 'Code',
    trendsPinUnlockBtn: 'Panel öffnen',
    trendsPinError: 'Falscher Code',
    trendsSimulateDec25Btn: '👁️ Datum 25. Dezember simulieren',
    trendsSimulateDec25Active: '✅ 25.-Dezember-Vorschau aktiv (Tippen zum Beenden)',
    trendsSimulateMidnightBtn: '🎆 Weihnachts-Mitternacht simulieren',
    trendsSimulateMidnightActive: '🎆 Mitternacht Aktiv',
    christmasClockTitle: '⏳ Countdown bis Weihnachten',
    christmasClockLiveTitle: '🎄 Frohe Weihnachten! Mitternacht am Nordpol!',
    clockDays: 'Tage',
    clockHours: 'Std',
    clockMinutes: 'Min',
    clockSeconds: 'Sek',
    writeSantaLetterHeroBtn: '✉️ Meinen Brief an den Weihnachtsmann schreiben',
    backToCoverBtn: '← Zurück zur Startseite',
    playSleighHeroBtn: '🎮 Spielen: Weihnachtsmann-Schlitten',
    playSleighAccessBadge: '👑 VIP Frei / 🎬 Gratis mit Werbung',
    adGateTitle: '🛷 Zauberschlitten: Geschenke-Mission',
    adGatePrompt: '🎬 Schau dir einen kurzen Weihnachts-Spot an, um deinen Schlittenflug gratis freizuschalten',
    adGateWatchBtn: '▶️ Werbung ansehen & Spielen',
    adGateVipBtn: '👑 Oder werbefrei mit der VIP-Zone',
    adGateCountdown: (sec) => `🎄 Weihnachts-Spot... Start in ${sec}s`,
    adGateSimulatedSlot: 'AdSense / AdMob · Weihnachts-Prämienanzeige',
    adGateSkipTestBtn: '⚡ Direkt starten',
    sleighGameTitle: '🛷 Zauberschlitten: Geschenke-Mission',
    sleighGameHint: 'Mit einem Finger wischen oder Maus bewegen · Automatisches Zauberfeuer',
    gameScoreLabel: 'Punkte',
    gameBestLabel: '🏆 Bestleistung',
    gameLevelLabel: 'Level',
    gameLivesLabel: 'Leben',
    gamePauseBtn: 'Pause',
    gameResumeBtn: 'Weiter',
    gameExitShortBtn: '← Beenden',
    gamePauseExitBtn: '🚪 Beenden',
    gameOverTitle: '🎄 Weihnachtsflug beendet!',
    gameNewRecordBadge: '🏆 Neuer Rekord! +20 Magiepunkte',
    gamePlayAgainBtn: '🔄 Nochmal spielen',
    wallInvalidFileError: '❌ Nur gültige JPEG-, PNG- oder WebP-Bilder unter 5 MB sind erlaubt.',
    wallUploadRateLimitError: (sec) => `⏳ Anti-Spam: Bitte warte ${sec}s vor dem nächsten Foto-Upload.`,
    wallAlreadyVotedNotice: '❤️ Du hast für dieses Foto auf diesem Gerät bereits abgestimmt.',
    adSlotPlaceholder: 'WERBEPLATZ · SANTA MAGIA',
    privacyPolicyLinkLabel: '📜 Datenschutz & Nutzungsbedingungen',
    privacyPolicyModalTitle: '📜 Datenschutz & Nutzungsbedingungen · SANTA MAGIA',
    privacyPolicySections: [
      {
        title: '1. Keine Speicherung personenbezogener oder Kinderdaten',
        body: 'SANTA MAGIA speichert keine Kindernamen, Altersangaben, Wunschlisten oder WhatsApp-Nummern auf Servern.',
      },
      {
        title: '2. Sicherheit der Familien-Fotowand',
        body: 'Fotos werden lokal als WebP komprimiert, automatisch geprüft und auf 1 Upload alle 2 Minuten sowie 1 Stimme pro Foto und Gerät begrenzt.',
      },
      {
        title: '3. Cookies & Standard-Werbung',
        body: 'SANTA MAGIA nutzt Standard-Cookies und Werbenetzwerke (wie Google AdSense oder Monetag), um den Dienst kostenlos anzubieten, sowie eine werbefreie VIP-Zone.',
      },
      {
        title: '4. Nutzungsbedingungen',
        body: 'Reines Familien-Unterhaltungsangebot. Spam oder Manipulation von Abstimmungen sind untersagt.',
      },
    ],
    pwaPromptTitle: 'Möchtest du SANTA MAGIA auf dein Handy herunterladen oder im Browser fortfahren?',
    pwaDownloadBtn: '📲 App herunterladen',
    pwaContinueWebBtn: 'Im Browser bleiben',
    pwaFooterInstallBtn: '📲 App herunterladen',
    pwaIosGuideTitle: 'SANTA MAGIA auf iPhone / Safari installieren',
    pwaIosStep1Title: '1. Auf „Teilen“ tippen',
    pwaIosStep1Desc: 'Tippe unten in Safari auf das Teilen-Symbol (Quadrat mit Pfeil nach oben).',
    pwaIosStep2Title: '2. „Zum Home-Bildschirm“ wählen',
    pwaIosStep2Desc: 'Scrolle nach unten, tippe auf „Zum Home-Bildschirm“ und dann auf Hinzufügen.',
    pwaBrowserGuideTitle: 'SANTA MAGIA auf dem Handy installieren',
    pwaBrowserStep1Title: '1. Browser-Menü öffnen',
    pwaBrowserStep1Desc: 'Tippe oben rechts im Chrome-Menü auf die drei Punkte (⋮).',
    pwaBrowserStep2Title: '2. „App installieren“ antippen',
    pwaBrowserStep2Desc: 'Bestätige, um das rot-goldene SANTA MAGIA Symbol auf deinem Startbildschirm abzulegen.',
    pwaOfflineBadge: 'Offline-Modus — Zwischengespeicherte Daten aktiv',
    formatDisplayNames: (children) => formatChildNames(children.map((c) => c.name), 'und', 'Lukas'),
    buildSalutation: (children) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const formatted = formatChildNames(children.map((c) => c.name), 'und', 'Lukas');
      return isPlural ? `Liebe ${formatted},` : `Liebe(r) ${formatted},`;
    },
    shareTextTemplate: (children) => `🎄✨ Sieh dir den offiziellen Brief & Anruf vom Weihnachtsmann für ${formatChildNames(children.map((c) => c.name), 'und', 'die Kinder')} auf SANTA MAGIA an! 🎅📞`,
    buildParentWhatsappMessage: ({ children, city, behavior, sender, officialCode }) => {
      const cityTxt = city.trim() || '-';
      const behaviorTxt = behavior === 'super' ? 'Super Brav / Ausgezeichnet' : behavior === 'very' ? 'Sehr Brav' : 'Gibt sich viel Mühe';
      const senderTxt = sender === 'kings' ? 'Die Heiligen Drei Könige' : 'Weihnachtsmann';
      const lines = children.map((c, idx) => `${idx + 1}. *${c.name.trim() || `Kind ${idx + 1}`}${c.age.trim() ? ` (${c.age.trim()})` : ''}:* ${c.gift.trim() || 'Überraschung'}`).join('\n');
      return `🎄 *Nordpol-Ankunftsstempel - SANTA MAGIA*\n\n🎁 *Wunschliste erhalten:*\n${lines}\n\n📍 *Stadt:* ${cityTxt}\n⭐ *Verhalten:* ${behaviorTxt}\n✉️ *Absender:* ${senderTxt}\n🔖 *Offizieller Code:* ${officialCode}`;
    },
    toastPointsEarned: (pts) => `⭐ Du hast +${pts} Magiepunkte erhalten!`,
    toastPhotoUploaded: '📸 Dein Foto nimmt jetzt am Cover-Wettbewerb teil!',
    toastHdDownloaded: '📥 HD-Bild erfolgreich heruntergeladen!',
    toastReported: '🚩 Danke. Inhalt zum Schutz der Familie ausgeblendet.',
    closeBtn: 'Schließen',
    elfNoteTitle: '🎄 Frohe Weihnachten!',
    elfNoteBody: 'Wir wünschen dir wunderschöne Feiertage im Kreise deiner Liebsten. Vergiss niemals, dass du nie allein bist und von Herzen geliebt wirst. Vielen lieben Dank, dass du unsere App nutzt. Bis im neuen Jahr!',
    elfNotePs: '😄 P.S.: Was sagte ein Geschenk zum anderen, bevor es auf den Schlitten stieg? Zieh dich warm an, heute Abend werden wir alle ausgepackt!',
    elfNoteSignature: 'Unterschrift: Der Weihnachtswichtel 🎄🧝‍♂️ (ich habe geschrieben, weil der Weihnachtsmann total beschäftigt war).',
    buildLetterParagraphs: ({ children, sender }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'und', 'Lukas');
      if (sender === 'kings') {
        return isPlural
          ? [`Liebe ${namesText}, was für eine Freude, eure Begeisterung eben zu spüren! Wir haben eure Wünsche sicher in unserer königlichen Truhe aus dem Morgenland verstaut.`, `Der helle Stern leitet uns immer zu liebevollen Familien. Helft weiterhin fröhlich zu Hause mit und schlaft in der magischen Nacht früh ein.`, `Bis bald unter dem Sternenhimmel!`]
          : [`Liebe(r) ${namesText}, was für eine Freude, deine Begeisterung eben zu spüren! Wir haben deinen Brief sicher in unserer königlichen Truhe aus dem Morgenland verstaut.`, `Der helle Stern leitet uns immer zu gütigen Herzen. Hilf weiterhin fröhlich zu Hause mit und schlaf in der magischen Nacht früh ein.`, `Bis bald unter dem Sternenhimmel!`];
      }
      return isPlural
        ? [`Liebe ${namesText}, was für eine Freude, vorhin mit euch zu telefonieren! Eure Briefe liegen jetzt sicher in meiner großen goldenen Truhe neben dem Kamin in der Werkstatt.`, `Rudolf und die Wichtel polieren schon den Schlitten, während wir eure Namen im Großen Weihnachtsbuch markieren. Haltet immer zusammen und füllt euer Zuhause mit Lachen.`, `Freut euch auf einen unvergesslichen Heiligabend!`]
        : [`Liebe(r) ${namesText}, was für eine Freude, vorhin mit dir zu telefonieren! Dein Brief liegt jetzt sicher in meiner großen goldenen Truhe neben dem Kamin in der Werkstatt.`, `Rudolf und die Wichtel polieren schon den Schlitten, während wir deinen Namen im Großen Weihnachtsbuch markieren. Hilf weiterhin zu Hause mit und fülle euer Zuhause mit Lachen.`, `Freu dich auf einen unvergesslichen Heiligabend!`];
    },
    buildCertificateBody: ({ children, city, behavior }) => {
      const namesText = formatChildNames(children.map((c) => c.name), 'und', 'Lukas');
      const isPlural = children.filter((c) => c.name.trim()).length > 1;
      const cityTxt = city.trim() || 'seiner Heimatstadt';
      const qual = behavior === 'super' ? 'vorbildliches Verhalten und große Herzensgüte' : behavior === 'very' ? 'sehr braves Verhalten und fröhliche Hilfsbereitschaft' : 'tollen täglichen Einsatz und freundliches Wesen';
      if (isPlural) return `Hiermit bestätigt der Hohe Rat des Nordpols offiziell, dass ${namesText} aus ${cityTxt} durch ${qual} einen Ehrenplatz auf der Goldenen Liste 2026 erhalten haben.`;
      const ageTxt = children[0]?.age.trim() ? `, ${children[0].age.trim()},` : '';
      return `Hiermit bestätigt der Hohe Rat des Nordpols offiziell, dass ${namesText}${ageTxt} aus ${cityTxt}, durch ${qual} einen Ehrenplatz auf der Goldenen Liste 2026 erhalten hat.`;
    },
    buildSantaCallScript: ({ children }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'und', 'mein Freund');
      return isPlural
        ? `Ho, ho, ho! Hallo ${namesText}, hier ist der Weihnachtsmann. Ich habe eure Briefe gerade hier am Nordpol erhalten! Ich werde mit eurer Mama und eurem Papa sprechen, um zu fragen, wie brav ihr dieses Jahr wart, und je nach eurem Verhalten bringe ich euch eine ganz besondere Überraschung. Ich hinterlasse euch auch einen von mir unterschriebenen Brief!`
        : `Ho, ho, ho! Hallo ${namesText}, hier ist der Weihnachtsmann. Ich habe deinen Brief gerade hier am Nordpol erhalten! Ich werde mit deiner Mama und deinem Papa sprechen, um zu fragen, wie brav du dieses Jahr warst, und je nach deinem Verhalten bringe ich dir eine ganz besondere Überraschung. Ich hinterlasse dir auch einen von mir unterschriebenen Brief!`;
    },
    samplePhotos: [
      { id: 'sample-1', title: 'Leuchtender Baum wartet auf den Weihnachtsmann', author: 'Familie Weber · München' },
      { id: 'sample-2', title: 'Zimtsterne und warme Milch für Santa', author: 'Mia & Jonas · Wien' },
      { id: 'sample-3', title: 'Verschneite Berghütte im Weihnachtsglanz', author: 'Familie Keller · Zürich' },
      { id: 'sample-4', title: 'Weihnachtssocken bereit am warmen Kamin', author: 'Clara & Lukas · Berlin' },
    ],
  },

  it: {
    appName: 'SANTA MAGIA',
    appTagline: 'Lettera e Chiamata di Babbo Natale',
    magicPointsLabel: 'Punti Magici',
    soundOn: 'Audio attivo',
    soundOff: 'Silenzioso',
    musicOnBtn: '🎵 Musica: ON',
    musicOffBtn: '🎵 Musica: OFF',
    navHome: 'Copertina',
    navLetter: 'Lettera HD',
    navCall: 'Chiamata',
    navWall: 'Muro Foto',
    heroOfficialBadge: '👑 Copertina Ufficiale di Natale (Più Votata)',
    heroWinnerTitle: 'La Magia del Polo Nord a Casa',
    heroLikesLabel: 'Mi Piace',
    heroByLabel: 'Famiglia',
    heroCallCta: '📞 Babbo Natale sta chiamando!',
    heroLetterCta: '✉️ Invia Lettera al Polo Nord',
    heroParadeCta: '🎬 Guarda Video Sfilata (Top Foto)',
    heroQuickIntro: 'Scrivi la letterina per uno o più fratelli, inviala al Polo Nord, rispondi alla chiamata magica di Babbo Natale e scopri la sua lettera firmata.',
    vipZoneTopBtn: '👑 Zona VIP Senza Pubblicità',
    vipExclusiveBadge: '👑 VIP',
    redeemPointsBadge: '⭐ Riscatta con Punti Magici',
    magicPassBtn: '👑 Zona VIP Senza Pubblicità',
    magicPassTitle: '👑 Zona VIP Senza Pubblicità',
    magicPassSubtitle: 'Sblocca subito tutta la collezione VIP per la tua famiglia',
    magicPassPerk1: '🚫 Zero Pubblicità',
    magicPassPerk2: '📜 Tutte le Pergamene e i Certificati Sbloccati',
    magicPassPerk3: '⚡ Accesso Istantaneo',
    magicPassPriceLabel: '$2.99 USD',
    magicPassDemoNote: 'Modalità Demo Attiva: Tocca qui sotto per provare subito lo sblocco completo senza costi reali.',
    magicPassConfirm: 'Attiva Zona VIP ($2.99 USD)',
    magicPassUnlocked: 'Zona VIP attivata! Tutto è sbloccato.',
    magicPassActiveBadge: '👑 Zona VIP Attiva',
    vipKofiNote: 'Acquista il tuo Pass VIP in sicurezza su Ko-fi e ricevi subito il codice di attivazione.',
    vipCodeLabel: 'Hai già il tuo codice di attivazione VIP?',
    vipCodePlaceholder: 'Inserisci il codice VIP',
    vipCodeSubmitBtn: '🔓 Attiva',
    vipCodeError: 'Codice VIP non valido. Controlla e riprova.',
    vipWelcomeMessage: '👑 Benvenuto nella Zona VIP Senza Pubblicità! Tutti gli annunci sono stati rimossi per sempre.',
    adBannerLabel: 'Spazio Famiglia',
    adBannerText: 'Vivi la magia del Natale insieme alla tua famiglia.',
    adBannerRemove: '👑 Zona VIP Senza Pubblicità',
    privacyNoticeText: '🔒 Privacy dei Bambini Protetta: Non salviamo nomi né numeri di telefono; solo statistiche anonime delle tendenze natalizie.',
    preSendPrivacyBanner: '🔒 Privacy Garantita: I tuoi dati e messaggi vengono condivisi solo con le persone che scegli tu. Questa app non memorizza alcun dato personale.',
    letterSectionTitle: 'Lettera Magica al Polo Nord',
    letterSectionSubtitle: 'Aggiungi fino a 5 bambini della stessa casa. Invia la letterina per ricevere prima la chiamata di Babbo Natale e svelare poi la sua lettera firmata.',
    childNumberLabel: (idx) => `Bimbo/a #${idx}`,
    addSiblingBtn: '➕ Aggiungi un altro bambino/a',
    removeSiblingAria: 'Rimuovi bambino',
    allSiblingsTab: 'Tutti insieme',
    fieldChildName: 'Nome',
    fieldChildNamePlaceholder: 'Es. Lorenzo, Giulia...',
    fieldAge: 'Età',
    fieldAgePlaceholder: 'Es. 6',
    fieldCity: 'Città e Paese',
    fieldCityPlaceholder: 'Es. Milano, Italia',
    fieldBehavior: 'Comportamento quest’anno',
    behaviorSuper: 'Bravissimo / Eccellente',
    behaviorVery: 'Molto Bravo',
    behaviorTrying: 'Si sta impegnando tanto',
    fieldGift: 'Regalo desiderato',
    fieldGiftPlaceholder: 'Es. Bicicletta rossa, Lego...',
    fieldSender: 'Mittente Ufficiale',
    senderSanta: '🎅 Babbo Natale',
    senderKings: '👑 I Tre Re Magi',
    fieldWhatsappLabel: '📱 Telefono di contatto di casa (WhatsApp)',
    fieldWhatsappOtherOption: 'Altro (+...)',
    fieldWhatsappCustomPrefixPlaceholder: '+...',
    fieldWhatsappPlaceholder: 'Es. 3331234567',
    fieldWhatsappHint: 'Affinché i folletti del Polo Nord inviino il timbro di conferma di arrivo.',
    sendToNorthPoleBtn: '✉️ Invia Lettera al Polo Nord',
    sendingTitle: 'In volo verso il Polo Nord...',
    sendingSubtitle: 'I folletti hanno appena ricevuto la busta magica e stanno collegando la chiamata.',
    sealedWaitingTitle: 'Pergamena sigillata in viaggio',
    sealedWaitingSubtitle: 'Premi "Invia Lettera al Polo Nord" per rispondere prima alla chiamata di Babbo Natale e svelare poi la sua lettera firmata.',
    responseReadyBanner: '✨ Lettera ufficiale di Babbo Natale svelata e firmata!',
    openWhatsappFallback: '📲 Timbro di conferma su WhatsApp',
    fieldTheme: 'Stile Pergamena / Certificato',
    themeClassic: 'Pergamena Classica Polo Nord',
    themeRoyal: 'Velluto Oro Reale VIP',
    themeAurora: 'Notte Polare VIP',
    themeCertificate: 'Certificato Ufficiale Bimbo Buono',
    freeLabel: 'Gratis',
    unlockWithPoints: 'Sblocca',
    unlockedLabel: 'Sbloccato',
    notEnoughPoints: 'Condividi (+50 pt) o carica una foto per guadagnare Punti Magici.',
    downloadHdBtn: '📥 Scarica Lettera HD (Immagine)',
    sharePointsBtn: '📲 Condividi sui Social (+50 Punti)',
    callWithChildBtn: '📞 Babbo Natale sta chiamando!',
    northPoleDispatch: 'DISPACIO UFFICIALE DEL POLO NORD',
    magiRoyalDispatch: 'CORRIERE REALE D’ORIENTE · TRE RE MAGI',
    officialCodeLabel: 'CODICE UFFICIALE',
    letterSignatureSanta: 'Con tutto l’affetto magico, Babbo Natale',
    letterSignatureKings: 'Gaspare, Melchiorre e Baldassarre',
    letterSealText: 'POLO NORD · UFFICIALE',
    certificateTitle: 'CERTIFICATO UFFICIALE DI BIMBO BUONO',
    certificateSubtitle: 'Registro d’Onore di Natale 2026',
    certificateAwardedTo: 'Conferito con orgoglio a',
    certificateSealLabel: 'APPROVATO DAL GRANDE LIBRO D’ORO',
    callSectionTitle: 'Chiamata Diretta dal Polo Nord',
    callSectionSubtitle: 'Alza il volume e prepara la fotocamera per filmare la reazione quando Babbo Natale parla dal vivo.',
    callTriggerBtn: '📞 Babbo Natale sta chiamando!',
    callIncomingStatus: 'Chiamata magica in arrivo...',
    callConnectedStatus: 'In diretta dal Laboratorio del Polo Nord',
    callVoicePlayingNote: 'Ascolto di Babbo Natale dal vivo...',
    callCallerSanta: 'Babbo Natale',
    callCallerLocation: 'Polo Nord · Linea Privata',
    callAnswerBtn: 'Rispondi',
    callDeclineBtn: 'Rifiuta',
    callHangupBtn: 'Chiudi Chiamata',
    callReplayVoiceBtn: 'Riascolta',
    callRecordHint: 'Consiglio: Dai il telefono ai bambini o prepara una seconda camera prima di rispondere.',
    callVoiceLang: 'it-IT',
    callCountdownTitle: (sec) => `🎅 Babbo Natale sta leggendo la tua lettera... chiamerà tra ${sec}s`,
    callCountdownSubtitle: 'Alza il volume per sentire la sua chiamata magica dal vivo!',
    callNowBtn: '⚡ Chiama ora',
    callMissedTitle: '📵 Ops! Non hai fatto in tempo a rispondere',
    callMissedSubtitle: 'Il telefono ha squillato per 15 secondi. Puoi chiedere una nuova chiamata!',
    callRetryCountdownBtn: '🔄 Aspetta un’altra chiamata da Babbo Natale',
    wallSectionTitle: '📸 Muro di Natale e Concorso Copertina',
    wallSectionSubtitle: 'Carica una foto natalizia e vota con Mi Piace. La foto #1 appare automaticamente sulla Copertina Principale.',
    wallUploadTitle: 'Partecipa alla Copertina di Natale',
    wallPhotoTitleLabel: 'Titolo breve della foto',
    wallPhotoTitlePlaceholder: 'Es. Il nostro albero illuminato in famiglia',
    wallAuthorLabel: 'Famiglia / Città',
    wallAuthorPlaceholder: 'Es. Famiglia Rossi · Roma',
    wallChooseFile: 'Scegli foto di Natale',
    wallSubmitPhoto: 'Pubblica sul Muro (+20 Punti)',
    wallSortTop: 'Più Votate',
    wallSortRecent: 'Più Recenti',
    wallLikeBtn: 'Mi Piace',
    wallLikedBtn: 'Ti piace',
    wallReportBtn: '🚩 Segnala',
    wallReportDone: 'Segnalato',
    wallParadeBtn: '🎬 Guarda Video Sfilata (Top Foto)',
    wallEmpty: 'Nessuna foto visibile ancora. Carica il primo ricordo natalizio!',
    podiumTitle: '🏆 Podio Ufficiale Cloud (Top 3 Più Votate)',
    podiumFirstBadge: '🥇 1° Copertina Principale',
    podiumSecondBadge: '🥈 2° Posto',
    podiumThirdBadge: '🥉 3° Posto',
    carouselLiveBadge: '🔴 IN DIRETTA • Aggiornamento vetrina',
    carouselTitle: '✨ Vetrina Rotativa Live (25 Foto Recenti)',
    carouselWebpHint: 'WebP ~30KB · Coda FIFO · Sicurezza Famiglia',
    wallNsfwChecking: 'Verifica sicurezza famiglia...',
    wallNsfwRejected: '⚠️ Foto bloccata dal filtro di sicurezza familiare.',
    paradeCountdownBanner: '⏳ Grande Video Sfilata di Natale: Anteprima il 25 Dicembre! Carica la tua foto e raccogli ❤️ Mi Piace per apparire nel video.',
    paradeCountdownTime: (d, h, m) => `${d}g ${h}h ${m}m`,
    paradeLivePremiereBtn: '🎬 ANTEPRIMA LIVE! Guarda la Grande Video Sfilata di Natale (Top Foto)',
    paradeEndedBanner: '✨ Evento di Natale concluso! Ci vediamo allo Speciale Re Magi.',
    paradeRankPrefix: 'Posizione',
    paradeCloseBtn: 'Esci dalla Sfilata',
    paradePlayingMusic: 'Musica natalizia attiva',
    shareModalTitle: 'Condividi la Magia di Natale',
    shareModalSubtitle: 'Condividi su WhatsApp o sui social e ricevi subito +50 Punti Magici.',
    shareCopyLink: 'Copia Link',
    shareCopied: 'Link copiato!',
    trendsModalTitle: 'Market Intelligence · Tendenze Regali',
    trendsModalSubtitle: 'Statistiche aggregate 100% anonime senza dati personali.',
    trendsTopGiftsTitle: '🏆 Top 10 Regali Più Richiesti',
    trendsFilterCountry: 'Paese / Città',
    trendsFilterLanguage: 'Lingua',
    trendsFilterAgeRange: 'Fascia d’Età',
    trendsAllOption: 'Tutti',
    trendsExportCsvBtn: '📥 Esporta Report Completo (.CSV per Excel)',
    trendsTotalCountLabel: 'Richieste Anonime',
    trendsUniqueGiftsLabel: 'Regali Unici',
    trendsNoData: 'Nessun dato trovato con questi filtri.',
    trendsPinTitle: 'Codice di Accesso',
    trendsPinPlaceholder: 'Codice',
    trendsPinUnlockBtn: 'Apri Pannello',
    trendsPinError: 'Codice errato',
    trendsSimulateDec25Btn: '👁️ Simula Data 25 Dicembre',
    trendsSimulateDec25Active: '✅ Anteprima 25 Dicembre attiva (Tocca per disattivare)',
    trendsSimulateMidnightBtn: '🎆 Simula Mezzanotte di Natale',
    trendsSimulateMidnightActive: '🎆 Mezzanotte Attiva',
    christmasClockTitle: '⏳ Conto alla rovescia per Natale',
    christmasClockLiveTitle: '🎄 È Natale! Mezzanotte al Polo Nord!',
    clockDays: 'Giorni',
    clockHours: 'Ore',
    clockMinutes: 'Min',
    clockSeconds: 'Sec',
    writeSantaLetterHeroBtn: '✉️ Scrivi la mia Lettera a Babbo Natale',
    backToCoverBtn: '← Torna alla Copertina',
    playSleighHeroBtn: '🎮 Gioca: Slitta di Babbo Natale',
    playSleighAccessBadge: '👑 VIP Libero / 🎬 Gratis con Pubblicità',
    adGateTitle: '🛷 Slitta Magica: Missione Regali',
    adGatePrompt: '🎬 Guarda un breve annuncio natalizio per sbloccare gratis il tuo volo in slitta',
    adGateWatchBtn: '▶️ Guarda Annuncio e Gioca',
    adGateVipBtn: '👑 Oppure entra senza pubblicità con Zona VIP',
    adGateCountdown: (sec) => `🎄 Annuncio natalizio... sblocco tra ${sec}s`,
    adGateSimulatedSlot: 'AdSense / AdMob · Annuncio Premiato Natalizio',
    adGateSkipTestBtn: '⚡ Entra subito',
    sleighGameTitle: '🛷 Slitta Magica: Missione Regali',
    sleighGameHint: 'Scorri un dito o muovi il mouse per guidare · Scintille automatiche',
    gameScoreLabel: 'Punti',
    gameBestLabel: '🏆 Miglior Record',
    gameLevelLabel: 'Livello',
    gameLivesLabel: 'Vite',
    gamePauseBtn: 'Pausa',
    gameResumeBtn: 'Riprendi',
    gameExitShortBtn: '← Esci',
    gamePauseExitBtn: '🚪 Esci',
    gameOverTitle: '🎄 Volo Natalizio Completato!',
    gameNewRecordBadge: '🏆 Nuovo Record! +20 Punti Magici',
    gamePlayAgainBtn: '🔄 Gioca di Nuovo',
    wallInvalidFileError: '❌ Sono consentite solo immagini JPEG, PNG o WebP valide inferiori a 5 MB.',
    wallUploadRateLimitError: (sec) => `⏳ Anti-spam: attendi ${sec}s prima di caricare un’altra foto.`,
    wallAlreadyVotedNotice: '❤️ Hai già votato questa foto da questo dispositivo.',
    adSlotPlaceholder: 'SPAZIO PUBBLICITARIO · SANTA MAGIA',
    privacyPolicyLinkLabel: '📜 Privacy e Termini di Utilizzo',
    privacyPolicyModalTitle: '📜 Privacy e Termini di Utilizzo · SANTA MAGIA',
    privacyPolicySections: [
      {
        title: '1. Nessuna Raccolta di Dati Personali o di Minori',
        body: 'SANTA MAGIA non salva nomi dei bambini, età, regali o numeri WhatsApp sui propri server.',
      },
      {
        title: '2. Protezione della Bacheca Foto',
        body: 'Le immagini vengono compresse in WebP, controllate automaticamente e limitate a 1 caricamento ogni 2 minuti e 1 voto per foto per dispositivo.',
      },
      {
        title: '3. Cookie e Annunci Standard',
        body: 'SANTA MAGIA utilizza cookie standard e reti pubblicitarie (Google AdSense o Monetag) per offrire l’app gratuitamente, con opzione senza pubblicità nella Zona VIP.',
      },
      {
        title: '4. Termini di Utilizzo',
        body: 'Esperienza natalizia per famiglie. È vietato lo spam o l’alterazione automatizzata dei voti.',
      },
    ],
    pwaPromptTitle: 'Vuoi scaricare SANTA MAGIA sul tuo cellulare o continuare nel browser?',
    pwaDownloadBtn: '📲 Scarica App',
    pwaContinueWebBtn: 'Continua sul web',
    pwaFooterInstallBtn: '📲 Scarica App',
    pwaIosGuideTitle: 'Installa SANTA MAGIA su iPhone / Safari',
    pwaIosStep1Title: '1. Tocca il pulsante Condividi',
    pwaIosStep1Desc: 'Premi l’icona Condividi (quadrato con freccia verso l’alto) nella barra di Safari.',
    pwaIosStep2Title: '2. Tocca "Aggiungi alla schermata Home"',
    pwaIosStep2Desc: 'Scorri verso il basso, scegli "Aggiungi alla schermata Home" e poi Aggiungi.',
    pwaBrowserGuideTitle: 'Installa SANTA MAGIA sul telefono',
    pwaBrowserStep1Title: '1. Apri il menu del browser',
    pwaBrowserStep1Desc: 'Tocca i tre puntini (⋮) in alto a destra su Chrome.',
    pwaBrowserStep2Title: '2. Tocca "Installa app"',
    pwaBrowserStep2Desc: 'Conferma per avere l’icona rossa e oro di SANTA MAGIA sulla schermata Home.',
    pwaOfflineBadge: 'Modalità offline — Dati in cache attivi',
    formatDisplayNames: (children) => formatChildNames(children.map((c) => c.name), 'e', 'Lorenzo'),
    buildSalutation: (children) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const formatted = formatChildNames(children.map((c) => c.name), 'e', 'Lorenzo');
      return isPlural ? `Cari ${formatted},` : `Caro / Cara ${formatted},`;
    },
    shareTextTemplate: (children) => `🎄✨ Guarda la Lettera Ufficiale e la Chiamata Magica di Babbo Natale per ${formatChildNames(children.map((c) => c.name), 'e', 'i bimbi')} su SANTA MAGIA! 🎅📞`,
    buildParentWhatsappMessage: ({ children, city, behavior, sender, officialCode }) => {
      const cityTxt = city.trim() || '-';
      const behaviorTxt = behavior === 'super' ? 'Bravissimo / Eccellente' : behavior === 'very' ? 'Molto Bravo' : 'Si sta impegnando tanto';
      const senderTxt = sender === 'kings' ? 'I Tre Re Magi' : 'Babbo Natale';
      const lines = children.map((c, idx) => `${idx + 1}. *${c.name.trim() || `Bimbo/a ${idx + 1}`}${c.age.trim() ? ` (${c.age.trim()})` : ''}:* ${c.gift.trim() || 'Sorpresa'}`).join('\n');
      return `🎄 *Timbro di Arrivo Polo Nord - SANTA MAGIA*\n\n🎁 *Desideri ricevuti:*\n${lines}\n\n📍 *Città:* ${cityTxt}\n⭐ *Comportamento:* ${behaviorTxt}\n✉️ *Mittente:* ${senderTxt}\n🔖 *Codice Ufficiale:* ${officialCode}`;
    },
    toastPointsEarned: (pts) => `⭐ Hai guadagnato +${pts} Punti Magici!`,
    toastPhotoUploaded: '📸 La tua foto è ora in gara per la Copertina Ufficiale!',
    toastHdDownloaded: '📥 Lettera HD scaricata con successo!',
    toastReported: '🚩 Grazie. Contenuto nascosto per la sicurezza della famiglia.',
    closeBtn: 'Chiudi',
    elfNoteTitle: '🎄 Buon Natale!',
    elfNoteBody: 'Trascorri delle splendide feste insieme alle persone a cui vuoi bene. Ricorda sempre che non sei mai solo e che ti vogliamo un mondo di bene. Grazie di cuore per usare la nostra app. Ci vediamo a Capodanno!',
    elfNotePs: '😄 P.S.: Cosa disse un regalo a un altro prima di salire sulla slitta? Copriti bene, che stanotte ci scartano tutti!',
    elfNoteSignature: 'Firma: L’Elfo di Natale 🎄🧝‍♂️ (ho scritto io perché Babbo Natale era occupatissimo).',
    buildLetterParagraphs: ({ children, sender }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'e', 'Lorenzo');
      if (sender === 'kings') {
        return isPlural
          ? [`Cari ${namesText}, che gioia sentire il vostro entusiasmo poco fa! Abbiamo custodito i vostri desideri nel nostro scrigno reale d’Oriente mentre prepariamo i cammelli per il viaggio.`, `La stella guida sempre il nostro cammino verso le case piene d’affetto. Continuate ad aiutare in casa e ad andare a dormire presto nella notte magica.`, `A presto sotto il cielo stellato!`]
          : [`Caro/a ${namesText}, che gioia sentire il tuo entusiasmo poco fa! Abbiamo custodito la tua lettera nel nostro scrigno reale d’Oriente mentre prepariamo i cammelli per il viaggio.`, `La stella guida sempre il nostro cammino verso i cuori gentili. Continua ad aiutare in casa e ad andare a dormire presto nella notte magica.`, `A presto sotto il cielo stellato!`];
      }
      return isPlural
        ? [`Cari ${namesText}, che gioia sentirvi al telefono poco fa! Ho già riposto le vostre lettere nel mio grande scrigno dorato accanto al camino del laboratorio.`, `Rudolph e i folletti stanno lucidando la slitta mentre segniamo i vostri nomi nel Grande Libro del Natale. Continuate a volervi bene e a riempire la casa di sorrisi.`, `Preparatevi per una Vigilia indimenticabile!`]
        : [`Caro/a ${namesText}, che gioia sentirti al telefono poco fa! Ho già riposto la tua lettera nel mio grande scrigno dorato accanto al camino del laboratorio.`, `Rudolph e i folletti stanno lucidando la slitta mentre segniamo il tuo nome nel Grande Libro del Natale. Continua ad aiutare in casa e a riempire la famiglia di sorrisi.`, `Preparati per una Vigilia indimenticabile!`];
    },
    buildCertificateBody: ({ children, city, behavior }) => {
      const namesText = formatChildNames(children.map((c) => c.name), 'e', 'Lorenzo');
      const isPlural = children.filter((c) => c.name.trim()).length > 1;
      const cityTxt = city.trim() || 'la sua città';
      const qual = behavior === 'super' ? 'comportamento esemplare e cuore generoso' : behavior === 'very' ? 'ottimo comportamento e gioia contagiosa' : 'prezioso impegno quotidiano e spirito gentile';
      if (isPlural) return `Con il presente atto ufficiale, il Consiglio del Polo Nord certifica che ${namesText}, residenti a ${cityTxt}, sono iscritti nella Lista d’Oro d’Onore 2026 per il loro ${qual}.`;
      const ageTxt = children[0]?.age.trim() ? `, di ${children[0].age.trim()},` : '';
      return `Con il presente atto ufficiale, il Consiglio del Polo Nord certifica che ${namesText}${ageTxt} residente a ${cityTxt}, è iscritto nella Lista d’Oro d’Onore 2026 per il suo ${qual}.`;
    },
    buildSantaCallScript: ({ children }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'e', 'campione');
      return isPlural
        ? `Ho, ho, ho! Ciao ${namesText}, sono Babbo Natale. Ho appena ricevuto le vostre lettere qui al Polo Nord! Parlerò con la vostra mamma e il vostro papà per chiedere come vi siete comportati quest'anno, e in base al vostro comportamento vi porterò una sorpresa davvero speciale. Vi lascio anche una lettera firmata da me!`
        : `Ho, ho, ho! Ciao ${namesText}, sono Babbo Natale. Ho appena ricevuto la tua lettera qui al Polo Nord! Parlerò con la tua mamma e il tuo papà per chiedere come ti sei comportato quest'anno, e in base al tuo comportamento ti porterò una sorpresa davvero speciale. Ti lascio anche una lettera firmata da me!`;
    },
    samplePhotos: [
      { id: 'sample-1', title: 'Albero illuminato aspettando Babbo Natale', author: 'Famiglia Conti · Milano' },
      { id: 'sample-2', title: 'Biscotti allo zenzero e latte caldo per Santa', author: 'Giulia e Marco · Firenze' },
      { id: 'sample-3', title: 'Baita innevata sotto le luci di Natale', author: 'Famiglia Bellini · Cortina' },
      { id: 'sample-4', title: 'Calze di lana pronte vicino al camino', author: 'Clara & Lorenzo · Torino' },
    ],
  },

  ru: {
    appName: 'SANTA MAGIA',
    appTagline: 'Письмо и звонок от Деда Мороза',
    magicPointsLabel: 'Магические баллы',
    soundOn: 'Звук вкл.',
    soundOff: 'Без звука',
    musicOnBtn: '🎵 Музыка: ВКЛ',
    musicOffBtn: '🎵 Музыка: ВЫКЛ',
    navHome: 'Главная',
    navLetter: 'Письмо HD',
    navCall: 'Звонок',
    navWall: 'Фотостена',
    heroOfficialBadge: '👑 Официальная обложка Рождества (Лидер)',
    heroWinnerTitle: 'Волшебство Северного полюса дома',
    heroLikesLabel: 'Нравится',
    heroByLabel: 'Семья',
    heroCallCta: '📞 Дед Мороз звонит!',
    heroLetterCta: '✉️ Отправить письмо на Северный полюс',
    heroParadeCta: '🎬 Видео-парад (Лучшие фото)',
    heroQuickIntro: 'Напишите письмо от одного или нескольких детей, отправьте его на Северный полюс, ответьте на звонок Деда Мороза и откройте официальную грамоту.',
    vipZoneTopBtn: '👑 VIP-зона без рекламы',
    vipExclusiveBadge: '👑 VIP',
    redeemPointsBadge: '⭐ Обменять на Волшебные баллы',
    magicPassBtn: '👑 VIP-зона без рекламы',
    magicPassTitle: '👑 VIP-зона без рекламы',
    magicPassSubtitle: 'Откройте все VIP-пергаменты и грамоты для вашей семьи',
    magicPassPerk1: '🚫 Без рекламы',
    magicPassPerk2: '📜 Все пергаменты и грамоты открыты',
    magicPassPerk3: '⚡ Мгновенный доступ',
    magicPassPriceLabel: '$2.99 USD',
    magicPassDemoNote: 'Демо-режим: нажмите ниже для мгновенной разблокировки без реальной оплаты.',
    magicPassConfirm: 'Активировать VIP-зону ($2.99 USD)',
    magicPassUnlocked: 'VIP-зона активирована! Всё разблокировано.',
    magicPassActiveBadge: '👑 VIP-зона активна',
    vipKofiNote: 'Приобретите VIP-пропуск на Ko-fi и мгновенно получите код активации.',
    vipCodeLabel: 'Уже есть код активации VIP?',
    vipCodePlaceholder: 'Введите VIP-код',
    vipCodeSubmitBtn: '🔓 Активировать',
    vipCodeError: 'Неверный VIP-код. Проверьте и попробуйте снова.',
    vipWelcomeMessage: '👑 Добро пожаловать в VIP-зону без рекламы! Вся реклама отключена навсегда.',
    adBannerLabel: 'Семейный блок',
    adBannerText: 'Наслаждайтесь новогодним чудом всей семьёй.',
    adBannerRemove: '👑 VIP-зона без рекламы',
    privacyNoticeText: '🔒 Защита приватности детей: мы не храним имена и номера телефонов — только анонимную статистику новогодних трендов.',
    preSendPrivacyBanner: '🔒 Конфиденциальность гарантирована: ваши данные и сообщения передаются только выбранным вами людям. Приложение не хранит личные данные.',
    letterSectionTitle: 'Волшебное письмо на Северный полюс',
    letterSectionSubtitle: 'Добавьте до 5 детей из одной семьи. Сначала позвонит Дед Мороз, а затем откроется официальное письмо с печатью.',
    childNumberLabel: (idx) => `Ребёнок #${idx}`,
    addSiblingBtn: '➕ Добавить ещё ребёнка',
    removeSiblingAria: 'Удалить',
    allSiblingsTab: 'Все вместе',
    fieldChildName: 'Имя',
    fieldChildNamePlaceholder: 'Напр. Артём, София...',
    fieldAge: 'Возраст',
    fieldAgePlaceholder: 'Напр. 7',
    fieldCity: 'Город и страна',
    fieldCityPlaceholder: 'Напр. Москва, Россия',
    fieldBehavior: 'Поведение в этом году',
    behaviorSuper: 'Супер / Отлично',
    behaviorVery: 'Очень хорошо',
    behaviorTrying: 'Очень старается',
    fieldGift: 'Желаемый подарок',
    fieldGiftPlaceholder: 'Напр. Велосипед, Lego...',
    fieldSender: 'Отправитель',
    senderSanta: '🎅 Дед Мороз / Санта',
    senderKings: '👑 Три Волхва',
    fieldWhatsappLabel: '📱 Домашний телефон (WhatsApp)',
    fieldWhatsappOtherOption: 'Другой (+...)',
    fieldWhatsappCustomPrefixPlaceholder: '+...',
    fieldWhatsappPlaceholder: 'Напр. 9161234567',
    fieldWhatsappHint: 'Чтобы эльфы Северного полюса прислали печать о получении письма.',
    sendToNorthPoleBtn: '✉️ Отправить письмо на Северный полюс',
    sendingTitle: 'Письмо летит на Северный полюс...',
    sendingSubtitle: 'Эльфы получили волшебный конверт и соединяют звонок Деда Мороза.',
    sealedWaitingTitle: 'Запечатанный пергамент в пути',
    sealedWaitingSubtitle: 'Нажмите «Отправить письмо на Северный полюс», чтобы сначала принять звонок и затем открыть подписанное письмо.',
    responseReadyBanner: '✨ Официальное письмо Деда Мороза открыто!',
    openWhatsappFallback: '📲 Печать подтверждения в WhatsApp',
    fieldTheme: 'Стиль пергамента / грамоты',
    themeClassic: 'Классический Северный полюс',
    themeRoyal: 'Королевский золотой VIP',
    themeAurora: 'Полярная ночь VIP',
    themeCertificate: 'Грамота хорошего ребёнка',
    freeLabel: 'Бесплатно',
    unlockWithPoints: 'Открыть',
    unlockedLabel: 'Открыто',
    notEnoughPoints: 'Поделитесь (+50 баллов) или загрузите фото, чтобы получить баллы.',
    downloadHdBtn: '📥 Скачать письмо HD (PNG)',
    sharePointsBtn: '📲 Поделиться (+50 баллов)',
    callWithChildBtn: '📞 Дед Мороз звонит!',
    northPoleDispatch: 'ОФИЦИАЛЬНАЯ ПОЧТА СЕВЕРНОГО ПОЛЮСА',
    magiRoyalDispatch: 'КОРОЛЕВСКАЯ ПОЧТА ВОСТОКА',
    officialCodeLabel: 'ОФИЦИАЛЬНЫЙ КОД',
    letterSignatureSanta: 'С теплом и волшебством, Дед Мороз',
    letterSignatureKings: 'Мельхиор, Каспар и Бальтазар',
    letterSealText: 'СЕВЕРНЫЙ ПОЛЮС',
    certificateTitle: 'ОФИЦИАЛЬНАЯ ГРАМОТА ХОРОШЕГО РЕБЁНКА',
    certificateSubtitle: 'Почётный список Рождества 2026',
    certificateAwardedTo: 'С гордостью вручается',
    certificateSealLabel: 'ПОДТВЕРЖДЕНО ЗОЛОТОЙ КНИГОЙ',
    callSectionTitle: 'Прямой звонок с Северного полюса',
    callSectionSubtitle: 'Включите звук погромче и приготовьте камеру, чтобы заснять радостную реакцию детей.',
    callTriggerBtn: '📞 Дед Мороз звонит!',
    callIncomingStatus: 'Входящий волшебный звонок...',
    callConnectedStatus: 'На линии мастерская Северного полюса',
    callVoicePlayingNote: 'Дед Мороз говорит в прямом эфире...',
    callCallerSanta: 'Дед Мороз (Санта)',
    callCallerLocation: 'Северный полюс · Личная линия',
    callAnswerBtn: 'Ответить',
    callDeclineBtn: 'Сбросить',
    callHangupBtn: 'Завершить',
    callReplayVoiceBtn: 'Повторить голос',
    callRecordHint: 'Совет: передайте телефон детям перед тем, как нажать «Ответить».',
    callVoiceLang: 'ru-RU',
    callCountdownTitle: (sec) => `🎅 Дед Мороз читает ваше письмо... звонок через ${sec}с`,
    callCountdownSubtitle: 'Включите звук погромче, чтобы услышать волшебный звонок!',
    callNowBtn: '⚡ Позвонить сейчас',
    callMissedTitle: '📵 Упс! Вы не успели ответить вовремя',
    callMissedSubtitle: 'Звонок длился 15 секунд. Попросите Деда Мороза перезвонить!',
    callRetryCountdownBtn: '🔄 Ждать новый звонок Деда Мороза',
    wallSectionTitle: '📸 Новогодняя фотостена и конкурс',
    wallSectionSubtitle: 'Загрузите праздничное фото и голосуйте. Фото #1 автоматически украсит главную обложку.',
    wallUploadTitle: 'Участвовать в конкурсе обложки',
    wallPhotoTitleLabel: 'Короткий заголовок',
    wallPhotoTitlePlaceholder: 'Напр. Наша ёлка всей семьёй',
    wallAuthorLabel: 'Семья / Город',
    wallAuthorPlaceholder: 'Напр. Семья Ивановых · Москва',
    wallChooseFile: 'Выбрать фото',
    wallSubmitPhoto: 'Опубликовать (+20 баллов)',
    wallSortTop: 'Лучшие',
    wallSortRecent: 'Новые',
    wallLikeBtn: 'Нравится',
    wallLikedBtn: 'Оценено',
    wallReportBtn: '🚩 Пожаловаться',
    wallReportDone: 'Скрыто',
    wallParadeBtn: '🎬 Смотреть Видео-парад',
    wallEmpty: 'Пока нет фото. Загрузите первое праздничное фото!',
    podiumTitle: '🏆 Облачный Подиум (Топ-3 по лайкам)',
    podiumFirstBadge: '🥇 1 место · Главная обложка',
    podiumSecondBadge: '🥈 2 место',
    podiumThirdBadge: '🥉 3 место',
    carouselLiveBadge: '🔴 В ЭФИРЕ • Обновление витрины',
    carouselTitle: '✨ Живая витрина (25 свежих фото)',
    carouselWebpHint: 'WebP ~30КБ · Очередь FIFO · Семейный фильтр',
    wallNsfwChecking: 'Проверка безопасности фото...',
    wallNsfwRejected: '⚠️ Фото отклонено фильтром семейной безопасности.',
    paradeCountdownBanner: '⏳ Большой новогодний видео-парад: премьера 25 декабря! Загрузите фото и соберите ❤️ лайки для участия.',
    paradeCountdownTime: (d, h, m) => `${d}д ${h}ч ${m}м`,
    paradeLivePremiereBtn: '🎬 ПРЕМЬЕРА В ЭФИРЕ! Смотреть Большой видео-парад (Топ фото)',
    paradeEndedBanner: '✨ Рождественское событие завершено! До встречи на празднике Волхвов.',
    paradeRankPrefix: 'Место',
    paradeCloseBtn: 'Выйти',
    paradePlayingMusic: 'Играет праздничная музыка',
    shareModalTitle: 'Поделиться волшебством',
    shareModalSubtitle: 'Поделитесь в WhatsApp или соцсетях и получите +50 баллов.',
    shareCopyLink: 'Копировать ссылку',
    shareCopied: 'Скопировано!',
    trendsModalTitle: 'Аналитика рынка · Анонимные тренды подарков',
    trendsModalSubtitle: 'Полностью анонимная статистика без личных данных.',
    trendsTopGiftsTitle: '🏆 Топ-10 самых желаемых подарков',
    trendsFilterCountry: 'Страна / Город',
    trendsFilterLanguage: 'Язык',
    trendsFilterAgeRange: 'Возраст',
    trendsAllOption: 'Все',
    trendsExportCsvBtn: '📥 Экспортировать отчёт (.CSV для Excel)',
    trendsTotalCountLabel: 'Анонимных запросов',
    trendsUniqueGiftsLabel: 'Уникальных подарков',
    trendsNoData: 'Нет записей для выбранных фильтров.',
    trendsPinTitle: 'Код доступа',
    trendsPinPlaceholder: 'Код',
    trendsPinUnlockBtn: 'Открыть панель',
    trendsPinError: 'Неверный код',
    trendsSimulateDec25Btn: '👁️ Симулировать 25 декабря',
    trendsSimulateDec25Active: '✅ Предпросмотр 25 декабря активен (нажмите для отмены)',
    trendsSimulateMidnightBtn: '🎆 Симулировать рождественскую полночь',
    trendsSimulateMidnightActive: '🎆 Полночь активна',
    christmasClockTitle: '⏳ Обратный отсчёт до Рождества',
    christmasClockLiveTitle: '🎄 Счастливого Рождества! Полночь на Северном полюсе!',
    clockDays: 'Дни',
    clockHours: 'Часы',
    clockMinutes: 'Мин',
    clockSeconds: 'Сек',
    writeSantaLetterHeroBtn: '✉️ Написать письмо Деду Морозу',
    backToCoverBtn: '← Назад на главную',
    playSleighHeroBtn: '🎮 Играть: Сани Деда Мороза',
    playSleighAccessBadge: '👑 VIP свободно / 🎬 Бесплатно с рекламой',
    adGateTitle: '🛷 Волшебные сани: Миссия Подарки',
    adGatePrompt: '🎬 Посмотрите короткую праздничную рекламу, чтобы открыть полёт на санях бесплатно',
    adGateWatchBtn: '▶️ Смотреть и играть',
    adGateVipBtn: '👑 Или без рекламы с VIP-зоной',
    adGateCountdown: (sec) => `🎄 Новогодняя реклама... запуск через ${sec}с`,
    adGateSimulatedSlot: 'AdSense / AdMob · Праздничная реклама',
    adGateSkipTestBtn: '⚡ Войти сразу',
    sleighGameTitle: '🛷 Волшебные сани: Миссия Подарки',
    sleighGameHint: 'Проведите пальцем или мышью для управления · Автострельба искрами',
    gameScoreLabel: 'Очки',
    gameBestLabel: '🏆 Лучший рекорд',
    gameLevelLabel: 'Уровень',
    gameLivesLabel: 'Жизни',
    gamePauseBtn: 'Пауза',
    gameResumeBtn: 'Продолжить',
    gameExitShortBtn: '← Выход',
    gamePauseExitBtn: '🚪 Выйти',
    gameOverTitle: '🎄 Новогодний полёт завершён!',
    gameNewRecordBadge: '🏆 Новый рекорд! +20 Волшебных баллов',
    gamePlayAgainBtn: '🔄 Играть снова',
    wallInvalidFileError: '❌ Допускаются только изображения JPEG, PNG или WebP размером до 5 МБ.',
    wallUploadRateLimitError: (sec) => `⏳ Защита от спама: подождите ${sec}с перед следующей загрузкой.`,
    wallAlreadyVotedNotice: '❤️ Вы уже проголосовали за это фото с данного устройства.',
    adSlotPlaceholder: 'РЕКЛАМНЫЙ БЛОК · SANTA MAGIA',
    privacyPolicyLinkLabel: '📜 Политика конфиденциальности и условия',
    privacyPolicyModalTitle: '📜 Политика конфиденциальности и условия · SANTA MAGIA',
    privacyPolicySections: [
      {
        title: '1. Без хранения личных и детских данных',
        body: 'SANTA MAGIA не хранит на серверах имена детей, возраст, пожелания подарков или номера WhatsApp.',
      },
      {
        title: '2. Защита семейной фотостены',
        body: 'Фотографии сжимаются в WebP, проходят фильтр безопасности и ограничены 1 загрузкой раз в 2 минуты и 1 голосом на фото с устройства.',
      },
      {
        title: '3. Стандартные cookie и реклама',
        body: 'SANTA MAGIA использует стандартные файлы cookie и рекламные сети (Google AdSense или Monetag) для бесплатного доступа, а также VIP-зону без рекламы.',
      },
      {
        title: '4. Условия использования',
        body: 'Семейное праздничное приложение. Спам и накрутка голосов запрещены.',
      },
    ],
    pwaPromptTitle: 'Хотите скачать SANTA MAGIA на телефон или продолжить в браузере?',
    pwaDownloadBtn: '📲 Скачать приложение',
    pwaContinueWebBtn: 'Остаться в браузере',
    pwaFooterInstallBtn: '📲 Скачать приложение',
    pwaIosGuideTitle: 'Установить SANTA MAGIA на iPhone / Safari',
    pwaIosStep1Title: '1. Нажмите «Поделиться»',
    pwaIosStep1Desc: 'Нажмите на значок «Поделиться» (квадрат со стрелкой вверх) на нижней панели Safari.',
    pwaIosStep2Title: '2. Выберите «На экран „Домой“»',
    pwaIosStep2Desc: 'Прокрутите вниз, выберите «На экран „Домой“» и нажмите «Добавить».',
    pwaBrowserGuideTitle: 'Установить SANTA MAGIA на смартфон',
    pwaBrowserStep1Title: '1. Откройте меню браузера',
    pwaBrowserStep1Desc: 'Нажмите на три точки (⋮) в верхнем углу Chrome.',
    pwaBrowserStep2Title: '2. Нажмите «Установить приложение»',
    pwaBrowserStep2Desc: 'Подтвердите установку красно-золотой иконки SANTA MAGIA на главный экран.',
    pwaOfflineBadge: 'Офлайн-режим — используются сохранённые данные',
    formatDisplayNames: (children) => formatChildNames(children.map((c) => c.name), 'и', 'Артём'),
    buildSalutation: (children) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const formatted = formatChildNames(children.map((c) => c.name), 'и', 'Артём');
      return isPlural ? `Дорогие ${formatted},` : `Дорогой(ая) ${formatted},`;
    },
    shareTextTemplate: (children) => `🎄✨ Письмо и волшебный звонок от Деда Мороза для ${formatChildNames(children.map((c) => c.name), 'и', 'детей')} в SANTA MAGIA! 🎅📞`,
    buildParentWhatsappMessage: ({ children, city, behavior, sender, officialCode }) => {
      const cityTxt = city.trim() || '-';
      const behaviorTxt = behavior === 'super' ? 'Отлично' : behavior === 'very' ? 'Очень хорошо' : 'Старается';
      const senderTxt = sender === 'kings' ? 'Три Волхва' : 'Дед Мороз';
      const lines = children.map((c, idx) => `${idx + 1}. *${c.name.trim() || `Ребёнок ${idx + 1}`}${c.age.trim() ? ` (${c.age.trim()})` : ''}:* ${c.gift.trim() || 'Сюрприз'}`).join('\n');
      return `🎄 *Печать Северного полюса - SANTA MAGIA*\n\n🎁 *Список желаний:*\n${lines}\n\n📍 *Город:* ${cityTxt}\n⭐ *Поведение:* ${behaviorTxt}\n✉️ *Отправитель:* ${senderTxt}\n🔖 *Код:* ${officialCode}`;
    },
    toastPointsEarned: (pts) => `⭐ Вы получили +${pts} магических баллов!`,
    toastPhotoUploaded: '📸 Ваше фото участвует в конкурсе обложки!',
    toastHdDownloaded: '📥 Картинка HD скачана!',
    toastReported: '🚩 Спасибо. Контент скрыт.',
    closeBtn: 'Закрыть',
    elfNoteTitle: '🎄 Счастливого Рождества!',
    elfNoteBody: 'Проведите прекрасные праздники рядом с близкими людьми. Всегда помните, что вы никогда не одни и вас очень любят. От всей души благодарим вас за использование нашего приложения. До встречи в Новом году!',
    elfNotePs: '😄 P.S.: Что сказал один подарок другому перед посадкой в сани? Одевайся теплее — сегодня ночью нас всех раскроют!',
    elfNoteSignature: 'Подпись: Рождественский Эльф 🎄🧝‍♂️ (написал я, потому что Дед Мороз был очень занят).',
    buildLetterParagraphs: ({ children }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'и', 'Артём');
      return isPlural
        ? [
            `Дорогие ${namesText}, как я был рад поговорить с вами по телефону минуту назад! Ваши письма уже бережно хранятся в моём золотом сундуке у камина на Северном полюсе.`,
            `Мои помощники уже готовят волшебные сани и отмечают ваши имена в Золотой Книге. Продолжайте помогать близким, дружить и наполнять дом радостью.`,
            `До скорой встречи в волшебную новогоднюю ночь!`,
          ]
        : [
            `Дорогой(ая) ${namesText}, как я был рад поговорить с тобой по телефону минуту назад! Твоё письмо уже бережно хранится в моём золотом сундуке у камина на Северном полюсе.`,
            `Мои помощники уже готовят волшебные сани и отмечают твоё имя в Золотой Книге. Продолжай помогать близким и наполнять дом радостью.`,
            `До скорой встречи в волшебную новогоднюю ночь!`,
          ];
    },
    buildCertificateBody: ({ children, city, behavior }) => {
      const namesText = formatChildNames(children.map((c) => c.name), 'и', 'Артём');
      const cityTxt = city.trim() || 'своего города';
      const qual = behavior === 'super' ? 'примерное поведение и доброе сердце' : behavior === 'very' ? 'очень хорошее поведение' : 'большое старание каждый день';
      return `Совет Северного полюса официально подтверждает, что ${namesText} (${cityTxt}) занесены в Золотой Почётный Список 2026 за ${qual}.`;
    },
    buildSantaCallScript: ({ children }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'и', 'мой друг');
      return isPlural
        ? `Хо-хо-хо! Привет, ${namesText}! Это Дед Мороз. Я только что получил ваши письма здесь на Северном полюсе! Я поговорю с вашей мамой и папой, спрошу, как вы вели себя в этом году, и по вашему поведению принесу вам особенный сюрприз. Я также оставляю вам письмо со своей подписью!`
        : `Хо-хо-хо! Привет, ${namesText}! Это Дед Мороз. Я только что получил твоё письмо здесь на Северном полюсе! Я поговорю с твоей мамой и папой, спрошу, как ты вёл себя в этом году, и по твоему поведению принесу тебе особенный сюрприз. Я также оставляю тебе письмо со своей подписью!`;
    },
    samplePhotos: [
      { id: 'sample-1', title: 'Нарядная ёлка в ожидании Деда Мороза', author: 'Семья Смирновых · Москва' },
      { id: 'sample-2', title: 'Имбирное печенье и тёплое молоко', author: 'София и Максим · СПб' },
      { id: 'sample-3', title: 'Заснеженный домик в зимних огнях', author: 'Семья Волковых · Сочи' },
      { id: 'sample-4', title: 'Новогодние носочки у тёплого камина', author: 'Клара и Артём · Казань' },
    ],
  },

  ja: {
    appName: 'SANTA MAGIA',
    appTagline: 'サンタの手紙と魔法の電話',
    magicPointsLabel: '魔法ポイント',
    soundOn: '音声オン',
    soundOff: 'ミュート',
    musicOnBtn: '🎵 音楽: ON',
    musicOffBtn: '🎵 音楽: OFF',
    navHome: 'トップ',
    navLetter: 'HD手紙',
    navCall: '電話',
    navWall: '写真壁',
    heroOfficialBadge: '👑 公式クリスマス表紙（最多投票）',
    heroWinnerTitle: '北極の魔法をおうちへ',
    heroLikesLabel: 'いいね',
    heroByLabel: 'ファミリー',
    heroCallCta: '📞 サンタさんから電話です！',
    heroLetterCta: '✉️ 北極へ手紙を送る',
    heroParadeCta: '🎬 ビデオパレードを見る（人気写真）',
    heroQuickIntro: 'お子さまやごきょうだいの手紙を書いて北極へ送り、サンタさんからの電話に出ると、公式のサイン入り手紙が届きます。',
    vipZoneTopBtn: '👑 広告なしVIPゾーン',
    vipExclusiveBadge: '👑 VIP',
    redeemPointsBadge: '⭐ 魔法ポイントで交換',
    magicPassBtn: '👑 広告なしVIPゾーン',
    magicPassTitle: '👑 広告なしVIPゾーン',
    magicPassSubtitle: 'ご家族向けにすべてのVIP手紙と認定証を即時アンロック',
    magicPassPerk1: '🚫 広告ゼロ',
    magicPassPerk2: '📜 すべての便箋＆認定証をアンロック',
    magicPassPerk3: '⚡ 即時アクセス',
    magicPassPriceLabel: '$2.99 USD',
    magicPassDemoNote: 'デモモード：実際の請求なしで全VIP機能をすぐにお試しいただけます。',
    magicPassConfirm: 'VIPゾーンを有効化 ($2.99 USD)',
    magicPassUnlocked: 'VIPゾーンが有効になりました！',
    magicPassActiveBadge: '👑 VIPゾーン有効',
    vipKofiNote: 'Ko-fiでVIPパスを購入すると、すぐに有効化コードを受け取れます。',
    vipCodeLabel: 'VIP有効化コードをお持ちですか？',
    vipCodePlaceholder: 'VIPコードを入力',
    vipCodeSubmitBtn: '🔓 有効化',
    vipCodeError: 'VIPコードが正しくありません。もう一度ご確認ください。',
    vipWelcomeMessage: '👑 広告なしVIPゾーンへようこそ！すべての広告が永久に非表示になりました。',
    adBannerLabel: 'ファミリースペース',
    adBannerText: 'ご家族みんなでクリスマスの魔法をお楽しみください。',
    adBannerRemove: '👑 広告なしVIPゾーン',
    privacyNoticeText: '🔒 お子さまのプライバシー保護：名前や電話番号は保存せず、匿名のトレンド統計のみを記録します。',
    preSendPrivacyBanner: '🔒 プライバシー保証：入力内容やメッセージはあなたが選んだ相手にのみ共有されます。個人データは一切保存されません。',
    letterSectionTitle: '北極への魔法の手紙',
    letterSectionSubtitle: '同じおうちの最大5人まで追加できます。送信するとまずサンタさんから電話がかかり、通話後に公式の手紙が表示されます。',
    childNumberLabel: (idx) => `お子さま #${idx}`,
    addSiblingBtn: '➕ 他のきょうだいを追加',
    removeSiblingAria: '削除',
    allSiblingsTab: '全員まとめて',
    fieldChildName: 'お名前',
    fieldChildNamePlaceholder: '例：はると、ゆい...',
    fieldAge: '年齢',
    fieldAgePlaceholder: '例：6',
    fieldCity: '都市・国',
    fieldCityPlaceholder: '例：東京、日本',
    fieldBehavior: '今年のがんばり',
    behaviorSuper: 'とってもいい子！',
    behaviorVery: 'とてもいい子',
    behaviorTrying: '毎日がんばっている',
    fieldGift: 'ほしいプレゼント',
    fieldGiftPlaceholder: '例：自転車、レゴ...',
    fieldSender: '送り主',
    senderSanta: '🎅 サンタクロース',
    senderKings: '👑 東方の三博士',
    fieldWhatsappLabel: '📱 ご自宅の連絡先 (WhatsApp)',
    fieldWhatsappOtherOption: 'その他 (+...)',
    fieldWhatsappCustomPrefixPlaceholder: '+...',
    fieldWhatsappPlaceholder: '例：9012345678',
    fieldWhatsappHint: '北極のエルフが到着確認スタンプをお送りするために使用します。',
    sendToNorthPoleBtn: '✉️ 北極へ手紙を送る',
    sendingTitle: '北極へ飛んでいます...',
    sendingSubtitle: 'エルフたちが手紙を受け取り、サンタさんからの電話をつないでいます。',
    sealedWaitingTitle: '封印された手紙が準備中',
    sealedWaitingSubtitle: 'まず「北極へ手紙を送る」を押してサンタさんの電話に出ると、公式のサイン入り手紙が開きます。',
    responseReadyBanner: '✨ サンタさんからの公式手紙が届きました！',
    openWhatsappFallback: '📲 WhatsAppで到着スタンプを開く',
    fieldTheme: '便箋・認定証のスタイル',
    themeClassic: 'クラシック北極便箋',
    themeRoyal: 'ロイヤルゴールド VIP',
    themeAurora: '極夜のオーロラ VIP',
    themeCertificate: '公式いい子認定証',
    freeLabel: '無料',
    unlockWithPoints: '交換',
    unlockedLabel: '開放済み',
    notEnoughPoints: 'シェア（+50pt）や写真投稿でポイントを獲得できます。',
    downloadHdBtn: '📥 HD手紙をダウンロード (画像)',
    sharePointsBtn: '📲 SNSでシェア (+50ポイント)',
    callWithChildBtn: '📞 サンタさんから電話です！',
    northPoleDispatch: '北極公式郵便局',
    magiRoyalDispatch: '東方の王室郵便',
    officialCodeLabel: '公式コード',
    letterSignatureSanta: '愛と魔法を込めて、サンタクロース',
    letterSignatureKings: 'メルキオール・カスパール・バルタザール',
    letterSealText: 'NORTH POLE',
    certificateTitle: '公式いい子認定証',
    certificateSubtitle: '2026年クリスマス名誉登録',
    certificateAwardedTo: '表彰対象',
    certificateSealLabel: 'ゴールデンブック認定済み',
    callSectionTitle: '北極からの直通電話',
    callSectionSubtitle: '音量を上げて、サンタさんの声を聞いた瞬間の反応をカメラで録画しましょう。',
    callTriggerBtn: '📞 サンタさんから電話です！',
    callIncomingStatus: '魔法の着信中...',
    callConnectedStatus: '北極ワークショップと通話中',
    callVoicePlayingNote: 'サンタさんがお話ししています...',
    callCallerSanta: 'サンタクロース',
    callCallerLocation: '北極 · プライベート回線',
    callAnswerBtn: '応答する',
    callDeclineBtn: '切る',
    callHangupBtn: '通話を終了',
    callReplayVoiceBtn: 'もう一度聞く',
    callRecordHint: 'ヒント：「応答する」を押す前にお子さまにスマホを渡してください。',
    callVoiceLang: 'ja-JP',
    callCountdownTitle: (sec) => `🎅 サンタさんが手紙を読んでいます… あと ${sec}秒でお電話`,
    callCountdownSubtitle: '音量を上げて着信をお待ちください！',
    callNowBtn: '⚡ 今すぐ電話する',
    callMissedTitle: '📵 あっ！時間内に電話に出られませんでした',
    callMissedSubtitle: '15秒間鳴りました。もう一度サンタさんの電話を待ちましょう！',
    callRetryCountdownBtn: '🔄 サンタさんからの再着信を待つ',
    wallSectionTitle: '📸 クリスマス写真ウォール＆表紙コンテスト',
    wallSectionSubtitle: '家族のクリスマス写真を投稿して「いいね」で投票。1位の写真はメイン表紙に飾られます。',
    wallUploadTitle: '表紙コンテストに参加',
    wallPhotoTitleLabel: '短いタイトル',
    wallPhotoTitlePlaceholder: '例：家族で飾ったクリスマスツリー',
    wallAuthorLabel: 'ご家族 / 都市',
    wallAuthorPlaceholder: '例：佐藤家 · 東京',
    wallChooseFile: '写真を選ぶ',
    wallSubmitPhoto: '投稿する (+20ポイント)',
    wallSortTop: '人気順',
    wallSortRecent: '新着順',
    wallLikeBtn: 'いいね',
    wallLikedBtn: 'いいね済み',
    wallReportBtn: '🚩 報告',
    wallReportDone: '報告済み',
    wallParadeBtn: '🎬 ビデオパレードを見る',
    wallEmpty: 'まだ写真がありません。最初の思い出を投稿しましょう！',
    podiumTitle: '🏆 クラウド公式表彰台（いいね Top 3）',
    podiumFirstBadge: '🥇 1位 メイン表紙',
    podiumSecondBadge: '🥈 2位',
    podiumThirdBadge: '🥉 3位',
    carouselLiveBadge: '🔴 LIVE • ショーケース更新中',
    carouselTitle: '✨ ライブ回転ギャラリー（最新25枚）',
    carouselWebpHint: 'WebP 約30KB · FIFO自動入れ替え · 安全フィルター',
    wallNsfwChecking: 'ファミリーセーフティ確認中...',
    wallNsfwRejected: '⚠️ 安全フィルターにより投稿が拒否されました。クリスマスの写真をお選びください。',
    paradeCountdownBanner: '⏳ クリスマス・ビデオパレード：12月25日公開！写真を投稿して❤️いいねを集めよう。',
    paradeCountdownTime: (d, h, m) => `${d}日 ${h}時間 ${m}分`,
    paradeLivePremiereBtn: '🎬 公開中！クリスマス・ビデオパレードを見る（人気写真）',
    paradeEndedBanner: '✨ クリスマスイベント終了！次回「東方の三博士スペシャル」をお楽しみに。',
    paradeRankPrefix: '順位',
    paradeCloseBtn: '閉じる',
    paradePlayingMusic: 'クリスマス音楽再生中',
    shareModalTitle: 'クリスマスの魔法をシェア',
    shareModalSubtitle: 'WhatsAppやSNSでシェアすると+50ポイントを即獲得できます。',
    shareCopyLink: 'リンクをコピー',
    shareCopied: 'コピーしました！',
    trendsModalTitle: 'マーケット情報 · 匿名ギフトトレンド',
    trendsModalSubtitle: '個人情報を一切含まない完全匿名統計です。',
    trendsTopGiftsTitle: '🏆 人気プレゼント TOP 10',
    trendsFilterCountry: '国・都市',
    trendsFilterLanguage: '言語',
    trendsFilterAgeRange: '年齢層',
    trendsAllOption: 'すべて',
    trendsExportCsvBtn: '📥 完全レポートを出力 (.CSV Excel用)',
    trendsTotalCountLabel: '匿名リクエスト数',
    trendsUniqueGiftsLabel: 'ギフト種類',
    trendsNoData: '条件に合うデータがありません。',
    trendsPinTitle: 'アクセスコード',
    trendsPinPlaceholder: 'コード',
    trendsPinUnlockBtn: '開く',
    trendsPinError: 'コードが正しくありません',
    trendsSimulateDec25Btn: '👁️ 12月25日をシミュレート',
    trendsSimulateDec25Active: '✅ 12月25日プレビュー有効（タップで解除）',
    trendsSimulateMidnightBtn: '🎆 クリスマスの深夜0時をシミュレート',
    trendsSimulateMidnightActive: '🎆 深夜0時モード有効',
    christmasClockTitle: '⏳ クリスマスまであと少し',
    christmasClockLiveTitle: '🎄 メリークリスマス！北極の真夜中です！',
    clockDays: '日',
    clockHours: '時間',
    clockMinutes: '分',
    clockSeconds: '秒',
    writeSantaLetterHeroBtn: '✉️ サンタさんへ手紙を書く',
    backToCoverBtn: '← トップに戻る',
    playSleighHeroBtn: '🎮 遊ぶ：サンタのそりゲーム',
    playSleighAccessBadge: '👑 VIP無料開放 / 🎬 広告を見て無料',
    adGateTitle: '🛷 魔法のそり：プレゼント大作戦',
    adGatePrompt: '🎬 短いクリスマス広告を見て、そりフライトを無料でアンロックしよう',
    adGateWatchBtn: '▶️ 広告を見て遊ぶ',
    adGateVipBtn: '👑 またはVIPゾーンで広告なしプレイ',
    adGateCountdown: (sec) => `🎄 クリスマス広告再生中…あと ${sec}秒`,
    adGateSimulatedSlot: 'AdSense / AdMob · クリスマスリワード広告',
    adGateSkipTestBtn: '⚡ すぐに入る',
    sleighGameTitle: '🛷 魔法のそり：プレゼント大作戦',
    sleighGameHint: '指でスライドまたはマウス移動で操作 · 魔法のキラキラ自動発射',
    gameScoreLabel: 'スコア',
    gameBestLabel: '🏆 ハイスコア',
    gameLevelLabel: 'レベル',
    gameLivesLabel: 'ライフ',
    gamePauseBtn: '一時停止',
    gameResumeBtn: '再開',
    gameExitShortBtn: '← 終了',
    gamePauseExitBtn: '🚪 終了',
    gameOverTitle: '🎄 クリスマスフライト終了！',
    gameNewRecordBadge: '🏆 新記録達成！+20 魔法ポイント',
    gamePlayAgainBtn: '🔄 もう一度遊ぶ',
    wallInvalidFileError: '❌ 5MB未満の有効なJPEG・PNG・WebP画像のみアップロードできます。',
    wallUploadRateLimitError: (sec) => `⏳ スパム防止：次の写真投稿まであと ${sec}秒 お待ちください。`,
    wallAlreadyVotedNotice: '❤️ この端末からはすでにこの写真に投票済みです。',
    adSlotPlaceholder: '広告スペース · SANTA MAGIA',
    privacyPolicyLinkLabel: '📜 プライバシーポリシー・利用規約',
    privacyPolicyModalTitle: '📜 プライバシーポリシー・利用規約 · SANTA MAGIA',
    privacyPolicySections: [
      {
        title: '1. 個人情報・お子様のデータは保存しません',
        body: 'SANTA MAGIAはお子様の名前、年齢、欲しいプレゼント、WhatsApp番号をサーバーに一切保存しません。',
      },
      {
        title: '2. フォトウォールの安全保護',
        body: '写真は端末内でWebP圧縮・安全チェックされ、2分に1回の投稿制限と端末ごとに写真1枚につき1票に制限されています。',
      },
      {
        title: '3. 標準Cookieと広告配信について',
        body: 'SANTA MAGIAは無料提供のため標準Cookieおよび広告ネットワーク（Google AdSense / Monetag等）を利用します。VIPゾーンで広告非表示も可能です。',
      },
      {
        title: '4. 利用規約',
        body: 'ご家族向けのクリスマス娯楽サービスです。スパム行為や不正投票は禁止されています。',
      },
    ],
    pwaPromptTitle: 'SANTA MAGIAをスマホにダウンロードしますか？それともブラウザで続けますか？',
    pwaDownloadBtn: '📲 アプリをダウンロード',
    pwaContinueWebBtn: 'Webで続ける',
    pwaFooterInstallBtn: '📲 アプリをダウンロード',
    pwaIosGuideTitle: 'iPhone / SafariにSANTA MAGIAをインストール',
    pwaIosStep1Title: '1. 共有ボタンをタップ',
    pwaIosStep1Desc: 'Safari下部バーの共有アイコン（上向き矢印の四角）をタップします。',
    pwaIosStep2Title: '2. 「ホーム画面に追加」をタップ',
    pwaIosStep2Desc: '下にスクロールして「ホーム画面に追加」を選び、「追加」をタップします。',
    pwaBrowserGuideTitle: 'スマホにSANTA MAGIAをインストール',
    pwaBrowserStep1Title: '1. ブラウザメニューを開く',
    pwaBrowserStep1Desc: 'Chrome右上のメニューボタン（⋮）をタップします。',
    pwaBrowserStep2Title: '2. 「アプリをインストール」をタップ',
    pwaBrowserStep2Desc: '確認すると赤と金のSANTA MAGIAアイコンがホーム画面に追加されます。',
    pwaOfflineBadge: 'オフラインモード — キャッシュデータを表示中',
    formatDisplayNames: (children) => formatChildNames(children.map((c) => c.name), '・', 'はると', '・'),
    buildSalutation: (children) => `${formatChildNames(children.map((c) => c.name), '・', 'はると', '・')} さんへ、`,
    shareTextTemplate: (children) => `🎄✨ ${formatChildNames(children.map((c) => c.name), '・', 'お子さま', '・')}へのサンタ公式手紙と魔法の電話！ 🎅📞`,
    buildParentWhatsappMessage: ({ children, city, behavior, sender, officialCode }) => {
      const lines = children.map((c, idx) => `${idx + 1}. *${c.name.trim() || `お子さま${idx + 1}`}${c.age.trim() ? ` (${c.age.trim()})` : ''}:* ${c.gift.trim() || 'サプライズ'}`).join('\n');
      return `🎄 *北極到着スタンプ - SANTA MAGIA*\n\n🎁 *お願いリスト:*\n${lines}\n\n📍 *都市:* ${city.trim() || '-'}\n⭐ *がんばり:* ${behavior}\n✉️ *送り主:* ${sender === 'kings' ? '三博士' : 'サンタクロース'}\n🔖 *公式コード:* ${officialCode}`;
    },
    toastPointsEarned: (pts) => `⭐ +${pts} 魔法ポイントを獲得しました！`,
    toastPhotoUploaded: '📸 写真が表紙コンテストに公開されました！',
    toastHdDownloaded: '📥 HD手紙画像をダウンロードしました！',
    toastReported: '🚩 ご報告ありがとうございます。安全のため非表示にしました。',
    closeBtn: '閉じる',
    elfNoteTitle: '🎄 メリークリスマス！',
    elfNoteBody: '大切なご家族や愛する人たちと素敵なホリデーをお過ごしください。あなたは決してひとりではなく、たくさんの愛情に包まれていることを忘れないでくださいね。アプリをご利用いただき心より感謝いたします。また新年にお会いしましょう！',
    elfNotePs: '😄 追伸：ソリに乗る前、プレゼント同士は何て言ったでしょう？「しっかり着込んでね、今夜みんな開けられちゃうから！」',
    elfNoteSignature: '署名：クリスマスの妖精エルフ 🎄🧝‍♂️（サンタさんが大忙しだったので僕が書きました）。',
    buildLetterParagraphs: ({ children }) => {
      const namesText = formatChildNames(children.map((c) => c.name), '・', 'はると', '・');
      return [
        `${namesText}さん、さきほどはお電話でお話しできてとてもうれしかったです！みなさんの手紙は北極の暖炉のそばにある黄金の宝箱に大切にしまいました。`,
        `トナカイとエルフたちもソリの準備を進めながら、クリスマスの黄金の本にお名前をしるしています。これからもご家族と仲良く、笑顔いっぱいで過ごしてくださいね。`,
        `すてきなクリスマスイブをお迎えください！`,
      ];
    },
    buildCertificateBody: ({ children, city }) => {
      const namesText = formatChildNames(children.map((c) => c.name), '・', 'はると', '・');
      return `北極評議会は、${city.trim() || 'お住まい'}の ${namesText} さんが素晴らしい思いやりと努力により、2026年ゴールドいい子リストに登録されたことを公式に証明します。`;
    },
    buildSantaCallScript: ({ children }) => {
      const namesText = formatChildNames(children.map((c) => c.name), '、', 'みんな', '、');
      return `ホー、ホー、ホー！こんにちは、${namesText}。サンタクロースだよ。今、北極でみんなのお手紙を受け取ったところだよ！今年どれだけいい子にしていたかパパとママに聞いて、そのがんばりに合わせてとっても特別なサプライズを持っていくからね。サイン入りのお手紙も置いておくよ！`;
    },
    samplePhotos: [
      { id: 'sample-1', title: 'サンタさんを待つ輝くクリスマスツリー', author: '高橋家 · 東京' },
      { id: 'sample-2', title: 'サンタさんへのクッキーと温かいミルク', author: 'ゆい＆はると · 大阪' },
      { id: 'sample-3', title: '雪とイルミネーションの山小屋', author: '鈴木家 · 札幌' },
      { id: 'sample-4', title: '暖炉の前に並んだクリスマス靴下', author: 'さくら＆れん · 京都' },
    ],
  },

  ko: {
    appName: 'SANTA MAGIA',
    appTagline: '산타의 편지와 마법의 전화',
    magicPointsLabel: '마법 포인트',
    soundOn: '소리 켜짐',
    soundOff: '음소거',
    musicOnBtn: '🎵 음악: ON',
    musicOffBtn: '🎵 음악: OFF',
    navHome: '홈',
    navLetter: 'HD 편지',
    navCall: '전화',
    navWall: '포토월',
    heroOfficialBadge: '👑 공식 크리스마스 커버 (최다 득표)',
    heroWinnerTitle: '집으로 찾아온 북극의 마법',
    heroLikesLabel: '좋아요',
    heroByLabel: '가족',
    heroCallCta: '📞 산타 할아버지가 전화했어요!',
    heroLetterCta: '✉️ 북극으로 편지 보내기',
    heroParadeCta: '🎬 비디오 퍼레이드 보기 (인기 사진)',
    heroQuickIntro: '하나 또는 여러 남매의 편지를 작성해 북극으로 보내고, 산타 할아버지의 전화를 받은 뒤 공식 답장을 확인하세요.',
    vipZoneTopBtn: '👑 광고 없는 VIP 존',
    vipExclusiveBadge: '👑 VIP',
    redeemPointsBadge: '⭐ 마법 포인트로 교환',
    magicPassBtn: '👑 광고 없는 VIP 존',
    magicPassTitle: '👑 광고 없는 VIP 존',
    magicPassSubtitle: '가족을 위한 모든 VIP 편지지와 인증서를 즉시 잠금 해제하세요',
    magicPassPerk1: '🚫 광고 제로',
    magicPassPerk2: '📜 모든 편지지 및 인증서 잠금 해제',
    magicPassPerk3: '⚡ 즉시 이용 가능',
    magicPassPriceLabel: '$2.99 USD',
    magicPassDemoNote: '데모 모드: 실제 결제 없이 모든 VIP 혜택을 바로 체험할 수 있습니다.',
    magicPassConfirm: 'VIP 존 활성화 ($2.99 USD)',
    magicPassUnlocked: 'VIP 존이 활성화되었습니다!',
    magicPassActiveBadge: '👑 VIP 존 사용 중',
    vipKofiNote: 'Ko-fi에서 안전하게 VIP 패스를 구매하고 즉시 활성화 코드를 받으세요.',
    vipCodeLabel: '이미 VIP 활성화 코드가 있으신가요?',
    vipCodePlaceholder: 'VIP 코드 입력',
    vipCodeSubmitBtn: '🔓 활성화',
    vipCodeError: '잘못된 VIP 코드입니다. 다시 확인해 주세요.',
    vipWelcomeMessage: '👑 광고 없는 VIP 존에 오신 것을 환영합니다! 모든 광고가 영구적으로 제거되었습니다.',
    adBannerLabel: '패밀리 스페이스',
    adBannerText: '온 가족과 함께 크리스마스의 마법을 즐겨보세요.',
    adBannerRemove: '👑 광고 없는 VIP 존',
    privacyNoticeText: '🔒 어린이 개인정보 보호: 이름이나 전화번호는 저장하지 않으며 익명의 크리스마스 트렌드 통계만 수집합니다.',
    preSendPrivacyBanner: '🔒 개인정보 보호 보장: 입력하신 정보와 메시지는 직접 선택한 분에게만 공유됩니다. 이 앱은 개인정보를 저장하지 않습니다.',
    letterSectionTitle: '북극으로 보내는 마법 편지',
    letterSectionSubtitle: '한 가정에서 최대 5명까지 추가할 수 있습니다. 전송하면 산타의 전화가 먼저 걸려오고, 통화 후 공식 편지가 공개됩니다.',
    childNumberLabel: (idx) => `어린이 #${idx}`,
    addSiblingBtn: '➕ 다른 형제/자매 추가',
    removeSiblingAria: '삭제',
    allSiblingsTab: '모두 함께',
    fieldChildName: '이름',
    fieldChildNamePlaceholder: '예: 민준, 서연...',
    fieldAge: '나이',
    fieldAgePlaceholder: '예: 7',
    fieldCity: '도시 / 국가',
    fieldCityPlaceholder: '예: 서울, 대한민국',
    fieldBehavior: '올해의 착한 행동',
    behaviorSuper: '아주 훌륭함 / 최고',
    behaviorVery: '매우 착함',
    behaviorTrying: '열심히 노력 중',
    fieldGift: '원하는 선물',
    fieldGiftPlaceholder: '예: 자전거, 레고...',
    fieldSender: '보내는 분',
    senderSanta: '🎅 산타클로스',
    senderKings: '👑 동방박사 세 분',
    fieldWhatsappLabel: '📱 집 연락처 (WhatsApp)',
    fieldWhatsappOtherOption: '기타 (+...)',
    fieldWhatsappCustomPrefixPlaceholder: '+...',
    fieldWhatsappPlaceholder: '예: 1012345678',
    fieldWhatsappHint: '북극 요정들이 도착 확인 도장을 보내드리기 위해 사용됩니다.',
    sendToNorthPoleBtn: '✉️ 북극으로 편지 보내기',
    sendingTitle: '북극으로 날아가는 중...',
    sendingSubtitle: '요정들이 편지를 받아 산타 할아버지의 전화를 연결하고 있어요.',
    sealedWaitingTitle: '봉인된 편지가 도착 예정입니다',
    sealedWaitingSubtitle: '먼저 "북극으로 편지 보내기"를 눌러 산타의 전화를 받으면 공식 서명 편지가 열립니다.',
    responseReadyBanner: '✨ 산타의 공식 서명 편지가 도착했습니다!',
    openWhatsappFallback: '📲 WhatsApp 도착 확인 도장 열기',
    fieldTheme: '편지지 / 인증서 스타일',
    themeClassic: '클래식 북극 편지지',
    themeRoyal: '로열 골드 VIP',
    themeAurora: '폴라 나이트 VIP',
    themeCertificate: '공식 착한 어린이 인증서',
    freeLabel: '무료',
    unlockWithPoints: '교환',
    unlockedLabel: '사용 가능',
    notEnoughPoints: '공유(+50pt)하거나 사진을 올려 포인트를 모으세요.',
    downloadHdBtn: '📥 HD 편지 다운로드 (이미지)',
    sharePointsBtn: '📲 공유하기 (+50 포인트)',
    callWithChildBtn: '📞 산타 할아버지가 전화했어요!',
    northPoleDispatch: '북극 공식 우체국',
    magiRoyalDispatch: '동방 왕실 우편',
    officialCodeLabel: '공식 코드',
    letterSignatureSanta: '사랑과 마법을 담아, 산타클로스',
    letterSignatureKings: '멜키오르, 카스파르, 발타사르',
    letterSealText: 'NORTH POLE',
    certificateTitle: '공식 착한 어린이 인증서',
    certificateSubtitle: '2026 크리스마스 명예의 전당',
    certificateAwardedTo: '수상자',
    certificateSealLabel: '황금 착한 일 책자 인증 완료',
    callSectionTitle: '북극 직통 전화 시뮬레이터',
    callSectionSubtitle: '소리를 키우고 산타 할아버지의 목소리를 들었을 때 아이들의 반응을 영상으로 담아보세요.',
    callTriggerBtn: '📞 산타 할아버지가 전화했어요!',
    callIncomingStatus: '마법의 전화 수신 중...',
    callConnectedStatus: '북극 작업실과 통화 중',
    callVoicePlayingNote: '산타 할아버지 목소리 재생 중...',
    callCallerSanta: '산타클로스',
    callCallerLocation: '북극 · 전용 회선',
    callAnswerBtn: '받기',
    callDeclineBtn: '거절',
    callHangupBtn: '통화 종료',
    callReplayVoiceBtn: '다시 듣기',
    callRecordHint: '팁: 받기 버튼을 누르기 전에 아이에게 폰을 건네주세요.',
    callVoiceLang: 'ko-KR',
    callCountdownTitle: (sec) => `🎅 산타 할아버지가 편지를 읽고 있어요... ${sec}초 후 전화`,
    callCountdownSubtitle: '소리를 크게 켜고 마법의 전화를 기다려 주세요!',
    callNowBtn: '⚡ 지금 바로 전화하기',
    callMissedTitle: '📵 앗! 제시간에 전화를 받지 못했어요',
    callMissedSubtitle: '15초 동안 벨이 울렸습니다. 다시 전화를 요청해 보세요!',
    callRetryCountdownBtn: '🔄 산타의 다음 전화 기다리기',
    wallSectionTitle: '📸 크리스마스 포토월 & 커버 콘테스트',
    wallSectionSubtitle: '가족 사진을 올리고 좋아요로 투표하세요. 1등 사진이 메인 커버로 선정됩니다.',
    wallUploadTitle: '크리스마스 커버 참가하기',
    wallPhotoTitleLabel: '짧은 사진 제목',
    wallPhotoTitlePlaceholder: '예: 가족과 꾸민 크리스마스 트리',
    wallAuthorLabel: '가족 / 도시',
    wallAuthorPlaceholder: '예: 김민준 가족 · 서울',
    wallChooseFile: '사진 선택',
    wallSubmitPhoto: '포토월에 올리기 (+20포인트)',
    wallSortTop: '인기순',
    wallSortRecent: '최신순',
    wallLikeBtn: '좋아요',
    wallLikedBtn: '좋아요 완료',
    wallReportBtn: '🚩 신고',
    wallReportDone: '신고됨',
    wallParadeBtn: '🎬 비디오 퍼레이드 보기',
    wallEmpty: '아직 사진이 없습니다. 첫 번째 추억을 올려보세요!',
    podiumTitle: '🏆 공식 클라우드 포디움 (좋아요 Top 3)',
    podiumFirstBadge: '🥇 1위 메인 커버',
    podiumSecondBadge: '🥈 2위',
    podiumThirdBadge: '🥉 3위',
    carouselLiveBadge: '🔴 LIVE • 쇼케이스 업데이트 중',
    carouselTitle: '✨ 실시간 회전 갤러리 (최근 사진 25장)',
    carouselWebpHint: 'WebP ~30KB · FIFO 자동 순환 · 안전 필터',
    wallNsfwChecking: '가족 안전 필터 확인 중...',
    wallNsfwRejected: '⚠️ 가족 안전 필터에 의해 차단된 이미지입니다.',
    paradeCountdownBanner: '⏳ 크리스마스 그랜드 비디오 퍼레이드: 12월 25일 공개! 사진을 올리고 ❤️ 좋아요를 모아 영상에 등장하세요.',
    paradeCountdownTime: (d, h, m) => `${d}일 ${h}시간 ${m}분`,
    paradeLivePremiereBtn: '🎬 라이브 공개! 크리스마스 비디오 퍼레이드 보기 (인기 사진)',
    paradeEndedBanner: '✨ 크리스마스 이벤트가 종료되었습니다! 동방박사 스페셜에서 만나요.',
    paradeRankPrefix: '순위',
    paradeCloseBtn: '나가기',
    paradePlayingMusic: '크리스마스 음악 재생 중',
    shareModalTitle: '크리스마스 마법 공유',
    shareModalSubtitle: 'WhatsApp이나 SNS에 공유하면 즉시 +50 포인트를 드립니다.',
    shareCopyLink: '링크 복사',
    shareCopied: '복사되었습니다!',
    trendsModalTitle: '마켓 인텔리전스 · 익명 선물 트렌드',
    trendsModalSubtitle: '개인 식별 정보가 전혀 없는 100% 익명 통계입니다.',
    trendsTopGiftsTitle: '🏆 가장 많이 요청된 선물 TOP 10',
    trendsFilterCountry: '국가 / 도시',
    trendsFilterLanguage: '언어',
    trendsFilterAgeRange: '연령대',
    trendsAllOption: '전체',
    trendsExportCsvBtn: '📥 전체 리포트 내보내기 (.CSV Excel용)',
    trendsTotalCountLabel: '익명 요청 수',
    trendsUniqueGiftsLabel: '고유 선물 수',
    trendsNoData: '선택한 필터에 해당하는 데이터가 없습니다.',
    trendsPinTitle: '접속 코드 입력',
    trendsPinPlaceholder: '코드',
    trendsPinUnlockBtn: '패널 열기',
    trendsPinError: '잘못된 코드입니다',
    trendsSimulateDec25Btn: '👁️ 12월 25일 시뮬레이션',
    trendsSimulateDec25Active: '✅ 12월 25일 미리보기 활성화됨 (눌러서 끄기)',
    trendsSimulateMidnightBtn: '🎆 크리스마스 자정 시뮬레이션',
    trendsSimulateMidnightActive: '🎆 자정 모드 활성',
    christmasClockTitle: '⏳ 크리스마스 카운트다운',
    christmasClockLiveTitle: '🎄 메리 크리스마스! 북극의 자정입니다!',
    clockDays: '일',
    clockHours: '시간',
    clockMinutes: '분',
    clockSeconds: '초',
    writeSantaLetterHeroBtn: '✉️ 산타 할아버지께 편지 쓰기',
    backToCoverBtn: '← 첫 화면으로 돌아가기',
    playSleighHeroBtn: '🎮 게임하기: 산타 썰매',
    playSleighAccessBadge: '👑 VIP 바로 입장 / 🎬 광고 보고 무료',
    adGateTitle: '🛷 마법의 썰매: 선물 미션',
    adGatePrompt: '🎬 짧은 크리스마스 광고를 시청하고 썰매 비행을 무료로 잠금 해제하세요',
    adGateWatchBtn: '▶️ 광고 보고 플레이하기',
    adGateVipBtn: '👑 또는 VIP 존으로 광고 없이 바로 입장',
    adGateCountdown: (sec) => `🎄 크리스마스 광고 중... ${sec}초 후 시작`,
    adGateSimulatedSlot: 'AdSense / AdMob · 크리스마스 보상형 광고',
    adGateSkipTestBtn: '⚡ 바로 입장',
    sleighGameTitle: '🛷 마법의 썰매: 선물 미션',
    sleighGameHint: '손가락 슬라이드 또는 마우스 이동으로 조종 · 자동 마법 불꽃 발사',
    gameScoreLabel: '점수',
    gameBestLabel: '🏆 최고 기록',
    gameLevelLabel: '레벨',
    gameLivesLabel: '목숨',
    gamePauseBtn: '일시정지',
    gameResumeBtn: '계속하기',
    gameExitShortBtn: '← 나가기',
    gamePauseExitBtn: '🚪 나가기',
    gameOverTitle: '🎄 크리스마스 비행 종료!',
    gameNewRecordBadge: '🏆 신기록 달성! +20 마법 포인트',
    gamePlayAgainBtn: '🔄 다시 플레이',
    wallInvalidFileError: '❌ 5MB 미만의 유효한 JPEG, PNG 또는 WebP 이미지만 업로드할 수 있습니다.',
    wallUploadRateLimitError: (sec) => `⏳ 스팸 방지: 다음 사진 업로드까지 ${sec}초 기다려 주세요.`,
    wallAlreadyVotedNotice: '❤️ 이 기기에서 이미 이 사진에 투표했습니다.',
    adSlotPlaceholder: '광고 영역 · SANTA MAGIA',
    privacyPolicyLinkLabel: '📜 개인정보 처리방침 및 이용약관',
    privacyPolicyModalTitle: '📜 개인정보 처리방침 및 이용약관 · SANTA MAGIA',
    privacyPolicySections: [
      {
        title: '1. 개인정보 및 아동 정보 미저장',
        body: 'SANTA MAGIA는 어린이 이름, 나이, 선물 목록 또는 WhatsApp 번호를 서버에 저장하지 않습니다.',
      },
      {
        title: '2. 가족 포토월 보안',
        body: '사진은 WebP로 압축 및 안전 검사되며, 2분당 1회 업로드 및 기기당 사진별 1표로 제한됩니다.',
      },
      {
        title: '3. 표준 쿠키 및 광고 안내',
        body: 'SANTA MAGIA는 무료 서비스 유지를 위해 표준 쿠키 및 광고 네트워크(Google AdSense, Monetag 등)를 사용하며 VIP 존에서 광고 없이 이용할 수 있습니다.',
      },
      {
        title: '4. 이용약관',
        body: '가족을 위한 크리스마스 엔터테인먼트 서비스입니다. 스팸 및 투표 조작은 금지됩니다.',
      },
    ],
    pwaPromptTitle: 'SANTA MAGIA 앱을 휴대폰에 다운로드하시겠어요, 아니면 브라우저에서 계속하시겠어요?',
    pwaDownloadBtn: '📲 앱 다운로드',
    pwaContinueWebBtn: '웹에서 계속하기',
    pwaFooterInstallBtn: '📲 앱 다운로드',
    pwaIosGuideTitle: 'iPhone / Safari에 SANTA MAGIA 설치하기',
    pwaIosStep1Title: '1. 공유 버튼 누르기',
    pwaIosStep1Desc: 'Safari 하단 막대의 공유 아이콘(위쪽 화살표가 있는 사각형)을 누르세요.',
    pwaIosStep2Title: '2. "홈 화면에 추가" 선택',
    pwaIosStep2Desc: '아래로 스크롤하여 "홈 화면에 추가"를 누른 뒤 추가를 선택하세요.',
    pwaBrowserGuideTitle: '휴대폰에 SANTA MAGIA 설치하기',
    pwaBrowserStep1Title: '1. 브라우저 메뉴 열기',
    pwaBrowserStep1Desc: 'Chrome 오른쪽 상단의 메뉴 아이콘(⋮)을 누르세요.',
    pwaBrowserStep2Title: '2. "앱 설치" 누르기',
    pwaBrowserStep2Desc: '확인하면 빨강·금색 SANTA MAGIA 아이콘이 홈 화면에 추가됩니다.',
    pwaOfflineBadge: '오프라인 모드 — 저장된 데이터 사용 중',
    formatDisplayNames: (children) => formatChildNames(children.map((c) => c.name), '그리고', '민준'),
    buildSalutation: (children) => `${formatChildNames(children.map((c) => c.name), ', ', '민준', ', ')} 어린이에게,`,
    shareTextTemplate: (children) => `🎄✨ ${formatChildNames(children.map((c) => c.name), ', ', '아이들', ', ')}을 위한 산타 공식 편지와 마법 전화! 🎅📞`,
    buildParentWhatsappMessage: ({ children, city, behavior, sender, officialCode }) => {
      const lines = children.map((c, idx) => `${idx + 1}. *${c.name.trim() || `어린이 ${idx + 1}`}${c.age.trim() ? ` (${c.age.trim()})` : ''}:* ${c.gift.trim() || '서프라이즈'}`).join('\n');
      return `🎄 *북극 도착 스탬프 - SANTA MAGIA*\n\n🎁 *요청 목록:*\n${lines}\n\n📍 *도시:* ${city.trim() || '-'}\n⭐ *행동:* ${behavior}\n✉️ *보낸이:* ${sender === 'kings' ? '동방박사' : '산타클로스'}\n🔖 *공식 코드:* ${officialCode}`;
    },
    toastPointsEarned: (pts) => `⭐ +${pts} 마법 포인트를 획득했습니다!`,
    toastPhotoUploaded: '📸 사진이 커버 콘테스트에 등록되었습니다!',
    toastHdDownloaded: '📥 HD 편지 이미지가 저장되었습니다!',
    toastReported: '🚩 신고되었습니다. 가족 안전을 위해 숨김 처리됩니다.',
    closeBtn: '닫기',
    elfNoteTitle: '🎄 메리 크리스마스!',
    elfNoteBody: '사랑하는 가족과 소중한 이들과 함께 따뜻하고 행복한 연말 보내세요. 여러분은 결코 혼자가 아니며 언제나 큰 사랑을 받고 있다는 것을 꼭 기억하세요. 저희 앱을 이용해 주셔서 진심으로 감사드립니다. 새해에 다시 만나요!',
    elfNotePs: '😄 추신: 썰매에 오르기 전에 한 선물이 다른 선물에게 뭐라고 했을까요? "옷 따뜻하게 입어! 오늘 밤에 우리 다 뜯길 거니까!"',
    elfNoteSignature: '서명: 크리스마스 요정 엘프 🎄🧝‍♂️ (산타 할아버지가 너무 바쁘셔서 제가 대신 썼어요).',
    buildLetterParagraphs: ({ children }) => {
      const namesText = formatChildNames(children.map((c) => c.name), ', ', '민준', ', ');
      return [
        `사랑하는 ${namesText}, 방금 전 전화로 목소리를 들을 수 있어서 정말 반가웠단다! 보내준 편지는 북극 작업실 벽난로 옆 황금 상자에 소중히 보관해 두었어.`,
        `루돌프와 요정들이 썰매를 반짝이게 닦으며 황금 착한 일 책자에 이름을 적어두었단다. 앞으로도 가족을 사랑하고 집안을 웃음으로 가득 채워주렴.`,
        `잊지 못할 행복한 크리스마스 이브를 기다리렴!`,
      ];
    },
    buildCertificateBody: ({ children, city }) => {
      const namesText = formatChildNames(children.map((c) => c.name), ', ', '민준', ', ');
      return `북극 위원회는 ${city.trim() || '우리 마을'}의 ${namesText} 어린이가 따뜻한 마음과 착한 행동으로 2026 황금 착한 어린이 명단에 올랐음을 공식 인증합니다.`;
    },
    buildSantaCallScript: ({ children }) => {
      const namesText = formatChildNames(children.map((c) => c.name), ', ', '친구', ', ');
      return `호, 호, 호! 안녕 ${namesText}, 나는 산타 할아버지란다. 방금 북극에서 너희 편지를 잘 받았어! 엄마 아빠에게 올해 얼마나 착하게 지냈는지 여쭤보고, 착한 행동에 맞춰 아주 특별한 선물을 준비해 갈게. 내가 서명한 편지도 함께 남겨둘게!`;
    },
    samplePhotos: [
      { id: 'sample-1', title: '산타를 기다리는 반짝이는 트리', author: '박씨 가족 · 서울' },
      { id: 'sample-2', title: '산타를 위한 쿠키와 따뜻한 우유', author: '서연 & 민준 · 부산' },
      { id: 'sample-3', title: '눈 덮인 겨울 오두막의 불빛', author: '이씨 가족 · 평창' },
      { id: 'sample-4', title: '벽난로 앞에 걸린 크리스마스 양말', author: '지우 & 하준 · 인천' },
    ],
  },

  ar: {
    appName: 'SANTA MAGIA',
    appTagline: 'رسالة ومكالمة سانتا السحرية',
    magicPointsLabel: 'نقاط السحر',
    soundOn: 'الصوت مفعل',
    soundOff: 'مكتوم',
    musicOnBtn: '🎵 موسيقى: ON',
    musicOffBtn: '🎵 موسيقى: OFF',
    navHome: 'الغلاف',
    navLetter: 'رسالة HD',
    navCall: 'مكالمة',
    navWall: 'جدار الصور',
    heroOfficialBadge: '👑 غلاف العيد الرسمي (الأكثر تصويتاً)',
    heroWinnerTitle: 'سحر القطب الشمالي في منزلكم',
    heroLikesLabel: 'إعجاب',
    heroByLabel: 'عائلة',
    heroCallCta: '📞 سانتا يتصل الآن!',
    heroLetterCta: '✉️ أرسل رسالة إلى القطب الشمالي',
    heroParadeCta: '🎬 شاهد عرض الفيديو (أفضل الصور)',
    heroQuickIntro: 'اكتب رسالة لطفل واحد أو عدة إخوة معاً، أرسلها إلى القطب الشمالي، أجب على مكالمة سانتا السحرية واحصل على الرسالة الرسمية المختومة.',
    vipZoneTopBtn: '👑 منطقة VIP بدون إعلانات',
    vipExclusiveBadge: '👑 VIP',
    redeemPointsBadge: '⭐ استبدال بنقاط السحر',
    magicPassBtn: '👑 منطقة VIP بدون إعلانات',
    magicPassTitle: '👑 منطقة VIP بدون إعلانات',
    magicPassSubtitle: 'افتح فوراً جميع البطاقات الذهبية والشهادات الرسمية لعائلتك',
    magicPassPerk1: '🚫 بدون أي إعلانات',
    magicPassPerk2: '📜 فتح جميع البطاقات والشهادات',
    magicPassPerk3: '⚡ وصول فوري',
    magicPassPriceLabel: '$2.99 USD',
    magicPassDemoNote: 'وضع التجربة: اضغط أدناه لتجربة الفتح الكامل فوراً بدون رسوم حقيقية.',
    magicPassConfirm: 'تفعيل منطقة VIP ($2.99 USD)',
    magicPassUnlocked: 'تم تفعيل منطقة VIP وفتح جميع المزايا!',
    magicPassActiveBadge: '👑 منطقة VIP مفعلة',
    vipKofiNote: 'احصل على بطاقة VIP بأمان عبر Ko-fi واستلم رمز التفعيل الخاص بك فوراً.',
    vipCodeLabel: 'هل لديك رمز تفعيل VIP بالفعل؟',
    vipCodePlaceholder: 'أدخل رمز VIP',
    vipCodeSubmitBtn: '🔓 تفعيل',
    vipCodeError: 'رمز VIP غير صحيح. يرجى التحقق والمحاولة مرة أخرى.',
    vipWelcomeMessage: '👑 مرحباً بك في منطقة VIP بدون إعلانات! تم إخفاء جميع الإعلانات وفتح المزايا للأبد.',
    adBannerLabel: 'مساحة العائلة',
    adBannerText: 'استمتع بسحر العيد مع جميع أفراد العائلة.',
    adBannerRemove: '👑 منطقة VIP بدون إعلانات',
    privacyNoticeText: '🔒 حماية خصوصية الأطفال: لا نخزن أسماءً ولا أرقام هواتف؛ فقط إحصائيات مجهولة للاتجاهات.',
    preSendPrivacyBanner: '🔒 خصوصية مضمونة: تتم مشاركة بياناتك ورسائلك فقط مع الأشخاص الذين تختارهم. لا يخزن هذا التطبيق أي بيانات شخصية.',
    letterSectionTitle: 'رسالة سحرية إلى القطب الشمالي',
    letterSectionSubtitle: 'أضف حتى 5 أطفال في المنزل نفسه. عند الإرسال يتصل سانتا أولاً ثم تظهر الرسالة الرسمية الموقعة.',
    childNumberLabel: (idx) => `طفل #${idx}`,
    addSiblingBtn: '➕ إضافة طفل آخر',
    removeSiblingAria: 'حذف',
    allSiblingsTab: 'الجميع معاً',
    fieldChildName: 'الاسم',
    fieldChildNamePlaceholder: 'مثال: آدم، ليلى...',
    fieldAge: 'العمر',
    fieldAgePlaceholder: 'مثال: 7',
    fieldCity: 'المدينة والدولة',
    fieldCityPlaceholder: 'مثال: الرياض، السعودية',
    fieldBehavior: 'السلوك هذا العام',
    behaviorSuper: 'ممتاز ومهذب جداً',
    behaviorVery: 'جيد جداً',
    behaviorTrying: 'يبذل مجهوداً رائعاً',
    fieldGift: 'الهدية المفضلة',
    fieldGiftPlaceholder: 'مثال: دراجة، ليغو...',
    fieldSender: 'المرسل الرسمي',
    senderSanta: '🎅 بابا نويل / سانتا كلوز',
    senderKings: '👑 الحكماء الثلاثة',
    fieldWhatsappLabel: '📱 هاتف التواصل في المنزل (WhatsApp)',
    fieldWhatsappOtherOption: 'آخر (+...)',
    fieldWhatsappCustomPrefixPlaceholder: '+...',
    fieldWhatsappPlaceholder: 'مثال: 501234567',
    fieldWhatsappHint: 'لكي يرسل مساعدو القطب الشمالي ختم تأكيد الوصول.',
    sendToNorthPoleBtn: '✉️ أرسل الرسالة إلى القطب الشمالي',
    sendingTitle: 'الرسالة تطير إلى القطب الشمالي...',
    sendingSubtitle: 'استلم المساعدون الظرف السحري ويقومون بتوصيل مكالمة سانتا الآن.',
    sealedWaitingTitle: 'الوثيقة المختومة في الطريق',
    sealedWaitingSubtitle: 'اضغط "أرسل الرسالة إلى القطب الشمالي" للرد على مكالمة سانتا أولاً ثم كشف رسالتك الرسمية الموقعة.',
    responseReadyBanner: '✨ تم كشف رسالة سانتا الرسمية والموقعة!',
    openWhatsappFallback: '📲 فتح ختم التأكيد في واتساب',
    fieldTheme: 'تصميم الوثيقة / الشهادة',
    themeClassic: 'الوثيقة الكلاسيكية للقطب الشمالي',
    themeRoyal: 'المخمل الذهبي الملكي VIP',
    themeAurora: 'ليلة الشفق القطبي VIP',
    themeCertificate: 'شهادة الطفل المهذب الرسمية',
    freeLabel: 'مجاني',
    unlockWithPoints: 'استبدال',
    unlockedLabel: 'مفتوح',
    notEnoughPoints: 'شارك (+50 نقطة) أو أضف صورة لكسب المزيد من نقاط السحر.',
    downloadHdBtn: '📥 تحميل الرسالة HD (صورة)',
    sharePointsBtn: '📲 مشاركة (+50 نقطة)',
    callWithChildBtn: '📞 سانتا يتصل الآن!',
    northPoleDispatch: 'مكتب البريد الرسمي للقطب الشمالي',
    magiRoyalDispatch: 'البريد الملكي الشرقي',
    officialCodeLabel: 'الرمز الرسمي',
    letterSignatureSanta: 'بكل المحبة والسحر، بابا نويل',
    letterSignatureKings: 'ملكيور وكاسبار وبالتازار',
    letterSealText: 'NORTH POLE',
    certificateTitle: 'شهادة الطفل المهذب الرسمية',
    certificateSubtitle: 'سجل الشرف لعام 2026',
    certificateAwardedTo: 'تُمنح بكل فخر إلى',
    certificateSealLabel: 'معتمدة من الكتاب الذهبي',
    callSectionTitle: 'مكالمة مباشرة من القطب الشمالي',
    callSectionSubtitle: 'ارفع الصوت وجهز الكاميرا لتسجيل ردة الفعل عند سماع صوت سانتا.',
    callTriggerBtn: '📞 سانتا يتصل الآن!',
    callIncomingStatus: 'مكالمة سحرية واردة...',
    callConnectedStatus: 'مباشرة من ورشة القطب الشمالي',
    callVoicePlayingNote: 'الاستماع إلى سانتا مباشرة...',
    callCallerSanta: 'بابا نويل (سانتا)',
    callCallerLocation: 'القطب الشمالي · خط خاص',
    callAnswerBtn: 'رد',
    callDeclineBtn: 'رفض',
    callHangupBtn: 'إنهاء المكالمة',
    callReplayVoiceBtn: 'إعادة الاستماع',
    callRecordHint: 'نصيحة: سلّم الهاتف للأطفال قبل الضغط على زر الرد.',
    callVoiceLang: 'ar-SA',
    callCountdownTitle: (sec) => `🎅 سانتا كلوز يقرأ رسالتك... سيتصل خلال ${sec}ث`,
    callCountdownSubtitle: 'ارفع صوت الهاتف لتستمع إلى مكالمة سانتا المباشرة!',
    callNowBtn: '⚡ اتصل الآن',
    callMissedTitle: '📵 عذراً! لم تتمكن من الرد في الوقت المناسب',
    callMissedSubtitle: 'رن الهاتف لمدة 15 ثانية. اطلب انتظار مكالمة جديدة من سانتا!',
    callRetryCountdownBtn: '🔄 انتظار مكالمة أخرى من سانتا',
    wallSectionTitle: '📸 جدار الصور ومسابقة الغلاف',
    wallSectionSubtitle: 'ارفع صورة عائلية وصوّت بالإعجاب. الصورة رقم #1 تظهر تلقائياً على الغلاف الرئيسي.',
    wallUploadTitle: 'شارك في مسابقة الغلاف',
    wallPhotoTitleLabel: 'عنوان قصير للصورة',
    wallPhotoTitlePlaceholder: 'مثال: أضواء الزينة مع العائلة',
    wallAuthorLabel: 'العائلة / المدينة',
    wallAuthorPlaceholder: 'مثال: عائلة السالم · دبي',
    wallChooseFile: 'اختر صورة',
    wallSubmitPhoto: 'نشر الصورة (+20 نقطة)',
    wallSortTop: 'الأكثر تصويتاً',
    wallSortRecent: 'الأحدث',
    wallLikeBtn: 'إعجاب',
    wallLikedBtn: 'أعجبك',
    wallReportBtn: '🚩 إبلاغ',
    wallReportDone: 'تم الإبلاغ',
    wallParadeBtn: '🎬 مشاهدة عرض الفيديو',
    wallEmpty: 'لا توجد صور ظاهرة بعد. شارك بأول صورة!',
    podiumTitle: '🏆 منصة التتويج السحابية (أفضل 3 صور)',
    podiumFirstBadge: '🥇 المركز 1 · الغلاف الرئيسي',
    podiumSecondBadge: '🥈 المركز 2',
    podiumThirdBadge: '🥉 المركز 3',
    carouselLiveBadge: '🔴 مباشر • تحديث المعرض',
    carouselTitle: '✨ المعرض الدوّار المباشر (أحدث 25 صورة)',
    carouselWebpHint: 'WebP ~30KB · دورة تلقائية · فلتر عائلي',
    wallNsfwChecking: 'جارٍ فحص أمان الصورة...',
    wallNsfwRejected: '⚠️ تم رفض الصورة بواسطة فلتر الأمان العائلي.',
    paradeCountdownBanner: '⏳ عرض فيديو الكريسماس الكبير: يُعرض يوم 25 ديسمبر! ارفع صورتك واجمع ❤️ الإعجابات للظهور في الفيديو.',
    paradeCountdownTime: (d, h, m) => `${d}ي ${h}س ${m}د`,
    paradeLivePremiereBtn: '🎬 عرض مباشر الآن! شاهد فيديو الكريسماس الكبير (أفضل الصور)',
    paradeEndedBanner: '✨ انتهى حدث الكريسماس! نراكم في عرض الملوك المجوس الخاص.',
    paradeRankPrefix: 'المركز',
    paradeCloseBtn: 'خروج',
    paradePlayingMusic: 'الموسيقى الاحتفالية تعمل',
    shareModalTitle: 'مشاركة السحر',
    shareModalSubtitle: 'شارك عبر واتساب أو الشبكات الاجتماعية واحصل فوراً على +50 نقطة.',
    shareCopyLink: 'نسخ الرابط',
    shareCopied: 'تم النسخ!',
    trendsModalTitle: 'ذكاء السوق · اتجاهات الهدايا المجهولة',
    trendsModalSubtitle: 'إحصائيات مجمعة ومجهولة تماماً بدون أي بيانات شخصية.',
    trendsTopGiftsTitle: '🏆 أكثر 10 هدايا طلباً',
    trendsFilterCountry: 'الدولة / المدينة',
    trendsFilterLanguage: 'اللغة',
    trendsFilterAgeRange: 'الفئة العمرية',
    trendsAllOption: 'الكل',
    trendsExportCsvBtn: '📥 تصدير التقرير الكامل (.CSV لبرنامج Excel)',
    trendsTotalCountLabel: 'طلبات مجهولة',
    trendsUniqueGiftsLabel: 'هدايا فريدة',
    trendsNoData: 'لا توجد بيانات مطابقة لهذه الفلاتر.',
    trendsPinTitle: 'رمز الدخول السري',
    trendsPinPlaceholder: 'الرمز',
    trendsPinUnlockBtn: 'فتح اللوحة',
    trendsPinError: 'رمز غير صحيح',
    trendsSimulateDec25Btn: '👁️ محاكاة تاريخ 25 ديسمبر',
    trendsSimulateDec25Active: '✅ معاينة 25 ديسمبر مفعلة (اضغط للإلغاء)',
    trendsSimulateMidnightBtn: '🎆 محاكاة منتصف ليل العيد',
    trendsSimulateMidnightActive: '🎆 وضع منتصف الليل مفعل',
    christmasClockTitle: '⏳ العد التنازلي لعيد الميلاد',
    christmasClockLiveTitle: '🎄 حلّ عيد الميلاد! منتصف الليل في القطب الشمالي!',
    clockDays: 'أيام',
    clockHours: 'ساعات',
    clockMinutes: 'دقائق',
    clockSeconds: 'ثوانٍ',
    writeSantaLetterHeroBtn: '✉️ اكتب رسالتي إلى بابا نويل',
    backToCoverBtn: '← العودة إلى الرئيسية',
    playSleighHeroBtn: '🎮 العب: مزلجة بابا نويل',
    playSleighAccessBadge: '👑 VIP مجاناً / 🎬 مجاناً مع إعلان',
    adGateTitle: '🛷 المزلجة السحرية: مهمة الهدايا',
    adGatePrompt: '🎬 شاهد إعلاناً قصيراً للعيد لفتح رحلة المزلجة مجاناً',
    adGateWatchBtn: '▶️ مشاهدة الإعلان واللعب',
    adGateVipBtn: '👑 أو ادخل بدون إعلانات مع منطقة VIP',
    adGateCountdown: (sec) => `🎄 إعلان العيد... يتم الفتح خلال ${sec}ث`,
    adGateSimulatedSlot: 'AdSense / AdMob · إعلان مكافأة العيد',
    adGateSkipTestBtn: '⚡ دخول مباشر',
    sleighGameTitle: '🛷 المزلجة السحرية: مهمة الهدايا',
    sleighGameHint: 'اسحب بإصبعك أو حرك الفأرة للتوجيه · إطلاق شرارات سحرية تلقائي',
    gameScoreLabel: 'النقاط',
    gameBestLabel: '🏆 أفضل رقم قياسي',
    gameLevelLabel: 'المستوى',
    gameLivesLabel: 'الأرواح',
    gamePauseBtn: 'إيقاف مؤقت',
    gameResumeBtn: 'متابعة',
    gameExitShortBtn: '← خروج',
    gamePauseExitBtn: '🚪 خروج',
    gameOverTitle: '🎄 انتهت رحلة العيد!',
    gameNewRecordBadge: '🏆 رقم قياسي جديد! +20 نقطة سحرية',
    gamePlayAgainBtn: '🔄 العب مرة أخرى',
    wallInvalidFileError: '❌ يُسمح فقط بصور JPEG أو PNG أو WebP صالحة أقل من 5 ميجابايت.',
    wallUploadRateLimitError: (sec) => `⏳ حماية من الرسائل المزعجة: يرجى الانتظار ${sec}ث قبل رفع صورة أخرى.`,
    wallAlreadyVotedNotice: '❤️ لقد قمت بالتصويت لهذه الصورة بالفعل من هذا الجهاز.',
    adSlotPlaceholder: 'مساحة إعلانية · SANTA MAGIA',
    privacyPolicyLinkLabel: '📜 سياسة الخصوصية والشروط',
    privacyPolicyModalTitle: '📜 سياسة الخصوصية والشروط · SANTA MAGIA',
    privacyPolicySections: [
      {
        title: '1. عدم تخزين أي بيانات شخصية أو بيانات أطفال',
        body: 'لا يقوم SANTA MAGIA بتخزين أسماء الأطفال أو أعمارهم أو هداياهم أو أرقام واتساب على خوادمنا مطلقاً.',
      },
      {
        title: '2. أمان حائط الصور العائلي',
        body: 'تُضغط الصور بصيغة WebP وتُفحص تلقائياً مع حد أقصى صورة واحدة كل دقيقتين وصوت واحد لكل صورة لكل جهاز.',
      },
      {
        title: '3. ملفات تعريف الارتباط والإعلانات القياسية',
        body: 'يستخدم SANTA MAGIA ملفات تعريف ارتباط قياسية وشبكات إعلانية (مثل Google AdSense أو Monetag) لإبقاء الخدمة مجانية، مع خيار التصفح بدون إعلانات عبر منطقة VIP.',
      },
      {
        title: '4. شروط الاستخدام',
        body: 'تطبيق ترفيهي عائلي لموسم الأعياد. يُمنع الإرسال العشوائي أو التلاعب بالأصوات.',
      },
    ],
    pwaPromptTitle: 'هل تريد تنزيل تطبيق SANTA MAGIA على هاتفك أم المتابعة في المتصفح؟',
    pwaDownloadBtn: '📲 تنزيل التطبيق',
    pwaContinueWebBtn: 'المتابعة على الويب',
    pwaFooterInstallBtn: '📲 تنزيل التطبيق',
    pwaIosGuideTitle: 'تثبيت SANTA MAGIA على iPhone / Safari',
    pwaIosStep1Title: '1. اضغط على زر المشاركة',
    pwaIosStep1Desc: 'اضغط على أيقونة المشاركة (مربع بسهم للأعلى) في شريط متصفح Safari السفلي.',
    pwaIosStep2Title: '2. اختر "إضافة إلى الشاشة الرئيسية"',
    pwaIosStep2Desc: 'مرر للأسفل، واضغط على "إضافة إلى الشاشة الرئيسية" ثم اضغط إضافة.',
    pwaBrowserGuideTitle: 'تثبيت SANTA MAGIA على هاتفك',
    pwaBrowserStep1Title: '1. افتح قائمة المتصفح',
    pwaBrowserStep1Desc: 'اضغط على النقاط الثلاث (⋮) في الزاوية العلوية في متصفح Chrome.',
    pwaBrowserStep2Title: '2. اضغط على "تثبيت التطبيق"',
    pwaBrowserStep2Desc: 'قم بالتأكيد لإضافة أيقونة SANTA MAGIA الحمراء والذهبية إلى شاشتك الرئيسية.',
    pwaOfflineBadge: 'وضع عدم الاتصال — استخدام البيانات المخزنة',
    formatDisplayNames: (children) => formatChildNames(children.map((c) => c.name), 'و', 'آدم'),
    buildSalutation: (children) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const formatted = formatChildNames(children.map((c) => c.name), 'و', 'آدم');
      return isPlural ? `أعزائي ${formatted}،` : `عزيزي/عزيزتي ${formatted}،`;
    },
    shareTextTemplate: (children) => `🎄✨ شاهد الرسالة الرسمية والمكالمة السحرية من سانتا لـ ${formatChildNames(children.map((c) => c.name), 'و', 'الأطفال')} في SANTA MAGIA! 🎅📞`,
    buildParentWhatsappMessage: ({ children, city, behavior, sender, officialCode }) => {
      const lines = children.map((c, idx) => `${idx + 1}. *${c.name.trim() || `طفل ${idx + 1}`}${c.age.trim() ? ` (${c.age.trim()})` : ''}:* ${c.gift.trim() || 'مفاجأة'}`).join('\n');
      return `🎄 *ختم الوصول من القطب الشمالي - SANTA MAGIA*\n\n🎁 *قائمة الأمنيات:*\n${lines}\n\n📍 *المدينة:* ${city.trim() || '-'}\n⭐ *السلوك:* ${behavior}\n✉️ *المرسل:* ${sender === 'kings' ? 'الحكماء الثلاثة' : 'سانتا كلوز'}\n🔖 *الرمز:* ${officialCode}`;
    },
    toastPointsEarned: (pts) => `⭐ ربحت +${pts} نقطة سحر!`,
    toastPhotoUploaded: '📸 صورتك تشارك الآن في مسابقة الغلاف!',
    toastHdDownloaded: '📥 تم تحميل الصورة بجودة HD!',
    toastReported: '🚩 شكراً لك. تم إخفاء المحتوى لحماية العائلة.',
    closeBtn: 'إغلاق',
    elfNoteTitle: '🎄 عيد ميلاد مجيد!',
    elfNoteBody: 'نتمنى لكم أعياداً سعيدة ومباركة برفقة أحبائكم. تذكروا دائماً أنكم لستم وحدكم أبداً وأنكم محبوبون جداً. شكراً من القلب لاستخدامكم تطبيقنا. نراكم في العام الجديد!',
    elfNotePs: '😄 ملاحظة: ماذا قالت هدية لأخرى قبل الصعود إلى الزلاجة؟ ارتدي ملابس دافئة، فالليلة سيفتحوننا جميعاً!',
    elfNoteSignature: 'التوقيع: قزم عيد الميلاد 🎄🧝‍♂️ (كتبتُ أنا لأن بابا نويل كان مشغولاً جداً).',
    buildLetterParagraphs: ({ children }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'و', 'آدم');
      return isPlural
        ? [
            `أعزائي ${namesText}، كم أسعدني الحديث معكم قبل لحظات! لقد حفظت رسائلكم في صندوقي الذهبي بجانب المدفأة في الورشة.`,
            `المساعدون يجهزون الزلاجة بينما ندوّن أسماءكم في الكتاب الذهبي. استمروا في التعاون والمحبة وملء المنزل بالبهجة.`,
            `استعدوا لليلة احتفالية لا تُنسى!`,
          ]
        : [
            `عزيزي/عزيزتي ${namesText}، كم أسعدني الحديث معك قبل لحظات! لقد حفظت رسالتك في صندوقي الذهبي بجانب المدفأة في الورشة.`,
            `المساعدون يجهزون الزلاجة بينما ندوّن اسمك في الكتاب الذهبي. استمر في مساعدة عائلتك وملء المنزل بالبهجة.`,
            `استعد لليلة احتفالية لا تُنسى!`,
          ];
    },
    buildCertificateBody: ({ children, city }) => {
      const namesText = formatChildNames(children.map((c) => c.name), 'و', 'آدم');
      return `يشهد مجلس القطب الشمالي رسمياً بأن ${namesText} من ${city.trim() || 'مدينتهم'} مسجلون في قائمة الشرف الذهبية لعام 2026 لأخلاقهم الطيبة.`;
    },
    buildSantaCallScript: ({ children }) => {
      const isPlural = children.map((c) => c.name.trim()).filter(Boolean).length > 1;
      const namesText = formatChildNames(children.map((c) => c.name), 'و', 'أصدقائي');
      return isPlural
        ? `هو هو هو! مرحباً ${namesText}، أنا سانتا كلوز. لقد وصلتني رسائلكم هنا في القطب الشمالي! سأتحدث مع ماما وبابا لأسألهما عن سلوككم هذا العام، وحسب تصرفاتكم سأحضر لكم مفاجأة مميزة جداً. وأترك لكم أيضاً رسالة موقعة مني!`
        : `هو هو هو! مرحباً ${namesText}، أنا سانتا كلوز. لقد وصلتني رسالتك هنا في القطب الشمالي! سأتحدث مع ماما وبابا لأسألهما عن سلوكك هذا العام، وحسب تصرفاتك سأحضر لك مفاجأة مميزة جداً. وأترك لك أيضاً رسالة موقعة مني!`;
    },
    samplePhotos: [
      { id: 'sample-1', title: 'أضواء دافئة في انتظار سانتا', author: 'عائلة المنصور · الرياض' },
      { id: 'sample-2', title: 'كعك الزنجبيل والحليب الدافئ', author: 'ليلى وآدم · دبي' },
      { id: 'sample-3', title: 'كوخ ثلجي تحت أضواء الشتاء', author: 'عائلة كريم · عمّان' },
      { id: 'sample-4', title: 'جوارب الشتاء بجانب المدفأة', author: 'سارة ويوسف · القاهرة' },
    ],
  },
};
