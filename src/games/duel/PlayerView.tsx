// مبارزة, phone screens: join, theme/difficulty, category pick, your turn, waiting, predictions, results
import { useEffect, useRef, useState } from "react";
import { DUEL_THEMES } from "./data.js";
import { catById, Pic, CatThumb } from "./pics";
import { P, S, st, view, me, spName, spG, myG, inMatch, opp, send, initPlayer, join, sendSetup, myClockMs } from "./player";
import { CLOCK_MS, TIME_NAME, THEME_NAME, DIFF_NAME } from "./host";
import { useSignal, useTicker } from "../../shared/hooks";
import { gx, roomParam, secs } from "../../shared/util";

export default function PlayerView() {
  initPlayer();
  useSignal(view);
  useTicker(1000);
  const live = S && Date.now() - st.lastState < 7000, m = me(), g = myG();
  const joined = P.name && P.g && roomParam.length === 4 && !st.editing;
  return <div className="pl">
    <div className="phead">{joined
      ? <><div style={{ minWidth: 0 }}><div className="nm">{P.name}</div><div className="meta"><span className={"dot " + (live ? "on" : "")}></span>{live ? gx(g, "متصل", "متصلة") + " · " + roomParam : "بانتظار الشاشة…"}{m && m.stars ? ` · ★${m.stars}` : ""}</div></div>
          <div className="side">{S && S.score && inMatch() ? `${S.score[P.pid]}–${S.score[opp()]}` : ""}</div></>
      : <div className="nm" style={{ color: "var(--saffron)" }}>مبارزة</div>}</div>
    <div className="pbody"><Body live={!!live} joined={!!joined} /></div>
    <div className="pfoot">{joined ? <button type="button" className="linkbtn" id="rename" onClick={() => { st.editing = true; view.bump(); }}>تغيير الاسم</button> : null}</div>
  </div>;
}

function Body({ live, joined }: { live: boolean; joined: boolean }) {
  const g = myG();
  if (roomParam.length !== 4) return <CodeForm />;
  if (!joined) return <NameForm />;
  if (!live) return <div className="msg"><div className="big">بانتظار الشاشة…</div><div className="sub">تأكد إن شاشة المبارزة مفتوحة</div></div>;
  if (S.phase === "loading") return <div className="msg"><div className="big">{catById(S.cat).name}</div><div className="sub">عم نحمّل الصور…</div></div>;
  if (S.phase === "duel" || S.phase === "count") {
    if (!inMatch()) return <Predict />;
    if (S.phase === "duel" && S.turn === P.pid && S.running) return <Turn key={String(S.pic)} />;
    return <div className="msg"><span className="sub">{S.phase === "count" ? "استعد…" : !S.running ? "اللعب واقف" : "وقتك واقف"}</span><BigClock />
      <span className="badge">{S.phase === "count" ? catById(S.cat).name : "دور " + spName(opp())}</span>
      <span className="sub">{gx(g, "جهّز حالك، الصورة الجاية إلك", "جهّزي حالك، الصورة الجاية إلك")}</span></div>;
  }
  if (S.phase === "roundEnd" || S.phase === "matchEnd") {
    const w = S.phase === "matchEnd" ? S.winner : S.roundWinner, won = w === P.pid, end = S.phase === "matchEnd";
    if (inMatch()) return <div className={"msg " + (won ? "gold" : "")}><div className="big">{won ? (end ? gx(g, "ربحت المبارزة!", "ربحتي المبارزة!") : gx(g, "ربحت الجولة!", "ربحتي الجولة!")) : (end ? gx(g, "خسرت المبارزة", "خسرتي المبارزة") : gx(g, "خسرت الجولة", "خسرتي الجولة"))}</div>
      <div className="sub">{end ? (won ? gx(g, "إنت بتضل، وبتختار موضوع وفئة من جديد", "إنتي بتضلي، وبتختاري موضوع وفئة من جديد") : gx(g, "رجعت عالدور", "رجعتي عالدور")) : "الجولة الجاية قريبًا"}</div></div>;
    return <div className="msg"><div className="big">{spName(w)} {end ? gx(spG(w), "ربح المبارزة", "ربحت المبارزة") : gx(spG(w), "ربح الجولة", "ربحت الجولة")}</div>
      {end && S.preds && S.preds[P.pid] ? <div className="sub">{S.preds[P.pid] === w ? "توقّعك صح! ★" : "توقّعك ما زبط"}</div> : null}</div>;
  }
  // lobby: the two at the front of the line choose a theme and difficulty, then a category each; everyone else waits
  const pos = S.queue.indexOf(P.pid);
  if (pos <= 1 && pos >= 0 && !S.offer) return <Setup />;
  st.selTheme = st.selDiff = null;
  if (pos <= 1 && pos >= 0) return <CatPicker />;
  return <div className="msg"><div className="big">{gx(g, "إنت بالدور", "إنتي بالدور")}</div><div className="sub">قدّامك {Math.max(0, pos - 1)} {pos - 1 === 1 ? "لاعب" : "لاعبين"}</div>
    {S.offer ? <span className="badge">{THEME_NAME(S.theme)} · {DIFF_NAME[S.diff]}</span> : null}<div className="sub">لما تبلّش المبارزة {gx(g, "بتقدر تتوقّع", "بتقدري تتوقّعي")} مين رح يربح</div></div>;
}

function CodeForm() {
  const [v, setV] = useState(""), [err, setErr] = useState("");
  return <form className="card" data-f="code" onSubmit={e => { e.preventDefault(); const c = v.toUpperCase().replace(/[^A-Z]/g, ""); if (c.length !== 4) { setErr("الرمز من 4 أحرف إنجليزية، مثل ABCD."); return; } location.search = "?room=" + c; }}>
    <h2>ادخل على المبارزة</h2><label htmlFor="f-code" style={{ fontWeight: 700 }}>رمز الغرفة الظاهر على الشاشة</label>
    <input id="f-code" maxLength={4} dir="ltr" autoCapitalize="characters" placeholder="ABCD" value={v} onChange={e => setV(e.target.value)} /><p className="err">{err}</p><button className="send" type="submit">التالي</button></form>;
}
function NameForm() {
  const [name, setName] = useState(P.name || ""), [pg, setPg] = useState<string | null>(P.g || null), [err, setErr] = useState("");
  return <form className="card" data-f="name" autoComplete="off" onSubmit={e => { e.preventDefault(); const v = name.trim(); if (!v) return setErr("اكتب اسمك."); if (!pg) return setErr("اختار لاعب أو لاعبة."); join(v, pg); }}>
    <h2>ما اسمك؟</h2><label htmlFor="f-name" style={{ fontWeight: 700 }}>اسمك مبيّن على الشاشة</label>
    <input id="f-name" maxLength={24} placeholder="مثلًا: علي" value={name} onChange={e => setName(e.target.value)} />
    <div style={{ fontWeight: 700 }}>أنا</div>
    <div className="gpick">{[["m", "لاعب"], ["f", "لاعبة"]].map(([v, t]) => <button key={v} type="button" className={"btn " + (pg === v ? "sel" : "")} data-g={v} aria-pressed={pg === v} onClick={() => setPg(v)}>{t}</button>)}</div>
    <p className="err">{err}</p><button className="send" type="submit">دخّلني!</button></form>;
}

function Setup() {
  const g = myG(), mine = (S.setup || {})[P.pid] || {};
  if (st.selTheme === null && mine.theme) st.selTheme = mine.theme;
  if (st.selDiff === null && mine.diff) st.selDiff = mine.diff;
  const oppId = S.queue[S.queue.indexOf(P.pid) === 0 ? 1 : 0];
  if (mine.ok) {
    const os = (S.setup || {})[oppId];
    return <div className="msg"><div className="big">تمام!</div>
      <span className="badge">{THEME_NAME(mine.theme)} · {DIFF_NAME[mine.diff]}</span>
      <div className="sub">{oppId ? (os && os.ok ? "" : `بنستنى ${spName(oppId)}…`) : "بنستنى خصم…"}<br />إذا اختلفتوا، القرعة بتقرّر</div>
      <button type="button" className="btn" id="setupEdit" onClick={() => sendSetup(false)}>{gx(g, "غيّر اختيارك", "غيّري اختيارك")}</button></div>;
  }
  return <div className="card"><h2>{gx(g, "اختار الموضوع", "اختاري الموضوع")}</h2>
    <div className="sub">الفئات رح تطلع من الموضوع اللي بتختاروه. الوقت: {TIME_NAME(S.clockMs)} لكل لاعب.</div>
    <div className="opts">{DUEL_THEMES.map(t => <button key={t.id} type="button" className={"btn " + (st.selTheme === t.id ? "sel" : "")} data-theme={t.id} aria-pressed={st.selTheme === t.id} onClick={() => { st.selTheme = t.id; sendSetup(false); }}>{t.name}</button>)}</div>
    <h3>الصعوبة</h3>
    <div className="sub">من وين نبلّش؟ الأسئلة بتصعب مع الوقت.</div>
    <div className="opts three">{["e", "m", "h"].map(d => <button key={d} type="button" className={"btn " + (st.selDiff === d ? "sel" : "")} data-diff={d} aria-pressed={st.selDiff === d} onClick={() => { st.selDiff = d; sendSetup(false); }}>{DIFF_NAME[d]}</button>)}</div>
    <button type="button" className="send" id="setupOk" disabled={!(st.selTheme && st.selDiff)} style={{ marginTop: 8 }} onClick={() => { if (st.selTheme && st.selDiff) sendSetup(true); }}>تمام</button>
  </div>;
}

function CatPicker() {
  const [tapped, setTapped] = useState<string | null>(null);
  const pos = S.queue.indexOf(P.pid), oppId = pos === 0 ? S.queue[1] : pos === 1 ? S.queue[0] : null;
  const oppPick = oppId ? (S.players.find(x => x.pid === oppId) || {}).pick : null;
  const mine = (me() || {}).pick || tapped, g = myG();
  const draw = S.draw ? [S.draw.tBy && "الموضوع", S.draw.dBy && "الصعوبة"].filter(Boolean).join(" و") : "";
  const pick = (id: string) => { setTapped(id); send("pick", { cat: id }); };
  return <div className="card"><h2>{gx(g, "اختار فئتك", "اختاري فئتك")}</h2>
    <div className="sub"><b>{THEME_NAME(S.theme)} · {DIFF_NAME[S.diff]}</b>{draw ? ` (${draw} بالقرعة)` : ""}. جولة كاملة رح تكون بفئتك.</div>
    <div className="cats"><button type="button" className={"btn " + (mine === "random" ? "sel" : "")} data-cat="random" style={{ gridColumn: "1 / -1" }} onClick={() => pick("random")}><span className="pthumb" style={{ fontSize: 22 }}>؟</span>{gx(g, "فاجئني: فئة عشوائية", "فاجئيني: فئة عشوائية")}</button>
      {S.offer.map(catById).map(c => <button key={c.id} type="button" className={"btn " + (mine === c.id ? "sel" : "")} data-cat={c.id} disabled={oppPick === c.id} onClick={() => pick(c.id)}><CatThumb c={c} />{c.name}</button>)}</div>
    {oppPick && oppPick !== "random" ? <div className="sub" style={{ fontWeight: 700 }}>{gx(g, "ما بتقدر تختار", "ما بتقدري تختاري")} فئة {spName(oppId)} ({catById(oppPick).name})</div> : null}
  </div>;
}

// My clock, counted down locally between the TV's updates
function useMyClock() { useTicker(100); const ms = myClockMs(P.pid); return { ms, low: ms < 10000, pct: (100 * Math.max(0, ms) / ((S && S.clockMs) || CLOCK_MS)) + "%" }; }
function BigClock() {
  const c = useMyClock();
  return <><span className="tclock t ltr" style={c.low ? { color: "var(--red)" } : undefined}>{secs(c.ms)}</span>
    <div className="bar" style={{ width: "100%", height: 12, background: "var(--grey2)", display: "flex" }}><i style={{ display: "block", height: "100%", background: "var(--muted)", width: c.pct }}></i></div></>;
}
function TurnClock() {
  const c = useMyClock();
  return <div className={"top " + (c.low ? "low" : "")}><span style={{ fontWeight: 700 }}>دورك!</span><span className="t ltr">{secs(c.ms)}</span><div className="bar"><i style={{ width: c.pct }}></i></div></div>;
}
function Turn() {
  const [v, setV] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  const mineLast = S.last && S.last.pid === P.pid;
  return <div className="turn"><TurnClock />
    <div className="body">
      <div className="picwrap"><div className="pbox"><div className="sq"><Pic kind={S.kind} k={S.pic} /></div></div><span>{S.prompt}</span></div>
      <form className="ansrow" data-f="ans" autoComplete="off" onSubmit={e => { e.preventDefault(); const t = v.trim(); if (!t) return; send("ans", { text: t }); setV(""); ref.current?.focus(); }}>
        <label htmlFor="f-ans" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>الجواب</label>
        <input id="f-ans" ref={ref} placeholder="اكتب الجواب (عربي أو English)" value={v} onChange={e => setV(e.target.value)} /><button type="submit">إبعت</button></form>
      <div className={"flash " + (mineLast ? S.last.v : "")}>{mineLast && S.last.v === "no" ? "✗ «" + S.last.text + "» غلط، جرّب كمان" : ""}</div>
      <button type="button" className="pass" id="passBtn" onClick={() => send("pass", {})}>مرّر · −3 ثواني</button>
    </div></div>;
}

function Predict() {
  const g = myG(), mine = S.preds && S.preds[P.pid];
  const [tapped, setTapped] = useState<string | null>(null), sel = mine || tapped;
  return <div className="msg"><span className="sub">{spName(S.a)} ضد {spName(S.b)} · {catById(S.cat).name}</span>
    <div className="big">مين رح يربح؟</div>
    <div className="pred">{[S.a, S.b].map(p => <button key={p} type="button" className={"btn " + (sel === p ? "sel" : "")} data-pred={p} onClick={() => { setTapped(p); send("pred", { who: p }); }}>{spName(p)}{sel === p ? " ✓" : ""}</button>)}</div>
    <span className="sub">{gx(g, "التوقّع الصح بيعطيك نجمة", "التوقّع الصح بيعطيكي نجمة")}</span></div>;
}
