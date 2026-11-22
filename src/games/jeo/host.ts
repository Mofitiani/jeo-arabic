// جيو!, TV side: the authoritative game. Phones send events; the TV publishes "state".
// G is the saved game (players, board, scores); T is the clue in progress (also saved, so a reload resumes).
// Ported from the single-file version; rendering moved to HostView.tsx (call bump() after any change).
import { TOPICS, FINALS, CAT_DESC } from "./data.js";
import { t } from "./copy";
import { createLink } from "../../shared/realtime";
import { createSignal } from "../../shared/hooks";
import { store, newCode, num } from "../../shared/util";
import { judge, normJeo as norm } from "../../shared/match";
import { beep, wagerSound } from "../../shared/sound";

export const VALUES = [200, 400, 600, 800, 1000];
export const ANSWER_MS = 20000;
export const EVENTS = ["join", "buzz", "wager", "fin", "ans", "vote", "hello", "state"];
export const link = createLink("mws-", EVENTS);
export const view = createSignal();
// Board columns and the final clue are chosen per game (see applyBoard)
export let CATS: any[] = [], ALTS: any[] = [], FINAL: any = null, FINAL_ALTS: string[] = [];

const HKEY = "mws-host-v1", TKEY = "mws-host-turn-v1", HIST = "mws-history-v1";
export let G: any, T: any;
export const pf = (pid: string) => G.players.find(p => p.pid === pid);
export const gOf = (pid: string) => (pf(pid) || {}).g || "m";
export const nameOf = (pid: string) => (pf(pid) || {}).name || "";
export const maxFor = (pid: string) => Math.max((pf(pid) || { score: 0 }).score, 1000);
const saveG = () => store.set(HKEY, G);
const changed = () => { view.bump(); pub(); };

function freshWagers() {
  const all: string[] = [];
  for (let c = 0; c < 6; c++) for (let r = 1; r < 5; r++) all.push(c + "-" + r);
  const w: string[] = [];
  while (w.length < 2) { const k = all[Math.floor(Math.random() * all.length)]; if (!w.some(x => x[0] === k[0])) w.push(k); }
  return w;
}
function addDelta(pid: string, d: number) { G.delta = G.delta || {}; G.delta[pid] = (G.delta[pid] || 0) + d; }
function resetT() {
  const online = T ? T.online : new Set(), connOK = T ? T.connOK : false;
  if (T) { clearTimeout(T.timer); clearTimeout(T.flashTimer); }
  T = { phase: G && G.started ? "board" : "lobby", key: null, isWager: false, armed: false, winner: null, locked: [], penalty: {}, revealed: false, result: "",
        wagerFor: null, wagerInput: "", wagerAmt: 0, final: null, online, connOK,
        answerText: "", judge: "", deadline: 0, timer: null, attempts: [], undo: null, res: null, flashUntil: 0, flashTimer: null };
}
export const curVal = () => T.isWager ? T.wagerAmt : VALUES[+T.key.split("-")[1]];
const clueAns = () => { const [c, r] = T.key.split("-").map(Number); return [CATS[c].clues[r][1], ALTS[c][r]]; };
function snapshot() {
  return { scores: G.players.map(p => [p.pid, p.score]), control: G.control, delta: Object.assign({}, G.delta),
    t: { armed: T.armed, winner: T.winner, locked: [...T.locked], revealed: T.revealed, result: T.result, res: T.res, answerText: T.answerText } };
}
function applyRight(pid: string, note: string) {
  const p = pf(pid); if (!p) return; const val = curVal();
  p.score += val; addDelta(pid, val); G.control = pid; T.revealed = true; T.armed = false; T.judge = ""; clearTimeout(T.timer);
  T.result = `${p.name} +${num(val)}${note ? " · " + note : ""}`; T.res = { pid, ok: true, val };
  saveG();
}
function applyWrong(pid: string, note: string) {
  const p = pf(pid); if (!p) return; const val = curVal();
  p.score -= val; addDelta(pid, -val); T.judge = ""; clearTimeout(T.timer); T.res = { pid, ok: false, val };
  if (T.isWager) { T.revealed = true; T.result = `${p.name} −${num(val)}${note ? " · " + note : ""}`; }
  else {
    T.locked.push(pid); T.winner = null; T.answerText = ""; T.deadline = 0;
    const left = G.players.some(x => !T.locked.includes(x.pid));
    T.armed = left; if (!left) T.revealed = true;
  }
  saveG();
}
function startAnswerTimer() {
  clearTimeout(T.timer);
  T.deadline = Date.now() + ANSWER_MS;
  T.timer = setTimeout(() => {
    const pid = T.winner;
    if (T.phase === "clue" && pid && !T.answerText && !T.revealed) {
      T.attempts.push({ pid, text: "", v: "none" }); T.undo = null;
      applyWrong(pid, t("clue.timeUp")); changed();
    }
  }, ANSWER_MS + 300);
}

// The clue in progress is saved too, so reloading the host screen picks up where it left off
function saveT() { store.set(TKEY, Object.assign({}, T, { online: null, connOK: null, timer: null, flashTimer: null })); }
function restoreT() {
  const s = store.get(TKEY);
  if (!s || !s.phase || s.phase === "board" || s.phase === "lobby") return;
  Object.assign(T, s, { online: T.online, connOK: T.connOK, timer: null, undo: null, flashUntil: 0, flashTimer: null });
  if (T.phase === "clue" && T.winner && !T.answerText && !T.revealed) startAnswerTimer();
}
// A player who rejoins on a new phone or browser takes over their old seat
function repid(a: string, b: string) {
  const p = pf(a); if (p) p.pid = b;
  if (G.control === a) G.control = b;
  if (G.delta && a in G.delta) { G.delta[b] = G.delta[a]; delete G.delta[a]; }
  if (G.lastJoined === a) G.lastJoined = b;
  if (T.winner === a) T.winner = b;
  if (T.wagerFor === a) T.wagerFor = b;
  T.locked = T.locked.map(x => x === a ? b : x);
  if (T.penalty[a]) T.penalty[b] = T.penalty[a];
  T.attempts.forEach(x => { if (x.pid === a) x.pid = b; });
  if (T.res && T.res.pid === a) T.res.pid = b;
  if (T.final) for (const k of ["wagers", "answers", "marks", "verdict"]) {
    const m = T.final[k]; if (m && a in m) { m[b] = m[a]; delete m[a]; }
  }
}
const sameName = (x: string, y: string) => norm(x) === norm(y) && norm(x) !== "";
export const joinUrl = () => location.origin + "/jeo?room=" + G.room;

// ---------- Building the board from votes ----------
// Topics win columns in proportion to their votes (at most 2 each); inside a topic the
// least recently played categories are chosen. Finals rotate the same way.
const findCat = (tid: string, cid: string) => { const tp = TOPICS.find(x => x.id === tid); return tp && tp.cats.find(c => c.id === cid); };
export function tallyVotes() {
  const tally = {}; TOPICS.forEach(tp => tally[tp.id] = 0);
  Object.entries(G.votes || {}).forEach(([pid, ids]: [string, any]) => { if (pf(pid)) ids.forEach(id => { if (id in tally) tally[id]++; }); });
  return tally;
}
function chooseBoard(useVotes: boolean) {
  const tally = useVotes ? tallyVotes() : {};
  const cols = {}, picks: any[] = [];
  for (let i = 0; i < 6; i++) {
    let best = null, bs = -1;
    for (const tp of TOPICS) {
      const n = cols[tp.id] || 0, v = tally[tp.id] || 0;
      if (!v || n >= Math.min(2, tp.cats.length)) continue;
      const sc = v / (n + 1) + Math.random() * 1e-3;
      if (sc > bs) { bs = sc; best = tp; }
    }
    if (!best) {                       // not enough votes: fill with topics not on the board yet
      const pool = TOPICS.filter(tp => !cols[tp.id]);
      best = (pool.length ? pool : TOPICS)[Math.floor(Math.random() * (pool.length || TOPICS.length))];
    }
    cols[best.id] = (cols[best.id] || 0) + 1; picks.push(best);
  }
  const H = store.get(HIST) || { cats: {}, finals: {} };
  const board: any[] = [];
  for (const tp of picks) {
    const opts = tp.cats.filter(c => !board.some(b => b.t === tp.id && b.c === c.id))
      .map(c => ({ c, last: H.cats[tp.id + "/" + c.id] || 0, r: Math.random() }))
      .sort((x, y) => x.last - y.last || x.r - y.r);
    board.push({ t: tp.id, c: opts[0].c.id });
  }
  const finals = FINALS.map((f, i) => ({ i, last: H.finals[i] || 0, r: Math.random() })).sort((x, y) => x.last - y.last || x.r - y.r);
  return { board, finalIdx: finals[0].i };
}
function rememberBoard() {
  const H = store.get(HIST) || { cats: {}, finals: {} }, now = Date.now();
  G.board.forEach(b => H.cats[b.t + "/" + b.c] = now);
  H.finals[G.finalIdx] = now;
  store.set(HIST, H);
}
function applyBoard() {
  if (!Array.isArray(G.board) || G.board.length !== 6 || G.board.some(b => !findCat(b.t, b.c)) || !FINALS[G.finalIdx]) {
    const r = chooseBoard(false); G.board = r.board; G.finalIdx = r.finalIdx;
  }
  CATS = G.board.map(b => { const c = findCat(b.t, b.c); return { id: c.id, name: c.name, desc: CAT_DESC[c.id] || "", clues: c.q.map(x => [x[0], x[1]]) }; });
  ALTS = G.board.map(b => findCat(b.t, b.c).q.map(x => x[2] || []));
  const f = FINALS[G.finalIdx];
  FINAL = { category: f.category, clue: f.clue, answer: f.answer }; FINAL_ALTS = f.alts || [];
}

// ---------- Voice: the TV reads clues with the device's Arabic voice ----------
export let arVoice: SpeechSynthesisVoice | null = null;
// Only ever use an Arabic voice: a non-Arabic voice skips the Arabic letters and reads the punctuation ("dot dot").
// Prefer natural-sounding voices (Edge's "Online (Natural)" ones), then Levantine accents.
function pickVoice() {
  if (!window.speechSynthesis) return null;
  const score = v => (/natural|online|neural|premium|enhanced/i.test(v.name) ? 4 : 0) + (/^ar[-_](JO|LB|SY|PS)/i.test(v.lang) ? 2 : 0) + (/^ar[-_]SA/i.test(v.lang) ? 1 : 0);
  const ar = speechSynthesis.getVoices().filter(v => /^ar([-_]|$)/i.test(v.lang));
  arVoice = ar.sort((a, b) => score(b) - score(a))[0] || null;
  return arVoice;
}
// Strip marks a voice may read aloud; full stops and ellipses become pauses (decimals like 1.44 are kept)
function speakable(text: string) {
  return String(text).replace(/[«»"“”()]/g, " ").replace(/…/g, "، ").replace(/(?<!\d)\.|\.(?!\d)/g, "، ").replace(/\s+/g, " ").trim();
}
function speak(text: string, onend?: () => void) {
  if (!G.voice || !window.speechSynthesis) return false;
  if (!arVoice) pickVoice();
  if (!arVoice) { view.bump(); return false; }      // no Arabic voice: stay silent rather than read gibberish
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(speakable(text));
    u.lang = arVoice.lang; u.voice = arVoice;
    u.rate = 0.95;
    if (onend) { let done = false; const fin = () => { if (!done) { done = true; onend(); } }; u.onend = fin; u.onerror = fin; }
    speechSynthesis.speak(u);
    return true;
  } catch (e) { return false; }
}
function hush() { try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {} }
export function toggleVoice() { G.voice = !G.voice; saveG(); view.bump(); if (G.voice) speak(t("voice.on")); else hush(); }
// Read the clue, then open the buzzers when the reading ends
function readClue() {
  const key = T.key, [c, r] = key.split("-").map(Number), clue = CATS[c].clues[r][0];
  speak(CATS[c].name + ". " + clue, () => {
    if (T.phase === "clue" && T.key === key && !T.isWager && !T.armed && !T.winner && !T.revealed && !T.locked.length) { T.armed = true; changed(); }
  });
}

let started = false;
export function initHost() {
  if (started) return; started = true;
  G = store.get(HKEY);
  if (!G || !G.room || !Array.isArray(G.players)) G = { room: newCode(), players: [], used: {}, wagers: freshWagers(), control: null, finalDone: false, started: false, delta: {} };
  G.players.forEach(p => { if (!p.g) p.g = "m"; });
  if (G.started == null) G.started = Object.keys(G.used).length > 0;
  if (!G.votes) G.votes = {};
  applyBoard();
  resetT(); saveG();
  restoreT();
  if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = () => { pickVoice(); view.bump(); }; }
  link.connect(G.room, "host", {
    msg: hostMsg,
    presence: ps => { T.online = new Set(Object.keys(ps)); view.bump(); },
    status: st => { T.connOK = st === "SUBSCRIBED"; view.bump(); if (T.connOK) pub(); }
  });
  document.addEventListener("visibilitychange", () => { if (!document.hidden && !link.ok) link.reconnect(); });
  window.addEventListener("online", () => link.reconnect());
  setInterval(pub, 2000);
}

function newGame() {
  G.players.forEach(p => p.score = 0);
  G.used = {}; G.wagers = freshWagers(); G.control = null; G.finalDone = false; G.started = false; G.delta = {}; G.votes = {};
  G.board = null; applyBoard(); hush();
  resetT(); saveG(); changed();
}

export function pub() {
  if (!G) return;
  let cat = "", val = 0;
  if (T.key) { const [c, r] = T.key.split("-").map(Number); cat = CATS[c].name; val = T.isWager ? T.wagerAmt : VALUES[r]; }
  if (T.phase === "final") cat = FINAL.category;
  link.send("state", {
    players: G.players.map(({ pid, name, score, g }) => ({ pid, name, score, g })),
    phase: T.phase, armed: T.armed, winner: T.winner, locked: T.locked, revealed: T.revealed, cat, val,
    wagerFor: (T.phase === "wager" || T.isWager) ? T.wagerFor : null,
    wagerMax: T.wagerFor ? maxFor(T.wagerFor) : 0,
    wagerSet: T.isWager,
    answering: T.phase === "clue" && !T.revealed && !T.answerText && (T.isWager ? !!T.wagerFor : !!T.winner),
    ansLeft: T.deadline ? Math.max(0, T.deadline - Date.now()) : 0,
    judging: T.phase === "clue" && !T.revealed && !!T.answerText,
    res: T.res,
    lastWrong: (!T.isWager && T.armed && T.res && !T.res.ok && pf(T.res.pid)) ? T.res.pid : "",
    votes: G.votes || {},
    final: T.final ? { stage: T.final.stage, w: Object.keys(T.final.wagers), a: Object.keys(T.final.answers) } : null
  });
  saveT();
}

function hostMsg(ev: string, p: any) {
  if (ev === "hello") return pub();
  const pid = String(p.pid || "").slice(0, 16); if (!pid) return;
  if (ev === "join") {
    const name = String(p.name || "").trim().slice(0, 24) || "لاعب";
    const g = p.g === "f" ? "f" : "m";
    // Same name as an existing player (or an explicit "I'm X" tap) means the same person coming back
    let claim = String(p.claim || "");
    if (!pf(claim)) { const m = G.players.find(x => x.pid !== pid && sameName(x.name, name)); claim = m ? m.pid : ""; }
    if (claim && claim !== pid) {
      G.players = G.players.filter(x => x.pid !== pid);
      repid(claim, pid);
    }
    const pl = pf(pid);
    if (pl) { pl.name = name; if (p.g) pl.g = g; }
    else { G.players.push({ pid, name, score: 0, g }); G.lastJoined = pid; }
    saveG(); return changed();
  }
  const pl = pf(pid); if (!pl) return;
  if (ev === "vote") {
    if (G.started) return;
    const ids = (Array.isArray(p.topics) ? p.topics : []).map(String).filter((id, i, a) => TOPICS.some(tp => tp.id === id) && a.indexOf(id) === i).slice(0, 3);
    G.votes[pid] = ids; saveG(); return changed();
  }
  if (ev === "buzz") {
    const now = performance.now();
    if (T.phase !== "clue" || T.isWager || T.revealed) return;
    if (p.early) { if (!T.armed && !T.winner) T.penalty[pid] = now + 250; return; }
    if (!T.armed || T.winner || T.locked.includes(pid)) return;
    if ((T.penalty[pid] || 0) > now) return;
    T.winner = pid; T.armed = false; T.undo = null; startAnswerTimer(); beep(); speak(pl.name);
    T.flashUntil = Date.now() + 1300; clearTimeout(T.flashTimer); T.flashTimer = setTimeout(() => view.bump(), 1350);
    changed();
  } else if (ev === "ans") {
    if (T.phase !== "clue" || T.revealed || T.answerText) return;
    if (T.isWager ? pid !== T.wagerFor : pid !== T.winner) return;
    const text = String(p.text || "").trim().slice(0, 140); if (!text) return;
    T.answerText = text; clearTimeout(T.timer);
    const [official, alts] = clueAns();
    const j = judge(text, official, alts);
    T.attempts.push({ pid, text, v: j.v });
    if (j.v === "close") T.judge = "close";
    else { T.undo = snapshot(); j.v === "right" ? applyRight(pid, t("clue.auto")) : applyWrong(pid, t("clue.auto")); }
    T.flashUntil = 0; changed();
  } else if (ev === "wager") {
    if (T.phase !== "wager" || T.wagerFor !== pid) return;
    const v = Math.round(+p.amount);
    if (!(v >= 5 && v <= maxFor(pid))) return;
    T.wagerInput = String(v); changed();
  } else if (ev === "fin") {
    const F = T.final; if (!F) return;
    if (p.kind === "wager" && F.stage === "wager") {
      const v = Math.round(+p.value), mx = Math.max(pl.score, 0);
      if (!(v >= 0 && v <= mx)) return;
      F.wagers[pid] = v;
    } else if (p.kind === "answer" && F.stage === "answer") {
      F.answers[pid] = String(p.value || "").trim().slice(0, 140);
    } else return;
    changed();
  }
}

export function openTile(k: string) {
  resetT(); T.key = k; G.delta = {};
  if (G.wagers.includes(k)) {
    T.phase = "wager"; T.shakeUntil = Date.now() + 700; wagerSound();
    T.wagerFor = pf(G.control) ? G.control : (G.players[0] ? G.players[0].pid : null);
  } else T.phase = "clue";
  saveG(); changed();
  if (T.phase === "clue") readClue(); else speak(t("wager.title"));
}
function startFinal() {
  resetT(); G.delta = {}; T.phase = "final"; T.final = { stage: "wager", wagers: {}, answers: {}, marks: {} };
  saveG(); changed();
}
function toBoard(markUsed: boolean) {
  if (markUsed && T.key) G.used[T.key] = 1;
  hush(); resetT(); saveG(); changed();
}

// Round intro: rules in four slides, then today's categories revealed one at a time
export const RULES = [["intro.buzzT", "intro.buzzB"], ["intro.answerT", "intro.answerB"], ["intro.wagerT", "intro.wagerB"], ["intro.finalT", "intro.finalB"]];
export const introSteps = () => 1 + RULES.length + CATS.length;   // welcome + rules + one per category
function introSpeech() {
  const i = T.slide || 0;
  if (i === 0) return t("intro.welcome", { name: t("name.title") }) + ". " + t("intro.welcomeSub");
  if (i <= RULES.length) { const [tk, bk] = RULES[i - 1]; return t(tk) + ". " + t(bk); }
  const c = CATS[i - RULES.length - 1]; return c ? c.name + ". " + c.desc : "";
}

// Board-page controls
export function adjust(pid: string, d: number) { const p = pf(pid); if (p) { p.score += d; saveG(); changed(); } }
export function removePlayer(pid: string) { G.players = G.players.filter(p => p.pid !== pid); saveG(); changed(); }
export function showLobby() { T.phase = "lobby"; changed(); }
export function finalOrOver() { if (G.finalDone) { T.phase = "over"; changed(); } else startFinal(); }
export { newGame };
export function setWagerFor(pid: string) { T.wagerFor = pid; T.wagerInput = ""; changed(); }
export function setWagerInput(v: string) { T.wagerInput = v; view.bump(); }

// Overlay buttons. Returns an error message for the wager form, if any.
export function hostAct(a: string, data?: { pid?: string; v?: number }): string | void {
  if (a !== "undo") T.undo = null;
  if (a === "start") {
    if (!G.started) {                       // first start: build today's board from the votes
      const r = chooseBoard(true); G.board = r.board; G.finalIdx = r.finalIdx;
      applyBoard(); rememberBoard();
      G.started = true; saveG(); T.phase = "intro"; T.slide = 0;
      changed(); speak(introSpeech()); return;
    }
    T.phase = "board";                      // lobby reopened mid-game from the code chip
  }
  else if (a === "inext") {
    T.slide = (T.slide || 0) + 1;
    if (T.slide >= introSteps()) { hush(); T.phase = "board"; T.slide = 0; }
    else { changed(); speak(introSpeech()); return; }
  }
  else if (a === "iskip") { hush(); T.phase = "board"; T.slide = 0; }
  else if (a === "arm") { T.armed = true; T.winner = null; }
  else if (a === "disarm") { T.armed = false; }
  else if (a === "right" || a === "wrong") {
    const pid = T.isWager ? T.wagerFor : T.winner; if (!pf(pid)) return;
    const last = T.attempts[T.attempts.length - 1];
    if (T.answerText && last && last.pid === pid) last.v = a;
    T.flashUntil = 0;
    a === "right" ? applyRight(pid, t("clue.hostCall")) : applyWrong(pid, t("clue.hostCall"));
  }
  else if (a === "undo") {
    const u = T.undo; if (!u) return;
    u.scores.forEach(([pid, s]) => { const p = pf(pid); if (p) p.score = s; });
    G.control = u.control; G.delta = u.delta; Object.assign(T, u.t); T.judge = "manual"; T.undo = null; clearTimeout(T.timer);
    const last = T.attempts[T.attempts.length - 1]; if (last) last.v = "close";
    saveG();
  }
  else if (a === "reveal") { T.revealed = true; T.armed = false; T.winner = null; clearTimeout(T.timer); }
  else if (a === "cancel") return toBoard(false);
  else if (a === "done") return toBoard(true);
  else if (a === "wlock") {
    const v = parseNumber(T.wagerInput), mx = maxFor(T.wagerFor);
    if (!v || v < 5 || v > mx) return t("wager.error", { max: num(mx) });
    T.wagerAmt = v; T.isWager = true; T.phase = "clue";
    const [c, r] = T.key.split("-").map(Number); speak(CATS[c].clues[r][0]);
  }
  else if (a === "fclue") { T.final.stage = "answer"; speak(FINAL.clue); }
  else if (a === "freveal") {
    const F = T.final; F.stage = "reveal"; F.verdict = {};
    G.players.forEach(p => {
      const ans = F.answers[p.pid];
      const v = ans ? judge(ans, FINAL.answer, FINAL_ALTS).v : "none";
      F.verdict[p.pid] = v; F.marks[p.pid] = v === "right" ? 1 : v === "close" ? 0 : -1;
    });
  }
  else if (a === "fmark") { const pid = data!.pid as string, v = data!.v as number; T.final.marks[pid] = T.final.marks[pid] === v ? 0 : v; }
  else if (a === "ftally") {
    const F = T.final;
    G.players.forEach(p => { const d = (F.marks[p.pid] || 0) * (F.wagers[p.pid] || 0); p.score += d; if (d) addDelta(p.pid, d); });
    G.finalDone = true; saveG(); T.phase = "over"; T.final = null;
  }
  else if (a === "fcancel" || a === "close") return toBoard(false);
  else if (a === "newgame") return newGame();
  changed();
}
const parseNumber = (s: string) => {
  const x = String(s).replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x660)).replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 0x6F0)).replace(/[^\d]/g, "");
  return x === "" ? NaN : Number(x);
};

// Test builds only: expose the engine under the names the browser tests use
if (import.meta.env.MODE === "test") {
  const w = window as any;
  Object.defineProperty(w, "G", { get: () => G, configurable: true });
  Object.defineProperty(w, "T", { get: () => T, configurable: true });
  Object.defineProperty(w, "CATS", { get: () => CATS, configurable: true });
  Object.assign(w, { openTile, hostAct, pf, judge, clueAns: () => clueAns() });
}
