// مبارزة, TV side: the authoritative game state. Phones send events; the TV publishes "state".
// Ported from the single-file version; rendering moved to HostView.tsx (call bump() after any change).
import { DUEL_CATS, DUEL_THEMES, itemLevel, themeCats } from "./data.js";
import { catById, isPhoto, photoOK, prefetchCat, wrec, wk, WIKI, saveWiki, enAlts } from "./pics";
import { createLink } from "../../shared/realtime";
import { store, rid, newCode, shuffle, pickOne } from "../../shared/util";
import { isRight, normDuel as norm } from "../../shared/match";
import { beepSeq } from "../../shared/sound";
import { createSignal } from "../../shared/hooks";

export const CLOCK_MS = 30000, PASS_MS = 3000;
export const TIME_NAME = (ms: number) => ms === 60000 ? "دقيقة" : "30 ثانية";
export const THEME_NAME = (id: string) => (DUEL_THEMES.find(t => t.id === id) || {} as any).name || "";
export const DIFF_NAME = { e: "سهل", m: "متوسط", h: "صعب" };
export const EVENTS = ["join", "setup", "pick", "ans", "pass", "pred", "hello", "state"];

const HKEY = "mbz-host-v1";
export const link = createLink("mbz-", EVENTS);
export const view = createSignal();     // anything on screen changed
export const clocks = createSignal();   // only the clocks / countdown moved (10 times a second)
export let G: any;
export const ui = { tvSel: { theme: null as string | null, diff: null as string | null }, peeking: false, newG: "m" };

export const pf = (pid: string) => G.players.find(p => p.pid === pid);
export const nm = (pid: string) => (pf(pid) || {}).name || "";
export const gOf = (pid: string) => (pf(pid) || {}).g || "m";
export const saveG = () => store.set(HKEY, G);
export const M = () => G.match;                        // the match in progress, or null
export const other = (pid: string) => M() && (pid === M().a ? M().b : M().a);
const changed = () => { saveG(); view.bump(); pub(); };

const sfx = {
  right: () => beepSeq([[880, 0, .12], [1320, .1, .22]]),
  wrong: () => beepSeq([[180, 0, .25, .12]], "sawtooth"),
  pass: () => beepSeq([[600, 0, .08], [400, .08, .12]], "triangle"),
  tick: () => beepSeq([[700, 0, .1, .08]]),
  go: () => beepSeq([[1046, 0, .35, .12]]),
  out: () => beepSeq([[220, 0, .6, .16], [165, .05, .7, .12]], "sawtooth")
};

let started = false;
export function initHost() {
  if (started) return; started = true;
  G = store.get(HKEY);
  if (!G || !G.room) G = { room: newCode(), players: [], queue: [], picks: {}, surprise: {}, setup: {}, offer: null, match: null, streak: {}, stars: {} };
  if (!G.surprise) G.surprise = {};
  if (!G.setup) G.setup = {};
  if (G.clockMs !== 60000) G.clockMs = CLOCK_MS;
  if (G.judge !== "reveal") G.judge = "host";
  if (G.match && G.match.phase === "duel") G.match.running = false;   // a reload pauses the duel
  if (G.match && G.match.phase === "loading") { G.match.round--; nextRound(); }
  saveG();
  link.connect(G.room, "host", { msg: hostMsg, presence: ps => { G.online = Object.keys(ps); view.bump(); }, status: st => { if (st === "SUBSCRIBED") pub(); } });
  document.addEventListener("visibilitychange", () => { if (!document.hidden && !link.ok) link.reconnect(); });
  document.addEventListener("keydown", hostKey);
  document.addEventListener("keyup", e => { if (e.key === "h" || e.key === "H" || e.key === "ه") setPeek(false); });
  setInterval(tick, 100);
  setInterval(pub, 1000);
}

function hostMsg(ev: string, p: any) {
  if (ev === "hello") return pub();
  const pid = String(p.pid || "").slice(0, 16); if (!pid) return;
  if (ev === "join") {
    const name = String(p.name || "").trim().slice(0, 24) || "لاعب", g = p.g === "f" ? "f" : "m";
    const same = G.players.find(x => x.pid !== pid && norm(x.name) === norm(name) && norm(name));
    if (same) repid(same.pid, pid);
    const pl = pf(pid);
    if (pl) { pl.name = name; pl.g = g; } else { G.players.push({ pid, name, g }); G.queue.push(pid); }
    return changed();
  }
  if (!pf(pid)) return;
  const m = M();
  if (ev === "setup") return doSetup(pid, p.theme, p.diff, p.ok);
  if (ev === "pick") return doPick(pid, p.cat);
  if (ev === "pred") {
    if (!m || pid === m.a || pid === m.b || m.phase === "matchEnd") return;
    if (p.who === m.a || p.who === m.b) { m.preds[pid] = p.who; saveG(); pub(); }
    return;
  }
  if (!m || m.phase !== "duel" || !m.running || pid !== m.turn) return;
  if (ev === "ans") answer(String(p.text || "").slice(0, 60), false);
  if (ev === "pass") doPass();
}

// A player's theme/difficulty choice and category pick: from a phone, or tapped on the TV in no-phone mode
export function doSetup(pid: string, th: string | null, df: string | null, ok: boolean) {
  const m = M(), lobby = !m || m.phase === "lobby";
  if (!lobby || G.offer || !G.queue.slice(0, 2).includes(pid)) return;
  const theme = DUEL_THEMES.some(t => t.id === th) ? th : null, diff = ["e", "m", "h"].includes(df as string) ? df : null;
  G.setup[pid] = { theme, diff, ok: !!(ok && theme && diff) };
  resolveSetup(); changed();
}
export function doPick(pid: string, catId: string) {
  const m = M(), lobby = !m || m.phase === "lobby", front = G.queue.slice(0, 2);
  if (!lobby || !G.offer || !front.includes(pid)) return;                      // pick only after the theme is settled, and before the match
  const [a, b] = front, opp = pid === a ? b : a;
  let id;
  if (catId === "random") { id = randomCat([G.picks[opp]]); G.surprise[pid] = true; }
  else {
    const cat = catById(catId); if (!cat || !G.offer.includes(cat.id)) return;
    if (opp && G.picks[opp] === cat.id) {
      if (!G.surprise[opp]) return;                                             // can't take the opponent's category
      G.picks[opp] = randomCat([cat.id]); prefetchCat(G.picks[opp]);            // their hidden random pick moves aside
    }
    id = cat.id; G.surprise[pid] = false;
  }
  G.picks[pid] = id; prefetchCat(id); changed();
}

// Theme and difficulty: once both players are ready, settle them (a draw when they chose differently) and offer 8 random categories
function resolveSetup() {
  const [a, b] = G.queue; if (!a || !b || G.offer) return;
  const sa = G.setup[a], sb = G.setup[b]; if (!sa || !sb || !sa.ok || !sb.ok) return;
  const tBy = sa.theme === sb.theme ? null : pickOne([a, b]), dBy = sa.diff === sb.diff ? null : pickOne([a, b]);
  G.theme = G.setup[tBy || a].theme; G.diff = G.setup[dBy || a].diff;
  G.draw = (tBy || dBy) ? { tBy, dBy } : null;
  G.offer = shuffle(themeCats(G.theme)).slice(0, 8).map(c => c.id);
  G.picks = {}; G.surprise = {};
  if (G.draw) sfx.pass();
}
function clearSetup() { G.setup = {}; G.offer = null; G.theme = null; G.diff = null; G.draw = null; G.picks = {}; G.surprise = {}; }
// TV button: fill in whatever the two players haven't chosen yet
function randomizeSetup() {
  G.queue.slice(0, 2).forEach(pid => { const s = G.setup[pid] || {}; G.setup[pid] = { theme: s.theme || pickOne(DUEL_THEMES).id, diff: s.diff || pickOne(["e", "m", "h"]), ok: true }; });
  resolveSetup(); changed();
}
const themePool = () => G.theme ? themeCats(G.theme) : DUEL_CATS;
// A random category from the theme, avoiding the ones given
function randomCat(avoid: string[]) { const pool = themePool().filter(c => !avoid.includes(c.id)); return (pool.length ? pickOne(pool) : pickOne(DUEL_CATS.filter(c => !avoid.includes(c.id)))).id; }
// TV button: random surprise categories for whichever of the two players hasn't picked
function randomizePicks() {
  const [a, b] = G.queue;
  [a, b].forEach((pid, i) => { if (pid && !G.picks[pid]) { const o = i ? a : b; G.picks[pid] = randomCat([G.picks[o]]); G.surprise[pid] = true; prefetchCat(G.picks[pid]); } });
  changed();
}

function repid(a: string, b: string) {
  const p = pf(a); if (p) p.pid = b;
  G.players = G.players.filter((x, i, arr) => arr.findIndex(y => y.pid === x.pid) === i);
  G.queue = G.queue.map(x => x === a ? b : x).filter((x, i, arr) => arr.indexOf(x) === i);
  if (a in G.picks) { G.picks[b] = G.picks[a]; delete G.picks[a]; }
  if (a in G.setup) { G.setup[b] = G.setup[a]; delete G.setup[a]; }
  if (a in G.surprise) { G.surprise[b] = G.surprise[a]; delete G.surprise[a]; }
  const m = M();
  if (m) { ["a", "b", "turn"].forEach(k => { if (m[k] === a) m[k] = b; }); if (m.clocks && a in m.clocks) { m.clocks[b] = m.clocks[a]; delete m.clocks[a]; } if (a in m.score) { m.score[b] = m.score[a]; delete m.score[a]; } }
}

// ---- match flow ----
export function startMatch() {
  const [a, b] = G.queue;
  if (!a || !b || !G.picks[a] || !G.picks[b]) return;
  G.match = { a, b, score: { [a]: 0, [b]: 0 }, round: 0, phase: "lobby", preds: {}, log: [], diff: G.diff || "e", clockMs: G.clockMs || CLOCK_MS };
  nextRound();
}
async function nextRound() {
  const m = M(); m.round++;
  let cat, owner = null;
  const used = [G.picks[m.a], G.picks[m.b]];
  if (m.round === 1) { cat = G.picks[m.a]; owner = m.a; }
  else if (m.round === 2) { cat = G.picks[m.b]; owner = m.b; }
  else cat = m.decider || randomCat(used);
  const c = catById(cat);
  if (isPhoto(c)) {
    m.phase = "loading"; m.cat = cat; changed();
    await Promise.race([prefetchCat(cat), new Promise(r => setTimeout(r, 12000))]);
    if (M() !== m) return;                                    // restarted while loading
    if (c.items.filter(it => photoOK(c, it[0])).length < 8) {   // offline or too few photos: swap in a random picture category
      const pool = themePool().filter(x => !isPhoto(x) && !used.includes(x.id)), all = DUEL_CATS.filter(x => !isPhoto(x) && !used.includes(x.id));
      return startDeck(m, pickOne(pool.length ? pool : all), owner);
    }
  }
  startDeck(m, c, owner);
}
function startDeck(m: any, c: any, owner: string | null) {
  // Progressive difficulty from the chosen start level (shuffled inside each level):
  // easy → medium → hard; medium → hard → easy; hard → medium → easy
  const lv: number[][] = [[], [], []]; c.items.forEach((it, i) => { if (photoOK(c, it[0])) lv[itemLevel(c.id, it[0])].push(i); });
  const order = { e: [0, 1, 2], m: [1, 2, 0], h: [2, 1, 0] }[m.diff || "e"];
  m.cat = c.id; m.owner = owner; m.deck = order.flatMap(l => shuffle(lv[l])); m.pos = 0;
  m.turn = owner ? (owner === m.a ? m.b : m.a) : m.a;       // the player facing the other's category starts
  m.clockMs = m.clockMs || G.clockMs || CLOCK_MS;
  m.clocks = { [m.a]: m.clockMs, [m.b]: m.clockMs };
  m.log = []; m.running = false; m.reveal = null; m.revealing = false; m.phase = "count"; m.countUntil = Date.now() + 3000; lastCount = 4;
  changed();
}
export function curItem() { const m = M(), c = catById(m.cat); return c.items[m.deck[m.pos % m.deck.length]]; }
export function curLevel() { const m = M(); return itemLevel(m.cat, curItem()[0]); }
// TV button for a wrong or unclear picture: skip it with no penalty and never show it again on this TV
export function badPicture() {
  const m = M(), c = catById(m.cat), it = curItem();
  if (isPhoto(c)) { WIKI[wk(c, it[0])] = { url: null, bad: true, t: Date.now() }; saveWiki(); }
  if (m.deck.length > 1) m.deck.splice(m.pos % m.deck.length, 1); else advance();
  m.reveal = null; m.lastTick = Date.now();
  changed();
}
function advance() { const m = M(); m.pos++; }
function addLog(pid: string, text: string, v: string) { const m = M(); m.log.push({ pid, text, v }); if (m.log.length > 4) m.log.shift(); }

function answer(text: string, byHost: boolean) {
  const m = M(), it = curItem();
  if (byHost || isRight(text, it[1], [...(it[2] || []), ...enAlts(catById(m.cat), it)])) {
    addLog(m.turn, byHost ? it[1] : text, "ok"); sfx.right();
    m.reveal = null; advance(); m.turn = other(m.turn); m.lastTick = Date.now();
  } else { addLog(m.turn, text, "no"); sfx.wrong(); }
  changed();
}
function doPass() {
  const m = M(), it = curItem();
  addLog(m.turn, "", "pass"); sfx.pass();
  m.clocks[m.turn] -= PASS_MS; m.reveal = it[1]; advance();
  if (m.clocks[m.turn] <= 0) return timeout(m.turn);
  changed();
}
export function timeout(pid: string) {
  const m = M(); m.clocks[pid] = 0; m.running = false; m.revealing = false; sfx.out();
  const w = other(pid); m.score[w]++; m.roundWinner = w; m.lastOut = pid; m.reveal = curItem()[1];
  if (m.score[w] >= 2) {
    m.phase = "matchEnd"; m.winner = w;
    G.streak[w] = (G.streak[w] || 0) + 1; G.streak[pid] = 0;
    Object.entries(m.preds).forEach(([p, who]) => { if (who === w) G.stars[p] = (G.stars[p] || 0) + 1; });
  } else m.phase = "roundEnd";
  changed();
}
function endMatch() {
  // Winner stays at the front, the loser goes to the back of the line, both choose again
  const m = M(), w = m.winner, l = other(w);
  G.queue = [w, ...G.queue.filter(x => x !== w && x !== l), l];
  clearSetup();                                         // the new pair chooses a theme, a difficulty and categories again
  G.match = null; changed();
}
let lastCount = 4;
function tick() {
  const m = M(); if (!m) return;
  const now = Date.now();
  if (m.phase === "count") {
    const left = Math.ceil((m.countUntil - now) / 1000);
    if (left <= 0) { m.phase = "duel"; m.running = true; m.lastTick = now; sfx.go(); changed(); return; }
    if (left !== lastCount) { lastCount = left; sfx.tick(); clocks.bump(); }
    return;
  }
  if (m.phase !== "duel" || !m.running) return;
  m.clocks[m.turn] -= now - m.lastTick; m.lastTick = now;
  if (m.clocks[m.turn] <= 0) return timeout(m.turn);
  clocks.bump();
}

export function pub() {
  if (!G) return;
  const m = M();
  const state: any = {
    players: G.players.map(p => ({ pid: p.pid, name: p.name, g: p.g, stars: G.stars[p.pid] || 0, pick: G.surprise[p.pid] ? "random" : (G.picks[p.pid] || null) })),
    queue: G.queue, phase: m ? m.phase : "lobby", clockMs: m ? m.clockMs : G.clockMs, setup: G.setup, offer: G.offer || null, theme: G.theme || null, diff: G.diff || null, draw: G.draw || null
  };
  if (m) {
    const it = (m.phase === "duel" || m.phase === "count") && m.deck ? curItem() : null, c = catById(m.cat);
    Object.assign(state, { a: m.a, b: m.b, score: m.score, round: m.round, cat: m.cat, owner: m.owner, turn: m.turn, running: m.running,
      clocks: m.clocks, kind: isPhoto(c) ? "url" : c.kind, pic: it ? (isPhoto(c) ? wrec(c, it[0]).url : it[0]) : null, prompt: c.prompt, level: it ? curLevel() : 0, lastOut: m.lastOut || null,
      winner: m.winner || null, roundWinner: m.roundWinner || null, preds: m.preds, last: m.log[m.log.length - 1] || null, streak: m.winner ? G.streak[m.winner] : 0 });
  }
  link.send("state", state);
}

// ---- no-phone mode: players, choices and judging all on the TV ----
export function addPlayer(name: string) {
  name = name.trim().slice(0, 24); if (!name) return false;
  if (G.players.some(x => norm(x.name) === norm(name))) return false;
  const pid = "tv" + rid(); G.players.push({ pid, name, g: ui.newG }); G.queue.push(pid);
  changed(); return true;
}
// Hold H: the host peeks at the answer
export function setPeek(on: boolean) { if (ui.peeking === on) return; ui.peeking = on; view.bump(); }
// Reveal mode: show the answer and stop the clock until the room says right or wrong
function revealNow() { const m = M(); if (!m || m.phase !== "duel" || m.revealing) return; m.revealing = true; m.running = false; changed(); }
function judgeReveal(right: boolean) {
  const m = M(); if (!m || !m.revealing) return;
  m.revealing = false; m.running = true; m.lastTick = Date.now();
  if (right) answer("", true); else doPass();
}

// Every TV button and key goes through here
export function act(a: string, arg?: string) {
  const m = M();
  if (a === "rm") { G.players = G.players.filter(x => x.pid !== arg); G.queue = G.queue.filter(x => x !== arg); delete G.picks[arg as string]; delete G.setup[arg as string]; return changed(); }
  if (a === "restart" || a === "reset") {
    ui.tvSel = { theme: null, diff: null };
    if (a === "restart") { G.match = null; }   // players, line, theme and categories stay
    else { G.players = []; G.queue = []; clearSetup(); G.match = null; G.streak = {}; G.stars = {}; }
    return changed();
  }
  if (a === "phones") { if (!m || m.phase === "lobby") { G.noPhones = arg === "1"; changed(); } return; }
  if (a === "judge") { G.judge = arg === "reveal" ? "reveal" : "host"; return changed(); }
  if (a === "newg") { ui.newG = arg === "f" ? "f" : "m"; return view.bump(); }
  if (a === "tvtheme" || a === "tvdiff") { ui.tvSel[a === "tvtheme" ? "theme" : "diff"] = arg as string; return view.bump(); }
  if (a === "tvok") { const t = ui.tvSel; ui.tvSel = { theme: null, diff: null }; return doSetup(arg as string, t.theme, t.diff, true); }
  if (a === "tvpick") { const [pid, v] = String(arg).split("|"); return doPick(pid, v); }
  if (a === "clock") { if (!m || m.phase === "lobby") { G.clockMs = arg === "60000" ? 60000 : 30000; changed(); } return; }
  if (a === "start") return startMatch();
  if (a === "randomize") return G.offer ? randomizePicks() : randomizeSetup();
  if (a === "newtheme") { if (!m || m.phase === "lobby") { clearSetup(); changed(); } return; }
  if (a === "next") { if (m && m.phase === "roundEnd") nextRound(); return; }
  if (a === "done") { if (m && m.phase === "matchEnd") endMatch(); return; }
  if (!m || m.phase !== "duel") return;
  if (m.revealing) { if (a === "right") judgeReveal(true); if (a === "wrong") judgeReveal(false); return; }
  if (a === "reveal") { if (m.running) revealNow(); return; }
  if (a === "pause") { m.running = !m.running; m.lastTick = Date.now(); return changed(); }
  if (!m.running) return;
  if (a === "right") answer("", true);
  if (a === "badpic") badPicture();
  if (a === "pass") doPass();
}
export const canStart = () => { const [a, b] = G.queue; return !!(a && b && G.picks[a] && G.picks[b]); };

function hostKey(e: KeyboardEvent) {
  const t = e.target as HTMLElement;
  if (t && t.closest && t.closest("input, textarea, select")) return;
  const m = M(), k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  const go = (a: string) => { e.preventDefault(); act(a); };
  if (k === "Enter") {
    if (!m || m.phase === "lobby") { if (canStart()) go("start"); }
    else if (m.phase === "roundEnd") go("next");
    else if (m.phase === "matchEnd") go("done");
    return;
  }
  if (!m || m.phase !== "duel") return;
  if (k === "Escape") return go("pause");
  if (k === "h" || k === "ه") { if (G.judge !== "reveal") { e.preventDefault(); setPeek(true); } return; }
  if (m.revealing) { if (k === " " || k === "y") return go("right"); if (k === "n") return go("wrong"); return; }
  if (k === " ") return go("right");
  if (k === "p") return go("pass");
  if (k === "b") return go("badpic");
  if (k === "r" && G.judge === "reveal") return go("reveal");
}

// Test builds only: expose the engine under the names the browser tests use
if (import.meta.env.MODE === "test") {
  const w = window as any;
  Object.defineProperty(w, "G", { get: () => G, configurable: true });
  Object.assign(w, { nm, catById, timeout, curItem, enAlts, isRight, wrec, WIKI, isPhoto, startMatch, saveG, badPicture, themeCats, shuffle, itemLevel, act,
    renderDuel: () => view.bump(), renderLobby: () => view.bump() });
}
