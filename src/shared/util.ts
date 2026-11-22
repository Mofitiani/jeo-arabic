export const store = {
  get(k: string): any { try { return JSON.parse(localStorage.getItem(k) as string); } catch (e) { return null; } },
  set(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
export const rid = () => Math.random().toString(36).slice(2, 10);
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ";
export const newCode = () => Array.from({ length: 4 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join("");
export const gx = (g: string, m: string, f: string) => g === "f" ? f : m;     // masculine or feminine form
export const shuffle = <T,>(a: T[]): T[] => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const pickOne = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
export const params = new URLSearchParams(location.search);
export const roomParam = (params.get("room") || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);
export const IS_PLAYER = params.has("room") || params.has("join");
export const num = (n: number) => String(Math.round(Math.abs(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const fmt = (n: number) => (n < 0 ? "−" : "") + num(n);
export const parseNum = (s: string) => {
  const t = String(s).replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x660)).replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 0x6F0)).replace(/[^\d]/g, "");
  return t === "" ? NaN : Number(t);
};
export const secs = (ms: number) => { const s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
