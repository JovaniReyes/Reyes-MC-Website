import { useLayoutEffect, useMemo, useState } from "react";
import { useMiniModalsStore } from "../../Exp/stores/miniModalStore";
import "../../Styles/miniModals.scss";

/* ——— tweakables ——— */
const MAX_SIZE = 300;           // largest card edge
const MIN_SIZE = 175;           // smallest card edge
const BREAK    = 1415;          // desktop / mobile switch
const GAP_DESK = 30;            // gap ≥ BREAK
const GAP_MOB  = 2;            // gap <  BREAK
const MAIN_W   = 700;           // width of the big modal (desktop)
const MAIN_VH  = 55;            // % height occupied by big modal (mobile)
/* ———————————————— */

export default function MiniModalsManager() {
  const { miniModals, animation } = useMiniModalsStore();

  /* gap depends on viewport width */
  const GAP = window.innerWidth >= BREAK ? GAP_DESK : GAP_MOB;

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

      /* —— desktop layout (cards on each side of big modal) —— */
      const sideFree = (vw - MAIN_W) / 2 - GAP;      // width on one side
      const sideCount = Math.ceil(n / 2);            // cards each side
      let best = { cols: 1, size: MIN_SIZE };

      [1, 2].forEach((c) => {
        const rows  = Math.ceil(sideCount / c);
        const limitH = (vh - (rows - 1) * GAP) / rows;
        const limitW = (sideFree - (c - 1) * GAP) / c;
        const size = Math.max(
          MIN_SIZE,
          Math.min(MAX_SIZE, Math.floor(Math.min(limitH, limitW)))
        );
        if (size > best.size) best = { cols: c, size };
      });

      /* —— stacked / mobile layout (cards under big modal) —— */
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

  /* 2 ▸ top offsets for desktop rows (centred vertically) */
  const tops = useMemo(() => {
    const rowsPerSide = Math.ceil(Math.ceil(miniModals.length / 2) / cols);
    const totalH = rowsPerSide * card + (rowsPerSide - 1) * GAP;
    const startY = (window.innerHeight - totalH) / 2;
    return Array.from(
      { length: rowsPerSide },
      (_, r) => startY + r * (card + GAP)
    );
  }, [miniModals.length, card, cols]);

  /* 3 ▸ render nothing if no cards */
  if (!miniModals.length) return null;

  const sideBlockW = cols * card + (cols - 1) * GAP;  // width of one column stack
  const edgeOffset = (window.innerWidth - MAIN_W) / 2 - sideBlockW - GAP;
  const wrapperType = window.innerWidth < BREAK ? `bottom ${animation}` : "";

  /* helpers to track per-side index */
  let leftIdx = 0;
  let rightIdx = 0;

  return (
    <div
      className={`mini-modals-wrapper ${wrapperType}`}
      style={{ "--mini": `${card}px`, "--gap": `${GAP}px` }}
    >
      <div className="mini-modal-body">
        {miniModals.map((m, i) => {
          const onRight = i % 2 === 1;
          const idxInSide = onRight ? rightIdx++ : leftIdx++;
          const row = Math.floor(idxInSide / cols);
          const col = idxInSide % cols;

          const x = edgeOffset + col * (card + GAP);
          const y = tops[row];

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
