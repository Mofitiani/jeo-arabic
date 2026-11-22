import { useEffect, useReducer, useRef } from "react";

// A tiny observable: engines call bump() after changing their state, components re-render
export function createSignal() {
  const subs = new Set<() => void>();
  return {
    bump() { subs.forEach(f => f()); },
    subscribe(f: () => void) { subs.add(f); return () => { subs.delete(f); }; }
  };
}
export function useSignal(sig: ReturnType<typeof createSignal>) {
  const [, force] = useReducer((x: number) => x + 1, 0);
  useEffect(() => sig.subscribe(force), [sig]);
}
// Re-render every `ms` (for clocks and countdowns)
export function useTicker(ms: number, on = true) {
  const [, force] = useReducer((x: number) => x + 1, 0);
  useEffect(() => { if (!on) return; const id = setInterval(force, ms); return () => clearInterval(id); }, [ms, on]);
}
export function useInterval(fn: () => void, ms: number) {
  const ref = useRef(fn); ref.current = fn;
  useEffect(() => { const id = setInterval(() => ref.current(), ms); return () => clearInterval(id); }, [ms]);
}
