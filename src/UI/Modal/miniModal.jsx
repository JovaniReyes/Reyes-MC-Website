import { useLayoutEffect, useMemo, useState } from "react";
import { useMiniModalsStore } from "../../Exp/stores/miniModalStore";
import "../../Styles/miniModals.scss";

/* —- tweakables —- */
const MAX_SIZE = 300;   // ceiling
const MIN_SIZE = 175;   // floor
const BREAK    = 1415;  // switch point
const MAIN_W   = 700;   // big-modal max-width
const MAIN_VH  = 55;    // big-modal height on mobile (vh)
/* ———————————— */

export default function MiniModalsManager() {
  const { miniModals, animation } = useMiniModalsStore();
  const GAP = (window.innerWidth >= 1415) ? 20 : 200;    // space between cards
  /** chosen card size (px) */
  const [card, setCard] = useState(MAX_SIZE);
  /** how many *inner* columns per desktop side (1 or 2) */
  const [cols, setCols] = useState(1);

  /* 1 ▸ decide size + column-count whenever window or list changes */
  useLayoutEffect(() => {
    const chooseLayout = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const n  = Math.max(miniModals.length, 1);
      const stacked = vw <= BREAK;

      /* free strip on each side of the big modal */
      const sideFree = (vw - MAIN_W) / 2 - GAP;

      /* calculate size for desktop (try 1 & 2 inner columns) */
      const sideCount = Math.ceil(n / 2);
      let best = { cols: 1, size: MIN_SIZE };

      [1, 2].forEach((c) => {
        /* rows for this column count */
        const rows  = Math.ceil(sideCount / c);

        /* limits from each axis */
        const limitH = (vh - (rows - 1) * GAP) / rows;
        const limitW = (sideFree - (c - 1) * GAP) / c;

        const size = Math.max(
          MIN_SIZE,
          Math.min(MAX_SIZE, Math.floor(Math.min(limitH, limitW)))
        );

        if (size > best.size) best = { cols: c, size };
      });

      /* calculate size for stacked/mobile */
      const freeH = vh * (1 - MAIN_VH / 100);
      const freeW = vw;
      const gridCols = Math.max(
        1,
        Math.floor((freeW + GAP) / (MIN_SIZE + GAP))
      );
      const gridRows = Math.ceil(n / gridCols);
      const sizeMob = Math.max(
        MIN_SIZE,
        Math.min(
          MAX_SIZE,
          Math.floor(
            Math.min(
              (freeH - (gridRows - 1) * GAP) / gridRows,
              (freeW - (gridCols - 1) * GAP) / gridCols
            )
          )
        )
      );

      if (stacked) {
        setCard(sizeMob);
        setCols(gridCols);
      } else {
        setCard(best.size);
        setCols(best.cols);
      }
    };

    chooseLayout();
    window.addEventListener("resize", chooseLayout);
    return () => window.removeEventListener("resize", chooseLayout);
  }, [miniModals.length]);

  /* 2 ▸ top offsets for *rows* on desktop */
  const tops = useMemo(() => {
    const rowsPerSide = Math.ceil(Math.ceil(miniModals.length / 2) / cols);
    const totalH = rowsPerSide * card + (rowsPerSide - 1) * GAP;
    const startY = (window.innerHeight - totalH) / 2;
    return Array.from(
      { length: rowsPerSide },
      (_, r) => startY + r * (card + GAP)
    );
  }, [miniModals.length, card, cols]);

  /* 3 ▸ render */
  if (!miniModals.length) return null;

  const sideBlockW = cols * card + (cols - 1) * GAP;
  let distance = 2;

  const edgeOffset = (window.innerWidth - MAIN_W) / distance - sideBlockW - GAP;

  /* helpers to track per-side index */
  let leftIdx = 0;
  let rightIdx = 0;
  const wrapperType = (window.innerWidth < BREAK) ?  `bottom ${animation}` : "";

  return (
    <div className={`mini-modals-wrapper ${wrapperType}`} style={{ "--mini": `${card}px` }}>
      <div className="mini-modal-body">
      {miniModals.map((m, i) => {
        const onRight = i % 2 === 1;
        const idxInSide = onRight ? rightIdx++ : leftIdx++;
        const row = Math.floor(idxInSide / cols);
        const col = idxInSide % cols;

        const x =
          edgeOffset +
          col * (card + GAP); /* distance from viewport edge   */
        const y = tops[row];   /* precalculated row top offset */
        
        return (
          <div
            key={m.id}
            className={`mini-modal ${onRight ? "right" : "left"} ${animation}`}
            style={
              onRight
                ? { right: `${x}px`, top: `${y}px` }
                : { left: `${x}px`,  top: `${y}px` }
            }
          >
            {m.content}
          </div>
        );
      })}
      </div>
    </div>
  );
}
