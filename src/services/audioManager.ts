class AudioManager {
  private context: AudioContext | null = null;

  private getContext() {
    if (!this.context) {
      const AudioContextClass = window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) this.context = new AudioContextClass();
    }
    return this.context;
  }

  tone(kind: 'tap' | 'success' | 'error', muted: boolean) {
    if (muted) return;
    const context = this.getContext();
    if (!context) return;
    const notes = kind === 'success' ? [523, 659, 784] : kind === 'error' ? [220, 180] : [420];
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = context.currentTime + index * 0.08;
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.07, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.15);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.16);
    });
  }

  speak(text: string, muted: boolean) {
    if (muted || !('speechSynthesis' in window)) return false;
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith('ar'));
    if (!arabicVoice) return false;
    window.speechSynthesis.cancel();
    const message = new SpeechSynthesisUtterance(text);
    message.voice = arabicVoice;
    message.lang = arabicVoice.lang;
    message.rate = 0.88;
    message.pitch = 1.05;
    window.speechSynthesis.speak(message);
    return true;
  }

  stopNarration() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }
}

export const audioManager = new AudioManager();

