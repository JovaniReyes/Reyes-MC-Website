import { memo, useMemo, useState, useEffect } from "react";
import "./Background.scss";

/* ─────────────── 1. CONFIG  ─────────────── */
const ROWS_PER_HALF = 24;
const COLS = 2;
const STAGGER_STEP = 0.06;
const TX_DURATION = .35;
const OP_DURATION = 2;

// Debug flag
const debugMode = false;
const DEBUG_LOOP_INTERVAL = 3000;

/* ─────────────── 2. COMPONENT  ─────────────── */
function Background({ isRevealed: propIsRevealed, onDone }) {
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
    const temp = [];

    const push = (half, row, col, delay) =>
      temp.push({
        key: `${half}-${row}-${col}`,
        delay,
        col: col + 1,
        side: col === 0 ? "left" : "right",
        isLast: half === "top" && row === 0 && col === COLS - 1,
        row: half === "top" ? row + 1 : ROWS_PER_HALF + row + 1,
      });

    for (let row = 0; row < ROWS_PER_HALF; row++) {
      const delayBottom = row * STAGGER_STEP;
      const delayTop = (ROWS_PER_HALF - 1 - row) * STAGGER_STEP;
      for (let col = 0; col < COLS; col++){
        push("top", row, col, delayTop);
        push("bottom", row, col, delayBottom);
      }
    }
    return temp;
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
          style={{"--delay": `${delay}s`, gridRowStart: row, gridColumnStart: col,}}
          onTransitionEnd={isLast && !debugMode ? onDone : undefined}
        />
      ))}
    </div>
  );
}

export default memo(Background);
