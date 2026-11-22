import { useEffect } from "react";
import { IS_PLAYER } from "../../shared/util";
import HostView from "./HostView";
import PlayerView from "./PlayerView";
import "./duel.css";

// One page for both: the TV (no room in the address) or a phone (?room=CODE)
export default function Duel() {
  useEffect(() => { document.title = "مبارزة"; }, []);
  return IS_PLAYER ? <PlayerView /> : <HostView />;
}
