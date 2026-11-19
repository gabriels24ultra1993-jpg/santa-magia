// Synthesized Web Audio API Holiday Sound Engine (no external audio assets required)

class HolidayAudioEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private ringtoneInterval: number | null = null;
  private paradeTimeout: number | null = null;
  private paradeRunning: boolean = false;
  private paradeNoteIdx: number = 0;
  private ambientTimeout: number | null = null;
  private ambientRunning: boolean = false;
  private ambientNoteIdx: number = 0;
  private santaAudio: HTMLAudioElement | null = null;
  private santaAudioUrl: string | null = null;
  private callSleighBedTimeout: number | null = null;
  private callSleighBedRunning: boolean = false;
  private stopListeners: Set<() => void> = new Set();

  public subscribeStopAll(cb: () => void): () => void {
    this.stopListeners.add(cb);
    return () => {
      this.stopListeners.delete(cb);
    };
  }

  private getContext(): AudioContext | null {
    if (this.muted) return null;
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
    if (muted) {
      this.stopRingtone();
      this.stopParadeMusic();
      this.stopAmbientMusic();
      this.stopCallSleighBellsBed();
      this.stopSantaTtsAudio();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  // Gentle metallic sleigh bell shimmer on button taps
  public playSleighBells(intensity: 'soft' | 'bright' = 'soft'): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = intensity === 'soft'
      ? [2637, 3136, 3520, 4186]
      : [2093, 2637, 3136, 3520, 4186, 4698];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq + (Math.random() * 18 - 9), now + i * 0.025);

      const peak = intensity === 'soft' ? 0.032 : 0.055;
      gain.gain.setValueAtTime(0.0001, now + i * 0.025);
      gain.gain.exponentialRampToValueAtTime(peak, now + i * 0.025 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.025 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.025);
      osc.stop(now + i * 0.025 + 0.38);
    });
  }

  // Warm celesta arpeggio for earning points or unlocking VIP rewards
  public playMagicChime(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5 E5 G5 C6 E6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.075);

      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now + idx * 0.075);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.075);
      gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.075 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.075 + 0.65);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.075);
      oscHarmonic.start(now + idx * 0.075);
      osc.stop(now + idx * 0.075 + 0.7);
      oscHarmonic.stop(now + idx * 0.075 + 0.7);
    });
  }

  // Play a single music-box / bell note
  private playBellNote(freq: number, startTime: number, duration: number, volume = 0.07): void {
    const ctx = this.getContext();
    if (!ctx || freq <= 0) return;

    const osc = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, startTime);

    const overtoneGain = ctx.createGain();
    overtoneGain.gain.setValueAtTime(0.22, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    overtoneGain.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    overtone.start(startTime);
    osc.stop(startTime + duration + 0.04);
    overtone.stop(startTime + duration + 0.04);
  }

  // Festive incoming call ringtone (Jingle Bells hook)
  public startRingtone(): void {
    this.stopRingtone();
    this.stopAmbientMusic();
    const ctx = this.getContext();
    if (!ctx) return;

    const playPhrase = () => {
      const c = this.getContext();
      if (!c) return;
      const t = c.currentTime;
      // E5 E5 E5 - E5 E5 E5 - E5 G5 C5 D5 E5
      const pattern: Array<[number, number, number]> = [
        [659.25, 0.0, 0.22],
        [659.25, 0.24, 0.22],
        [659.25, 0.48, 0.4],
        [659.25, 0.96, 0.22],
        [659.25, 1.2, 0.22],
        [659.25, 1.44, 0.4],
        [659.25, 1.92, 0.22],
        [783.99, 2.16, 0.22],
        [523.25, 2.4, 0.3],
        [587.33, 2.72, 0.16],
        [659.25, 2.92, 0.6],
      ];
      pattern.forEach(([freq, offset, dur]) => {
        this.playBellNote(freq, t + offset, dur, 0.085);
      });
    };

    playPhrase();
    this.ringtoneInterval = window.setInterval(playPhrase, 4000);
  }

  public stopRingtone(): void {
    if (this.ringtoneInterval !== null) {
      clearInterval(this.ringtoneInterval);
      this.ringtoneInterval = null;
    }
  }

  // Joyful sleigh-bell burst when Santa answers the call
  public playSantaAnswerBurst(): void {
    this.stopRingtone();
    this.stopAmbientMusic();
    this.playSleighBells('bright');
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Warm cheerful fanfare chord
    [392.0, 493.88, 587.33, 783.99].forEach((freq, i) => {
      this.playBellNote(freq, now + 0.08 + i * 0.06, 0.55, 0.065);
    });
  }

  // Gentle ambient sleigh-bells shimmer loop while Santa speaks
  public startCallSleighBellsBed(): void {
    this.stopCallSleighBellsBed();
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.callSleighBedRunning = true;

    const triggerSoftJingle = () => {
      if (!this.callSleighBedRunning || this.muted) return;
      const c = this.getContext();
      if (!c) return;
      const now = c.currentTime;
      const shimmerFreqs = [2637, 3136, 3520, 4186];
      shimmerFreqs.forEach((freq, idx) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (Math.random() * 14 - 7), now + idx * 0.045);
        gain.gain.setValueAtTime(0.0001, now + idx * 0.045);
        gain.gain.exponentialRampToValueAtTime(0.012, now + idx * 0.045 + 0.018);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.045 + 0.42);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now + idx * 0.045);
        osc.stop(now + idx * 0.045 + 0.45);
      });

      this.callSleighBedTimeout = window.setTimeout(triggerSoftJingle, 1850);
    };

    triggerSoftJingle();
  }

  public stopCallSleighBellsBed(): void {
    this.callSleighBedRunning = false;
    if (this.callSleighBedTimeout !== null) {
      clearTimeout(this.callSleighBedTimeout);
      this.callSleighBedTimeout = null;
    }
  }

  public stopSantaTtsAudio(): void {
    this.stopCallSleighBellsBed();
    if (this.santaAudio) {
      try {
        this.santaAudio.onplay = null;
        this.santaAudio.onended = null;
        this.santaAudio.onerror = null;
        this.santaAudio.pause();
        this.santaAudio.currentTime = 0;
        this.santaAudio.src = '';
      } catch {
        // ignore cleanup errors
      }
      this.santaAudio = null;
    }
    if (this.santaAudioUrl) {
      try {
        URL.revokeObjectURL(this.santaAudioUrl);
      } catch {
        // ignore
      }
      this.santaAudioUrl = null;
    }
  }

  public createSantaWavBlob(rawBase64: string, mimeType?: string): Blob {
    const binary = atob(rawBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }

    // Already RIFF/WAVE
    if (
      bytes.length >= 12 &&
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46
    ) {
      return new Blob([bytes], { type: 'audio/wav' });
    }

    const rateMatch = mimeType ? /rate=(\d+)/i.exec(mimeType) : null;
    const sampleRate = rateMatch
      ? Math.max(8000, Math.min(48000, Number(rateMatch[1])))
      : 24000;
    const channels = 1;
    const bitsPerSample = 16;
    const byteRate = (sampleRate * channels * bitsPerSample) / 8;
    const blockAlign = (channels * bitsPerSample) / 8;

    const wavBuffer = new ArrayBuffer(44 + bytes.byteLength);
    const view = new DataView(wavBuffer);
    const writeAscii = (offset: number, text: string) => {
      for (let i = 0; i < text.length; i += 1) {
        view.setUint8(offset + i, text.charCodeAt(i));
      }
    };

    writeAscii(0, 'RIFF');
    view.setUint32(4, 36 + bytes.byteLength, true);
    writeAscii(8, 'WAVE');
    writeAscii(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeAscii(36, 'data');
    view.setUint32(40, bytes.byteLength, true);

    new Uint8Array(wavBuffer, 44).set(bytes);
    return new Blob([wavBuffer], { type: 'audio/wav' });
  }

  public playSantaTtsBlob(
    wavBlob: Blob,
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
    }
  ): void {
    this.stopSantaTtsAudio();
    this.stopAmbientMusic();

    if (this.muted) {
      callbacks?.onEnd?.();
      return;
    }

    try {
      const url = URL.createObjectURL(wavBlob);
      const audio = new Audio(url) as HTMLAudioElement & {
        mozPreservesPitch?: boolean;
        webkitPreservesPitch?: boolean;
      };

      const applySeniorSantaRate = () => {
        audio.defaultPlaybackRate = 0.89;
        audio.playbackRate = 0.89;
        audio.preservesPitch = false;
        audio.mozPreservesPitch = false;
        audio.webkitPreservesPitch = false;
      };

      audio.volume = 1;
      applySeniorSantaRate();

      this.santaAudio = audio;
      this.santaAudioUrl = url;

      let finished = false;
      const cleanup = (notifyEnd: boolean) => {
        if (finished) return;
        finished = true;
        this.stopCallSleighBellsBed();
        if (this.santaAudio === audio) {
          this.santaAudio = null;
        }
        if (this.santaAudioUrl === url) {
          try {
            URL.revokeObjectURL(url);
          } catch {
            // ignore
          }
          this.santaAudioUrl = null;
        }
        if (notifyEnd) {
          callbacks?.onEnd?.();
        }
      };

      audio.onloadedmetadata = () => {
        applySeniorSantaRate();
      };

      audio.onplay = () => {
        applySeniorSantaRate();
        this.startCallSleighBellsBed();
        callbacks?.onStart?.();
      };

      audio.onended = () => {
        cleanup(true);
      };

      audio.onerror = () => {
        cleanup(false);
        callbacks?.onError?.();
      };

      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          cleanup(false);
          callbacks?.onError?.();
        });
      }
    } catch {
      this.stopSantaTtsAudio();
      callbacks?.onError?.();
    }
  }

  public playSantaTtsAudio(
    base64Wav: string,
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onError?: () => void;
    },
    mimeType?: string
  ): void {
    try {
      const wavBlob = this.createSantaWavBlob(base64Wav, mimeType);
      this.playSantaTtsBlob(wavBlob, callbacks);
    } catch {
      this.stopSantaTtsAudio();
      callbacks?.onError?.();
    }
  }

  public stopAll(): void {
    this.stopRingtone();
    this.stopAmbientMusic();
    this.stopParadeMusic();
    this.stopCallSleighBellsBed();
    this.stopSantaTtsAudio();
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
    this.stopListeners.forEach((cb) => {
      try {
        cb();
      } catch {
        // ignore listener error
      }
    });
  }

  // Soft music-box Christmas background loop (Deck the Halls + Silent Night chime medley)
  public startAmbientMusic(): void {
    if (this.ambientRunning || this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.ambientRunning = true;

    // Gentle high celesta / sleigh music box notes (freq, ms duration)
    const boxMelody: Array<[number, number]> = [
      [783.99, 440], // G5
      [698.46, 260], // F5
      [659.25, 420], // E5
      [587.33, 420], // D5
      [523.25, 420], // C5
      [587.33, 420], // D5
      [659.25, 420], // E5
      [523.25, 440], // C5
      [587.33, 220], // D5
      [659.25, 220], // E5
      [698.46, 220], // F5
      [587.33, 220], // D5
      [659.25, 440], // E5
      [587.33, 260], // D5
      [523.25, 440], // C5
      [493.88, 440], // B4
      [523.25, 820], // C5 hold
      [0, 380],
      // Gentle second phrase
      [659.25, 460], // E5
      [783.99, 260], // G5
      [659.25, 420], // E5
      [587.33, 460], // D5
      [523.25, 620], // C5
      [659.25, 420], // E5
      [783.99, 420], // G5
      [880.0, 460],  // A5
      [783.99, 440], // G5
      [659.25, 460], // E5
      [587.33, 440], // D5
      [523.25, 860], // C5
      [0, 500],
    ];

    const step = () => {
      if (!this.ambientRunning || this.muted) return;
      const c = this.getContext();
      if (!c) return;
      const [freq, durMs] = boxMelody[this.ambientNoteIdx % boxMelody.length];
      if (freq > 0) {
        this.playBellNote(freq, c.currentTime + 0.02, Math.max(0.45, durMs / 1000 + 0.18), 0.026);
      }
      this.ambientNoteIdx += 1;
      this.ambientTimeout = window.setTimeout(step, durMs);
    };

    step();
  }

  public stopAmbientMusic(): void {
    this.ambientRunning = false;
    if (this.ambientTimeout !== null) {
      clearTimeout(this.ambientTimeout);
      this.ambientTimeout = null;
    }
  }

  public isAmbientMusicRunning(): boolean {
    return this.ambientRunning;
  }

  // Gentle music box Christmas melody loop for the Video Parade
  public startParadeMusic(): void {
    this.stopParadeMusic();
    this.stopAmbientMusic();
    const ctx = this.getContext();
    if (!ctx) return;

    this.paradeRunning = true;
    this.paradeNoteIdx = 0;

    // We Wish You a Merry Christmas + Jingle Bells medley (freq, beat duration in ms)
    const melody: Array<[number, number]> = [
      [392.0, 360], // G4
      [523.25, 360], // C5
      [523.25, 200],
      [587.33, 200], // D5
      [523.25, 200],
      [493.88, 200], // B4
      [440.0, 360], // A4
      [440.0, 360],
      [440.0, 360],
      [587.33, 360], // D5
      [587.33, 200],
      [659.25, 200], // E5
      [587.33, 200],
      [523.25, 200],
      [493.88, 360], // B4
      [392.0, 360], // G4
      [392.0, 360],
      [659.25, 360], // E5
      [659.25, 200],
      [698.46, 200], // F5
      [659.25, 200],
      [587.33, 200],
      [523.25, 360], // C5
      [440.0, 360], // A4
      [392.0, 200],
      [392.0, 200],
      [440.0, 360],
      [587.33, 360],
      [493.88, 360],
      [523.25, 720], // C5 hold
      [0, 360],
    ];

    const step = () => {
      if (!this.paradeRunning || this.muted) return;
      const c = this.getContext();
      if (!c) return;
      const [freq, durMs] = melody[this.paradeNoteIdx % melody.length];
      if (freq > 0) {
        this.playBellNote(freq, c.currentTime + 0.02, Math.max(0.32, durMs / 1000 + 0.12), 0.06);
      }
      this.paradeNoteIdx += 1;
      this.paradeTimeout = window.setTimeout(step, durMs);
    };

    step();
  }

  public stopParadeMusic(): void {
    this.paradeRunning = false;
    if (this.paradeTimeout !== null) {
      clearTimeout(this.paradeTimeout);
      this.paradeTimeout = null;
    }
  }

  public playCrystalBreak(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [1318.5, 1760, 2349.3].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.018);
      gain.gain.setValueAtTime(0.0001, now + i * 0.018);
      gain.gain.exponentialRampToValueAtTime(0.055, now + i * 0.018 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.018 + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.018);
      osc.stop(now + i * 0.018 + 0.18);
    });
  }

  public playSnowHit(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(175, now);
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.22);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.085, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }
}

export const audioEngine = new HolidayAudioEngine();
