import { lazy, Suspense } from "react";

// Three pages, each a full page load so only one game's code and styles are on screen at a time:
//   /      main menu (TV)
//   /jeo   جيو!      (TV; phones open /jeo?room=CODE)
//   /duel  مبارزة    (TV; phones open /duel?room=CODE)
const Menu = lazy(() => import("./menu/Menu"));
const Jeo = lazy(() => import("./games/jeo/Jeo"));
const Duel = lazy(() => import("./games/duel/Duel"));

export function App() {
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const Page = path === "/jeo" ? Jeo : path === "/duel" ? Duel : Menu;
  return <Suspense fallback={null}><Page /></Suspense>;
}
