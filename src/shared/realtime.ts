// Live connection between the TV and phones: Supabase Realtime broadcast (no database tables).
// One channel per room; the TV is the authority and publishes "state", phones send short events.
import { createClient } from "@supabase/supabase-js";

const SB_URL = "https://yewosqrrzxsqwqsicipz.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlld29zcXJyenhzcXdxc2ljaXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExOTc4NDAsImV4cCI6MjEwNjc3Mzg0MH0.P5uF8RCmLht_kQZMp6GNDRmZKAjeFEcYZWkfc-x9iws";

// Test builds (`vite build --mode test`) swap Supabase for BroadcastChannel so one browser can run a TV and several phones
function localClient(): any {
  return {
    removeChannel(c) { c._bc.close(); return Promise.resolve(); },
    channel(name) {
      const bc = new BroadcastChannel(name); const hs = {};
      return {
        _bc: bc,
        on(type, f, cb) { if (type === "broadcast") hs[f.event] = cb; return this; },
        subscribe(cb) { bc.onmessage = e => { const m = e.data; if (hs[m.event]) hs[m.event]({ payload: m.payload }); }; setTimeout(() => cb("SUBSCRIBED"), 50); return this; },
        track() { return Promise.resolve(); },
        presenceState() { return {}; },
        send(m) { bc.postMessage({ event: m.event, payload: m.payload }); return Promise.resolve("ok"); }
      };
    }
  };
}
const sb: any = import.meta.env.VITE_TRANSPORT === "local" ? localClient() : createClient(SB_URL, SB_KEY, { auth: { persistSession: false } });

export type Handlers = {
  msg: (ev: string, payload: any) => void;
  status: (st: string) => void;
  presence?: (ps: Record<string, unknown>) => void;
};

// A connection to one room. `prefix` keeps the games apart ("mws-" for جيو!, "mbz-" for مبارزة).
export function createLink(prefix: string, events: string[]) {
  let ch: any = null, args: [string, string, Handlers] | null = null, retry: any = null;
  const link = {
    ok: false,
    get active() { return !!ch; },
    connect(room: string, key: string, h: Handlers) {
      args = [room, key, h];
      const c = sb.channel(prefix + room, { config: { broadcast: { self: false }, presence: { key } } });
      ch = c;
      events.forEach(ev => c.on("broadcast", { event: ev }, m => h.msg(ev, m.payload || {})));
      c.on("presence", { event: "sync" }, () => h.presence && h.presence(c.presenceState()));
      c.subscribe(st => {
        if (c !== ch) return;                       // an old channel we already replaced
        link.ok = st === "SUBSCRIBED";
        if (link.ok) c.track({ t: Date.now() }).catch(() => {});
        else if (st === "CHANNEL_ERROR" || st === "TIMED_OUT" || st === "CLOSED") { clearTimeout(retry); retry = setTimeout(link.reconnect, 2000); }
        h.status(st);
      });
    },
    // Drop the channel and join again (after a network drop, or when a phone comes back from the background)
    reconnect() {
      if (!args) return;
      clearTimeout(retry);
      const old = ch; ch = null; link.ok = false;
      if (old) sb.removeChannel(old).catch(() => {});
      link.connect(...args);
    },
    send(event: string, payload: any) { if (ch) ch.send({ type: "broadcast", event, payload }).catch(() => {}); }
  };
  return link;
}
