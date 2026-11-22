// Fuzzy answer matching: normalise Arabic/English, then compare by edit distance (Levenshtein).
// The two games keep their own exact rules (جيو! has right/close/wrong; مبارزة is right/wrong with English names).
export function lev(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length; if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

// ---- جيو! ----
export function normJeo(s: string) {
  s = String(s || "").toLowerCase()
    .replace(/[ً-ٰٟـ]/g, "")                 // harakat, dagger alef, tatweel
    .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
    .replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x660))
    .replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim()
    .replace(/^(من|ما|مين|مين|شو|ايش|ماذا)\s+(هو|هي|هم|هما)\s+/, "")
    .replace(/^(who|what|where)\s+(is|are|was|were)\s+/, "");
  return s.split(" ").map(w => (/^(وال|ال)../.test(w) ? w.replace(/^(وال|ال)/, "") : w))
    .filter(w => w && !["the", "a", "an"].includes(w)).join(" ");
}
// right: similarity >= 0.8 · close: 0.6–0.8 (host decides) · wrong: below
export function judge(text: string, official: string, alts: string[]) {
  const a = normJeo(text).replace(/\s/g, "");
  if (!a) return { v: "wrong", sim: 0 };
  const offN = normJeo(official).replace(/\s/g, "");
  if (/^\d+$/.test(offN)) {                  // numbers must match exactly (365 is not "close" to 366)
    const ok = a.replace(/[^\d]/g, "") === offN || (alts || []).some(x => normJeo(x).replace(/\s/g, "") === a);
    return { v: ok ? "right" : "wrong", sim: ok ? 1 : 0 };
  }
  let best = 0;
  for (const v of [official, ...(alts || [])]) {
    const b = normJeo(v).replace(/\s/g, ""); if (!b) continue;
    let sim = 1 - lev(a, b) / Math.max(a.length, b.length);
    if (b.length >= 3 && a.includes(b) && a.length <= b.length + 8) sim = 1;
    best = Math.max(best, sim);
  }
  return { v: best >= 0.8 ? "right" : best >= 0.6 ? "close" : "wrong", sim: best };
}

// ---- مبارزة ----
export function normDuel(s: string) {
  s = String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").normalize("NFC").replace(/[ً-ٰٟـ]/g, "")
    .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي")
    .replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim()
    .replace(/^(هاد|هذا|هذه|هاي|هيدا|هيدي|هو|هي)\s+/, "");
  return s.split(" ").map(w => (/^(وال|ال)../.test(w) ? w.replace(/^(وال|ال)/, "") : w)).filter(w => w && !["the", "a", "an"].includes(w)).join(" ");
}
export function isRight(text: string, answer: string, alts: string[]) {
  const a = normDuel(text).replace(/\s/g, ""); if (!a) return false;
  return [answer, ...(alts || [])].some(v => {
    const b = normDuel(v).replace(/\s/g, ""); if (!b) return false;
    if (b.length >= 3 && a.includes(b) && a.length <= b.length + 8) return true;
    return 1 - lev(a, b) / Math.max(a.length, b.length) >= (b.length <= 3 ? 0.99 : b.length <= 5 && /[a-z]/.test(b) ? 0.8 : 0.75);   // stricter for short English words (Iran ≠ Iraq)
  });
}
