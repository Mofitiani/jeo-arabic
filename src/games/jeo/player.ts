// جيو!, phone side: join, vote, buzz, answer and wager; shows whatever the TV's state says
import { createLink } from "../../shared/realtime";
import { createSignal } from "../../shared/hooks";
import { store, rid, roomParam } from "../../shared/util";
import { EVENTS } from "./host";

const PKEY = "mws-player-v1";
export const link = createLink("mws-", EVENTS);
export const view = createSignal();
export let P: any = null;
export let S: any = null;
// penaltyUntil: early-buzz lockout; pending: buzz sent, waiting for the TV; sent*: what this phone already sent
export const st = { lastState: 0, penaltyUntil: 0, pending: false, sentWager: null as number | null, sentFin: {} as any, lastJoin: 0,
  editingName: false, wasWinner: false, sentAns: null as string | null, voteEditing: false };

export const meG = () => P.g === "f" ? "f" : "m";
export const sp = (pid: string) => S && S.players.find(x => x.pid === pid);
export const spName = (pid: string) => (sp(pid) || {}).name || "";
export const spG = (pid: string) => (sp(pid) || {}).g || "m";
export const send = (ev: string, p: any) => link.send(ev, { pid: P.pid, ...p });
const joinPayload = () => ({ name: P.name, g: meG() });

let started = false;
export function initPlayer() {
  if (started) return; started = true;
  P = store.get(PKEY) || {};
  if (!P.pid) P.pid = rid();
  store.set(PKEY, P);
  document.addEventListener("visibilitychange", () => { if (!document.hidden && link.active && Date.now() - st.lastState > 4000) link.reconnect(); });
  window.addEventListener("online", () => { if (link.active) link.reconnect(); });
  if (roomParam.length === 4) startConn();
}
function startConn() {
  if (link.active) return;
  link.connect(roomParam, P.pid, {
    msg: (ev, p) => {
      if (ev !== "state") return;
      S = p; st.lastState = Date.now();
      if (!S.armed || S.winner) st.pending = false;
      if (S.phase !== "wager") st.sentWager = null;
      if (!S.final) st.sentFin = {};
      if (!S.answering) st.sentAns = null;
      const me = sp(P.pid);
      if (!me && P.name && P.g && !st.editingName && Date.now() - st.lastJoin > 2000) { st.lastJoin = Date.now(); send("join", joinPayload()); }
      const iWin = S.phase === "clue" && S.winner === P.pid;
      if (iWin && !st.wasWinner && navigator.vibrate) navigator.vibrate([120, 60, 120]);
      st.wasWinner = iWin;
      view.bump();
    },
    status: s => {
      if (s === "SUBSCRIBED") { if (P.name && P.g && !st.editingName) { st.lastJoin = Date.now(); send("join", joinPayload()); } link.send("hello", {}); }
      view.bump();
    }
  });
}
export function join(name: string, g: string) {
  P.name = name.slice(0, 24); P.g = g; store.set(PKEY, P); st.editingName = false;
  st.lastJoin = Date.now();
  if (link.active) send("join", joinPayload()); else startConn();
  view.bump();
}
// "I'm X": take over an existing seat (after switching phones or browsers)
export function claim(pid: string) {
  const old = sp(pid); if (!old) return;
  P.name = old.name; P.g = old.g || "m"; store.set(PKEY, P); st.editingName = false;
  send("join", { name: P.name, g: P.g, claim: old.pid }); st.lastJoin = Date.now();
  view.bump();
}

let wakeLock: any = null;
async function wake() { try { const nav: any = navigator; if (!wakeLock && nav.wakeLock) { wakeLock = await nav.wakeLock.request("screen"); wakeLock.addEventListener("release", () => wakeLock = null); } } catch (e) {} }

// The big buzzer. Tapping before the host opens the buttons costs a quarter second.
export function tap() {
  wake();
  if (!S || S.phase !== "clue" || S.wagerFor || S.revealed || S.winner || S.locked.includes(P.pid) || st.pending) return;
  const now = performance.now();
  if (now < st.penaltyUntil) return;
  if (S.armed) {
    st.pending = true; send("buzz", {});
    setTimeout(() => { st.pending = false; view.bump(); }, 2000);
  } else {
    st.penaltyUntil = now + 250; send("buzz", { early: true });
    if (navigator.vibrate) navigator.vibrate(60);
    setTimeout(() => view.bump(), 270);
  }
  view.bump();
}
