// جيو!, phone screens: one big slab per state (buzzer), plus forms for joining, voting, answers and wagers
import { useEffect, useRef, useState } from "react";
import { TOPICS } from "./data.js";
import { t } from "./copy";
import { ANSWER_MS } from "./host";
import { P, S, st, view, meG, sp, spName, spG, send, initPlayer, join, claim, tap } from "./player";
import { useSignal, useTicker } from "../../shared/hooks";
import { num, fmt, parseNum, roomParam } from "../../shared/util";

export default function PlayerView() {
  initPlayer();
  useSignal(view);
  useTicker(1500);
  const live = S && Date.now() - st.lastState < 7000;
  const me = S ? sp(P.pid) : null, g = meG();
  const joined = P.name && P.g && roomParam.length === 4 && !st.editingName;
  return <div className="pl">
    <div className="phead">{joined
      ? <><div style={{ minWidth: 0 }}><div className="nm">{P.name}</div><div className="conn"><span className={"dot " + (live ? "on" : "")}></span>{live ? t("join.connected", { code: roomParam }, g) : t("join.noHost")}</div></div><div className={"sc " + (me && me.score < 0 ? "neg" : "")}>{fmt(me ? me.score : 0)}</div></>
      : <div className="nm" style={{ color: "var(--saffron)" }}>{t("name.title")}</div>}</div>
    <div className="pbody" id="pbody"><Body live={!!live} joined={!!joined} /></div>
    <div className="pfoot">{joined ? <button type="button" className="linkbtn" id="rename" onClick={() => { st.editingName = true; view.bump(); }}>{t("join.rename")}</button> : null}</div>
  </div>;
}

function Slab({ cls, big, tag }: { cls: string; big: string; tag?: string }) {
  return <button type="button" id="buzz" className={"slab s-" + cls} aria-label={big} onPointerDown={e => { e.preventDefault(); tap(); }}>
    {tag ? <span className="tag">{tag}</span> : <span></span>}<span className="big">{big}</span></button>;
}
const Meta = () => S && S.cat ? <div className="pmeta"><span>{S.cat}</span><span>{S.val ? num(S.val) : ""}</span></div> : null;
function Msg({ big, sub, cls, numText }: { big: string; sub?: string; cls?: string; numText?: string }) {
  return <div className={"msg " + (cls || "")}><div className="big">{big}</div>{numText ? <div className="num">{numText}</div> : null}{sub ? <div className="sub">{sub}</div> : null}</div>;
}
// A one-field form; onSend returns an error message (or nothing when sent)
function Form({ kind, title, label, btn, numeric, placeholder, initial, sub, attrs, track, extra, onSend }:
  { kind: string; title: string; label: string; btn: string; numeric?: boolean; placeholder?: string; initial?: string; sub?: any; attrs?: any; track?: boolean; extra?: any; onSend: (v: string) => string | void }) {
  const [v, setV] = useState(initial || ""), [err, setErr] = useState("");
  return <form className="pcard" data-f={kind} autoComplete="off" onSubmit={e => { e.preventDefault(); setErr(onSend(v.trim()) || ""); }}>
    {track ? <AnswerTrack /> : null}
    {sub ? <div className="sub">{sub}</div> : null}
    <h2>{title}</h2>
    <label htmlFor={"pf-" + kind} style={{ fontWeight: 700, fontSize: 15 }}>{label}</label>
    <input id={"pf-" + kind} type="text" inputMode={numeric ? "numeric" : undefined} placeholder={placeholder || ""} value={v} onChange={e => setV(e.target.value)} {...(attrs || {})} />
    {extra}
    <p className="err">{err}</p>
    <button type="submit" className="send">{btn}</button>
  </form>;
}
// Time left to answer, counted down locally from when the form appeared
let ansDeadline = 0;
function AnswerTrack() {
  useTicker(200);
  const left = Math.max(0, ansDeadline - Date.now());
  return <div className="ptrack"><div className="fill" style={{ width: (100 * left / ANSWER_MS) + "%" }}></div></div>;
}
function AnswerSecs() { useTicker(200); return <span id="ptSecs">{t("clue.seconds", { n: Math.ceil(Math.max(0, ansDeadline - Date.now()) / 1000) })}</span>; }

function Body({ live, joined }: { live: boolean; joined: boolean }) {
  const me = S ? sp(P.pid) : null, g = meG();
  if (roomParam.length !== 4) return <Form kind="code" title={t("join.title")} label={t("join.codeLabel")} btn={t("join.next")} placeholder="ABCD" attrs={{ maxLength: 4, autoCapitalize: "characters", dir: "ltr" }}
    onSend={v => { const code = v.toUpperCase().replace(/[^A-Z]/g, ""); if (code.length !== 4) return t("join.codeError"); location.search = "?room=" + code; }} />;
  if (!joined) return <NameForm />;
  if (!live) return <Slab cls="off" big={t("join.noHost")} tag={t("join.noHostSub")} />;
  if (S.phase === "over") {
    const ranked = [...S.players].sort((a, b) => b.score - a.score);
    const rank = ranked.findIndex(x => x.pid === P.pid) + 1;
    return <Msg big={t("over.title")} sub={rank === 1 ? t("pfinal.won", null, g) : t("pfinal.rank", { n: rank })} cls={rank === 1 ? "ok" : ""} />;
  }
  if (S.final) {
    const F = S.final, myScore = me ? me.score : 0;
    if (F.stage === "wager") {
      if (F.w.includes(P.pid) || st.sentFin.wager != null) return <Msg big={t("pfinal.wagerDone")} sub={t("pfinal.wagerDoneSub", null, g)} />;
      if (myScore <= 0) return <Msg big={t("pfinal.zero")} sub={t("pfinal.zeroSub")} />;
      return <Form key="fw" kind="fwager" title={t("pfinal.title")} label={t("pfinal.wagerLabel", { max: num(myScore) })} btn={t("wager.phoneSend")} numeric placeholder="0" sub={<span>{S.cat}</span>}
        onSend={v => { const n = v === "" ? 0 : parseNum(v); if (isNaN(n) || n < 0 || n > myScore) return t("pfinal.wagerLabel", { max: num(myScore) }); send("fin", { kind: "wager", value: n }); st.sentFin.wager = n; view.bump(); }} />;
    }
    if (F.stage === "answer") {
      if (F.a.includes(P.pid) || st.sentFin.answer != null) return <Msg big={t("phone.sent")} />;
      return <Form key="fa" kind="fanswer" title={t("pfinal.answerTitle", null, g)} label={t("phone.answerLabel")} btn={t("pfinal.answerSend")}
        onSend={v => { if (!v) return t("phone.answerError", null, g); send("fin", { kind: "answer", value: v }); st.sentFin.answer = v; view.bump(); }} />;
    }
    return <Msg big={t("pfinal.look", null, g)} sub={t("pfinal.lookSub")} />;
  }
  if (S.phase === "lobby") return <Vote />;
  if (S.phase === "intro") return <Msg big={t("pfinal.look", null, g)} sub={t("intro.phoneSub")} />;
  if (S.phase === "wager") {
    if (S.wagerFor === P.pid && st.sentWager == null) return <Form key="w" kind="wager" title={t("wager.title")} label={t("wager.phoneLabel", { max: num(S.wagerMax) })} btn={t("wager.phoneSend")} numeric sub={<span>{S.cat}</span>}
      onSend={v => { const n = parseNum(v), mx = S ? S.wagerMax : 0; if (!n || n < 5 || n > mx) return t("wager.error", { max: num(mx) }); send("wager", { amount: n }); st.sentWager = n; view.bump(); }} />;
    if (S.wagerFor === P.pid) return <Msg big={t("wager.phoneSent", { n: num(st.sentWager as number) })} sub={t("wager.phoneSentSub")} />;
    return <><Meta /><Slab cls="idle" big={t("wager.title")} tag={t("phone.wagerOther", { name: spName(S.wagerFor) }, spG(S.wagerFor))} /></>;
  }
  if (S.phase === "clue" && S.res && S.res.pid === P.pid && (S.revealed || !S.res.ok)) {
    if (S.res.ok) return <Msg big={t("phone.right")} cls="ok" numText={"+" + num(S.res.val)} />;
    if (S.revealed) return <Msg big={t("phone.wrong")} sub={t("phone.over")} cls="bad" numText={"−" + num(S.res.val)} />;
    return <><Meta /><Slab cls="locked" big={t("phone.wrong")} tag={t("phone.locked")} /></>;
  }
  if (S.phase === "clue" && (S.wagerFor === P.pid || S.winner === P.pid) && !S.revealed && (S.answering || S.judging)) {
    if (S.answering && st.sentAns == null) return <AnswerForm />;
    return <Msg big={t("phone.sent")} sub={S.judging ? t("phone.reviewing") : ""} />;
  }
  if (S.phase === "clue" && S.wagerFor) return <><Meta /><Slab cls="idle" big={t("wager.title")} tag={S.revealed ? t("phone.over") : t("phone.beatenSub", { name: spName(S.wagerFor) }, spG(S.wagerFor))} /></>;
  if (S.phase === "clue") {
    if (S.revealed) return <><Meta /><Slab cls="idle" big={t("phone.over")} /></>;
    if (performance.now() < st.penaltyUntil) return <><Meta /><Slab cls="early" big={t("phone.early")} tag={t("phone.earlySub")} /></>;
    if (S.locked.includes(P.pid)) return <><Meta /><Slab cls="locked" big={t("phone.wrong")} tag={t("phone.locked")} /></>;
    if (S.winner) return <><Meta /><Slab cls="beaten" big={t("phone.beaten", { name: spName(S.winner) }, spG(S.winner))} tag={t("phone.beatenSub", { name: spName(S.winner) }, spG(S.winner))} /></>;
    if (st.pending) return <><Meta /><Slab cls="pending" big="…" /></>;
    if (S.armed) return <><Meta /><Slab cls="ready" big={t("phone.buzz", null, g)} tag={S.lastWrong ? t("phone.buzzAfterMiss", { name: spName(S.lastWrong) }, spG(S.lastWrong)) : ""} /></>;
    return <><Meta /><Slab cls="wait" big={t("phone.listen", null, g)} tag={t("phone.listenSub", null, g)} /></>;
  }
  return <Slab cls="idle" big={t("phone.idle", null, g)} tag={t("phone.idleSub")} />;
}

function AnswerForm() {
  const g = meG();
  const set = useRef(false);
  if (!set.current) { ansDeadline = S.ansLeft ? Date.now() + S.ansLeft : 0; set.current = true; }
  return <Form kind="ans" title={t("phone.yourTurn", null, g)} label={t("phone.answerLabel")} btn={t("phone.send")} track={!!S.ansLeft}
    sub={<><span>{S.cat} · {num(S.val)}</span>{S.ansLeft ? <AnswerSecs /> : <span></span>}</>}
    onSend={v => { if (!v) return t("phone.answerError", null, g); send("ans", { text: v }); st.sentAns = v; view.bump(); }} />;
}

function NameForm() {
  const [name, setName] = useState(P.name || ""), [pg, setPg] = useState<string | null>(P.g || null), [err, setErr] = useState("");
  const others = S ? S.players.filter(x => x.pid !== P.pid) : [];
  return <form className="pcard" data-f="name" autoComplete="off" onSubmit={e => { e.preventDefault(); const n = name.trim().slice(0, 24); if (!n) return setErr(t("join.nameError")); if (!pg) return setErr(t("join.genderError")); join(n, pg); }}>
    <h2>{t("join.nameTitle")}</h2>
    <label htmlFor="pf-name" style={{ fontWeight: 700, fontSize: 15 }}>{t("join.nameLabel")}</label>
    <input id="pf-name" type="text" maxLength={24} placeholder={t("join.namePlaceholder")} value={name} onChange={e => setName(e.target.value)} />
    <div style={{ fontWeight: 700, fontSize: 15 }}>{t("join.genderLabel")}</div>
    <div className="gpick" role="group" aria-label={t("join.genderLabel")}>
      {[["m", t("join.male")], ["f", t("join.female")]].map(([v, l]) => <button key={v} type="button" className={"btn " + (pg === v ? "sel" : "")} data-g={v} aria-pressed={pg === v} onClick={() => setPg(v)}>{l}</button>)}
    </div>
    <div className="claims" id="claims">{others.length ? <><div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.6 }}>{t("join.rejoin")}</div>
      <div className="row">{others.map(x => <button key={x.pid} type="button" className="btn sm" data-claim={x.pid} onClick={() => claim(x.pid)}>{t("join.rejoinBtn", { name: x.name })} ({fmt(x.score)})</button>)}</div></> : null}</div>
    <p className="err">{err}</p>
    <button type="submit" className="send">{t("join.join")}</button>
  </form>;
}

function Vote() {
  const g = meG(), mine = (S.votes || {})[P.pid];
  const [pick, setPick] = useState<string[]>((mine || []).slice()), [err, setErr] = useState("");
  if (mine && mine.length && !st.voteEditing) {
    return <div className="msg"><div className="big">{t("vote.sent")}</div>
      <div className="row" style={{ justifyContent: "center" }}>{mine.map(id => { const tp = TOPICS.find(x => x.id === id); return tp ? <span key={id} className="sticker" style={{ fontSize: 18, padding: "6px 14px" }}>{tp.name}</span> : null; })}</div>
      <div className="sub">{t("lobby.waiting")}</div>
      <button type="button" className="btn" id="voteEdit" onClick={() => { st.voteEditing = true; setPick((mine || []).slice()); view.bump(); }}>{t("vote.change", null, g)}</button></div>;
  }
  const toggle = (id: string) => {
    if (pick.includes(id)) { setPick(pick.filter(x => x !== id)); setErr(""); }
    else if (pick.length >= 3) setErr(t("vote.max", null, g));
    else { setPick([...pick, id]); setErr(""); }
  };
  return <form className="pcard" data-f="vote" onSubmit={e => {
    e.preventDefault();
    if (!pick.length) return setErr(t("vote.none", null, g));
    const picks = pick.slice(0, 3);
    send("vote", { topics: picks });
    S.votes = Object.assign({}, S.votes, { [P.pid]: picks });   // show it right away; the host's next update confirms it
    st.voteEditing = false; view.bump();
  }}>
    <h2>{t("vote.title", null, g)}</h2>
    <div style={{ fontWeight: 500, fontSize: 15, lineHeight: 1.6 }}>{t("vote.hint")}</div>
    <div className="topics" role="group" aria-label={t("vote.title", null, g)}>{TOPICS.map(tp => <button key={tp.id} type="button" className={"btn " + (pick.includes(tp.id) ? "sel" : "")} data-topic={tp.id} aria-pressed={pick.includes(tp.id)} onClick={() => toggle(tp.id)}>{tp.name}</button>)}</div>
    <p className="err">{err}</p>
    <button type="submit" className="send">{t("vote.send", null, g)}</button>
  </form>;
}
