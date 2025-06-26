// Background.jsx
import { memo, useMemo } from "react";
import "./Background.scss";

/* ─────────────── 1. CONFIG  ─────────────── */
const ROWS_PER_HALF   = 24;   // <— change here
const COLS            = 2;
const STAGGER_STEP    = 0.06; // seconds between rows
const TX_DURATION     = 0.7;  // tile slide-out
const OP_DURATION     = 2;    // fade

/* ─────────────── 2. COMPONENT  ─────────────── */
function Background({ isRevealed, onDone }) {
  /* Pre-compute the tile descriptors only once. */
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

    /* top half: inner rows first */
    for (let r = 0; r < ROWS_PER_HALF; r++) {
      const d = (ROWS_PER_HALF - 1 - r) * STAGGER_STEP;
      for (let c = 0; c < COLS; c++) push("t", r, c, d);
    }

    /* bottom half: inner rows first again */
    for (let r = 0; r < ROWS_PER_HALF; r++) {
      const d = r * STAGGER_STEP;
      for (let c = 0; c < COLS; c++) push("b", r, c, d);
    }

    return t;
  }, []);

  /* Inline style only for the constants that truly vary with config. */
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
          onTransitionEnd={isLast ? onDone : undefined}
        />
      ))}
    </div>
  );
}

/* React.memo ⇒ no re-render after props stop changing */
export default memo(Background);
