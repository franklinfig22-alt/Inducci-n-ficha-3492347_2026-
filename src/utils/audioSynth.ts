/**
 * Lightweight Web Audio API synthesizer for the SENA Anthem melody
 * Plays harmonic tones for the iconic anthem march with zero external dependencies.
 */

// Simple melodic note frequencies
const NOTE_FREQS: Record<string, number> = {
  'C4': 261.63,
  'D4': 293.66,
  'E4': 329.63,
  'F4': 349.23,
  'G4': 392.00,
  'A4': 440.00,
  'B4': 493.88,
  'C5': 523.25,
  'D5': 587.33,
  'E5': 659.25,
  'F5': 698.46,
  'G5': 783.99,
  'REST': 0
};

// Anthem Coro melody notes & durations (in beats)
const ANTHEM_CORO_NOTES: { note: string; duration: number }[] = [
  // "A-pren-di-ces del SE-NA a-de-lan-te" (Adaptación oficial para aprendices)
  { note: 'C4', duration: 0.5 },
  { note: 'E4', duration: 0.5 },
  { note: 'G4', duration: 0.75 },
  { note: 'G4', duration: 0.25 },
  { note: 'C5', duration: 0.75 },
  { note: 'B4', duration: 0.25 },
  { note: 'A4', duration: 0.5 },
  { note: 'G4', duration: 0.75 },
  { note: 'REST', duration: 0.25 },
  // "por Co-lom-bia lu-chad con a-mor"
  { note: 'F4', duration: 0.5 },
  { note: 'A4', duration: 0.5 },
  { note: 'D5', duration: 0.75 },
  { note: 'C5', duration: 0.25 },
  { note: 'B4', duration: 0.5 },
  { note: 'C5', duration: 1.0 },
  { note: 'REST', duration: 0.5 },
  // "con el á-ni-mo no-ble y ra-dian-te"
  { note: 'E4', duration: 0.5 },
  { note: 'G4', duration: 0.5 },
  { note: 'C5', duration: 0.75 },
  { note: 'D5', duration: 0.25 },
  { note: 'E5', duration: 0.75 },
  { note: 'D5', duration: 0.25 },
  { note: 'C5', duration: 0.5 },
  { note: 'B4', duration: 0.75 },
  { note: 'REST', duration: 0.25 },
  // "trans-for-me-mos el mun-do en me-jor"
  { note: 'A4', duration: 0.5 },
  { note: 'C5', duration: 0.5 },
  { note: 'B4', duration: 0.5 },
  { note: 'A4', duration: 0.5 },
  { note: 'G4', duration: 0.75 },
  { note: 'E4', duration: 0.25 },
  { note: 'C4', duration: 1.5 }
];

export const playVocalAnthem = (
  text: string = '¡Aprendices del SENA adelante! Por Colombia luchad con amor. Con el ánimo noble y radiante, transformemos el mundo en mejor.',
  onEnd?: () => void
) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-CO';
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };
    window.speechSynthesis.speak(utterance);
    return utterance;
  }
  return null;
};

export const stopVocalAnthem = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

class AnthemPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTimeout: number | null = null;
  private onStepCallback: ((index: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(onStep?: (index: number) => void, onEnd?: () => void, withVocals: boolean = false) {
    this.init();
    this.stop();
    this.isPlaying = true;
    this.onStepCallback = onStep || null;
    this.onEndCallback = onEnd || null;

    if (withVocals) {
      playVocalAnthem('¡Aprendices del SENA adelante! Por Colombia luchad con amor, con el ánimo noble y radiante, transformemos el mundo en mejor.');
    }

    let totalElapsed = 0;
    const tempoSecondsPerBeat = 0.45; // March tempo ~ 133 BPM

    ANTHEM_CORO_NOTES.forEach((item, index) => {
      const startTime = totalElapsed;
      const noteDuration = item.duration * tempoSecondsPerBeat;

      // Schedule audio tone
      if (item.note !== 'REST' && NOTE_FREQS[item.note] && this.ctx) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Warm brass/flute sound using soft triangle with lowpass warmth
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(NOTE_FREQS[item.note], this.ctx.currentTime + startTime);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + startTime);
        gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + startTime + noteDuration - 0.02);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + startTime);
        osc.stop(this.ctx.currentTime + startTime + noteDuration);
      }

      // Schedule UI step update
      window.setTimeout(() => {
        if (this.isPlaying && this.onStepCallback) {
          this.onStepCallback(index);
        }
      }, startTime * 1000);

      // Keep track of timeouts
      if (index === ANTHEM_CORO_NOTES.length - 1) {
        this.currentTimeout = window.setTimeout(() => {
          this.isPlaying = false;
          if (this.onEndCallback) this.onEndCallback();
        }, (startTime + noteDuration) * 1000);
      }

      totalElapsed += noteDuration;
    });
  }

  public stop() {
    this.isPlaying = false;
    stopVocalAnthem();
    if (this.currentTimeout) {
      window.clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    if (this.ctx) {
      // Close or suspend
      try {
        this.ctx.close();
        this.ctx = null;
      } catch {
        // ignore
      }
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const anthemAudioSynth = new AnthemPlayer();
