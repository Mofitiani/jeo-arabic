// جيو!, TV screens: the board with the leaderboard, and full-screen overlays for
// lobby, intro, buzz flash, clue, wager, final round and results
import { useEffect, useState } from "react";
import { TOPICS } from "./data.js";
import { t, countLabel } from "./copy";
import { G, T, CATS, FINAL, VALUES, ANSWER_MS, RULES, view, initHost, pf, gOf, nameOf, maxFor, curVal, joinUrl, tallyVotes, introSteps, arVoice,
  openTile, hostAct, adjust, removePlayer, showLobby, finalOrOver, newGame, toggleVoice, setWagerFor, setWagerInput } from "./host";
import { useSignal, useTicker } from "../../shared/hooks";
import { QR } from "../../shared/QR";
import { num, fmt } from "../../shared/util";

export default function HostView() {
  initHost();
  useSignal(view);
  useTicker(500, T.shakeUntil > Date.now() || T.flashUntil > Date.now());   // let the shake / buzz flash end on time
  return <>
    <div className="host dots">
      <div className="hhead">
        <h1 className="extrude">{t("name.title")}</h1>
        <div className="hside">
          <a className="btn" href="/" style={{ textDecoration: "none" }}>القائمة</a>
          <VoiceBtn />
          <button type="button" className="btn dark" id="finalBtn" onClick={finalOrOver}>{t("board.final")}</button>
          <ConfirmBtn id="resetBtn" label={t("board.newGame")} sure={t("board.newGameConfirm")} onYes={newGame} ms={3000} />
          <button type="button" className="codechip" id="codeChip" aria-label={t("lobby.codeLabel")} onClick={showLobby}>
            <span className="qrbox" style={{ width: 64 }}><QR text={joinUrl()} size={128} /></span>
            <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span className="lbl">{t("lobby.codeLabel")}</span>
              <span className="code ltr">{G.room}</span>
              <span className="conn"><span className={"dot " + (T.connOK ? "on" : "")}></span><span>{T.connOK ? "" : "…"}</span></span>
            </span>
          </button>
        </div>
      </div>
      <div className="board-scroll"><Board /></div>
      <section className="leader" id="leader" aria-label="اللاعبين"><Leader /></section>
    </div>
    <Overlay />
  </>;
}

function ConfirmBtn({ id, label, sure, onYes, ms, className = "btn" }: { id?: string; label: string; sure: string; onYes: () => void; ms: number; className?: string }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => { if (!armed) return; const x = setTimeout(() => setArmed(false), ms); return () => clearTimeout(x); }, [armed, ms]);
  return <button type="button" id={id} className={className} onClick={() => { if (armed) { setArmed(false); onYes(); } else setArmed(true); }}>{armed ? sure : label}</button>;
}

function VoiceBtn() {
  if (!window.speechSynthesis) return null;
  return <>
    <button type="button" className={"btn " + (G.voice ? "sel" : "")} id="voiceBtn" title={arVoice ? arVoice.name : t("voice.none")} onClick={toggleVoice}>{G.voice ? t("voice.on") : t("voice.off")}</button>
    {G.voice && !arVoice ? <div className="voicehelp" role="status">{t("voice.help")}</div> : null}
  </>;
}

function Board() {
  const cells: JSX.Element[] = CATS.map(c => <div className="cat" tabIndex={0} key={"c" + c.id}>{c.name}{c.desc ? <span className="tip" role="tooltip">{c.desc}</span> : null}</div>);
  for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) {
    const k = c + "-" + r, used = !!G.used[k];
    cells.push(<button className="tile" type="button" key={k} data-k={k} disabled={used} aria-label={CATS[c].name + " " + VALUES[r]} onClick={() => openTile(k)}>{used ? "" : num(VALUES[r])}</button>);
  }
  return <div className="board" id="board">{cells}</div>;
}

function Leader() {
  if (!G.players.length) return <div className="emptycard">{t("board.empty")}</div>;
  const ranked = [...G.players].sort((a, b) => b.score - a.score);
  return <>{ranked.map((p, i) => {
    const d = (G.delta || {})[p.pid];
    return <div className="pc" key={p.pid}>
      <span className="rank">{i + 1}</span>
      <span className="nm"><span className={"dot " + (T.online.has(p.pid) ? "on" : "")}></span> {p.name}{G.control === p.pid ? <small>{t("board.picks", null, p.g)}</small> : null}</span>
      {d ? <span className={"delta " + (d > 0 ? "up" : "down")}>{d > 0 ? "+" : "−"}{num(d)}</span> : null}
      <span className={"sc " + (p.score < 0 ? "neg" : "")}>{fmt(p.score)}</span>
      <span className="ctl">
        <button type="button" aria-label="+200" onClick={() => adjust(p.pid, 200)}>+200</button>
        <button type="button" aria-label="−200" onClick={() => adjust(p.pid, -200)}>−200</button>
        <ConfirmBtn label="✕" sure={t("board.remove")} onYes={() => removePlayer(p.pid)} ms={2500} className="" />
      </span>
    </div>;
  })}</>;
}

// Full-screen overlay for everything that isn't the board
function Overlay() {
  if (T.phase === "board") return null;
  let body: JSX.Element | null = null, cls = "dots";
  if (T.phase === "lobby") body = <Lobby />;
  else if (T.phase === "intro") body = <Intro />;
  else if (T.phase === "clue" && T.flashUntil > Date.now() && T.winner) body = <Flash />;
  else if (T.phase === "clue") body = <Clue />;
  else if (T.phase === "wager") { body = <Wager />; cls = "hatch" + (T.shakeUntil > Date.now() ? " shake" : ""); }
  else if (T.phase === "final") { body = <Final />; cls = "dots-dark"; }
  else if (T.phase === "over") body = <Over />;
  return <div className={"ov " + cls} id="overlay">{body}</div>;
}
const Btn = ({ a, cls, children, id, data }: { a: string; cls: string; children: any; id?: string; data?: any }) =>
  <button type="button" className={"btn " + cls} data-act={a} id={id} onClick={() => hostAct(a, data)}>{children}</button>;

function Lobby() {
  const n = G.players.length;
  return <div className="scr pad lobby" role="dialog" aria-modal="true">
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32 }}>
      <h1 className="extrude">{t("name.title")}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.5 }}>{t("lobby.codeLabel")}</div>
        <div className="bigcode ltr">{G.room}</div>
        <div style={{ fontWeight: 500, fontSize: 20, lineHeight: 1.6 }}>{t("lobby.howToJoin")} <span className="ltr" style={{ fontWeight: 700 }}>{location.host + "/jeo"}</span></div>
      </div>
      <div className="row"><Btn a="start" cls="dark big">{t("lobby.start")}</Btn><a className="btn" href="/" style={{ textDecoration: "none" }}>القائمة</a></div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div className="qrbig"><div className="qrbox"><QR text={joinUrl()} size={600} /></div></div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontWeight: 900, fontSize: 26, lineHeight: 1.5 }}>{t("lobby.joined")}</div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>{n ? countLabel(n) : ""}</div>
      </div>
      <div className="row" style={{ gap: 16 }}>
        {G.players.map(p => <div key={p.pid} className={"sticker " + (p.pid === G.lastJoined ? "new" : "")}>{p.name}{p.pid === G.lastJoined ? <small>{t("lobby.justJoined", null, p.g)}</small> : null}</div>)}
        <div className="waitchip">{t("lobby.waiting")}</div>
      </div>
      <VoteTally />
    </div>
  </div>;
}
function VoteTally() {
  const voters = G.players.filter(p => (G.votes[p.pid] || []).length).length;
  if (!voters) return null;
  const tally = tallyVotes(), max = Math.max(1, ...Object.values(tally) as number[]);
  const rows = TOPICS.map(tp => ({ tp, v: tally[tp.id] })).filter(x => x.v).sort((a, b) => b.v - a.v);
  return <div className="votes">
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
      <div style={{ fontWeight: 900, fontSize: 22, lineHeight: 1.5 }}>{t("lobby.votesTitle")}</div>
      <div style={{ fontWeight: 700, fontSize: 16 }}>{t("lobby.votesCount", { n: voters, total: G.players.length })}</div>
    </div>
    {rows.map(x => <div className="vrow" key={x.tp.id}><span>{x.tp.name}</span><span className="vbar"><span style={{ width: (100 * x.v / max) + "%" }}></span></span><span>{x.v}</span></div>)}
  </div>;
}

function Intro() {
  const i = T.slide || 0, n = introSteps();
  let body;
  if (i === 0) {
    body = <><h2 className="extrude">{t("intro.welcome", { name: t("name.title") })}</h2><p>{t("intro.welcomeSub")}</p>
      <div className="row" style={{ gap: 16 }}>{G.players.map(p => <div className="sticker" key={p.pid}>{p.name}</div>)}</div></>;
  } else if (i <= RULES.length) {
    const [tk, bk] = RULES[i - 1];
    body = <><div className="step">{t("intro.step", { i, n: RULES.length })}</div><h2 className="extrude">{t(tk)}</h2><p>{t(bk)}</p></>;
  } else {
    const shown = i - RULES.length;            // how many categories are revealed so far
    body = <><h2 className="extrude">{t("intro.catsT")}</h2>
      <div className="reveal">{CATS.map((c, k) => k < shown
        ? <div key={k} className={"rcard " + (k === shown - 1 ? "new" : "")}><div className="rn">{c.name}</div><div className="rd">{c.desc}</div></div>
        : <div key={k} className="rcard hid" aria-hidden="true">?</div>)}</div></>;
  }
  return <div className="scr pad" role="dialog" aria-modal="true"><div className="intro">{body}
    <div className="row"><Btn a="inext" cls="dark big" id="inextBtn">{i >= n - 1 ? t("intro.go") : t("intro.next")}</Btn>
      {i < n - 1 ? <Btn a="iskip" cls="">{t("intro.skip")}</Btn> : null}
      <span style={{ fontWeight: 700, fontSize: 16 }}>{t("intro.step", { i: i + 1, n })}</span></div>
  </div></div>;
}

function Flash() {
  const [c, r] = T.key.split("-").map(Number);
  return <div className="scr" role="dialog" aria-modal="true" style={{ padding: 0 }}>
    <div className="flash dots-dark">
      <div className="t">{t("clue.flash", null, gOf(T.winner))}</div>
      <div className="n">{nameOf(T.winner)}</div>
      <div className="c">{CATS[c].name} · {num(VALUES[r])}</div>
    </div>
  </div>;
}

function Drain() {
  useTicker(200);
  const left = Math.max(0, T.deadline - Date.now());
  return <div className="drain"><div className="track"><div className="fill" style={{ width: (100 * left / ANSWER_MS) + "%" }}></div></div><span className="secs">{t("clue.seconds", { n: Math.ceil(left / 1000) })}</span></div>;
}

function Clue() {
  const [c, r] = T.key.split("-").map(Number);
  const cat = CATS[c], [clue, ans] = cat.clues[r];
  const val = curVal();
  const who = T.isWager ? T.wagerFor : T.winner, wg = gOf(who);
  const undo = T.undo ? <Btn a="undo" cls="sm">{t("clue.undo")}</Btn> : null;
  const manual = <><Btn a="right" cls="ghost sm">{t("clue.manualRight")}</Btn><Btn a="wrong" cls="ghost sm">{t("clue.manualWrong")}</Btn></>;
  let bar;
  if (T.revealed) {
    bar = <><div className="lbl">{t("clue.answer")}</div>
      <div className="ans">{ans}</div>
      {T.result ? <div className="what">{T.result}</div> : null}
      <div className="row">{undo}<Btn a="done" cls="gold big" id="doneBtn">{t("clue.back")}</Btn></div></>;
  } else if (who && T.answerText) {
    bar = <><div className="what">{t("clue.typed", { name: nameOf(who), answer: T.answerText }, wg)}</div>
      <p className="hint">{T.judge === "close" ? t("clue.closeMatch") : ""}</p>
      <div className="row"><Btn a="right" cls="ok big">{t("clue.right", { value: num(val) })}</Btn><Btn a="wrong" cls="no big">{t("clue.wrong", { value: num(val) })}</Btn></div></>;
  } else if (T.isWager) {
    bar = <><div className="row" style={{ justifyContent: "space-between" }}><div className="who">{nameOf(who)}</div><div className="row">{manual}</div></div>
      <div className="what">{t("clue.turn", { name: nameOf(who) }, wg)}</div></>;
  } else if (T.winner) {
    bar = <><div className="row" style={{ justifyContent: "space-between" }}><div className="row" style={{ alignItems: "baseline", gap: 22 }}><div className="who">{nameOf(who)}</div><div className="what">{t("clue.turn", { name: "" }, wg).trim()}</div></div><div className="row">{manual}</div></div>
      <Drain />{undo ? <div className="row">{undo}</div> : null}</>;
  } else if (T.armed) {
    bar = <><div className="row" style={{ justifyContent: "space-between" }}><div className="live">{t("clue.live")}</div><Btn a="disarm" cls="ghost">{t("clue.close")}</Btn></div>{undo ? <div className="row">{undo}</div> : null}</>;
  } else {
    bar = <><div className="row"><Btn a="arm" cls="gold big" id="armBtn">{t("clue.open")}</Btn></div><p className="hint">{t("clue.openHint")}</p></>;
  }
  return <div className="scr" role="dialog" aria-modal="true">
    <div className="pad cluetop">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="row" style={{ gap: 16 }}><span className="chip">{cat.name}</span>
          {T.revealed ? null : <div className="row"><Btn a="reveal" cls="sm">{t("clue.noOne")}</Btn><Btn a="cancel" cls="sm">{t("clue.cancel")}</Btn></div>}</div>
        <span className="vchip">{T.isWager ? t("wager.title") + " " : ""}{num(val)}</span>
      </div>
      <p className="cluetxt">{clue}</p>
      {T.attempts.length ? <div className="tries">{T.attempts.map((x, i) => {
        const xg = gOf(x.pid);
        const v = x.v === "right" ? t("clue.vRight") : x.v === "close" ? t("clue.vClose") : x.v === "none" ? t("clue.vNone", null, xg) : t("clue.vWrong");
        return <div className="try" key={i}><span>{nameOf(x.pid)}</span><span style={{ fontWeight: 500 }}>{x.text ? "«" + x.text + "»" : t("clue.timeUp")}</span><span className={"v " + x.v}>{v}</span></div>;
      })}</div> : null}
    </div>
    <div className="bar">{bar}</div>
  </div>;
}

function Wager() {
  const [err, setErr] = useState("");
  const [c] = T.key.split("-").map(Number);
  const back = <Btn a="cancel" cls="">{t("clue.back")}</Btn>;
  if (!G.players.length) return <div className="wcard" role="dialog" aria-modal="true"><div className="wbig">{t("wager.title")}</div><p className="line">{t("board.empty")}</p>{back}</div>;
  const p = pf(T.wagerFor), got = T.wagerInput !== "";
  return <div className="wcard" role="dialog" aria-modal="true">
    <span className="chip" style={{ boxShadow: "none" }}>{CATS[c].name}</span>
    <div className="wbig">{t("wager.title")}</div>
    <div className="line">{got ? t("wager.arrived", { name: p ? p.name : "" }) : t("wager.waiting", { name: p ? p.name : "" }, p ? p.g : "m")}</div>
    <div className="row" style={{ justifyContent: "center", fontWeight: 700, fontSize: 17 }}>{t("wager.upTo", { max: num(maxFor(T.wagerFor)) })}</div>
    <div className="fields">
      <div className="field"><label htmlFor="wWho">{t("wager.who")}</label>
        <select id="wWho" value={T.wagerFor || ""} onChange={e => setWagerFor(e.target.value)}>{G.players.map(x => <option key={x.pid} value={x.pid}>{x.name} ({fmt(x.score)})</option>)}</select></div>
      <div className="field"><label htmlFor="wAmt">{t("wager.amount", { max: num(maxFor(T.wagerFor)) })}</label>
        <input id="wAmt" type="text" inputMode="numeric" value={T.wagerInput} onChange={e => setWagerInput(e.target.value)} /></div>
    </div>
    <p className="err" id="wErr">{err}</p>
    <div className="row" style={{ justifyContent: "center" }}><button type="button" className="btn dark big" data-act="wlock" onClick={() => setErr(hostAct("wlock") || "")}>{t("wager.lock")}</button>{back}</div>
  </div>;
}

function Final() {
  const F = T.final;
  const back = <Btn a="fcancel" cls="ghost">{t("clue.back")}</Btn>;
  const badge = (extra = "") => <span className="chip" style={{ alignSelf: "flex-start", background: "var(--saffron)", color: "var(--ink)" }}>{t("final.badge")}{extra}</span>;
  if (F.stage === "wager") {
    return <div className="scr pad final" role="dialog" aria-modal="true" style={{ justifyContent: "space-between", gap: 32 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {badge()}
        <div style={{ fontWeight: 700, fontSize: 24, color: "var(--muted)" }}>{t("final.catLabel")}</div>
        <h2 className="extrude-dark">{FINAL.category}</h2>
        <div style={{ fontWeight: 500, fontSize: 24, lineHeight: 1.6 }}>{t("final.instructions")}</div>
      </div>
      <div className="fcards">{G.players.map(p => {
        const done = F.wagers[p.pid] != null;
        const st = p.score <= 0 ? t("final.zero", null, p.g) : done ? t("final.wagered", null, p.g) : t("final.waitingWager");
        return <div key={p.pid} className={"fcard " + (done ? "done" : "")}><div className="top"><span className="n">{p.name}</span><span className="s">{fmt(p.score)}</span></div><div className="st">{st}</div></div>;
      })}</div>
      <div className="row fbtns"><Btn a="fclue" cls="gold big">{t("final.showClue")}</Btn>{back}</div>
    </div>;
  }
  if (F.stage === "answer") {
    return <div className="scr pad final" role="dialog" aria-modal="true" style={{ justifyContent: "space-between", gap: 32 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {badge(" · " + FINAL.category)}
        <p className="cluetxt">{FINAL.clue}</p>
      </div>
      <div className="fcards">{G.players.map(p => {
        const done = F.answers[p.pid] != null;
        return <div key={p.pid} className={"fcard " + (done ? "done" : "")}><div className="top"><span className="n">{p.name}</span></div><div className="st">{done ? t("final.answered", null, p.g) : t("final.waitingAnswer", null, p.g)}</div></div>;
      })}</div>
      <div className="row fbtns"><Btn a="freveal" cls="gold big">{t("final.reveal")}</Btn></div>
    </div>;
  }
  return <div className="scr pad final" role="dialog" aria-modal="true" style={{ gap: 32 }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {badge(" · " + FINAL.category)}
      <div style={{ fontWeight: 700, fontSize: 17, color: "var(--muted)" }}>{t("clue.answer")}</div>
      <div style={{ fontWeight: 900, fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 1.4, color: "var(--saffron)" }}>{FINAL.answer}</div>
    </div>
    <div className="fcards">{G.players.map(p => <div key={p.pid} className={"fcard " + (F.marks[p.pid] === 1 ? "done" : "")}>
      <div className="top"><span className="n">{p.name}</span><span className="s">{t("final.wagerOf", { n: num(F.wagers[p.pid] || 0) })}</span></div>
      <div className="said">{F.answers[p.pid] ? "«" + F.answers[p.pid] + "»" : t("final.noAnswer", null, p.g)}</div>
      {F.verdict && F.verdict[p.pid] === "close" ? <div className="st">{t("clue.vClose")}</div> : null}
      <div className="row"><Btn a="fmark" cls={"sm " + (F.marks[p.pid] === 1 ? "ok" : "")} data={{ pid: p.pid, v: 1 }}>{t("clue.vRight")}</Btn><Btn a="fmark" cls={"sm " + (F.marks[p.pid] === -1 ? "no" : "")} data={{ pid: p.pid, v: -1 }}>{t("clue.vWrong")}</Btn></div>
    </div>)}</div>
    <div className="row fbtns"><Btn a="ftally" cls="gold big">{t("final.tally")}</Btn></div>
  </div>;
}

function Over() {
  const ranked = [...G.players].sort((a, b) => b.score - a.score);
  if (!ranked.length) return <div className="scr pad results"><h2>{t("over.title")}</h2><div className="row"><Btn a="close" cls="">{t("over.close")}</Btn></div></div>;
  const top = ranked[0].score, winners = ranked.filter(p => p.score === top);
  const head = winners.length > 1 ? t("over.tie", { names: winners.map(w => w.name).join(" و") }) : t("over.winner", { name: winners[0].name }, winners[0].g);
  return <div className="scr pad results" role="dialog" aria-modal="true">
    <span className="chip" style={{ alignSelf: "flex-start" }}>{t("over.title")}</span>
    <h2 className="extrude">{head}</h2>
    <div className="rlist">{ranked.map((p, i) => <div className="pc" key={p.pid}><span className="rank">{i + 1}</span><span className="nm">{p.name}</span><span className={"sc " + (p.score < 0 ? "neg" : "")}>{fmt(p.score)}</span></div>)}</div>
    <div className="row"><Btn a="newgame" cls="dark big">{t("over.newGame")}</Btn><Btn a="close" cls="">{t("over.close")}</Btn></div>
  </div>;
}
