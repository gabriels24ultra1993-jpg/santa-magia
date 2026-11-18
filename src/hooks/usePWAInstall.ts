import { useCallback, useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const SESSION_DISMISS_KEY = 'santa_magia_pwa_dismissed_v1';

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobileBrowser, setIsMobileBrowser] = useState(false);
  const [isDismissedInSession, setIsDismissedInSession] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_DISMISS_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const standaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
    const iosStandalone =
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(standaloneMedia || iosStandalone);

    const ua = window.navigator.userAgent.toLowerCase();
    const isIPadOS =
      navigator.platform === 'MacIntel' &&
      typeof navigator.maxTouchPoints === 'number' &&
      navigator.maxTouchPoints > 1;
    const iosDetected = /iphone|ipad|ipod/.test(ua) || isIPadOS;
    setIsIOS(iosDetected);

    const mobileDetected =
      iosDetected ||
      /android|webos|blackberry|iemobile|opera mini|mobile/.test(ua) ||
      (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 768);
    setIsMobileBrowser(mobileDetected);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      try {
        sessionStorage.setItem(SESSION_DISMISS_KEY, 'true');
      } catch {
        // ignore storage errors
      }
      setIsDismissedInSession(true);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const dismissForSession = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_DISMISS_KEY, 'true');
    } catch {
      // ignore storage errors
    }
    setIsDismissedInSession(true);
  }, []);

  const install = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    if (!deferredPrompt) return 'unavailable';
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        dismissForSession();
        return 'accepted';
      }
      return 'dismissed';
    } catch {
      return 'unavailable';
    }
  }, [deferredPrompt, dismissForSession]);

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    isMobileBrowser,
    isDismissedInSession,
    shouldShowFloatingBanner: !isInstalled && isMobileBrowser && !isDismissedInSession,
    isOnline,
    install,
    dismissForSession,
  };
}
