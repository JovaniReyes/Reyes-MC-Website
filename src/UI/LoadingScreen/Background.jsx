import { memo, useMemo, useState, useEffect } from "react";
import "./Background.scss";

/* ─────────────── 1. CONFIG  ─────────────── */
const ROWS_PER_HALF = 24;
const COLS = 2;
const STAGGER_STEP = 0.06;
const TX_DURATION = 0.6;
const OP_DURATION = 2;

// 🐞 Debug Mode
const debugMode = false;
const DEBUG_LOOP_INTERVAL = 3000; // ms

/* ─────────────── 2. COMPONENT  ─────────────── */
function Background({ isRevealed: propIsRevealed, onDone }) {
  // Debug-only animation toggle
  const [debugRevealed, setDebugRevealed] = useState(false);
  const isRevealed = debugMode ? debugRevealed : propIsRevealed;

  useEffect(() => {
    if (!debugMode) return;
    const interval = setInterval(() => {
      setDebugRevealed(prev => !prev);
    }, DEBUG_LOOP_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const tiles = useMemo(() => {
    const t = [];

    const push = (half, r, c, delay) =>
      t.push({
        key: `${half}-${r}-${c}`,
        delay,
        row: half === "t" ? r + 1 : ROWS_PER_HALF + r + 1,
        col: c + 1,
        side: c === 0 ? "left" : "right",
        isLast: half === "t" && r === 0 && c === COLS - 1,
      });

    for (let r = 0; r < ROWS_PER_HALF; r++) {
      const d = (ROWS_PER_HALF - 1 - r) * STAGGER_STEP;
      for (let c = 0; c < COLS; c++) push("t", r, c, d);
    }

    for (let r = 0; r < ROWS_PER_HALF; r++) {
      const d = r * STAGGER_STEP;
      for (let c = 0; c < COLS; c++) push("b", r, c, d);
    }

    return t;
  }, []);

  const gridStyle = {
    gridTemplateRows: `repeat(${ROWS_PER_HALF * 2}, 1fr)`,
    transitionDuration: `${TX_DURATION}s, ${OP_DURATION}s`,
  };

  return (
    <div className="loading-bg" style={gridStyle}>
      {tiles.map(({ key, delay, row, col, side, isLast }) => (
        <div
          key={key}
          className={`cell ${side} ${isRevealed ? "revealed" : ""}`}
          style={{
            "--delay": `${delay}s`,
            gridRowStart: row,
            gridColumnStart: col,
          }}
          onTransitionEnd={isLast && !debugMode ? onDone : undefined}
        />
      ))}
    </div>
  );
}

export default memo(Background);
