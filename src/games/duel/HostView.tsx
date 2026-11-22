// مبارزة, TV screens: lobby (with no-phone setup), the duel itself, and round / match results
import { useEffect, useRef, useState } from "react";
import { DUEL_THEMES, DUEL_CREDITS } from "./data.js";
import { catById, isPhoto, itemPicArgs, wrec, Pic, CatThumb } from "./pics";
import { G, M, ui, view, clocks, nm, gOf, other, act, addPlayer, canStart, curItem, curLevel, initHost, CLOCK_MS, TIME_NAME, THEME_NAME, DIFF_NAME } from "./host";
import { useSignal } from "../../shared/hooks";
import { QR } from "../../shared/QR";
import { gx, secs } from "../../shared/util";

export default function HostView() {
  initHost();
  useSignal(view);
  const m = M();
  if (!m || m.phase === "lobby") return <Lobby />;
  if (m.phase === "loading") return <Loading />;
  if (m.phase === "count" || m.phase === "duel") return <DuelScreen />;
  return <Result />;
}

// A button that needs a second tap within 3 s (restart / reset)
function Confirm({ a, label, sure, className = "btn" }: { a: string; label: string; sure: string; className?: string }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => { if (!armed) return; const id = setTimeout(() => setArmed(false), 3000); return () => clearTimeout(id); }, [armed]);
  return <button type="button" className={className} data-act={a} onClick={() => { if (armed) { setArmed(false); act(a); } else setArmed(true); }}>{armed ? sure : label}</button>;
}
const Restart = () => <Confirm a="restart" label="إعادة المبارزة" sure="متأكد؟ اضغط كمان مرة" />;

function CatCard({ pid, label }: { pid?: string; label: string }) {
  if (!pid) return <div className="pcard empty"><span className="lbl">{label}</span><span className="who" style={{ color: "rgba(17,17,17,.35)" }}>…</span><span className="lbl">بنستنى لاعب</span></div>;
  const c = catById(G.picks[pid]), g = gOf(pid);
  const ok = (extra = "") => <span style={{ fontWeight: 700, fontSize: 16, color: "var(--green)" }}>✓ {gx(g, "جاهز", "جاهزة")}{extra}</span>;
  const head = <><span className="lbl">{label}</span><span className="who">{nm(pid)}</span></>;
  const small = (t: string) => <div style={{ fontWeight: 700, fontSize: 14, color: "var(--paper)" }}>{t}</div>;
  if (!G.offer) {                                    // step 1: theme and difficulty
    const st = G.setup[pid];
    if (st && st.ok) return <div className="pcard">{head}<div className="cat"><div>{small(gx(g, "اختار", "اختارت"))}<div className="cn">{THEME_NAME(st.theme)} · {DIFF_NAME[st.diff]}</div></div></div>{ok()}</div>;
    return <div className="pcard">{head}<div className="cat wait"><div className="cn">{gx(g, "عم يختار الموضوع والصعوبة…", "عم تختار الموضوع والصعوبة…")}</div></div><span className="lbl">{G.noPhones ? "على الشاشة" : "على التلفون"}</span></div>;
  }
  if (c && G.surprise[pid]) return <div className="pcard">{head}
    <div className="cat"><span className="pthumb" style={{ fontSize: 26 }}>؟</span><div>{small(gx(g, "فئته", "فئتها"))}<div className="cn">مفاجأة</div></div></div>
    {ok(" · فئة عشوائية بتنكشف بجولتها")}</div>;
  return <div className="pcard">{head}
    {c ? <><div className="cat"><CatThumb c={c} /><div>{small(gx(g, "فئته", "فئتها"))}<div className="cn">{c.name}</div></div></div>{ok()}</>
       : <><div className="cat wait"><div className="cn">{gx(g, "عم يختار فئته…", "عم تختار فئتها…")}</div></div><span className="lbl">{gx(g, "بيختار", "بتختار")} من {G.offer.length} فئات</span></>}</div>;
}

function SetupBar() {
  if (!G.offer) return <div className="setupbar"><span style={{ fontWeight: 700 }}>كل لاعب بيختار موضوع وصعوبة{G.noPhones ? "" : " على تلفونه"}. إذا اختلفوا، القرعة بتقرّر.</span></div>;
  const d = G.draw;
  return <div className="setupbar"><span>الموضوع</span><b>{THEME_NAME(G.theme)}</b>{d && d.tBy ? <span className="chip">قرعة: {nm(d.tBy)}</span> : null}
    <span style={{ marginInlineStart: 12 }}>الصعوبة</span><b>{DIFF_NAME[G.diff]}</b>{d && d.dBy ? <span className="chip">قرعة: {nm(d.dBy)}</span> : null}
    <span style={{ flexBasis: "100%", height: 0 }}></span><span style={{ fontWeight: 700 }}>الفئات:</span>{G.offer.map(id => <span className="chip" key={id}>{catById(id).name}</span>)}<span className="chip">فئة مفاجأة</span></div>;
}

function AddPlayer() {
  const [name, setName] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (G.queue.length < 2) ref.current?.focus(); }, []);
  return <form className="addp" data-f="addp" autoComplete="off" onSubmit={e => { e.preventDefault(); if (addPlayer(name)) setName(""); else ref.current?.select(); }}>
    <label htmlFor="np-name" style={{ fontWeight: 900 }}>لاعب جديد</label>
    <input id="np-name" ref={ref} maxLength={24} placeholder="الاسم" value={name} onChange={e => setName(e.target.value)} />
    {[["m", "لاعب"], ["f", "لاعبة"]].map(([v, t]) => <button key={v} type="button" className={"btn sm " + (ui.newG === v ? "sel" : "")} data-act="newg" data-v={v} aria-pressed={ui.newG === v} onClick={() => { act("newg", v); ref.current?.focus(); }}>{t}</button>)}
    <button type="submit" className="btn">إضافة</button></form>;
}

// No-phone mode: player 1 then player 2 pick a theme and level, then a category each
function TvPicker() {
  const [a, b] = G.queue;
  if (!G.offer) {
    const pid = [a, b].find(x => !(G.setup[x] && G.setup[x].ok)); if (!pid) return null;
    const g = gOf(pid), s = ui.tvSel;
    return <div className="tvpick"><h3>{nm(pid)}، {gx(g, "اختار الموضوع والصعوبة", "اختاري الموضوع والصعوبة")}</h3>
      <div className="grid">{DUEL_THEMES.map(t => <button key={t.id} type="button" className={"btn " + (s.theme === t.id ? "sel" : "")} data-act="tvtheme" data-v={t.id} aria-pressed={s.theme === t.id} onClick={() => act("tvtheme", t.id)}>{t.name}</button>)}</div>
      <div className="row"><span style={{ fontWeight: 900 }}>الصعوبة:</span>{["e", "m", "h"].map(d => <button key={d} type="button" className={"btn " + (s.diff === d ? "sel" : "")} data-act="tvdiff" data-v={d} aria-pressed={s.diff === d} onClick={() => act("tvdiff", d)}>{DIFF_NAME[d]}</button>)}
        <button type="button" className="btn dark" data-act="tvok" data-p={pid} disabled={!(s.theme && s.diff)} onClick={() => act("tvok", pid)}>تمام</button></div></div>;
  }
  const pid = [a, b].find(x => !G.picks[x]); if (!pid) return null;
  const opp = pid === a ? b : a, g = gOf(pid);
  const pick = (v: string) => act("tvpick", pid + "|" + v);
  return <div className="tvpick"><h3>{nm(pid)}، {gx(g, "اختار فئتك", "اختاري فئتك")}</h3>
    <div className="grid"><button type="button" className="btn" data-act="tvpick" data-v="random" onClick={() => pick("random")}><span className="pthumb" style={{ fontSize: 20 }}>؟</span>{gx(g, "فاجئني", "فاجئيني")}</button>
      {G.offer.map(catById).map(c => <button key={c.id} type="button" className="btn" data-act="tvpick" data-v={c.id} disabled={G.picks[opp] === c.id && !G.surprise[opp]} onClick={() => pick(c.id)}><CatThumb c={c} />{c.name}</button>)}</div></div>;
}

function Lobby() {
  const [a, b] = G.queue, wait = G.queue.slice(2);
  const setupDone = a && b && G.offer, needRandom = a && b && (!G.offer || !G.picks[a] || !G.picks[b]);
  return <div className="tv dots"><div className="pad lobby">
    <div className="lhead">
      <h1 className="extrude">مبارزة</h1>
      {G.noPhones ? <AddPlayer /> : <div className="codebox"><div className="qr"><QR text={location.origin + "/duel?room=" + G.room} size={300} /></div><div><div style={{ fontWeight: 700, fontSize: 14, color: "var(--paper)" }}>رمز الغرفة</div><div className="code ltr">{G.room}</div>
        <div style={{ fontWeight: 500, fontSize: 13, color: "var(--paper)" }}>امسح الرمز بتلفونك</div></div></div>}
    </div>
    <div className="modebar"><a className="btn sm" href="/" style={{ textDecoration: "none" }}>القائمة</a>
      <span className="lab" style={{ marginInlineStart: 8 }}>اللعب:</span>{([[false, "بالتلفونات"], [true, "بدون تلفونات"]] as [boolean, string][]).map(([v, t]) => <button key={t} type="button" className={"btn " + (!!G.noPhones === v ? "sel" : "")} data-act="phones" data-v={v ? "1" : "0"} aria-pressed={!!G.noPhones === v} onClick={() => act("phones", v ? "1" : "0")}>{t}</button>)}
      {G.noPhones ? <><span className="lab" style={{ marginInlineStart: 16 }}>الحكم:</span>{[["host", "المضيف بيعرف الجواب"], ["reveal", "كشف وتأكيد"]].map(([v, t]) => <button key={v} type="button" className={"btn " + (G.judge === v ? "sel" : "")} data-act="judge" data-v={v} aria-pressed={G.judge === v} onClick={() => act("judge", v)}>{t}</button>)}</> : null}</div>
    {a && b ? <SetupBar /> : null}
    {G.noPhones && a && b ? <TvPicker /> : null}
    <div className="versus">
      <CatCard pid={a} label="اللاعب الأول" />
      <div className="vs"><b>ضد</b><span style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.6 }}>أفضل من 3 جولات<br />والأسئلة بتصعب<br />{TIME_NAME(G.clockMs)} لكل لاعب</span></div>
      <CatCard pid={b} label="اللاعب الثاني" />
    </div>
    <div className="row" style={{ justifyContent: "space-between" }}>
      <div className="queue">{wait.length ? <><span style={{ fontWeight: 900, fontSize: 20 }}>بالدور:</span>{wait.map(p => <span className="chip" key={p}>{nm(p)}{G.stars[p] ? <span className="stars">★{G.stars[p]}</span> : null}<button type="button" className="x" data-rm={p} aria-label={"شيل " + nm(p)} onClick={() => act("rm", p)}>✕</button></span>)}<span style={{ fontWeight: 500, fontSize: 16 }}>اللي بيربح بيضل، والجاي بالدور بيتحدّاه</span></> : null}</div>
      <div className="row"><span style={{ fontWeight: 900 }}>الوقت:</span>{[30000, 60000].map(ms => <button key={ms} type="button" className={"btn " + (G.clockMs === ms ? "sel" : "")} data-act="clock" data-ms={ms} aria-pressed={G.clockMs === ms} onClick={() => act("clock", String(ms))}>{TIME_NAME(ms)}</button>)}
        <Confirm a="reset" label="ابدأ من جديد" sure="بتمسح كل شي؟ اضغط كمان مرة" />
        {setupDone ? <button type="button" className="btn" data-act="newtheme" onClick={() => act("newtheme")}>موضوع جديد</button> : null}
        {needRandom ? <button type="button" className="btn" data-act="randomize" onClick={() => act("randomize")}>اختيار عشوائي</button> : null}
        <button type="button" className="btn dark big" data-act="start" disabled={!canStart()} onClick={() => act("start")}>يلا نتبارز</button></div>
    </div>
    <div className="credits" style={{ color: "var(--deep)" }}>{DUEL_CREDITS}</div>
  </div></div>;
}

function Loading() {
  const m = M(), c = catById(m.cat);
  return <div className="tv dots"><div className="pad res"><span className="tag">الجولة {m.round}</span><h2 className="extrude">{c.name}</h2><div style={{ fontWeight: 700, fontSize: 26 }}>عم نحمّل الصور…</div><div className="row"><Restart /></div></div></div>;
}

// The clocks repaint 10 times a second without re-rendering the whole screen
function Clock({ pid }: { pid: string }) {
  useSignal(clocks);
  const m = M(), on = m.turn === pid && m.phase === "duel", g = gOf(pid), ms = m.clocks[pid];
  return <div className={"clock " + (on ? "on " : "") + (ms < 10000 ? "low" : "")}>
    <div className="who"><span className="tag">{on ? gx(g, "دوره", "دورها") : gx(g, "بيستنى", "بتستنى")} {[0, 1].map(i => <span key={i} className={"pip " + (m.score[pid] > i ? "on" : "")}></span>)}</span><span className="nm">{nm(pid)}</span></div>
    <div className="t ltr" data-t>{secs(ms)}</div><div className="bar"><i data-b style={{ width: (100 * Math.max(0, ms) / (m.clockMs || CLOCK_MS)) + "%" }}></i></div></div>;
}
function Countdown() {
  useSignal(clocks);
  const m = M(); if (m.phase !== "count") return null;
  const left = Math.max(1, Math.ceil((m.countUntil - Date.now()) / 1000));
  return <div className="count" role="status"><div><span id="countN">{left}</span><small>{nm(m.turn)} {gx(gOf(m.turn), "بيبلّش", "بتبلّش")} · {catById(m.cat).name}</small></div></div>;
}

function DuelScreen() {
  const m = M(), c = catById(m.cat), it = curItem(), lvl = curLevel();
  const ownerTxt = m.owner ? "فئة " + nm(m.owner) : "فئة عشوائية";
  const credit = isPhoto(c) ? wrec(c, it[0]).credit : "";
  const [kind, key] = itemPicArgs(c, it[0]);
  const huge = G.noPhones ? " huge" : "";
  return <div className="tv duel">
    <div className="dtop">
      <Clock pid={m.a} />
      <div className="dcat"><span className="meta">الجولة {m.round} من 3 · {ownerTxt}</span><span className="name">{c.name}</span></div>
      <Clock pid={m.b} />
    </div>
    <div className="stage">
      <div className="frame">
        <div className="fhead"><span className="q">{c.prompt}</span><span className="lvl">{["سهل", "متوسط", "صعب"][lvl]} {[0, 1, 2].map(i => <i key={i} className={i <= lvl ? "on" : ""}></i>)}</span></div>
        <div className="pbox"><div className="sq">{m.phase === "duel" ? <Pic key={kind + key} kind={kind} k={key} /> : null}</div></div>
        {credit ? <div className="ffoot"><span className="pcredit">الصورة: {credit}</span></div> : null}
        {m.reveal && !m.revealing ? <span className="reveal">كان: {m.reveal}</span> : null}
        {m.revealing ? <div className="bigreveal"><b>{it[1]}</b><span>صح؟ <kbd>Y</kbd> أو المسافة إذا صح، <kbd>N</kbd> إذا غلط</span></div> : null}
        {G.noPhones && G.judge !== "reveal" && m.phase === "duel" ? <span className="peek" id="peek" hidden={!ui.peeking}>{it[1]}</span> : null}
        {m.phase === "duel" && !m.running && !m.revealing ? <div className="paused">واقف</div> : null}
      </div>
      <div className="log">{m.log.map((l, i) => <span key={i}>{nm(l.pid)}{l.text ? ` · «${l.text}»` : ""}<span className={"v " + l.v}>{l.v === "ok" ? "✓" : l.v === "no" ? "✗" : "مرّر −3"}</span></span>)}</div>
    </div>
    <div className="dbot">
      {G.noPhones ? <span className="keys">{G.judge === "reveal" ? <><kbd>R</kbd> كشف · <kbd>Y</kbd>/مسافة صح · <kbd>N</kbd> غلط</> : <><kbd>مسافة</kbd> صح · اضغط مطوّل <kbd>H</kbd> لتشوف الجواب</>} · <kbd>P</kbd> مرّر · <kbd>B</kbd> صورة غلط · <kbd>Esc</kbd> وقّف</span>
        : <span className="hint">الجواب الصح بيقلب الدور. التمرير بيكلّف 3 ثواني. اللي بيخلص وقته بيخسر الجولة.</span>}
      <div className="row">
        {m.revealing ? <><button type="button" className="btn ok huge" data-act="right" onClick={() => act("right")}>✓ صح</button><button type="button" className="btn no huge" data-act="wrong" onClick={() => act("wrong")}>✗ غلط</button></>
          : <>{G.noPhones && G.judge === "reveal" ? <button type="button" className="btn dark huge" data-act="reveal" onClick={() => act("reveal")}>كشف الجواب</button> : null}<button type="button" className={"btn ok" + huge} data-act="right" onClick={() => act("right")}>صح</button></>}
        <button type="button" className="btn" data-act="pass" onClick={() => act("pass")}>مرّر</button>
        <button type="button" className="btn ghost" data-act="badpic" title="بتتخطّى الصورة بدون خصم، وما بترجع تطلع" onClick={() => act("badpic")}>صورة غلط</button>
        <button type="button" className="btn ghost" data-act="pause" onClick={() => act("pause")}>{m.running ? "وقّف" : "كمّل"}</button>
        <Confirm a="restart" label="إعادة المبارزة" sure="متأكد؟ اضغط كمان مرة" className="btn ghost" />
      </div>
    </div>
    <Countdown />
  </div>;
}

function Result() {
  const m = M(), w = m.phase === "matchEnd" ? m.winner : m.roundWinner, wg = gOf(w);
  const box = (pid: string) => <div className={"sbox " + (pid === w ? "win" : "")}><span className="n">{nm(pid)}</span><span className="s">{m.score[pid]}</span></div>;
  let next;
  if (m.phase === "roundEnd") {
    const nr = m.round + 1;
    next = <><div className="row" style={{ gap: 20 }}><span style={{ fontWeight: 700, fontSize: 24, lineHeight: 1.6 }}>{nr === 2 ? <>الجولة 2 بفئة {nm(m.b)}: <b>{catById(G.picks[m.b]).name}</b></> : "تعادل! الجولة الحاسمة بفئة عشوائية"}</span></div>
      <div className="row"><button type="button" className="btn dark big" data-act="next" onClick={() => act("next")}>{nr === 3 ? "الجولة الحاسمة" : "الجولة الجاية"}</button><Restart /></div></>;
  } else {
    const after = G.queue.filter(x => x !== m.a && x !== m.b)[0], st = G.streak[w] || 0;
    next = <><div className="row" style={{ gap: 16 }}>{st > 1 ? <span className="chip" style={{ background: "var(--ink)", color: "var(--saffron)" }}>{st} انتصارات ورا بعض</span> : null}
        {after ? <span style={{ fontWeight: 700, fontSize: 24 }}>{nm(w)} {gx(wg, "بيضل", "بتضل")}، و{nm(after)} {gx(gOf(after), "جاي يتحدّى", "جاية تتحدّى")}</span> : null}</div>
      <div className="row"><button type="button" className="btn dark big" data-act="done" onClick={() => act("done")}>المبارزة الجاية</button><Restart /></div></>;
  }
  return <div className="tv dots"><div className="pad res">
    <span className="tag">خلص وقت {nm(m.lastOut)}{m.reveal ? ` · الجواب كان «${m.reveal}»` : ""}</span>
    <h2 className="extrude">{nm(w)} {m.phase === "matchEnd" ? gx(wg, "ربح المبارزة!", "ربحت المبارزة!") : gx(wg, "ربح الجولة!", "ربحت الجولة!")}</h2>
    <div className="score">{box(m.a)}<span style={{ fontWeight: 900, fontSize: 48 }}>–</span>{box(m.b)}</div>
    {next}
  </div></div>;
}
