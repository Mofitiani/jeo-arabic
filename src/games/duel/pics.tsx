// Pictures for مبارزة: flags, Twemoji, brand symbols, and photos from Wikipedia/Wikimedia Commons
import { useState } from "react";
import { DUEL_CATS, DUEL_EN, DUEL_FILES, PEOPLE_CATS } from "./data.js";
import { DUEL_ICONS } from "./icons.js";
import { store } from "../../shared/util";
import { normDuel } from "../../shared/match";

export const catById = (id: string): any => DUEL_CATS.find(c => c.id === id);
const FLAG_URL = (c: string) => "https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/" + c + ".svg";
const TWEMOJI_URL = (e: string) => "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/" + Array.from(e).map(ch => ch.codePointAt(0)!.toString(16)).filter(h => h !== "fe0f").join("-") + ".svg";

// kind: "flag" | "emoji" | "icon" | "url" (a photo URL); k: the item key (or URL)
export function Pic({ kind, k }: { kind: string; k: string | null }) {
  const [broken, setBroken] = useState(false);
  if (kind === "icon") {                                   // brand symbol in its colour; very light colours sit on a dark square
    const i = DUEL_ICONS[k as string]; if (!i) return null;
    const n = parseInt(i.c, 16), light = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) > 200;
    return <div className="pic icon" style={{ background: light ? "var(--ink)" : "var(--paper)" }} role="img" aria-label="شعار"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill={"#" + i.c} d={i.d} /></svg></div>;
  }
  if (kind === "flag") return <img className="pic flag" src={FLAG_URL(k as string)} alt="علم" />;
  if (kind === "url") return k ? <img className="pic photo" src={k} alt="صورة" /> : <span className="emo" style={{ fontSize: 32 }}>…</span>;
  if (broken) return <span className="emo">{k}</span>;   // Twemoji couldn't load: the device's own emoji
  return <img className="pic emoji" src={TWEMOJI_URL(k as string)} alt="صورة" onError={() => setBroken(true)} />;
}
export const isPhoto = (c: any) => c && (c.kind === "item" || c.kind === "file" || c.kind === "wikipage" || c.kind === "wiki");
export function CatThumb({ c }: { c: any }) {
  if (c.kind === "icon") return <span className="pthumb" aria-hidden="true">LOGO</span>;
  if (isPhoto(c)) return <span className="pthumb" aria-hidden="true">{c.prop === "P154" ? "LOGO" : c.kind === "wikipage" || c.kind === "file" ? "كرتون" : "صور"}</span>;
  return <Pic kind={c.kind} k={c.items[0][0]} />;
}

// ---- Photos (looked up once, then remembered on this device) ----
// "item": the Wikipedia article's Wikidata item → its curated photo (P18) or map (P242).
// "file": a picture checked by eye and pinned in DUEL_FILES (title → exact Wikipedia file name).
const WKEY = "mbz-wiki-v1";
export const WIKI: Record<string, any> = store.get(WKEY) || {};
export const saveWiki = () => store.set(WKEY, WIKI);
export const wk = (c: any, name: string) => (c.kind === "item" ? c.prop + ":" : c.kind === "file" ? "F:" : "") + name;
// older saved pictures were 800 px: ask for the sharper size instead
const sharp = (r: any) => r && r.url ? { ...r, url: r.url.replace("width=800", "width=1280").replace("/800px-", "/1280px-") } : (r || {});
const FILE_URL = (f: string) => "https://en.wikipedia.org/wiki/Special:FilePath/" + encodeURIComponent(f) + "?width=1280";
export const wrec = (c: any, name: string): any => {
  if (c.kind === "file") { const r = WIKI[wk(c, name)]; return r && r.bad ? r : (DUEL_FILES[name] ? { url: FILE_URL(DUEL_FILES[name]), credit: "ويكيبيديا" } : {}); }
  return sharp(WIKI[wk(c, name)]);
};
export const photoOK = (c: any, name: string) => !isPhoto(c) || !!wrec(c, name).url;
// What to show for an item: [kind, key] as Pic expects
export const itemPicArgs = (c: any, name: string): [string, string | null] => isPhoto(c) ? ["url", wrec(c, name).url || null] : [c.kind, name];

const stripTags = (h: string) => String(h || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const getJSON = async (u: string) => (await fetch(u)).json();
const WP = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1";
async function pageImage(title: string) {
  const q = await getJSON(WP + "&prop=pageimages&pilicense=any&piprop=thumbnail&pithumbsize=1280&titles=" + encodeURIComponent(title));
  const pg: any = Object.values((q.query && q.query.pages) || {})[0], src = pg && pg.thumbnail && pg.thumbnail.source;
  return src ? { url: src, credit: "ويكيبيديا" } : null;
}
async function commonsFile(file: string) {
  let credit = "";
  try {
    const m = await getJSON("https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=extmetadata&titles=File:" + encodeURIComponent(file));
    const md = (Object.values(m.query.pages)[0] as any).imageinfo[0].extmetadata;
    credit = [stripTags(md.Artist && md.Artist.value).slice(0, 60), md.LicenseShortName && md.LicenseShortName.value].filter(Boolean).join(" · ");
  } catch (err) {}
  return { url: "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=1280", credit: (credit ? credit + " · " : "") + "ويكيميديا كومنز" };
}
async function wikiLookup(c: any, name: string) {
  const key = wk(c, name), hit = WIKI[key];
  if (hit && (hit.url || hit.bad || Date.now() - hit.t < 864e5)) return hit;   // failures are retried after a day; bad pictures never
  let rec: any = null;
  try {
    if (c.kind === "item") {
      const q = await getJSON(WP + "&prop=pageprops&ppprop=wikibase_item&titles=" + encodeURIComponent(name));
      const pg: any = Object.values((q.query && q.query.pages) || {})[0], qid = pg && pg.pageprops && pg.pageprops.wikibase_item;
      if (qid) {
        const e = await getJSON("https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&props=claims&ids=" + qid);
        const cl = ((e.entities && e.entities[qid] && e.entities[qid].claims) || {})[c.prop] || [];
        const best = cl.find(x => x.rank === "preferred" && x.mainsnak.datavalue) || cl.find(x => x.rank !== "deprecated" && x.mainsnak.datavalue);
        if (best) rec = await commonsFile(best.mainsnak.datavalue.value);
      }
      if (!rec) rec = await pageImage(name);           // no curated picture: fall back to the article's picture
    } else rec = await pageImage(name);
  } catch (err) {}
  WIKI[key] = rec ? { ...rec, t: Date.now() } : { url: null, t: Date.now() };
  saveWiki();
  return WIKI[key];
}
// Look up every photo in a category, a few at a time; also warms the browser's image cache
export async function prefetchCat(catId: string) {
  const c = catById(catId); if (!isPhoto(c)) return;
  if (c.kind === "file") { c.items.forEach(it => { const u = wrec(c, it[0]).url; if (u) new Image().src = u; }); return; }
  const list = c.items.map(i => i[0]); let k = 0;
  await Promise.all(Array.from({ length: 6 }, async () => { while (k < list.length) { const r = await wikiLookup(c, list[k++]); if (r.url) new Image().src = r.url; } }));
}

// English names that also count as right: the Wikipedia title for photos, the brand name for logos,
// the country name for flags, and the DUEL_EN list for emoji and capitals
const EN_EXTRA = { us: "USA|US|America|United States", gb: "UK|Britain|England|United Kingdom", ae: "UAE|Emirates", sa: "KSA|Saudi|Saudi Arabia", ps: "Palestine", kr: "Korea|South Korea", kp: "North Korea", nl: "Holland|Netherlands", cz: "Czechia|Czech Republic", tr: "Turkey|Turkiye", ci: "Ivory Coast" };
let regionEN: Intl.DisplayNames | null = null; try { regionEN = new Intl.DisplayNames(["en"], { type: "region" }); } catch (e) {}
export function enAlts(c: any, it: any[]) {
  const key = it[0], out: string[] = [];
  if (DUEL_EN[c.id] && DUEL_EN[c.id][key]) out.push(...DUEL_EN[c.id][key].split("|"));
  else if (c.kind === "flag") { if (regionEN) try { out.push(regionEN.of(key.toUpperCase()) as string); } catch (e) {} if (EN_EXTRA[key]) out.push(...EN_EXTRA[key].split("|")); }
  else if (c.kind === "icon") { if (DUEL_ICONS[key]) out.push(DUEL_ICONS[key].t); }
  else if (c.kind !== "emoji") {
    const base = key.replace(/\s*\(.*?\)\s*/g, " ").replace(/,.*$/, "").trim(); out.push(base);
    const last = base.split(" ").pop();
    if (PEOPLE_CATS.includes(c.id) && base.includes(" ") && normDuel(last).length >= 4) out.push(last);   // surname alone
  }
  return out.filter(Boolean);
}
