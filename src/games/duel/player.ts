// مبارزة, phone side: joins the room, sends choices and answers, shows whatever the TV's state says
import { createLink } from "../../shared/realtime";
import { createSignal } from "../../shared/hooks";
import { store, rid, roomParam } from "../../shared/util";
import { EVENTS } from "./host";

const PKEY = "mbz-player-v1";
export const link = createLink("mbz-", EVENTS);
export const view = createSignal();
export let P: any = null;
export let S: any = null;
export const st = { lastState: 0, stateAt: 0, editing: false, selTheme: null as string | null, selDiff: null as string | null };

export const me = () => S && S.players.find(x => x.pid === P.pid);
export const spName = (pid: string) => ((S && S.players.find(x => x.pid === pid)) || {}).name || "";
export const spG = (pid: string) => ((S && S.players.find(x => x.pid === pid)) || {}).g || "m";
export const myG = () => P.g === "f" ? "f" : "m";
export const inMatch = () => S && S.a && (S.a === P.pid || S.b === P.pid);
export const opp = () => S.a === P.pid ? S.b : S.a;
export const send = (ev: string, p: any) => link.send(ev, { pid: P.pid, ...p });

let started = false;
export function initPlayer() {
  if (started) return; started = true;
  P = store.get(PKEY) || {}; if (!P.pid) P.pid = rid(); store.set(PKEY, P);
  document.addEventListener("visibilitychange", () => { if (!document.hidden && link.active && Date.now() - st.lastState > 4000) link.reconnect(); });
  if (roomParam.length === 4) link.connect(roomParam, P.pid, {
    msg: (ev, p) => {
      if (ev !== "state") return;
      const wasMine = S && S.phase === "duel" && S.turn === P.pid;
      S = p; st.lastState = st.stateAt = Date.now();
      if (!me() && P.name && P.g && !st.editing) send("join", { name: P.name, g: P.g });
      const mineNow = S.phase === "duel" && S.turn === P.pid;
      if (mineNow && !wasMine && navigator.vibrate) navigator.vibrate(80);
      view.bump();
    },
    status: s => { if (s === "SUBSCRIBED") { if (P.name && P.g) send("join", { name: P.name, g: P.g }); link.send("hello", {}); } view.bump(); }
  });
}
export function join(name: string, g: string) {
  P.name = name.slice(0, 24); P.g = g; store.set(PKEY, P); st.editing = false;
  send("join", { name: P.name, g: P.g }); view.bump();
}
// Theme and difficulty choices go to the TV as they're made; تمام locks them in
export function sendSetup(ok: boolean) {
  send("setup", { theme: st.selTheme, diff: st.selDiff, ok });
  if (S && S.setup) S.setup[P.pid] = { theme: st.selTheme, diff: st.selDiff, ok };
  view.bump();
}
// Local countdown between updates so the clock on the phone moves smoothly
export function myClockMs(pid: string) { if (!S || !S.clocks) return 0; let ms = S.clocks[pid]; if (S.phase === "duel" && S.running && S.turn === pid) ms -= Date.now() - st.stateAt; return ms; }
