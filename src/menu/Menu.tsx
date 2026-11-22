import { useEffect } from "react";
import "./menu.css";

// TV main screen: pick a game. Each game has its own room code; phones join from that game's screen.
export default function Menu() {
  useEffect(() => { document.title = "ألعاب"; }, []);
  return (
    <main className="menu">
      <h1>شو بدنا نلعب؟</h1>
      <nav className="games" aria-label="الألعاب">
        <a className="game" href="/jeo"><b>جيو!</b><span>لوح أسئلة بفئات، أزرار على التلفونات، ورهانات</span></a>
        <a className="game dark" href="/duel"><b>مبارزة</b><span>واحد ضد واحد بالصور، ساعتين، واللي بيربح بيضل</span></a>
      </nav>
    </main>
  );
}
