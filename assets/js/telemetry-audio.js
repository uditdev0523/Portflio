/**
 * Telemetry Web Audio Synthesizer
 * Production-hardened procedural sound design (Web Audio API)
 * Handles browser autoplay policies, suspension recovery & localStorage persistence
 */

class TelemetryAudio {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.storageKey = "ups_telemetry_audio_enabled";
    
    // Check persisted user preference (default muted)
    try {
      this.enabled = localStorage.getItem(this.storageKey) === "true";
    } catch (e) {
      this.enabled = false;
    }
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn("[Telemetry Audio] Web Audio API unavailable:", e);
    }
  }

  ensureRunningContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;

    this.ensureRunningContext();
    this.enabled = !this.enabled;

    try {
      localStorage.setItem(this.storageKey, String(this.enabled));
    } catch (e) {}

    if (this.enabled) {
      this.playBootChime();
    }
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.ensureRunningContext();
    if (!this.ctx || this.ctx.state !== "running") return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(700, t + 0.04);

      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {}
  }

  playHover() {
    if (!this.enabled) return;
    this.ensureRunningContext();
    if (!this.ctx || this.ctx.state !== "running") return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(2200, t);
      osc.frequency.setValueAtTime(2800, t + 0.015);

      gain.gain.setValueAtTime(0.018, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.03);
    } catch (e) {}
  }

  playPing() {
    if (!this.enabled) return;
    this.ensureRunningContext();
    if (!this.ctx || this.ctx.state !== "running") return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(987.77, t); // B5
      osc.frequency.exponentialRampToValueAtTime(1975.53, t + 0.09); // B6

      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.0005, t + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.16);
    } catch (e) {}
  }

  playBootChime() {
    if (!this.enabled) return;
    this.ensureRunningContext();
    if (!this.ctx || this.ctx.state !== "running") return;

    try {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, i) => {
        const t = this.ctx.currentTime + (i * 0.04);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.04, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.08);
      });
    } catch (e) {}
  }
}

export const telemetryAudio = new TelemetryAudio();
