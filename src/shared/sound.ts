// Little synthesized sounds (Web Audio), shared by both games
let actx: AudioContext | null = null;
const ctx = () => (actx = actx || new ((window as any).AudioContext || (window as any).webkitAudioContext)());

export function beepSeq(notes: [number, number, number, number?][], type?: OscillatorType) {
  try {
    const a = ctx(), now = a.currentTime;
    notes.forEach(([f, t0, d, vol]) => { const o = a.createOscillator(), g = a.createGain(); o.type = type || "square"; o.frequency.setValueAtTime(f, now + t0); g.gain.setValueAtTime(vol || .1, now + t0); g.gain.exponentialRampToValueAtTime(.001, now + t0 + d); o.connect(g).connect(a.destination); o.start(now + t0); o.stop(now + t0 + d + .02); });
  } catch (e) {}
}
// جيو! buzz-in
export function beep() {
  try {
    const a = ctx(), o = a.createOscillator(), g = a.createGain(), tt = a.currentTime;
    o.type = "square"; o.frequency.setValueAtTime(660, tt); o.frequency.setValueAtTime(990, tt + .09);
    g.gain.setValueAtTime(.12, tt); g.gain.exponentialRampToValueAtTime(.001, tt + .4);
    o.connect(g).connect(a.destination); o.start(tt); o.stop(tt + .42);
  } catch (e) {}
}
// جيو! wager reveal: a low boom under a rising four-note fanfare
export function wagerSound() {
  try {
    const a = ctx(), now = a.currentTime, out = a.createGain(); out.gain.value = .9; out.connect(a.destination);
    const boom = a.createOscillator(), bg = a.createGain();
    boom.type = "sine"; boom.frequency.setValueAtTime(140, now); boom.frequency.exponentialRampToValueAtTime(38, now + .6);
    bg.gain.setValueAtTime(.5, now); bg.gain.exponentialRampToValueAtTime(.001, now + .7);
    boom.connect(bg).connect(out); boom.start(now); boom.stop(now + .72);
    [523, 659, 784, 1047].forEach((f, i) => {
      const o = a.createOscillator(), g = a.createGain(), t0 = now + .12 + i * .11;
      o.type = "square"; o.frequency.setValueAtTime(f, t0);
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(.09, t0 + .015); g.gain.exponentialRampToValueAtTime(.001, t0 + (i === 3 ? .5 : .16));
      o.connect(g).connect(out); o.start(t0); o.stop(t0 + .55);
    });
  } catch (e) {}
}
